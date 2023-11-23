from flask import Flask

import pymssql
import datetime
from decimal import Decimal
import json
import os

app = Flask(__name__)

server = "185.140.114.73"
port = "63875"
database = "StwPh_11836547"
username = os.environ["DATABASE_USER"]
password = os.environ["DATABASE_PASSWORD"]


def makeConnection():
    print(username)
    print(password)
    try:
        connection = pymssql.connect(
            server=server,
            user=username,
            password=password,
            port=port,
            database=database,
        )
    except err:
        print(err)
        connection.close()

    return connection


# run SQL command and get rows
def getRows(sql_command):
    connection = makeConnection()
    cursor = connection.cursor()
    cursor.execute(sql_command)
    rows = cursor.fetchall()
    cursor.close()
    connection.close()
    return rows


def getProducts():
    products_raw = getRows(
        """
        SELECT
            s.IDS,
            s.EAN,
            s.Nazev,
            s.Firma,
            (s.StavZ + ISNULL(s1.StavZ, 0)) AS TotalStavZ,
            s.VNakup,
            s.ProdejDPH,
            s.VPrKsPal,
            s.ID,
            STUFF((
                SELECT '|' + CONVERT(VARCHAR(10), poh.Datum, 120)
                    + '_' + CONVERT(VARCHAR(10), poh.PohPMJ)
                    + '_' + CONVERT(VARCHAR(10), poh.StavZ)
                FROM SkzPoh poh
                WHERE poh.RefSKz = s.ID AND poh.Datum >= DATEADD(DAY, -90, GETDATE())
                FOR XML PATH('')), 1, 1, '') AS SkzPohIDs,
            ISNULL(SUM(order1.Mnozstvi), 0) AS TotalMnozstvi
        FROM
            Skz s
        LEFT JOIN
            (
                SELECT
                    pol.Kod as Kod,
                    pol.Mnozstvi as Mnozstvi
                FROM OBJ obj JOIN OBJpol pol ON obj.ID = pol.RefAg
                WHERE Datum >= DATEADD(MONTH, -3, GETDATE())
            ) order1 ON s.IDS = order1.Kod
        LEFT JOIN
            (
                SELECT IDS, StavZ
                FROM Skz
                WHERE RefSklad IN (2, 4) AND RelSkTyp = 1 AND StavZ > 0
            ) s1 ON s1.IDS = s.IDS
        WHERE
            s.RefSklad = 1 AND s.RelSkTyp = 1
        GROUP BY
            s.IDS,
            s.EAN,
            s.Nazev,
            s.Firma,
            (s.StavZ + ISNULL(s1.StavZ, 0)),
            s.VNakup,
            s.ProdejDPH,
            s.VPrKsPal,
            s.ID;
        """
    )

    products = []
    for row in products_raw:
        record = {
            "id": row[0],
            "ean": row[1],
            "name": row[2],
            "company": row[3],
            "stock_count": float(row[4]) if row[4] is not None else None,
            "buy_price": float(row[5]) if row[5] is not None else None,
            "sell_price": float(row[6]) if row[6] is not None else None,
            "pieces_on_palette": row[7],
            "counter_id": row[8],
            "moves": row[9],
            "order_quantity": row[10],
        }
        products.append(record)
    return products


def getOrders():
    orders_raw = getRows(
        """
        SELECT
            obj.ID,
            obj.Datum,
            pol.Kod,
            pol.Mnozstvi
        FROM OBJ obj JOIN OBJpol pol ON obj.ID = pol.RefAg
        WHERE Datum >= DATEADD(MONTH, -3, GETDATE())
        ORDER BY Datum;
        """
    )
    orders = []
    for row in orders_raw:
        record = {
            "id": row[0],
            "date": row[1],
            "product_id": row[2],
            "quantity": row[3],
        }
        orders.append(record)

    return orders


def getMoves():
    moves_raw = getRows(
        """
        SELECT ID,Datum,RefSKz,PohPMJ,StavZ
        FROM SkzPoh
        ORDER BY Datum,StavZ;
        """
    )
    moves = []
    for row in moves_raw:
        record = {
            "id": row[0],
            "date": row[1],
            "product_counter_id": row[2],
            "quantity": row[3],
            "stock": row[4],
        }
        moves.append(record)

    return moves


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/getMoves")
def get_moves():
    return getMoves()


@app.route("/getProducts")
def get_products():
    return getProducts()


@app.route("/getOrders")
def get_orders():
    return getOrders()


@app.route("/getData")
def get_data():
    products = getProducts()
    # orders = getOrders()
    # moves = getMoves()

    """ for product in products:
        product["orders"] = [a for a in orders if a["product_id"] == product["id"]] """

    # filter only products with some orders
    # todo somehow filter what products to remove
    """ filtered_products = [a for a in products if len(a["orders"]) > 0] """

    """ for p in filtered_products:
        p["marketability"] = sum(o["quantity"] for o in p["orders"]) """

    """ for p in filtered_products:
        p.pop("orders", None) """
    print(len(products))
    # print(moves[0])
    """ product_moves = [
        a for a in moves if a["product_counter_id"] == products[0]["counter_id"]
    ] """
    # print(len(product_moves))

    return json.dumps(products)
