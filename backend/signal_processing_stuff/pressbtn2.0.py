import serial
import time
import pyautogui
import threading
import keyboard
from flask import Flask, request

app = Flask(__name__)

# Configuração da porta serial
PORT = 'COM4'  # Altere para a porta correta no seu sistema
BAUD_RATE = 115200
TIMEOUT = 1

# Thresholds para cada sensor
thresholds = [436.5, 436.5, 436.5, 436.5, 436.5, 436.5]

#Captura um comando dado no teclado e retorna o nome da tecla pressionada.
def read_sensor_data(ser):
    """Lê uma linha de dados do Arduino e converte para uma lista de valores de sensores."""
    if ser.in_waiting:
        data_line = ser.readline().decode('utf-8').rstrip()
        try:
            sensor_values = [float(val) for val in data_line.split(',')]
            return sensor_values
        except ValueError:
            print("Não foi possível converter os dados do sensor para floats.")
            return None
    else:
        return None

def process_sensor_data(ser, key):
    """Processa os dados dos sensores e simula pressionamentos de tecla."""
    try:
        while True:
            sensor_values = read_sensor_data(ser)
            if sensor_values is not None and len(sensor_values) == len(thresholds):
                # print(f"Valores dos sensores: {sensor_values}")
                for index, sensor_value in enumerate(sensor_values):
                    if sensor_value > thresholds[index]:
                        pyautogui.press(key)
            time.sleep(0.0005)
    except KeyboardInterrupt:
        print("Programa interrompido pelo usuário.")
    finally:
        ser.close()
        print("Conexão serial fechada.")

@app.route('/main', method=['POST'])
def main():
    try:
        ser = serial.Serial(PORT, BAUD_RATE, timeout=TIMEOUT)
    except serial.SerialException as e:
        print(f"Erro ao abrir porta serial: {e}")
        return

    # Inicia a thread de processamento dos dados dos sensores
    thread = threading.Thread(target=process_sensor_data, args=(ser,))
    thread.start()

if __name__ == '__main__':
    app.run(debug=True)
