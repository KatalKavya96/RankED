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
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import { UserProvider } from './components/UserContext.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import PublicDashboard from './components/PublicDashboard.jsx'



function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/physics" element={<ProtectedRoutes><PhysicsQ /></ProtectedRoutes>} />
          <Route path="/chemistry" element={<ProtectedRoutes><ChemistryQ /></ProtectedRoutes>} />
          <Route path="/maths" element={<ProtectedRoutes><MathsQ /></ProtectedRoutes>} />
          <Route path="/physics/:chapter" element={<ProtectedRoutes><ChapterQuestions /></ProtectedRoutes>} />
          <Route path="/chemistry/:chapter" element={<ProtectedRoutes><ChapterQuestions /></ProtectedRoutes>} />
          <Route path="/maths/:chapter" element={<ProtectedRoutes><ChapterQuestions /></ProtectedRoutes>} />
          <Route path="/profile" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
          <Route path="/user/:username" element={<PublicDashboard />} />

        </Routes>
      </Router>
    </UserProvider>

    

  );
}

export default App
