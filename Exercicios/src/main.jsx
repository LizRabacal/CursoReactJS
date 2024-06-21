import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StudentContext } from './contexts/StudentContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StudentContext.Provider>
    <App />

    </StudentContext.Provider>
  </React.StrictMode>,
)
