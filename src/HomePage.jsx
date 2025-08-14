import React from 'react'
import Navbar from "./components/Navbar.jsx"
import Physics from './components/Physics.jsx'
import Chemistry from './components/Chemistry.jsx'
import Maths from './components/Maths.jsx'
import PhysicsQ from './components/PhysicsQ.jsx'
import Exams from './components/Exams.jsx'
import Planner from "./components/PlannerSection/Planner.jsx"

const examsList=[{"exam":"JEE Main", "img":"https://app-assets.cdn.examgoal.net/fly/@width/image/exam-icons/in/jee/jee-main.png", "altt" : "JEE Main"},
  {"exam":"JEE Advanced", "img":"https://app-assets.cdn.examgoal.net/fly/@width/image/exam-icons/in/jee/jee-advanced.png"},
  {"exam":"BITSAT", "img":"https://app-assets.cdn.examgoal.net/fly/@width/image/exam-icons/in/jee/bitsat.png"},
  {"exam":"VITEEE", "img":"https://app-assets.cdn.examgoal.net/fly/@width/image/assets/5ef25410-97bb-4621-853a-755d0bbaac4d/348328b0-eb61-11ee-831d-6530431f76f8/6y3zli1lu89xfp8.png"},
  {"exam":"NEET", "img":"https://app-assets.cdn.examgoal.net/fly/@width/image/exam-icons/in/jee/jee-main.png"},
  {"exam":"AIIMS", "img":"https://app-assets.cdn.examgoal.net/fly/@width/image/assets/5ca40f45-b700-4f46-9b8f-83745abac08c/fc927a90-6799-11ef-8b22-651b64eb4256/jaoe38c1m0i5qvui.png"},
  {"exam":"NDA", "img":"https://app-assets.cdn.examgoal.net/fly/@width/image/assets/624092ec-6f87-4440-9fac-93c921e8668e/c68613a0-1bde-11ef-ba88-abbdc110e2a5/6y3zli1lwog7v8b.png"},
  {"exam":"Class 12 CBSE", "img":"https://app-assets.cdn.examgoal.net/fly/@width/image/exam-icons/cbse.png"},
  {"exam":"NSAT", "img":"https://i.postimg.cc/MXJKrCNP/nstlogo.png"},
  
]

const HomePage = () => {
  return (
    <>
        <Navbar/>
        <div className='h-[100vh] flex justify-around mt-35'>
          <div className='flex flex-col items-center '>
            <section className='w-280 h-60 flex justify-center items-start gap-15 flex-wrap  -mb-10'>
                <Physics/>
                <Chemistry/>
                <Maths/>
                
            </section>
            <section className='flex itmes-center justify-center flex-wrap gap-5 w-280 '>
              <h1 className='text-m font-medium text-black'>Examinations</h1>
              <div className='w-280 flex flex-wrap gap-5 items-center justify-around'>
                {examsList.map((ele)=>{return  <Exams  name={ele.exam} url={ele.img}/>})}
              </div>
            </section>
          </div>
          <section className='h-[75.8vh] w-[280px] min-w-[270px]  border border-black/45 bg-white rounded-xl shadow-[1px_3px_3px_1px_rgba(0,0,0,0.5)] flex justify-center'>

            <div className='h-[25%] w-[92%] border border-black/45 rounded-xl p-2 m-2'>Take Daily Challenge</div>
          

          </section>
          
        </div>
        
    </>
  )
}

export default HomePage