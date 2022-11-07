import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
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

const Admin = () => {

    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(true)

    const loadUsers = async () => {
        const res = await UsersService.getAllUsers();
        setUsers(res.data.content)
        console.log(res.data)
        setLoading(false)
    }


    useEffect(() => {
        loadUsers();
    }, [])

    if(loading) {
        return <div>Waiting for data</div>
    }

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid 
        rows={users} columns={columns} 
        getRowId={(users) => users?.id_user}
        checkboxSelection
      />
    </div>
  )
}

export default Admin