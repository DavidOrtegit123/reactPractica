import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Profile = ({user}) => {
  const navigate = useNavigate()

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Profile
      </Typography>
      <Typography variant="h6">Nombre: {user?.name}</Typography>
      <Typography variant="h6">Usuario: {user?.username}</Typography>
      <Typography variant="body1">Id: {user?._id}</Typography>
      <Button
        variant="contained"
        sx={{ marginTop: 3 }}
        onClick={() => navigate('/users')}
      >
        Ver usuarios
      </Button>
    </Box>
  )
}

export default Profile
