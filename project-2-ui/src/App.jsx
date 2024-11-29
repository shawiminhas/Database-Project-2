import { SignedIn, SignedOut, useUser, UserButton} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import React from 'react';
import SignIn from "./components/SignIn";
import InformationForm from "./components/InformationForm";
import APIService from "./components/APIService";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<SignIn />} />

      <Route path='/addInformation' element={
          <SignedIn>
            <div>
              <UserButton />
              <InformationForm />
            </div> 
            </SignedIn>
      } />

      <Route path='/dashboard' element={
        <SignedIn>
          <UserButton />
          <p>dashboard</p>
        </SignedIn>}
      />
    </>
  )
);

function App() {
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App