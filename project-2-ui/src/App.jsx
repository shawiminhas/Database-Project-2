import { SignedIn, SignedOut, useUser, UserButton, UserProfile} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import React from 'react';
import SignIn from "./components/SignIn";
import InformationForm from "./components/InformationForm";
import APIService from "./components/APIService";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<SignIn />} />

      <Route path='/app' element={<MainLayout />}>
        <Route path='/app/addInformation' element={
          <SignedIn>
            <div>
              <InformationForm />
            </div> 
          </SignedIn>}
        />

        <Route path='/app/dashboard' element={
          <SignedIn>
          </SignedIn>}
        />

        <Route path='/app/quotes' element={
          <SignedIn>

          </SignedIn>
        } 
        />

        <Route path='/app/orders' element={
          <SignedIn>
            
          </SignedIn>
        } 
        />

        <Route path='/app/bills' element={
          <SignedIn>
            
          </SignedIn>
        } 
        />

        <Route path='/app/metrics' element={
          <SignedIn>
            
          </SignedIn>
        } 
        />
      </Route>
    </>
  )
);

function App() {
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App