import { SignedIn, SignedOut, SignInButton, UserButton, RedirectToSignIn } from "@clerk/clerk-react";
import react from 'react';
import SignIn from "./components/signIn";
import InformationForm from "./components/InformationForm";

function App() {
  return (
    <div className="">
      {SignIn()}
      <div className="flex flex-col w-screen min-h-screen justify-center items-center bg-gray-100">
        <InformationForm />
      </div>
    </div>
      
  );
}

export default App
