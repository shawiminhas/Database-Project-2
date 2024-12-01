import React, { useEffect, useState } from 'react';
import APIService from './APIService.js';
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

function InformationForm() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    creditCard: "",
  });

  useEffect(() => {
    if (user && isLoaded) {
      setFormData({ ...formData, email: user.primaryEmailAddress?.emailAddress })
    }
  }, [isLoaded, user])

  const insertUser = async () => {
    try {
      await APIService.insertUser(formData)
      console.log("User inserted successfully");
      navigate('/dashboard');
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        emailAddress: "",
        address: "",
        creditCard: "",
      });
    } catch (error) {
      console.error("Error inserting user: ", error);
      alert("Email is already in use");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await insertUser();
    
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">Enter Information</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            aria-label="Enter your first name"
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="First name"
            required
            className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          />
          <input
            aria-label="Enter your last name"
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Last name"
            required
            className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          />
          <input
            aria-label="Enter your email address"
            type="email"
            value={formData.email}
            placeholder="Email address"
            readOnly
            className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          />
          <input
            aria-label="Enter your phone number"
            type="text"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            placeholder="Phone number"
            required
            className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          />
          <input
            aria-label="Enter your address"
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Address"
            required
            className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
          />
          <input
            aria-label="Enter your credit card info"
            type="tel"
            min="0"
            onChange={(e) => setFormData({ ...formData, creditCard: e.target.value })}
            placeholder="Credit card number"
            pattern="[0-9\s]{13,19}"
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
      </div>
    </div>
  );
  
}

export default InformationForm