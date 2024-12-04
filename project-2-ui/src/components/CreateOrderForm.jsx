import React, { useState } from "react";
import APIService from "./APIService";
import { useNavigate } from "react-router-dom";

const CreateOrderForm = () => {
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    quoteId: "",
    clientId: "",
    workStartDate: "",
    workEndDate: "",
    orderStatus: "Working",
    totalPrice: "",
  });

  const createNewOrder = async () => {
    if (new Date(formData.workStartDate) > new Date(formData.workEndDate)) {
      setStatusMessage("End date cannot be earlier than start date.");
      return;
    }

    try {
      await APIService.createNewOrder(
        formData.quoteId,
        formData.clientId,
        formData.workStartDate,
        formData.workEndDate,
        formData.orderStatus,
        formData.totalPrice
      );

      setStatusMessage("Quote successfully created! You will be redirected momentarily");

      setFormData({
        quoteId: "",
        clientId: "",
        workStartDate: "",
        workEndDate: "",
        orderStatus: "Working",
        totalPrice: "",
      });

      setTimeout(() => {
        setStatusMessage("");
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      console.log("An error occurred", error);
      setStatusMessage("An error occurred while creating the quote.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createNewOrder();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">Enter Quote Information</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            aria-label="Enter clients quote id"
            type="number"
            min={0}
            value={formData.quoteId}
            onChange={(e) => setFormData({ ...formData, quoteId: e.target.value })}
            placeholder="Enter clients quote id"
            required
            className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          />
          <input
            aria-label="Enter the clients id"
            type="number"
            min={0}
            value={formData.clientId}
            onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
            placeholder="Enter the clients id"
            required
            className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          />
          <div>
            <label htmlFor="workStartDate" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your work start date
            </label>
            <input
              id="workStartDate"
              aria-label="Enter your work start date"
              type="date"
              value={formData.workStartDate}
              onChange={(e) => setFormData({ ...formData, workStartDate: e.target.value })}
              placeholder="Enter your work start date"
              className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
            />
          </div>
          <div>
            <label htmlFor="workEndDate" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your work end date
            </label>
            <input
              id="workEndDate"
              aria-label="Enter your work end date"
              type="date"
              value={formData.workEndDate}
              onChange={(e) => setFormData({ ...formData, workEndDate: e.target.value })}
              placeholder="Enter your work end date"
              required
              className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
            />
          </div>
          <input
            aria-label="Enter order status"
            type="text"
            value={formData.orderStatus}
            onChange={(e) => setFormData({ ...formData, orderStatus: e.target.value })}
            placeholder="Enter the order status"
            readOnly
            required
            className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          />
          <input
            aria-label="Enter the total price"
            type="number"
            min={0}
            value={formData.totalPrice}
            onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
            placeholder="Enter the total price"
            required
            className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          />
          <button
            type="submit"
            className="w-full text-white bg-neutral-600 p-3 font-semibold rounded-md hover:scale-105 hover:transition-transform hover:shadow-md"
          >
            Submit
          </button>
        </form>
        {statusMessage && <p className="mt-6 text-center text-lg font-medium">{statusMessage}</p>}
      </div>
    </div>
  );
};

export default CreateOrderForm;
