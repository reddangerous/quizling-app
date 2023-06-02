import './App.css';
import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Quizes from './components/Quizes';
import Questions from './components/Questions';
import ScoreBoard from './components/ScoreBoard';
import Footer from './components/Footer';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
function App() {
  return (
    <div className='App'>
      <ClerkProvider publishableKey={clerkPubKey}>
          <SignedIn>
        

    <BrowserRouter>
      <Header />
     
       <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/quizes" element={<Quizes />} />
        <Route path="/questions/:category" element={<Questions />} />
        <Route path="/scoreboard" element={<ScoreBoard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </SignedIn>
    <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
    </div>
  );
}

export default App;
