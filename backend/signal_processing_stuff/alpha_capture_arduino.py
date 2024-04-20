import serial
import serial.tools.list_ports
import time
from datetime import datetime
import json
import numpy as np
from scipy.signal import butter, lfilter

def find_arduino_port():
    ports = serial.tools.list_ports.comports()
    for port in ports:
        try:
            s = serial.Serial(port.device, 115200, timeout=1)
            s.close()
            print(port.device)
            return "COM4"
        except (OSError, serial.SerialException):
            pass
    return None
def butter_bandpass(lowcut, highcut, fs, order=5):
    nyq = 0.5 * fs
    low = lowcut / nyq
    high = highcut / nyq
    b, a = butter(order, [low, high], btype='band')
    return b, a

def bandpass_filter(data, lowcut, highcut, fs, order=5):
    b, a = butter_bandpass(lowcut, highcut, fs, order=order)
    y = lfilter(b, a, data)
    return y

def envelope_signal(signal, rate, threshold=0.01):
    signal = np.abs(signal)
    mask = (signal > threshold)
    return mask * signal

def preprocess_data(raw_data):
    fs = 2000  # Sample rate, adjust to your actual sample rate
    lowcut = 60.0
    highcut = 250.0
    
    filtered_data = bandpass_filter(raw_data, lowcut, highcut, fs, order=6)
    enveloped_data = envelope_signal(filtered_data, fs)
    return enveloped_data

def capturar_dados(ser, duracao, porta):
    data = []
    start_time = time.time()
    while time.time() - start_time < duracao:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').rstrip()
            try:
                values = line.split(';')
                value = float(values[porta])
                data.append(value)
            except (ValueError, IndexError):
                pass
    return data

ser = serial.Serial(find_arduino_port(), 115200, timeout=1)
time.sleep(2)  # Dar um tempo para a conexão ser estabelecida

user = input("Digite o nome do usuário: ")
muscle = input("Digite o nome do músculo: ")
porta_analogica = int(input("Digite o número da porta analógica (0-5): "))

filename = f"{user}_{muscle}_{datetime.now().strftime('%Y_%m_%d')}.json"

# Simplificando a estrutura do JSON
capturas = {'Dados': []}

# Captura continuada, sem separação por fases
duracoes = [5, 2, 3, 2, 3, 2, 3, 2]  # Preparação, Movimento 1, Descanso, Movimento 2, Descanso, Movimento 3, Descanso, Final
instrucoes = [
    "Preparação - Relaxado por 5 segundos",
    "Movimento 1 - Ativo por 2 segundos",
    "Descanso - Relaxado por 3 segundos",
    "Movimento 2 - Ativo por 2 segundos",
    "Descanso - Relaxado por 3 segundos",
    "Movimento 3 - Ativo por 2 segundos",
    "Descanso - Relaxado por 3 segundos",
    "Final - Relaxado por 2 segundos"
]

for duracao, instrucao in zip(duracoes, instrucoes):
    print(instrucao)
    raw_data = capturar_dados(ser, duracao, porta_analogica)
    capturas['Dados'].extend(raw_data)

# Pré-processamento dos dados
dados_processados = preprocess_data(np.array(capturas['Dados']))
capturas['Dados'] = dados_processados.tolist()

with open(filename, 'w') as file:
    json.dump(capturas, file, indent=4)

print("Captura e pré-processamento concluídos.")
