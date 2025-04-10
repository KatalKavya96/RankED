import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import Navbar from './Navbar';
import Heatmap from './Heatmap';
import SolvedStats from './SolvedStats.jsx';
import ProfileCard from './ProfileCard.jsx';

const PublicUserDashboard = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/user/by-username/${username}`);
        console.log("Fetched Profile:", res.data); // 🔍 log profile
        setProfile(res.data);
      } catch (err) {
        setMessage('User not found');
      }
    };
    fetchProfile();
  }, [username]);

  if (!profile) return <div className="text-center mt-10">{message || 'Loading...'}</div>;

  const difficultyBreakdown = ['Easy', 'Medium', 'Hard'].map(level => {
    const levelQs = profile.allQuestions?.filter(q => q.difficulty === level) || [];
    const solved = levelQs.filter(q => profile.solvedQuestions.includes(q._id)).length;
    return {
      level,
      solved,
      total: level === 'Easy' ? 50 : level === 'Medium' ? 30 : 20
    };
  });

  console.log("Difficulty Breakdown:", difficultyBreakdown); // 🔍 check breakdown

  return (
    <>
      <Navbar />
      <div className="flex flex-col xl:flex-row px-4 mt-32 gap-6 w-full max-w-[1400px] mx-auto">
        <div className="w-full xl:w-1/3">
          <ProfileCard externalData={profile} />
        </div>

        <div className="w-full xl:w-2/3 flex flex-col items-center">
          <div className="w-full flex flex-wrap justify-center gap-4 mb-6">
            <SolvedStats
              totalSolved={profile?.solvedQuestions?.length || 0}
              totalSubmissions={profile?.submissionLog ? Object.values(profile.submissionLog).reduce((a, b) => a + b, 0) : 0}
              correctSubmissions={profile?.correctSubmissions || 0}
              difficultyBreakdown={difficultyBreakdown}
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <Heatmap data={profile?.submissionLog} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicUserDashboard;