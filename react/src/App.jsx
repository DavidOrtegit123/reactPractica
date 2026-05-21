import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './views/Login'
import Profile from './views/Profile'
import Users from './views/Users'
import ResponsiveAppBar from './components/AppBar'
import { useEffect, useState } from 'react'

//const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"
const API_URL = "https://davidapi.up.railway.app"

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token') 

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
      setIsLogin(true)
    }
  }, [])

  const login = async (userCredentials) => {
    try {
      const res = await fetch(API_URL + "/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
      })
  
      const data = await res.json()
  
      if (res.ok && data.login) {
        setIsLogin(true)
        setUser(data.user)
                localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token) 
        
        return { isLogin: true, user: data.user }
      } else {
        return { isLogin: false }
      }
  
    } catch (error) {
      console.error("Error en el login del front:", error)
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