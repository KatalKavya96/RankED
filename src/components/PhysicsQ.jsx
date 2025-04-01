import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';

const PhysicsQ = () => {
    const navigate = useNavigate();
    const chaptersP=[{"name":"Mathematics in Physics", "ques":116 ,"questions":{}},
        {"name":"Units and Dimensions", "ques":119 ,"questions":{}},
        {"name":"Motion in One Dimensions", "ques":161 ,"questions":{}},
        {"name":"Motion in Two Dimensions", "ques":113 ,"questions":{}},
        {"name":"Laws of Motion", "ques":186 ,"questions":{}},
        {"name":"Work,Power and Energy", "ques":116 ,"questions":{}},
        {"name":"Centre of Mass, Momentum and Collision", "ques":121 ,"questions":{}},
        {"name":"Rotational Motion", "ques":234 ,"questions":{}},
        {"name":"Gravitation", "ques":205 ,"questions":{}},
        {"name":"Mechanical Properties of Solids", "ques":95 ,"questions":{}},
        {"name":"Mechanical Properties of Fluids", "ques":163 ,"questions":{}},
        {"name":"Thermal Properties of Matter", "ques":125 ,"questions":{}},
        {"name":"Thermodynamics", "ques":199 ,"questions":{}},
        {"name":"Kinetic Theory of Gases", "ques":151 ,"questions":{}},
        {"name":"Oscillations", "ques":172 ,"questions":{}},
        {"name":"Waves and Sounds", "ques":161 ,"questions":{}},
        {"name":"Electrostatics", "ques":260 ,"questions":{}},
        {"name":"Capacitance", "ques":157 ,"questions":{}},
        {"name":"Current Electricity", "ques":365 ,"questions":{}},
        {"name":"Magnetic Properties of Matter", "ques":73 ,"questions":{}},
        {"name":"Magnetic Effects of Current", "ques":248 ,"questions":{}},
        {"name":"Electromagnetic Induction", "ques":131 ,"questions":{}},
        {"name":"Alternating Current", "ques":177 ,"questions":{}},
        {"name":"Electromagnetic Waves", "ques":142 ,"questions":{}},
        {"name":"Ray Optics", "ques":247 ,"questions":{}},
        {"name":"Wave Optics", "ques":155 ,"questions":{}},
        {"name":"Dual Nature of Matter", "ques":183 ,"questions":{}},
        {"name":"Atomic Physics", "ques":138 ,"questions":{}},
        {"name":"Nuclear Physics", "ques":146 ,"questions":{}},
        {"name":"Semiconductors", "ques":219 ,"questions":{}},
        {"name":"Experimental Physics", "ques":62 ,"questions":{}},
        
    ]
  return (
    <>
        <Navbar/>
        <section className='mt-35'>
            {chaptersP.map((ele)=><div onClick={() => navigate(`/physics/${encodeURIComponent(ele.name)}`)} className='h-20 w-[50vw] border-r-4 border-r-green-600 border-2 border-black/60 mt-12 ml-[11vw] rounded-lg p-2 hover:scale-102 transition duration-100 bg-white active:scale-103 cursor-pointer'>
                <h1 className='text-lg font-medium'>{ele.name}</h1>
                <p className='text-xs'>{ele.ques} <span>Qs</span></p>
            </div>)}
            <div className='h-30 w-85 border-2 border-black/60 fixed top-35 right-25 rounded-lg p-2 bg-white'>
                <h1 className='text-3xl font-medium'>Physics</h1>
                <p className='text-lg font-light'>32 Chapters, 5292 Questions</p>
            </div>
        </section>
    </>
  )
}

export default PhysicsQ