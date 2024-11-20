import os
from dotenv import load_dotenv, dotenv_values  # type: ignore
load_dotenv()
import mysql.connector # type: ignore
from flask import Flask # type: ignore
from flask_cors import CORS # type: ignore

app = Flask(__name__)
CORS(app)

def getdb():
    try:
      connection = mysql.connector.connect(
        user = os.getenv("USERNAME"),
        password = os.getenv("PASSWORD"),
        host = os.getenv("HOST"),
        database = os.getenv("DATABASE"),
      )
      print("Database connected successfully")
    except mysql.connector.Error as err:
      print(f"Database not connected error : {err}")
    



@app.route("/")
def hi():
  getdb()
  return "hi"


# useEffect(async () => {

#   try {
#   const response = await fetch("localhost:5000/")
#   const jsonResponse = await response.json()

#   // do things
#   }
#   catch {
#     // catch error
#   }

# } , [])