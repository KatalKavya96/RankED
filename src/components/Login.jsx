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
      <form onSubmit={handleLogin} className="flex flex-col gap-7 h-[350px] w-full max-w-sm mx-auto mt-28 border border-black/50 p-5 rounded-2xl shadow-xl">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded-lg shadow-sm mt-8" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border rounded-lg shadow-sm" />
        <div className='flex  justify-center'><button type="submit" className="w-[25%] bg-green-500 text-white p-1 rounded-lg shadow-lg">Log In</button></div>
        <button type="button" onClick={handleGoogleLogin} className="bg-white border border-black/45 text-black p-1 rounded-xl mt-2 flex items-center justify-center gap-2 cursor-pointer hover:scale-100 transition duration-180 shadow-lg"><img className='' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAzFBMVEVHcEz////////+/v77+/vx8fL9/f309fX+/v739/f////09PXOz8/5+vr8/P3////////29vf///////84qlf8wAdGiPX8/PzsUUTqQjQsqFLrSj3S3/w6g/TqPCs0gPQgpUf85+bv9P+63sL62Nb+8ef4ycbw+PJkunkeePP81HXwgGv0jhzc5/3o9efX7N5Fr19Uj/WQy562zPr2trL94KDzoJrzoJv80Gjyl5H94qgyh9v7xzihsSp+wYV1sE5ZtXBmmvUynoWKrvzKDGT6AAAAE3RSTlMAW+TTeBLcHLMt1WsKzfUznkBIxSDAuAAAAUZJREFUKJFtktligkAMRUFZxKVuDMOAggpu1apVu+/t//9TkxBU1PsySQ4hlyGadpTd0fWOrV2R3eqyWhe80j1RpYCc7pmcI2tyaZimQw6bOTMplU9hpKIofJSUmgwtTCYq9EFhqKIJ5lbGdGIRAGhUQLNX6wRLOA2Y8vdpuvfVOJtaOjhdhL56yYrjU8cGFsRSLc4/x+DPfxBiSZN6LMlXUYXzVghBT8/7pPkdxFX28yzEO8HYI8U9dlQudMZx3AeInWWe+SrExxrhCLTre3E+M3P7FXznLn887z53a2PwGbjBLLvUP2jcYUC/FYdOA9d1g22SbN1fbizT9bUxXA+QguB4G2GlfbIFqw1i0GCzKmzDDQ1LZgPQLKHk5rAJpmSj0ykH0jxArW4V79yqF1bMkEckjYvFrTWIy0btApFsx7m68Ff1D4OdMHbngtKsAAAAAElFTkSuQmCC'></img>Sign in with Google</button>

      </form>

      <p className="text-sm text-center mt-5">
        Don't have an account? <a href="/signup" className="text-blue-500 underline">Sign up</a>
      </p>
    </>
  );
};

export default Login;
