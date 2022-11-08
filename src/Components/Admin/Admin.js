import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Dashboard from './Dashboard';
import UsersService from '../../Services/UsersService';

const columns = [
    { field: 'id_user', headerName: 'User ID', width: 150 },
    { field: 'name', headerName: 'Imie', width: 150 },
    { field: 'surname', headerName: 'Nazwisko', width: 150 },
    { field: 'login', headerName: 'Login', width: 150 },
    { field: 'password', headerName: 'Hasło', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'roles', headerName: 'Rola', width: 150, valueFormatter: ({ value }) => value.role_name}
];

const Admin = ({ setSelectedLink, link }) => {

    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(true)

    const loadUsers = async () => {
        const res = await UsersService.getAllUsers();
        setUsers(res.data.content)
        console.log(res.data)
        setLoading(false)
    }


    useEffect(() => {
        //loadUsers();
    }, [])



  return (
    <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
  )
}

export default Admin