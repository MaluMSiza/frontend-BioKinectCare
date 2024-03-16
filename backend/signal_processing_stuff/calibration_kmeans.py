import pandas as pd
import numpy as np
from scipy.signal import butter, filtfilt
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans

# Leitura dos dados a partir de um arquivo .txt
caminho_do_arquivo = 'ariyosh_biceps_24_03_03.txt'
sinal = pd.read_csv(caminho_do_arquivo, header=None).squeeze().values  # Ajuste para suprimir o aviso

# Filtro Passa-Banda
def filtro_passa_banda(sinal, fs, lowcut, highcut):
    nyq = 0.5 * fs
    low = lowcut / nyq
    high = highcut / nyq
    b, a = butter(5, [low, high], btype='band')
    y = filtfilt(b, a, sinal)
    return y

sinal_filtrado = filtro_passa_banda(sinal, fs=2000, lowcut=50, highcut=60)  # Ajuste fs conforme necessário

# Retificação e RMS
sinal_retificado_rms = np.sqrt(np.mean(sinal_filtrado**2))

# Médias-Móveis
def media_movel(sinal, n=88):
    return np.convolve(sinal, np.ones(n)/n, mode='same')

# Aplicando a média móvel ao sinal retificado (elevando ao quadrado) antes de calcular o RMS
sinal_media_movel = media_movel(sinal_filtrado**2, n=88)
sinal_rms = np.sqrt(sinal_media_movel)

# K-means para Definir o Limiar de Ativação
kmeans = KMeans(n_clusters=2, n_init=10)
sinal_reshape = sinal_rms.reshape(-1, 1)
kmeans.fit(sinal_reshape)
limiar = np.mean(kmeans.cluster_centers_) * 1.3

print(f'O limiar de ativação é: {limiar}')

# Identificar os pontos acima do limiar
sinal_ativado = np.where(sinal_rms >= limiar, 1, 0)

# Geração de Gráficos
plt.figure(figsize=(15, 20))

# Sinal Bruto
plt.subplot(5, 1, 1)
plt.plot(sinal, color='grey')
plt.title('Sinal Bruto')

# Sinal com Passa-Banda
plt.subplot(5, 1, 2)
plt.plot(sinal_filtrado, color='green')
plt.title('Sinal com Passa-Banda')

# Sinal RMS
plt.subplot(5, 1, 3)
plt.plot(sinal_rms, color='blue')
plt.title('Sinal RMS')

# Sinal com Médias Móveis do Sinal RMS
plt.subplot(5, 1, 4)
plt.plot(sinal_rms, color='orange')
plt.title('Sinal RMS com Médias Móveis')

# Sinal com Mudança de Cor
plt.subplot(5, 1, 5)
plt.plot(sinal_rms, color='blue')
plt.scatter(range(len(sinal_rms)), sinal_rms, c=sinal_ativado, cmap='bwr')
plt.axhline(y=limiar, color='k', linestyle='--')
plt.title('Sinal RMS com Ativação')

plt.tight_layout()
plt.show()
