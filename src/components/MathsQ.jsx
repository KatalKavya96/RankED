import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';

const MathsQ = () => {
    const navigate = useNavigate();
    const chaptersM=[{"name":"Basics of Maths", "ques":17 ,"questions":{}},
        {"name":"Quadritic Equations", "ques":172 ,"questions":{}},
        {"name":"Complex Numbers", "ques":194 ,"questions":{}},
        {"name":"Permutation and Combination", "ques":183 ,"questions":{}},
        {"name":"Sequence and Series", "ques":314 ,"questions":{}},
        {"name":"Binomial Theoram", "ques":242 ,"questions":{}},
        {"name":"Trignometic Ratios & Identities", "ques":54 ,"questions":{}},
        {"name":"Straight Lines", "ques":193 ,"questions":{}},
        {"name":"Circle", "ques":180 ,"questions":{}},
        {"name":"Parabola", "ques":127 ,"questions":{}},
        {"name":"Ellipse", "ques":104 ,"questions":{}},
        {"name":"Hyperbola", "ques":90 ,"questions":{}},
        {"name":"Limits", "ques":131 ,"questions":{}},
        {"name":"Statistics", "ques":144 ,"questions":{}},
        {"name":"Sets & Relations", "ques":100 ,"questions":{}},
        {"name":"Matrices", "ques":188 ,"questions":{}},
        {"name":"Determinants", "ques":183 ,"questions":{}},
        {"name":"Inverse Trignometric Functions", "ques":75 ,"questions":{}},
        {"name":"Functions", "ques":194 ,"questions":{}},
        {"name":"Continuity and Differentiability", "ques":138 ,"questions":{}},
        {"name":"Differentiation", "ques":70 ,"questions":{}},
        {"name":"Applications of Derivatives", "ques":263 ,"questions":{}},
        {"name":"Indefinite Integration", "ques":96 ,"questions":{}},
        {"name":"Definite Integration", "ques":275 ,"questions":{}},
        {"name":"Area Under Curves", "ques":159 ,"questions":{}},
        {"name":"Differential Equations", "ques":227 ,"questions":{}},
        {"name":"Vector Algebra", "ques":272 ,"questions":{}},
        {"name":"3D-Geometry", "ques":369 ,"questions":{}},
        {"name":"Probablity", "ques":217 ,"questions":{}},
    ]
  return (
    <>
        <Navbar/>
        <section className='mt-35'>
            {chaptersM.map((ele)=><div onClick={() => navigate(`/maths/${encodeURIComponent(ele.name)}`)} className='h-20 w-[50vw] border-r-4 border-r-blue-500 border-2 border-black/60 mt-12 ml-[11vw] rounded-lg p-2 hover:scale-102 transition duration-100 bg-white active:scale-103 cursor-pointer'>
                <h1 className='text-lg font-medium'>{ele.name}</h1>
                <p className='text-xs'>{ele.ques} <span>Qs</span></p>
            </div>)}
            <div className='h-30 w-85 border-2 border-black/60 fixed top-35 right-25 rounded-lg p-2 bg-white'>
                <h1 className='text-3xl font-medium'>Mathematics</h1>
                <p className='text-lg font-light'>36 Chapters, 5253 Questions</p>
            </div>
        </section>
    </>
  )
}

export default MathsQ