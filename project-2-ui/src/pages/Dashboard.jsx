import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  

  return (
      <div className='flex justify-center items-center m-1 text-2xl'>
        <div className='border-solid border-2 shadow-md rounded-md p-3 m-1 font-semibold text-gray-700  hover:scale-105 transition-all hover:shadow-lg'>
        Welcome {isLoaded ? user.username : ''}! Select a page to continue
        </div>
      </div>
  )
}

export default Dashboard