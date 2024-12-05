export default class APIService {
  static async insertUser(body) {
    try {
      console.log(JSON.stringify(body));
      const response = await fetch("http://localhost:5000/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP Error ${response.status}: ${error}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error inserting user: ", error);
    }
    throw error;
  }

  static async createQuoteRequest(body) {
    console.log(body);
    try {
      const response = await fetch("http://localhost:5000/createQuoteRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP Error ${response.status}: ${error}`);
      }

      console.log("Quote request successfully created.");
    } catch (error) {
      console.error("Error inserting new quote: ", error);
      throw error;
    }
  }

  static async withdrawOrder(id) {
    try {
      const response = await fetch("http://localhost:5000/clientWithdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error("Error", error);
      }
      console.log("Order successfully cancelled.");
    } catch (error) {
      console.error("Error cancelling order", error);
      throw error;
    }
  }

  static async getQuoteRequests(email, admin) {
    try {
      const response = await fetch(`http://localhost:5000/getQuoteRequests/${email}/${admin}`);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP Error ${response.status}: ${error}`);
      }

      return await response.json();
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  }

  static async getOrders(email, admin) {
    try {
      const response = await fetch(`http://localhost:5000/orders/${email}/${admin}`);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP Error ${response.status}: ${error}`);
      }

      return await response.json();
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  }

  static async existingUser(email) {
    try {
      const response = await fetch(`http://localhost:5000/checkExistingUser/${email}`);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP Error ${response.status}: ${error}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  static async getAllMessages(id) {
    try {
      const response = await fetch(`http://localhost:5000/getMessagesById/${id}`);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP Error ${response.status}: ${error}`);
      }
      return await response.json();
    } catch (e) {
      throw e;
    }
  }

  static async postMessage(id, isAdmin, message) {
    try {
      const response = await fetch(`http://localhost:5000/storeMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, isAdmin: isAdmin, message: message }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP Error ${response.status}: ${error}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  static async updateRequestStatus(id, status) {
    try {
      const response = await fetch("http://localhost:5000/updateRequestStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, status: status }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP Error ${response.status}: ${error}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  static async createNewOrder(quoteId, clientId, workStartDate, workEndDate, orderStatus, totalPrice) {
    try {
      const response = await fetch("http://localhost:5000/createNewOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quote_id: quoteId,
          client_id: clientId,
          work_start_date: workStartDate,
          work_end_date: workEndDate,
          order_status: orderStatus,
          total_price: totalPrice,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP Error ${response.status}: ${error}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}
