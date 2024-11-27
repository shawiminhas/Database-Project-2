import { useEffect, useState } from "react";
import React from 'react';
import InformationForm from "./InformationForm";
import APIService from "./APIService";
import { useUser } from "@clerk/clerk-react";


function ShowInformationForm() {
    const { user, isLoaded } = useUser();
    const [userExists, setUserExists] = useState(null);

    const checkUserExistence = async () => {
      if (user && isLoaded) {
        try {
          const exists = await APIService.existingUser(user.primaryEmailAddress.emailAddress);
          setUserExists(exists.message === "True");
        } catch (error) {
          console.error("Error checking if user exists", error);
          setUserExists(false);
        }
      }
    }

    useEffect(() => {
      if (user && isLoaded) {
        checkUserExistence();
      }
    }, [isLoaded])

    return (
      <div className="flex flex-col w-screen min-h-screen justify-center items-center bg-gray-100">
        {userExists ? (
          <p>User already exists so no information form.</p>
        ) : (
          <InformationForm />
        )}
      </div>
    )
}

export default ShowInformationForm