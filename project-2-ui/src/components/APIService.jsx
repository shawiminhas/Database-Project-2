export default class APIService{
  static async insertUser(body) {
    try {
      const response = await fetch("http://localhost:5000/createUser", {
        'method': 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP Error ${response.status}: ${errorDetails}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error inserting user: ", error);
    }
    throw error;
  }
}