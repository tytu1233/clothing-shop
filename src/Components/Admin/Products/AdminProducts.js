import React, { useState, useEffect } from 'react'
import ProductsService from '../../../Services/ProductsService';
import Loader from '../../Loader';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import ProductsUpdate from './ProductsUpdate';
import ProductsDelete from './ProductsDelete';
import { Pagination } from '@mui/material';

const AdminProducts = () => {

    const [rowId, setRowId] = useState(null);
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleted, setDelted] = useState(0)
    const [pagination, setPagination] = useState([])
    const [page, setPage] = useState(0);

    const handleChange = (e, p) => {
        setPage(p-1)
    }
  
    const loadProducts = async () => {
        const res = await ProductsService.getAll(page);
        setProducts(res.data.content)
        console.log(res.data)
        setPagination(res.data)
        setLoading(false)
    }
  
  
  
    const columns = [
      { field: 'id', headerName: 'ID', width: 0 },
      { field: 'name', headerName: 'Nazwa', width: 200, editable: true, },
      { field: 'brand', headerName: 'Producent', width: 200, editable: true },
      { field: 'description', headerName: 'Opis', width: 350, editable: true},
      { field: 'price', headerName: 'Cena', width: 200, editable: true },
      { field: 'image', headerName: 'Zdjęcie', width: 200, editable: true },
      {
        field: 'actions',
        headerName: 'Zmień',
        type: 'actions',
        renderCell: (params) => (
          <ProductsUpdate {...{ params, rowId, setRowId }} />
        ),
      },
      {
        field: 'actionsDelete',
        headerName: 'Usuń',
        type: 'actions',
        renderCell: (params) => {
          return (
            <span onClick={() => setDelted(prev=>prev+1)}><ProductsDelete {...{ params, rowId, setRowId }}/></span>
          )
        },
      }
      
    ];
  
  
    useEffect(() => {
        loadProducts();
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
      marginTop: '30px'
    }}
  >
    <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid 
            rows={products} columns={columns} 
            getRowId={(products) => products?.id}
            rowsPerPageOptions={[12, 12]}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
            onCellEditCommit={(params) => {setRowId(params?.id);}}
            components={{
                Footer: () => <div className='d-flex justify-content-center'>
                <Pagination count={pagination.totalPages} page={page+1} onChange={handleChange}></Pagination>
            </div>,
            }}
          />

        </div>
    </div>
  </Box>
  )
}

export default AdminProducts