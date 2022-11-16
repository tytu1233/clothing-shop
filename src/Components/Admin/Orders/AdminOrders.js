import React, { useState, useEffect, useRef } from 'react'
import OrdersService from '../../../Services/OrdersService';
import Loader from '../../Loader';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import OrdersDelete from './OrdersDelete';
import OrdersUpdate from './OrdersUpdate';
import { Pagination } from '@mui/material';

const AdminOrders = () => {

    const [rowId, setRowId] = useState(null);
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleted, setDelted] = useState(0)
    const [pagination, setPagination] = useState([])
    const [page, setPage] = useState(0);

    const handleChangea = (e, p) => {
        setPage(p-1)
    }

    const loadOrders = useRef(() => {});

    loadOrders.current = async () => {
      try {
        const res = await OrdersService.getAll(page);
        console.log(res.data)
        setOrders(res.data.content.map((value)=> {
            value.users = value.users.id_user
            return value
          }))
        console.log(res.data)
        setPagination(res.data)
        setLoading(false)
      } catch(err) {
        console.log(err)
      }
  }  

  
    const columns = [
      { field: 'idOrders', headerName: 'ID', width: 0 },
      { field: 'finalPrice', headerName: 'Cena końcowa', width: 200,},
      { field: 'status', 
        headerName: 'Status',
        type:'singleSelect', 
        valueOptions: ['W REALIZACJI', 'WYSŁANO', 'ANULOWANO', 'ZREALIZOWANO'],  
        width: 200, 
        editable: true },
      { field: 'date', headerName: 'Data', width: 150,},
      { 
        field: 'users', 
        headerName: 'ID użytkownika', 
        width: 100, 
      },
      {
        field: 'actions',
        headerName: 'Zmień',
        type: 'actions',
        renderCell: (params) => (
          <OrdersUpdate {...{ params, rowId, setRowId }} />
        ),
      },
      {
        field: 'actionsDelete',
        headerName: 'Usuń',
        type: 'actions',
        renderCell: (params) => {
          return (
            <span onClick={() => setDelted(prev=>prev+1)}><OrdersDelete {...{ params, rowId, setRowId }}/></span>
          )
        },
      }
      
    ];
  
  
    useEffect(() => {
        loadOrders.current()
    }, [deleted, page])
  
    if(loading) {
        return <Loader/>
      }

  return (
    <Box
    component="main"
    sx={{
      flexGrow: 1,
      height: '90vh',
      overflow: 'auto',
    }}
  >
    <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
        <DataGrid 
            rows={orders} columns={columns} 
            getRowId={(orders) => orders?.idOrders}
            rowsPerPageOptions={[12, 12]}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
            onCellEditCommit={(params) => {setRowId(params?.id);}}
            components={{
                Footer: () => <div className='d-flex justify-content-center'>
                <Pagination count={pagination.totalPages} page={page+1} onChange={handleChangea}></Pagination>
            </div>,
            }}
          />

        </div>
    </div>
  </Box>
  )
}

export default AdminOrders