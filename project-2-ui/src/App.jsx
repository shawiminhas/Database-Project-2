import { SignedIn, SignedOut, useUser, UserButton, UserProfile, RedirectToSignIn, Protect} from "@clerk/clerk-react";
import React from 'react';
import InformationForm from "./components/InformationForm";
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "./pages/dashboard";
import SignInRedirect from "./components/SignInRedirect";
import NotFound from "./pages/NotFound";
import ForbiddenAccess from "./pages/ForbiddenAccess";
import Quotes from "./pages/Quotes";


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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/orders" element={<Dashboard />} />
            <Route path="/bills" element={<Dashboard />} />
            <Route path="/metrics" element={
              <Protect role="org:admin" fallback={<ForbiddenAccess />}>
                <Dashboard />
              </Protect>}
            />
            <Route path="*" element={<NotFound />} />
            
          </Route>
          <Route path="/addInformation" element={<InformationForm />} />
        </Routes>
      </SignedIn>
    </BrowserRouter>
  )
}

export default App