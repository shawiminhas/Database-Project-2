import os
from dotenv import load_dotenv  # type: ignore
import mysql.connector # type: ignore
from mysql.connector import IntegrityError # type: ignore
from flask import Flask, jsonify, request # type: ignore
from flask_cors import CORS # type: ignore


load_dotenv()

app = Flask(__name__)
CORS(app)


def getdb():
    try:
      db_connection = mysql.connector.connect(
        user = os.getenv("USERNAME"),
        password = os.getenv("PASSWORD"),
        host = os.getenv("HOST"),
        database = os.getenv("DATABASE"),
      )
      print("Database connected successfully")
      return db_connection
    except mysql.connector.Error as err:
      print(f"Database not connected error : {err}")
      return None


@app.route("/")
def create_connection():
  db_connection = getdb()
  if db_connection:
    db_connection.close()
    return jsonify({"message": "Database connected successfully"}), 200
  else:
    return jsonify({"message": "Failed to connect to database"}), 500



@app.route("/createUser", methods = ["POST"])
def create_user():
  try:
    db_connection = getdb()
    data = request.get_json()
    print(data)
    mycursor = db_connection.cursor()

    sql = "INSERT INTO users (first_name, last_name, email, phone_number, address, credit_card) VALUES (%s, %s, %s, %s, %s, %s);"
    user_data = (data["firstName"], data["lastName"], data["email"], data["phoneNumber"], data["address"], data["creditCard"])
    mycursor.execute(sql, user_data)

    db_connection.commit()
    message = jsonify({"message": "data successfully inserted into database"}), 200

  except IntegrityError as err:
    if err.errno == 1062:
      print(f"Error: {err}")
      message = jsonify({"message": f"Duplicate entry for email: {err}"}), 422

  except mysql.connector.Error as err:
    print(f"Error: {err}")
    message = jsonify({"message": f"could not complete, Error: {err}"}), 422

  except Exception as e:
    print(f"Unexpected Error: {e}")
    message = jsonify({"message": "An unexpected error occurred"}), 500


  finally:
    if db_connection.is_connected():
      mycursor.close()
      db_connection.close()
    return message
  

@app.route("/createQuoteRequest", methods = ["POST"])
def create_quote_request():
    try:
      db_connection = getdb()
      data = request.get_json()
      print(data)
      mycursor = db_connection.cursor()

      sql = """
      INSERT INTO quote_request(client_id, address, square_feet, proposed_price, note, pictures) 
      VALUES (
        (SELECT id FROM users WHERE email = %s),
        %s,
        %s,
        %s,
        %s,
        %s
      );
      """
      user_data = (data["email"], data["address"], data["squareFeet"], data["proposedPrice"], data["note"], data["pictures"])
      mycursor.execute(sql, user_data)

      db_connection.commit()
      message = jsonify({"message": "data successfully inserted into database"}), 200
    
    except mysql.connector.Error as err:
      print(f"Error: {err}")
      message = jsonify({"message": f"could not complete, Error: {err}"}), 422

    except Exception as e:
      print(f"Unexpected Error: {e}")
      message = jsonify({"message": "An unexpected error occurred"}), 500

    finally:
      if db_connection.is_connected():
        mycursor.close()
        db_connection.close()
      return message
    

@app.route("/checkExistingUser/<email>")
def check_existing_user(email):
  try:
    db_connection = getdb()

    print(email)

    mycursor = db_connection.cursor()

    sql = "SELECT COUNT(*) FROM users WHERE email = %s;"
    mycursor.execute(sql, (email,))
    row_count = mycursor.fetchone()[0]
    print(f"Total rows in the table: {row_count}")

    print(f"Total rows matching email '{email}': {row_count}")
    if row_count == 1:
      return jsonify({"message": "True"}), 200
    else:
      return jsonify({"message": "False"}), 200

  except mysql.connector.Error as err:
    print(f"Database Error: {err}")
    return jsonify({"message": f"Database error occurred: {err}"}), 500
  
  except Exception as e:
    print(f"Unexpected Error: {e}")
    return jsonify({"message": "An unexpected error occurred"}), 500

  finally:
    if db_connection.is_connected():
      mycursor.close()
      db_connection.close()

    


if __name__ == "__main__":
    app.run(debug=True)


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