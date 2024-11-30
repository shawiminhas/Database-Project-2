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
      navigate('/app/dashboard');
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
    <div className="flex flex-col w-screen min-h-screen justify-center items-center bg-gray-100">
    <div className='flex flex-col justify-center items-center bg-gray-100 w-1/2'>
      <h1 className='text-4xl text-gray-500 font-bold mb-3'>Enter Information</h1>
      <div className='border shadow-md p-5 rounded-xl bg-gray-50 mb-5 w-3/6'>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-5 items-center'>
        <div className='flex flex-col space-y-2 w-full'>
          <input 
            aria-label='Enter your first name'
            type='text'
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            placeholder='First name'
            required
            className='p-1 text-sm border'/>
          <input
            aria-label='Enter your last name'
            type='text'
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            placeholder='Last name'
            required
            className='p-1 text-sm border'/>
          <input
            aria-label='Enter your email address'
            type='email'
            value={formData.email}
            placeholder='Email address'
            readOnly
            className='p-1 text-sm border'/>
          <input
            aria-label='Enter your phone number'
            type='text'
            value={formData.phoneNumber}
            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
            placeholder='Phone number'
            required
            className='p-1 text-sm border'/>
          <input
            aria-label='Enter your address'
            type='text'
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            placeholder='Address'
            required
            className='p-1 text-sm border'/>
          <input
            aria-label='Enter your credit card info'
            type='tel'
            min = "0"
            onChange={(e) => setFormData({...formData, creditCard: e.target.value})}
            placeholder='Credit card number'
            pattern="[0-9\s]{13,19}" 
            required
            className='p-1 text-sm border'/>
            <br />
          <button type="submit" className="border text-white bg-neutral-600 p-2 px-4 font-semibold rounded-md ">Submit</button>
        </div>
      </form>
      </div>
      </div>
      </div>
  );
}

export default InformationForm