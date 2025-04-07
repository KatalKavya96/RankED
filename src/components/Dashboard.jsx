import React from 'react';
import Navbar from './Navbar';
import Heatmap from './Heatmap';
import SolvedStats from './SolvedStats.jsx';
import ResetButton from './ResetButton.jsx';
import ProfileCard from './ProfileCard.jsx';

const Dashboard = () => {
  return (
    <>
      <Navbar />

      <div className="flex flex-col lg:flex-row gap-6 px-4 mt-35 w-full max-w-[1350px] mx-auto border border-white py-10">

        <div className="w-full lg:w-1/3 flex justify-center">
          <ProfileCard />
        </div>

        <div className="w-full lg:w-2/3 flex flex-col items-center">
          <h1 className="text-white text-2xl font-bold mb-6">Your Dashboard</h1>

          <div className="w-full flex flex-wrap justify-center gap-4 mb-6">
            <SolvedStats />
            <SolvedStats />
          </div>

          <div className="w-full flex justify-center items-center">
            <Heatmap />
          </div>
        </div>
      </div>

      
      <div className="fixed top-20 right-5">
        <ResetButton />
      </div>
    </>
  );
};

export default Dashboard;
