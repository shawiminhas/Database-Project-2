import React, { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import APIService from './APIService';
import { useNavigate } from 'react-router-dom';

const CreateQuoteForm = () => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { has } = useAuth();

  const isAdmin = has({ role: 'org:admin' });
  if (isAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl">
        <p>You are the admin, you don’t pay for services!</p>
      </div>
    );
  }

  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    address: "",
    squareFeet: "",
    proposedPrice: "",
    pictures: "",
    note: ""
  });

  useEffect(() => {
    if (user && isLoaded) {
      setFormData({ ...formData, email: user.primaryEmailAddress?.emailAddress });
    }
  }, [isLoaded, user]);

  const createNewQuote = async () => {
    try {
      await APIService.createQuoteRequest(formData);
      setStatusMessage("Quote successfully created! You will be redirected momentarily");
      setFormData({
        email: "",
        address: "",
        squareFeet: "",
        proposedPrice: "",
        pictures: "",
        note: "",
      });

      setTimeout(() => {
        setStatusMessage("");
        navigate("/dashboard");
      }, 6000);
    } catch (error) {
      console.log("An error occurred", error);
      setStatusMessage("An error occurred while creating the quote.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createNewQuote();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">Enter Quote Information</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            aria-label="Enter your address"
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Enter your address"
            required
            className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          />
          <input
            aria-label="Enter the total square feet"
            type="number"
            min={0}
            value={formData.squareFeet}
            onChange={(e) => setFormData({ ...formData, squareFeet: e.target.value })}
            placeholder="Enter the total square feet"
            required
            className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          />
          <input
            aria-label="Enter your proposed price"
            type="number"
            min={1}
            value={formData.proposedPrice}
            onChange={(e) => setFormData({ ...formData, proposedPrice: e.target.value })}
            placeholder="Enter your proposed price"
            className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          />
          <input
            aria-label="Enter the link for your pictures"
            type="url"
            value={formData.pictures}
            onChange={(e) => setFormData({ ...formData, pictures: e.target.value })}
            placeholder="Enter the link for your pictures"
            required
            maxLength={40}
            className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          />
          <textarea
            aria-label="Enter your note"
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            placeholder="Enter your note"
            required
            maxLength={1000}
            className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 h-24 resize-none"
          ></textarea>
          <button
            type="submit"
            className="w-full text-white bg-neutral-600 p-3 font-semibold rounded-md hover:scale-105 hover:transition-transform hover:shadow-md"
          >
            Submit
          </button>
        </form>
        {statusMessage && (
          <p className="mt-6 text-center text-lg font-medium text-green-600">{statusMessage}</p>
        )}
      </div>
    </div>
  );
};

export default CreateQuoteForm;
