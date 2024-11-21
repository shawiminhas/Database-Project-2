import React, { useState } from 'react';
import { ReactDOM } from 'react-dom/client'

function InformationForm() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [creditCard, setCreditCard] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("First Name: ", firstName);
    console.log("Last Name: ", lastName);
    console.log("Email: ", email);
    console.log("Phone Number: ", phoneNumber);
    console.log("Address: ", address);
    console.log("Credit Card: ", creditCard);

  }


  return (
    <div className='flex flex-col justify-center items-center bg-gray-100 w-1/2'>
      <h1 className='text-4xl text-gray-500 font-bold mb-3'>Enter Information</h1>
      <div className='border shadow-md p-5 rounded-xl bg-gray-50 mb-5 w-3/6'>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-5 items-center'>
        <div className='flex flex-col space-y-2 w-full'>
          <input 
            aria-label='Enter your first name'
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First name'
            required
            className='p-1 text-sm border'/>
          <input
            aria-label='Enter your last name'
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last name'
            required
            className='p-1 text-sm border'/>
          <input
            aria-label='Enter your email address'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email address'
            required
            className='p-1 text-sm border'/>
          <input
            aria-label='Enter your phone number'
            type='text'
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
            placeholder='Phone number'
            required
            className='p-1 text-sm border'/>
          <input
            aria-label='Enter your address'
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Address'
            required
            className='p-1 text-sm border'/>
          <input
            aria-label='Enter your credit card info'
            type='text'
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
            placeholder='Credit card number'
            required
            className='p-1 text-sm border'/>
            <br />
          <button type="submit" className="border text-white bg-neutral-600 p-2 px-4 font-semibold rounded-md ">Submit</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default InformationForm