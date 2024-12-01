import React from 'react'
import CreateQuoteForm from '../components/CreateQuoteForm'
import { useState } from 'react'

const Quotes = () => {
  const [showNewQuote, setShowNewQuote] = useState(false);
  const [showCurrentQuote, setShowCurrentQuote] = useState(false);

  const handleShowNewQuote = () => {
    setShowNewQuote((prevState) => !prevState);
    setShowCurrentQuote(false);
  }

  const handleShowCurrentQuote = () => {
    setShowCurrentQuote((prevState) => !prevState);
    setShowNewQuote(false);
  }

  return (
    <>
      <div className='flex justify-center items-center bg-gray-300'>
          <button onClick={handleShowNewQuote} type='button' className='border text-white bg-neutral-600 p-2 px-4 font-semibold rounded-md hover:scale-105 hover:transition-all hover:shadow-md m-5'>
            Create New Quote
          </button>
          <button onClick={handleShowCurrentQuote} type='button' className='border text-white bg-neutral-600 p-2 px-4 font-semibold rounded-md hover:scale-105 hover:transition-all hover:shadow-md'>
            Show Current Quotes
          </button>
      </div>

      {showNewQuote && <CreateQuoteForm />}
      {showCurrentQuote && <p>hi</p>}
    </>
  )
}

export default Quotes