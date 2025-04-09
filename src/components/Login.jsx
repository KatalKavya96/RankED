import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in as:", userCred.user);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google User:", result.user);
      // ✅ You can now POST user info to MongoDB if needed
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
    <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-24">
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border" />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">Log In</button>
    </form>
    <button
        type="button"
        onClick={handleGoogleLogin}
        className="bg-red-500 text-white p-2 rounded mt-2"
        >
        Sign in with Google
    </button>

    <p className="text-sm text-center mt-2">
        Don't have an account? <a href="/signup" className="text-blue-500 underline">Sign up</a>
    </p>
  </>
  );
};

export default Login;
