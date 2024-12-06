import os
from dotenv import load_dotenv  # type: ignore
import mysql.connector # type: ignore
from mysql.connector import IntegrityError # type: ignore
from flask import Flask, jsonify, request # type: ignore
from flask_cors import CORS # type: ignore
from datetime import datetime, date
import json


load_dotenv()

app = Flask(__name__)
CORS(app)


def getdb():
  db_connection = mysql.connector.connect(
    user = os.getenv("USERNAME"),
    password = os.getenv("PASSWORD"),
    host = os.getenv("HOST"),
    database = os.getenv("DATABASE"),
  )
  return db_connection


def create_connection():
  try:
    db_connection = getdb()
    if db_connection:
      db_connection.close()
      print("Database connected successfully")
  
  except Exception as e:
    print(f"Error: {e}")

create_connection()


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
  

  
@app.route("/createNewOrder", methods=["POST"])
def create_new_order():
  try:
    db_connection = getdb()
    data = request.get_json()
    print(data)
    mycursor = db_connection.cursor()

    sql = """
    INSERT INTO orders(quote_id, client_id, work_start_date, work_end_date, order_status, total_price) VALUES (%s, %s, %s, %s, %s, %s);
    """
    user_data = (data["quote_id"], data["client_id"], data["work_start_date"], data["work_end_date"], data["order_status"], data["total_price"])

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

  


@app.route("/clientWithdraw", methods=["POST"])
def withdraw_order_by_id():
  try:
    db_connection = getdb()
    data = request.get_json()
    print(data)
    mycursor = db_connection.cursor()

    sql = """
    UPDATE quote_request SET status = %s WHERE id = %s;
    """
    user_data = ("Cancelled", data["id"])
    mycursor.execute(sql, user_data)
    db_connection.commit()
    message = jsonify({"message": "order was successfully cancelled"}), 200
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
    INSERT INTO quote_request(client_id, address, square_feet, proposed_price, pictures) 
    VALUES (
      (SELECT id FROM users WHERE email = %s),
      %s,
      %s,
      %s,
      %s
    );
    """
    user_data = (data["email"], data["address"], data["squareFeet"], data["proposedPrice"], data["pictures"])
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
  

@app.route("/updateRequestStatus", methods=["POST"])
def update_request_status():
  try:
    db_connection = getdb()
    mycursor = db_connection.cursor()
    data = request.get_json()
    print(data)
    sql = "UPDATE quote_request SET status = %s WHERE id = %s;"
    user_data = (data["status"], data["id"])
    mycursor.execute(sql, user_data)
    db_connection.commit()
    
    message = jsonify({"message": "data successfully inserted into database"}), 200
  
  except mysql.connector.Error as err:
    print(f"Error: {err}")
    message = jsonify({"message": f"Could not complete, Error: {err}"}), 422
  except Exception as e:
    print(f"Unexpected Error: {e}")
    message = jsonify({"message": "An unexpected error occurred"}), 500
  finally:
    if db_connection.is_connected():
      mycursor.close()
      db_connection.close()
  return message



@app.route("/storeMessage", methods=["POST"])
def store_message():
  try:
    db_connection = getdb()
    mycursor = db_connection.cursor()
    data = request.get_json()

    newMessage = {"message": data["message"], "is_admin": data["isAdmin"], "id": data["id"]}
    allMessages = get_messages_by_id(data['id'])

    if not allMessages:
        allMessages = []

    allMessages.append(newMessage)
    print(allMessages)

    allMessagesJson = json.dumps(allMessages)

    sql = "UPDATE quote_request SET messages = %s WHERE id = %s;"
    user_data = (allMessagesJson, data['id'])
    mycursor.execute(sql, user_data)
    db_connection.commit()

    message = jsonify({"message": "data successfully inserted into database"}), 200

  except mysql.connector.Error as err:
    print(f"Error: {err}")
    message = jsonify({"message": f"Could not complete, Error: {err}"}), 422
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


    


@app.route("/getQuoteRequests/<email>/<admin>")
def get_quote_requests(email, admin):
    try:
      db_connection = getdb()
      mycursor = db_connection.cursor()

      if admin == "True":
        sql = """
        SELECT users.first_name, users.last_name, users.email, users.phone_number, users.address, quote_request.client_id, quote_request.id, quote_request.square_feet, quote_request.proposed_price, quote_request.pictures, quote_request.messages, quote_request.status
        FROM users
        INNER JOIN quote_request ON quote_request.client_id = users.id
        ORDER BY (quote_request.status = 'Pending') DESC;
        """
        mycursor.execute(sql)
      else:
        sql = """
        SELECT users.first_name, users.last_name, users.email, users.phone_number, users.address, quote_request.client_id, quote_request.id, quote_request.square_feet, quote_request.proposed_price, quote_request.pictures, quote_request.messages, quote_request.status 
        FROM users
        INNER JOIN quote_request ON quote_request.client_id = users.id
        WHERE users.email = %s
        ORDER BY (quote_request.status = 'Pending') DESC;
        """
        mycursor.execute(sql, (email,))
      
      result = mycursor.fetchall()

      columns = [column[0] for column in mycursor.description] 
      result_dict = [dict(zip(columns, row)) for row in result]
      return jsonify(result_dict)
    
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



@app.route("/orders/<email>/<is_admin>")
def get_all_orders(email, is_admin):
  try:
    db_connection = getdb()
    mycursor = db_connection.cursor()

    if is_admin == "true":
      sql = "SELECT * FROM orders;"
      mycursor.execute(sql)
    else:
      sql = "SELECT id FROM users WHERE email = %s;"
      user_data = email.split()
      print(user_data)
      mycursor.execute(sql, user_data)
      client_id = mycursor.fetchone()[0]
      print(client_id)
      sql = "SELECT * FROM orders WHERE client_id = %s;"
      mycursor.execute(sql, (client_id, ))
    
    result = mycursor.fetchall()
    columns = [column[0] for column in mycursor.description] 
    result_dict = [dict(zip(columns, row)) for row in result]
    for row in result_dict:
      for key, value in row.items():
        if isinstance(value, (datetime, date)):
          row[key] = value.strftime("%d %b %Y")
    return jsonify(result_dict)

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
  

  
  
@app.route("/getMessagesById/<id>")
def get_messages_by_id(id):
  try:
    db_connection = getdb()
    mycursor = db_connection.cursor()
    sql = """
      SELECT messages FROM quote_request WHERE id = %s;
    """
    mycursor.execute(sql, (id, ))
    result = mycursor.fetchall()
    json_string = result[0][0]
    if json_string is not None:
      return json.loads(json_string)

    else:
      return []
  
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
