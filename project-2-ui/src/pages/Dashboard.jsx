import React from 'react'
import { useUser } from '@clerk/clerk-react'

const Dashboard = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg border-4">
        <h1 className="text-3xl font-semibold text-gray-700 mb-4 text-center">
          Welcome {isLoaded ? user.username : 'Loading...'}!
        </h1>
        <p className="text-lg text-gray-500 text-center mb-6 font-semibold">
          Select a page to continue
        </p>
        <div className="flex justify-center">
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
