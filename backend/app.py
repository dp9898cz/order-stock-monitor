from flask import Flask

import pymssql

app = Flask(__name__)

server = "185.140.114.73"
port = "63875"
database = "StwPh_11836547"
username = "User01"
password = "Test01"

connection = pymssql.connect(
    server=server, user=username, password=password, port=port, database=database
)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/test")
def testdb():
    try:
        # Vytvořte kurzor pro provádění SQL dotazů
        cursor = connection.cursor()

        # Příklad SQL dotazu
        sql_query = "SELECT * FROM your_table"

        # Proveďte SQL dotaz
        cursor.execute(sql_query)

        # Zpracujte výsledky
        for row in cursor.fetchall():
            print(row)

        # Uzavřete připojení a kurzor
        cursor.close()
    except err:
        print(err)
        return "<h1>Something is broken.</h1>"
    finally:
        connection.close()
