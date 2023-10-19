from time import sleep
import pyodbc

server = "185.140.114.73"
port = "63875"
database = "StwPh_11836547"
username = "User01"
password = "Test01"


connection = pyodbc.connect(
    "DRIVER={ODBC Driver 18 for SQL Server};"
    "SERVER=185.140.114.73,63875;"  # Replace 'port_number' with the actual port number
    "DATABASE=StwPh_11836547;"
    "UID=User01;"
    "PWD=Test01;"
    "Trusted_connection=no;"
    "TrustServerCertificate=yes;"
)

print("connected")
sleep(2000)

connection.close()
