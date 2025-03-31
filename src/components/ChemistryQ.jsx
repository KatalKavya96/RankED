import React from 'react'
import Navbar from './Navbar'

const ChemistryQ = () => {
    const chaptersC=[{"name":"Basic Concepts of Chemistry", "ques":180 ,"questions":{}},
        {"name":"Structure and Atom", "ques":215 ,"questions":{}},
        {"name":"Classification of Elements and Periodicity in Properties", "ques":157 ,"questions":{}},
        {"name":"Chemical Bonding and Molecular Structure", "ques":280 ,"questions":{}},
        {"name":"Thermodynamics", "ques":227 ,"questions":{}},
        {"name":"Chemical Equilibrium", "ques":106 ,"questions":{}},
        {"name":"Ionic Equilibrium", "ques":134 ,"questions":{}},
        {"name":"Redox Reactions", "ques":98 ,"questions":{}},
        {"name":"p-Block Elements (Group 13 & 14)", "ques":84 ,"questions":{}},
        {"name":"General Organic Chemistry", "ques":390 ,"questions":{}},
        {"name":"Hydrocarbons", "ques":203 ,"questions":{}},
        {"name":"Solutions", "ques":193 ,"questions":{}},
        {"name":"Electrochemistry", "ques":204 ,"questions":{}},
        {"name":"Chemical Kinetics", "ques":193 ,"questions":{}},
        {"name":"p-Block Elements (Group 15, 16, 17 & 18)", "ques":180 ,"questions":{}},
        {"name":"d and f Block Elements", "ques":224 ,"questions":{}},
        {"name":"Coordination Compounds", "ques":319 ,"questions":{}},
        {"name":"Haloalkanes and Haloarenes", "ques":170 ,"questions":{}},
        {"name":"Alcohols, Phenols and Ethers", "ques":175 ,"questions":{}},
        {"name":"Aldehydes and Ketones", "ques":148 ,"questions":{}},
        {"name":"Carboxylic Acids Derivatives", "ques":67 ,"questions":{}},
        {"name":"Amines", "ques":180 ,"questions":{}},
        {"name":"Biomolecules", "ques":183 ,"questions":{}},
        {"name":"Practical Chemistry", "ques":32 ,"questions":{}},
    ]
  return (
    <>
        <Navbar/>
        <section className='mt-35'>
            {chaptersC.map((ele)=><div className='h-20 w-[50vw] border-r-4 border-r-orange-500 border-2 border-black/60 mt-12 ml-[11vw] rounded-lg p-2 hover:scale-102 transition duration-100 bg-white active:scale-103 cursor-pointer'>
                <h1 className='text-lg font-medium'>{ele.name}</h1>
                <p className='text-xs'>{ele.ques} <span>Qs</span></p>
            </div>)}
            <div className='h-30 w-85 border-2 border-black/60 fixed top-35 right-25 rounded-lg p-2 bg-white'>
                <h1 className='text-3xl font-medium'>Chemistry</h1>
                <p className='text-lg font-light'>33 Chapters, 5280 Questions</p>
            </div>
        </section>
    </>
  )
}

export default ChemistryQ