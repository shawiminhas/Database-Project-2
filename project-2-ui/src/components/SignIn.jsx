import React from 'react'
import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from '@clerk/clerk-react'; 

const SignIn = () => {
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