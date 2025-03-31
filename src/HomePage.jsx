import React from 'react'
import Navbar from "./components/Navbar.jsx"
import Physics from './components/Physics.jsx'
import Chemistry from './components/Chemistry.jsx'
import Maths from './components/Maths.jsx'
import PhysicsQ from './components/PhysicsQ.jsx'

const HomePage = () => {
  return (
    <>
        <Navbar/>
        <section className='w-291 flex justify-center  items-center mt-20 '>
            <Physics/>
            <Chemistry/>
            <Maths/>
        </section>
        <section className='h-[85vh] w-80 fixed top-24 right-3 border bg-black/85 rounded-xl'>

        </section>
    </>
  )
}

export default HomePage