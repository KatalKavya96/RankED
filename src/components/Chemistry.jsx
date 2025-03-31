import React from 'react'
import { useNavigate } from 'react-router-dom';

const Chemistry = () => {
    const navigate = useNavigate();
  return (
    <>
        <section onClick={() => navigate('/chemistry')} className='h-40 w-80 border-2 border-black/45 m-10 rounded-xl p-5 border-b-3 border-b-[rgba(255,115,0,0.7)] hover:scale-105 transition duration-180 cursor-pointer shadow-[3px_7px_7px_2px_rgba(0,0,0,0.5)] active:shadow-[1px_3px_5px_1px_rgba(0,0,0,0.5)]'>

            <h1 className='text-2xl font-bold text-black/80 mb-2'>Chemistry</h1>
            <p className='text-m font-light text-black/80 mt-2'>33 Chapters, 5280 Questions</p>
            
        </section>
    </>
  )
}

export default Chemistry