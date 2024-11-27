import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import React from 'react';
import SignIn from "./components/SignIn";
import InformationForm from "./components/InformationForm";
import APIService from "./components/APIService";
import ShowInformationForm from "./components/ShowInformationForm";

function App() {
  
  return (
    <div className="App">
      <SignIn />
      
      <SignedIn>
        <div className="flex flex-col w-screen min-h-screen justify-center items-center bg-gray-100">
          <ShowInformationForm />
        </div>
      </SignedIn>
    </div>
  )
}

export default App