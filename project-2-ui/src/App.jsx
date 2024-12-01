import { SignedIn, SignedOut, useUser, UserButton, UserProfile, RedirectToSignIn} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import React from 'react';
import InformationForm from "./components/InformationForm";
import APIService from "./components/APIService";
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/Navbar";
import SignInRedirect from "./components/SignInRedirect";


function App() {
  
  return (
    <BrowserRouter>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<SignInRedirect />} />
            <Route path="/addInformation" element={<InformationForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quotes" element={<Dashboard />} />
            <Route path="/orders" element={<Dashboard />} />
            <Route path="/bills" element={<Dashboard />} />
            <Route path="/metrics" element={<Dashboard />} />
          </Route>
        </Routes>
      </SignedIn>
    </BrowserRouter>
  )
}

export default App