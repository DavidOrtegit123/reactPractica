import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './views/Login'
import Profile from './views/Profile'
import Users from './views/Users'
import ResponsiveAppBar from './components/AppBar'
import { useEffect, useState } from 'react'

const API_URL = "http://localhost:8000" //  sin espacio

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')

    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsLogin(true)
    }
  }, [])

  const login = async (user) => {
    try {
      const res = await fetch(API_URL + "/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      })
  
      const data = await res.json()
  
      if (res.ok) {
        setIsLogin(true)
        setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        return { isLogin: true, user: data.user }
      } else {
        return { isLogin: false }
      }
  
    } catch (error) {
      return { isLogin: false }
    }
  }
  return (
    <BrowserRouter>

      {isLogin && <ResponsiveAppBar />}

      <Routes>

        <Route path='/login' element={<Login login={login} />} />

        <Route 
          path='/profile' 
          element={isLogin ? <Profile user={user} /> : <Navigate to="/login" />} 
        />

        <Route 
          path='/users' 
          element={isLogin ? <Users apiUrl={API_URL} /> : <Navigate to="/login" />} 
        />

        <Route path='*' element={<Navigate to="/login" />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App
