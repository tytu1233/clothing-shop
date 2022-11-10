import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import UsersService from '../../../Services/UsersService';
import { Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UsersActions from './UsersActions';
import UsersDelete from './UsersDelete';

const AdminUsers = () => {
  const [rowId, setRowId] = useState(null);
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleted, setDelted] = useState(0)

  const loadUsers = async () => {
      const res = await UsersService.getAllUsers();
      setUsers(res.data.content.map((value)=> {
        value.roles = value.roles.roleName
        return value
     }))
      console.log(users)
      setLoading(false)
  }



  const columns = [
    { field: 'id_user', headerName: 'ID', width: 0 },
    { field: 'name', headerName: 'Imie', width: 100, editable: true, },
    { field: 'surname', headerName: 'Nazwisko', width: 100, editable: true, },
    { field: 'login', headerName: 'Login', width: 100 },
    { field: 'password', headerName: 'Hasło', width: 100, editable: true, },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'roles', 
        headerName: 'Rola',         
        type: 'singleSelect',
        editable: true, 
        width: 150, 
        valueOptions: ['Admin', 'Użytkownik'],
      },
      {
        field: 'actions',
        headerName: 'Zmień',
        type: 'actions',
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId }} />
        ),
      },
      {
        field: 'actionsDelete',
        headerName: 'Usuń',
        type: 'actions',
        renderCell: (params) => {
          return (
            <span onClick={() => setDelted(prev=>prev+1)}><UsersDelete {...{ params, rowId, setRowId }}/></span>
          )
        },
      }
  ];


  useEffect(() => {
    loadUsers();
  }, [deleted])



  if(loading) {
    return <div>Waiting for data</div>
  }
  return (
    <Box
            component="main"
            sx={{
              marginTop: '5%',
              flexGrow: 1,
              height: '90vh',
              overflow: 'auto',
            }}
          >
            <div className='d-flex justify-content-end p-2'><AddCircleIcon sx={{width: 40, height: 40}}/></div>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                  <DataGrid 
                    rows={users} columns={columns} 
                    getRowId={(users) => users?.id_user}
                    
                    rowsPerPageOptions={[5, 10, 20]}
                    getRowSpacing={(params) => ({
                      top: params.isFirstVisible ? 0 : 5,
                      bottom: params.isLastVisible ? 0 : 5,
                    })}
                    onCellEditCommit={(params) => {setRowId(params?.id);}}
                  />
                </div>
            </div>
          </Box>
  )
}

export default AdminUsers