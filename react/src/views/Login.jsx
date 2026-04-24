import React, { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'  
/*
const Login = ({ setIsLogin }) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if(user && password){
      setIsLogin(true)
      navigate('/profile')
    } else {
      alert("ingresa tus credenciales")
    }
  }

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center"
      height="100vh"
      gap={2}
    >
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Usuario"
        variant="outlined"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        sx={{ backgroundColor: 'white', borderRadius: 1 }}
      />
      <TextField
        label="Contraseña"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ backgroundColor: 'white', borderRadius: 1 }}
      />

      <Button variant="contained" onClick={handleLogin}>
      Iniciar Sesion
      </Button>
    </Box>
  )
}

export default Login
*/

const Login = ({ login }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onsubmit = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      alert('Ingresa tus credenciales')
      return
    }

    const res = await login({
      username,
      password
    })

    if (res?.isLogin) {
      navigate('/profile')
    } else {
      alert('Credenciales incorrectas')
    }
  }

  return ( 
    <>
      <form onSubmit={onsubmit}>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />

        <Button type="submit">Login</Button>
      </form>
    </>
  )
}

export default Login