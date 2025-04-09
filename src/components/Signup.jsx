import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCred.user);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
    <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-24">
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
    </form>
    <p className="text-sm text-center mt-2">
        Already have an account? <a href="/login" className="text-blue-500 underline">Log in</a>
    </p>
    </>
  
  );
};

export default Signup;
