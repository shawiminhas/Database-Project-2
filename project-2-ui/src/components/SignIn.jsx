import React, { useState, useEffect } from 'react'
import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from '@clerk/clerk-react'; 
import APIService from './APIService';
import { Navigate } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';

const SignIn = () => {
  const { user } = useUser();
  const [existingUser, setExistingUser] = useState(null);

  useEffect(() => {
    const checkUserExistence = async () => {
      if (user && user.primaryEmailAddress) {
        try {
          const exists = await APIService.existingUser(user.primaryEmailAddress.emailAddress);
          console.log(exists.message);
          setExistingUser(exists.message === "True");
        } catch (error) {
          console.log("Error checking if user exists", error);
          setExistingUser(null);
        }
      }
    }
    checkUserExistence();
  }, [user])
  

  if (existingUser !== null) {
    return existingUser ? <Navigate to="/dashboard" /> : <Navigate to="/addInformation" />
  }
  
  return (
    <header>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}

export default SignIn