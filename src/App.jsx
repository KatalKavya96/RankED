import React from 'react'
import Navbar from "./components/Navbar.jsx"
import Physics from './components/Physics.jsx'
import Chemistry from './components/Chemistry.jsx'
import Maths from './components/Maths.jsx'
import PhysicsQ from './components/PhysicsQ.jsx'
import HomePage from './HomePage.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/physics" element={<PhysicsQ />} />
      </Routes>
    </Router>
  );


}
export default App
