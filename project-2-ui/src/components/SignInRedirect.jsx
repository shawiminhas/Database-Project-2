import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';
import APIService from './APIService';

const SignInRedirect = () => {
  const { user, isLoaded } = useUser();
  const [existingUser, setExistingUser] = useState(null);

  useEffect(() => {
    const checkUserExistence = async () => {
      if (user) {
        try {
          const exists = await APIService.existingUser(user.primaryEmailAddress.emailAddress);
          console.log(exists.message);
          setExistingUser(exists.message === "True");
        } catch (error) {
          console.log("Error checking if user exists", error);
          setExistingUser(false);
        }
      }
    };

    if (isLoaded && user) {
      checkUserExistence();
    }
  }, [user, isLoaded]);

  if (!isLoaded || existingUser === null) {
    return null;
  }

  return existingUser ? <Navigate to="/dashboard" /> : <Navigate to="/addInformation" />;
};

export default SignInRedirect;
