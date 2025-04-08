import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import UseSubjectProgress from './UseSubjectProgress';

const Physics = () => {
  const navigate = useNavigate();
  const { solved, total } = UseSubjectProgress("Physics", 5292);

  return (
    <section
      onClick={() => navigate('/physics')}
      className='h-40 w-80 border-1 border-black/35 rounded-xl p-5 border-b-4 border-b-green-400 hover:scale-105 transition duration-180 cursor-pointer shadow-[1px_5px_7px_1px_rgba(0,0,0,0.5)] active:shadow-[1px_2px_3px_1px_rgba(0,0,0,0.5)] bg-white'
    >
      <h1 className='text-2xl font-bold text-black/80 mb-2'>Physics</h1>
      <p className='text-m font-light text-black/80 mt-2'>32 Chapters, {total} Questions</p>
      <div className='mt-4'>
        <ProgressBar solved={solved} total={total} barColor="bg-green-400" />
      </div>
    </section>
  );
};

export default Physics;
