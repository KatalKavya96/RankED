import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { subDays, format, eachDayOfInterval } from 'date-fns';

const PublicUserDashboard = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/user/by-username/${username}`);
        setProfile(res.data);
      } catch (err) {
        setMessage('User not found');
      }
    };
    fetchProfile();
  }, [username]);

  if (!profile) return <div className="text-center mt-10">{message || 'Loading...'}</div>;

  const totalSolved = profile?.solvedQuestions?.length || 0;
  const totalSubmissions = profile?.submissionLog ? Object.values(profile.submissionLog).reduce((sum, val) => sum + val, 0) : 0;
  const correctSubmissions = profile?.correctSubmissions || 0;
  const accuracy = totalSubmissions ? Math.round((correctSubmissions / totalSubmissions) * 100) : 0;
  const followers = profile?.followers?.length || 0;
  const following = profile?.following?.length || 0;

  const heatmapData = () => {
    const submissionLog = profile?.submissionLog || {};
    const today = new Date();
    const start = subDays(today, 179);
    const allDays = eachDayOfInterval({ start, end: today });
    return allDays.map(date => {
      const key = format(date, 'yyyy-MM-dd');
      return {
        date: key,
        count: submissionLog[key] || 0
      };
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-20 bg-white border border-black/25 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-2">@{username}'s Dashboard</h1>
      <p className="text-sm text-center text-gray-500 mb-4">{profile.email}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-black/80">
          <p><strong>Location:</strong> {profile.location}</p>
          <p><strong>College:</strong> {profile.college}</p>
          <p><strong>Followers:</strong> {followers}</p>
          <p><strong>Following:</strong> {following}</p>
        </div>
        <div className="text-black/80">
          <p><strong>Solved:</strong> {totalSolved}</p>
          <p><strong>Submissions:</strong> {totalSubmissions}</p>
          <p><strong>Accuracy:</strong> {accuracy}%</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-2 text-center">Activity Heatmap</h2>
      <CalendarHeatmap
        startDate={subDays(new Date(), 179)}
        endDate={new Date()}
        values={heatmapData()}
        classForValue={(val) => {
          if (!val || val.count === 0) return 'color-empty';
          if (val.count === 1) return 'color-scale-1';
          if (val.count === 2) return 'color-scale-2';
          if (val.count === 3) return 'color-scale-3';
          return 'color-scale-4';
        }}
        showWeekdayLabels
      />
    </div>
  );
};

export default PublicUserDashboard;
