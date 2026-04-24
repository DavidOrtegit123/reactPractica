import React, { useEffect, useState } from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'

const Users = ({ apiUrl }) => {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: ''
  })

  const getUsers = async () => {
    const res = await fetch(apiUrl + '/users')
    const data = await res.json()
    setUsers(data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const addUser = async (e) => {
    e.preventDefault()

    if (!form.name || !form.username || !form.password) {
      alert('Completa todos los campos')
      return
    }

    const res = await fetch(apiUrl + '/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (res.ok) {
      setForm({
        name: '',
        username: '',
        password: ''
      })
      getUsers()
    }
  }

  const deleteUser = async (id) => {
    const res = await fetch(apiUrl + '/users/' + id, {
      method: 'DELETE'
    })

    if (res.ok) {
      getUsers()
    }
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Usuarios
      </Typography>

      <Box
        component="form"
        onSubmit={addUser}
        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 4 }}
      >
        <TextField
          label="Nombre"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          label="Usuario"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">
          Agregar
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gap: 2 }}>
        {users.map((user) => (
          <Paper
            key={user._id}
            sx={{
              padding: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box>
              <Typography variant="h6">{user.name}</Typography>
              <Typography>Usuario: {user.username}</Typography>
            </Box>

            <Button color="error" variant="outlined" onClick={() => deleteUser(user._id)}>
              Eliminar
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  )
}

export default Users
