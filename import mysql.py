import mysql.connector
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime

def conectar_banco():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="restaurante"
        )
        return conn
    except mysql.connector.Error as err:
        print(f"Erro de conexão: {err}")
        return None

def gerar_relatorio_reservas():
    conn = conectar_banco()
    if conn is None:
        return
    
    try:
        # Consulta para obter reservas
        query = """
        SELECT 
            DATE(data_reserva) as data,
            COUNT(*) as total_reservas,
            SUM(pessoas) as total_pessoas
        FROM reservas
        WHERE data_reserva >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        GROUP BY DATE(data_reserva)
        ORDER BY data
        """
        
        df = pd.read_sql(query, conn)
        
        if df.empty:
            print("Nenhuma reserva encontrada nos últimos 30 dias.")
            return
        
        # Gerar gráfico
        plt.figure(figsize=(12, 6))
        plt.plot(df['data'], df['total_reservas'], marker='o', label='Reservas')
        plt.plot(df['data'], df['total_pessoas'], marker='s', label='Pessoas')
        plt.title('Reservas nos Últimos 30 Dias')
        plt.xlabel('Data')
        plt.ylabel('Quantidade')
        plt.xticks(rotation=45)
        plt.legend()
        plt.grid(True)
        plt.tight_layout()
        
        # Salvar gráfico
        data_atual = datetime.now().strftime("%Y%m%d_%H%M%S")
        nome_arquivo = f"relatorio_reservas_{data_atual}.png"
        plt.savefig(nome_arquivo)
        print(f"Relatório gerado com sucesso: {nome_arquivo}")
        
    except Exception as e:
        print(f"Erro ao gerar relatório: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    gerar_relatorio_reservas()