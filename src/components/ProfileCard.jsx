import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/UserContext';
import axios from 'axios';
import { BASE_URL } from '../constants';

const ProfileCard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [location, setLocation] = useState('');
  const [college, setCollege] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [username, setUsername] = useState('');
  const [lastChanged, setLastChanged] = useState(null);

  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) return;
      try {
        const res = await axios.get(`${BASE_URL}/api/user/${user.uid}`);
        const data = res.data;
        setUsername(data.username || '');
        setLocation(data.location || '');
        setCollege(data.college || '');
        setLinkedin(data.linkedin || '');
        setLastChanged(data.usernameLastChanged);
      } catch (err) {
        console.error("❌ Error fetching profile", err);
      }
    };
    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.patch(`${BASE_URL}/api/user/${user.uid}`, {
        location,
        college,
        linkedin
      });
      setIsEditing(false);
    } catch (err) {
      console.error("❌ Failed to save profile", err);
    }
  };

  const canChangeUsername = () => {
    if (!lastChanged) return true;
    const last = new Date(lastChanged);
    const now = new Date();
    return (now - last) / (1000 * 60 * 60 * 24) > 30;
  };

  const handleUsernameChange = async () => {
    const newUsername = prompt("Enter new username:");
    if (!newUsername) return;
    if (!canChangeUsername()) {
      alert("You can only change your username once every 30 days.");
      return;
    }
    try {
      await axios.patch(`${BASE_URL}/api/user/${user.uid}`, {
        username: newUsername,
        usernameLastChanged: new Date().toISOString()
      });
      setUsername(newUsername);
      setLastChanged(new Date().toISOString());
    } catch (err) {
      alert("❌ Username already taken or failed to update.");
      console.error(err);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user/by-username/${searchInput}`);
      navigate(`/user/${searchInput}`);
    } catch (err) {
      alert("User not found.");
      setSearchResult(null);
    }
  };

  return (
    <div className='w-full h-fit max-w-xs bg-white rounded-xl p-4 mx-auto md:mx-0 border border-black/25 shadow-xl'>
      <div className='flex items-center justify-between p-2 my-5'>
        <img
          src={user?.photoURL || 'https://i.postimg.cc/SKfhtdnJ/avatar-placeholder.png'}
          alt="Profile"
          className='w-20 h-20 bg-blue-600/15 border border-blue-300 rounded-xl object-cover'
        />
        <div>
          <h1 className='text-black/80'>{user?.displayName || 'No Name'}</h1>
        </div>
      </div>

      <h1 className='text-black/75 text-m'>@{username}</h1>
      {isEditing && (
        <button
          onClick={handleUsernameChange}
          className="text-xs text-blue-500 underline"
        >
          Change Username
        </button>
      )}

      <button
        onClick={() => setIsEditing(!isEditing)}
        className='border text-blue-600 border-blue-300 flex justify-center items-center bg-blue-600/15 rounded-xl my-5 p-2 w-full'
      >
        {isEditing ? 'Cancel' : 'Edit Profile'}
      </button>

      <div className='flex flex-col justify-center gap-4 mx-2'>
        {isEditing ? (
          <>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="border p-1 rounded"
            />
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="College"
              className="border p-1 rounded"
            />
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="LinkedIn URL"
              className="border p-1 rounded"
            />
            <button
              onClick={handleSave}
              className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h1 className='text-black/75 text-m'>{location}</h1>
            <h1 className='text-black/75 text-m'>{college}</h1>
            <h1 className='text-black/75 text-m'>{user?.email || 'No Email'}</h1>
            <div className='flex items-center gap-36'>
              <h1 className='flex items-center justify-center text-black/75 text-m'>
                <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </h1>
              <button
                onClick={handleLogout}
                className="w-20 h-7 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 flex justify-center items-center"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mt-6">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by username"
          className="p-2 border rounded w-full mb-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 w-full"
        >
          Search
        </button>

        {searchResult && (
          <div className="mt-4 border-t pt-3 text-sm text-black/80">
            <p><strong>@{searchResult.username}</strong></p>
            <p>Email: {searchResult.email}</p>
            <p>College: {searchResult.college}</p>
            <p>Location: {searchResult.location}</p>
            <a href={searchResult.linkedin} className="text-blue-500" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;