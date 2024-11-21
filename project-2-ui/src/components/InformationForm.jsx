import { useState } from 'react';
import { ReactDOM } from 'react-dom/client'

function InformationForm() {

  return (
    <div className='flex flex-col w-screen min-h-screen justify-center items-center bg-gray-100'>
      <h1 className='text-4xl text-gray-500 font-bold mb-3'>Enter Information</h1>
      <div className='border shadow-md p-5 rounded-xl bg-gray-50 mb-5'>
      <form className='flex flex-col items-start space-y-5'>
        <div className='flex flex-col text-2xl space-y-1'>
          <input 
            aria-label='Enter your first name'
            type='text'
            placeholder='First name'
            required />
          <input
            aria-label='Enter your last name'
            type='text'
            placeholder='Last name'
            required />
          <input
            aria-label='Enter your email address'
            type='text'
            placeholder='Email address'
            required />
          <input
            aria-label='Enter your phone number'
            type='text'
            placeholder='Phone number'
            required />
          <input
            aria-label='Enter your address'
            type='text'
            placeholder='Address'
            required />
          <input
            aria-label='Enter your credit card info'
            type='text'
            placeholder='Credit card number'
            required />
            <br />
          <button type="submit" className="border text-white bg-neutral-600 p-2 px-4 font-semibold rounded-md ">Submit</button>
        </div>
      </form>
      </div>
    </div>
  
  );
}

export default InformationForm