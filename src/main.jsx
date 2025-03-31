import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import HomePage from './HomePage.jsx'

createRoot(document.getElementById('root')).render(
  
    <App />
  
)
