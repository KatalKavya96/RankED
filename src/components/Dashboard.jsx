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
      <div className='absolute top-32 left-25'><ProfileCard/></div>
      <div className='absolute bottom-11 right-25'>
        <div className="mt-20 h-162 p-4 flex flex-col justify-center items-center">
            <h1 className="text-white text-2xl font-bold mb-6">Your Dashboard</h1>
            <div className='ml-[25vw] w-240 flex justify-around items-center p-1 gap-2'>
                <SolvedStats/>
                <SolvedStats/>
                
            </div>
            <div className='ml-[25vw] w-240 h-57 flex justify-center items-center p-1'><Heatmap /></div>
        </div>
      </div>
        <div className='fixed top-20 right-5'><ResetButton/></div>
    </>
  );
};

export default Dashboard;
