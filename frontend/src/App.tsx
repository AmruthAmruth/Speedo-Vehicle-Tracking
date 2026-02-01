import { Routes, Route } from 'react-router-dom'
import LandingPage from './features/landing/pages/LandingPage'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Temporary dashboard route - will be replaced with actual dashboard */}
      <Route path="/dashboard" element={<div style={{ padding: '2rem', textAlign: 'center' }}><h1>Dashboard Coming Soon!</h1><p>You are successfully logged in.</p></div>} />
    </Routes>
  )
}

export default App