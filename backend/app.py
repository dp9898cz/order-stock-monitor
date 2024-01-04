from flask import Flask, request, make_response
from flask_cors import CORS

import pymssql
import datetime
from decimal import Decimal
import json
import os

app = Flask(__name__)
CORS(app)

server = "185.140.114.73"
port = "63875"
database = "StwPh_11836547"
username = os.environ["DATABASE_USER"]
password = os.environ["DATABASE_PASSWORD"]


def makeConnection():
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


def getProducts(days):
    if (days is None) or (not days.isdigit()):
        days = 90
    products_raw = getRows(
        f"""
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
                WHERE poh.RefSKz = s.ID AND poh.Datum >= DATEADD(DAY, -{days}, GETDATE())
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
                WHERE Datum >= DATEADD(DAY, -{days}, GETDATE())
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
    days = request.args.get("days")
    resp = make_response(getProducts(days))
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Methods"] = "GET"
    resp.headers[
        "Access-Control-Allow-Headers"
    ] = "Content-Type, Access-Control-Allow-Origin, xxx"
    return resp


@app.route("/getOrders")
def get_orders():
    return getOrders()


@app.route("/getData")
def get_data():
    products = getProducts(90)
    return json.dumps(products)
