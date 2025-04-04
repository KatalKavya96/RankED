import React from 'react'
import Navbar from "./components/Navbar.jsx"
import Physics from './components/Physics.jsx'
import Chemistry from './components/Chemistry.jsx'
import Maths from './components/Maths.jsx'
import PhysicsQ from './components/PhysicsQ.jsx'
import HomePage from './HomePage.jsx'
import MathsQ from './components/MathsQ.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChemistryQ from './components/ChemistryQ.jsx'
import ChapterQuestions from './components/ChapterQuestions.jsx';
import Heatmap from './components/Heatmap.jsx'
import Dashboard from './components/Dashboard.jsx'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/physics" element={<PhysicsQ />} />
        <Route path="/chemistry" element={<ChemistryQ/>}/>
        <Route path="/maths" element={<MathsQ/>}/>
        <Route path="/physics/:chapter" element={<ChapterQuestions />} />
        <Route path="/chemistry/:chapter" element={<ChapterQuestions />} />
        <Route path="/maths/:chapter" element={<ChapterQuestions />} />
        <Route path="/profile" element={<Dashboard />} />


      </Routes>
    </Router>
    
  );


}
export default App
