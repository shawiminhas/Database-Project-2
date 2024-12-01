import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import APIService from './APIService';

const CreateQuoteForm = () => {
  const { user, isLoaded } = useUser();

  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    address: "",
    squareFeet: "",
    proposedPrice: "",
    pictures: "",
    note: ""
  })

  useEffect(() => {
    if (user && isLoaded) {
      setFormData({ ...formData, email: user.primaryEmailAddress?.emailAddress })
    }
  }, [isLoaded, user])

  const createNewQuote = async () => {
    try {
      await APIService.createQuoteRequest(formData);
      setStatusMessage("Quote successfully created!");
      setFormData({
        email: "",
        address: "",
        squareFeet: "",
        proposedPrice: "",
        pictures: "",
        note: "",
      });
    } catch (error) {
      console.log("An error occurred", error);
      setStatusMessage("An error occurred while creating the quote.")
    }
  }
  
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createNewQuote();
    
  };

  return (
    <div className="flex flex-col w-screen min-h-screen justify-center items-center">
    <div className='flex flex-col justify-center items-center bg-gray-200 w-1/2'>
      <h1 className='text-4xl text-gray-500 font-bold mb-3'>Enter Quote Information</h1>
      <div className='border shadow-md p-5 rounded-xl bg-gray-50 mb-5 w-4/6'>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-5 items-center'>
        <div className='flex flex-col space-y-2 w-full'>
          <input 
            aria-label='Enter your address'
            type='text'
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            placeholder='Enter your address'
            required
            className='p-1 text-sm border'/>
          <input
            aria-label='Enter the total square feet'
            type='number'
            min={0}
            value={formData.squareFeet}
            onChange={(e) => setFormData({...formData, squareFeet: e.target.value})}
            placeholder='Enter the total square feet'
            required
            className='p-1 text-sm border'/>
          <input
            aria-label='Enter your proposed price'
            type='number'
            min={1}
            value={formData.proposedPrice}
            onChange={(e) => setFormData({...formData, proposedPrice: e.target.value})}
            placeholder='Enter your proposed price'
            className='p-1 text-sm border'/>
          <input
            aria-label='Enter the link for your pictures'
            type='url'
            value={formData.pictures}
            onChange={(e) => setFormData({...formData, pictures: e.target.value})}
            placeholder='Enter the link for your pictures'
            required
            maxLength={40}
            className='p-1 text-sm border'/>
          <input
            aria-label='Enter your note'
            type='text'
            value={formData.note}
            onChange={(e) => setFormData({...formData, note: e.target.value})}
            placeholder='Enter your note'
            required
            maxLength={1000}
            className='p-1 text-sm border'/>
            <br />
          <button type="submit" className="border text-white bg-neutral-600 p-2 px-4 font-semibold rounded-md ">Submit</button>
        </div>
      </form>
      </div>
      </div>
      <div className='status-message'>
        {statusMessage && <p className='text-xl'>{statusMessage}</p>}
      </div>
      </div>
  )
}

export default CreateQuoteForm