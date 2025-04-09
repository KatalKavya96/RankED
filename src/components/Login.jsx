import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import axios from 'axios';
import { BASE_URL } from "../constants";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const createUserIfNotExists = async (user) => {
    try {
      await axios.post(`${BASE_URL}/api/user/${user.uid}`, {
        uid: user.uid,
        email: user.email
      });
      console.log("✅ User record initialized in MongoDB");
    } catch (err) {
      if (err.response?.status === 400) {
        console.log("ℹ️ User already exists in MongoDB");
      } else {
        console.error("❌ Error creating user in MongoDB", err);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await createUserIfNotExists(result.user);
      navigate('/'); // ✅ redirect after login
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      await createUserIfNotExists(result.user);
      navigate('/'); // ✅ redirect after Google login
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
