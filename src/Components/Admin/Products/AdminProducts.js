import React, { useState, useEffect, useRef } from 'react'
import ProductsService from '../../../Services/ProductsService';
import Loader from '../../Loader';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import ProductsUpdate from './ProductsUpdate';
import ProductsDelete from './ProductsDelete';
import { useFormik } from 'formik';
import { productsSchema } from '../../schemas/products';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Pagination } from '@mui/material';
import CategoriesService from '../../../Services/CategoriesService';

const AdminProducts = () => {

    const [rowId, setRowId] = useState(null);
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)
    const [deleted, setDelted] = useState(0)
    const [pagination, setPagination] = useState([])
    const [page, setPage] = useState(0);

    const handleChangea = (e, p) => {
        setPage(p-1)
    }

    const loadData = useRef(() => {});
    loadData.current = async () => {
      const [productsResponse, categoriesResponse] = await Promise.all([
        ProductsService.getAll(page),
        CategoriesService.getAllCategories()
      ])
      const pro = productsResponse;
      const cat = categoriesResponse;
      return [pro, cat]
      /*
        try {
          setLoading(true)
          const res = await ProductsService.getAll(page);
          setProducts(res.data.content.map((value)=> {
            value.categories = value.categories.categoryName
            return value
          }))
          const response = await CategoriesService.getAllCategories()
          setCategories(response.data.content)
          console.log(response.data.content)
          //console.log(res.data)
          setPagination(res.data)
          setLoading(false)
        } catch(err) {
          console.log(err)
        }
        */
    }
  
    const onSubmit = async () => {
      console.log(values)
      ProductsService.creteProducts(values)
      .then((response) => {
          console.log(response.data)
      })
  };

    const { values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
      initialValues: {
          name: "",
          brand: "",
          description: "",
          price: "",
          image: "",
          category: "Marynarka",
      },
      validationSchema: productsSchema,
      onSubmit
      });
  
    const columns = [
      { field: 'id', headerName: 'ID', width: 0 },
      { field: 'name', headerName: 'Nazwa', width: 200, editable: true, },
      { field: 'brand', headerName: 'Producent', width: 200, editable: true },
      { field: 'description', headerName: 'Opis', width: 550, editable: true},
      { field: 'price', headerName: 'Cena', width: 140, editable: true },
      { field: 'image', headerName: 'Zdjęcie',  width: 300, editable: true },
      { 
        field: 'categories', 
        headerName: 'Kategoria', 
        type:'singleSelect', 
        valueOptions: ['Marynarka', 'Kurtka', 'Koszula', 'Spodnie', 'T-shirt', 'Bluza', 'Sweter'], 
        width: 100, 
        editable: true },
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
      setLoading(true)
        loadData.current().then(([pro, cat]) => {
          setProducts(pro.data.content.map((value)=> {
            value.categories = value.categories.categoryName
            return value
          }))
          setPagination(pro.data)
          console.log(cat)
          setCategories(cat.data.content)
          setLoading(false)
        }).catch(error => {
          console.log(error)
        });
    }, [deleted, page])
  
    if(loading) {
        return <Loader/>
      }

  return (
    <>
    <div className='d-flex justify-content-end'><AddCircleIcon type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" sx={{width: 40, height: 40}}/></div>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{overflowY: 'auto', height: '700px'}}>
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Dodawanie nowego produktu</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-outline mb-4">
                  <div className='form-group'>
                  <label className="form-label" htmlFor="signUpName">Nazwa</label>
                  <input type="text"
                  className={`form-control ${errors.name && touched.name ? "invalid" : ""}`}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="name"
                  placeholder='Podaj nazwę'
                  />
                  {errors.name && touched.name &&
                          <small className="text-danger">{errors.name}</small>
                  }
                  </div>
              </div>

              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="signUpBrand">Producent</label>
              <input type="text"
                  className={`form-control ${errors.brand && touched.brand ? "invalid" : ""}`}
                  value={values.brand}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="brand"
                  placeholder='Podaj producenta'
                  />
                  {errors.brand && touched.brand &&
                          <small className="text-danger">{errors.brand}</small>
                  }
              </div>

              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="signUpDescription">Opis</label>
              <input type="text"
                  className={`form-control ${errors.description && touched.description ? "invalid" : ""}`}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="description"
                  id="description"
                  placeholder='Podaj opis'
                  />
                  {errors.description && touched.description &&
                          <small name="login" className="text-danger">{errors.description}</small>
                  }
              </div>

              <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="signUpPrice">Cena</label>
                  <input type="text"
                  className={`form-control ${errors.price && touched.price ? "invalid" : ""}`}
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="price"
                  placeholder='Podaj cenę'
                  />
                  {errors.price && touched.price &&
                          <small className="text-danger">{errors.price}</small>
                  }
              </div>

              <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="signUpImage">Zdjęcie</label>
                  <input type="text"
                  className={`form-control ${errors.image && touched.image ? "invalid" : ""}`}
                  value={values.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="image"
                  name="image"
                  placeholder='Podaj nazwę pliku ze zdjęciem'
                  />
                  {errors.image && touched.image &&
                          <small name="image" className="text-danger">{errors.image}</small>
                  }
              </div>

              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="signUpCategory">Kategoria</label>
                    <select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="category"
                    name="category"
                    value={values.category || "Marynarka"}
                    className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                    {categories.map((category) => {
                        return (
                          <>
                            <option key={category.idCategory}
                          >{category.categoryName}</option>
                        </>
                        )
                        })}
                    </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={() => {setDelted(prev=>prev+1)}} className="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
              <button type="submit" onClick={() => {setDelted(prev=>prev+1)}} className="btn btn-dark" data-bs-dismiss="modal">Dodaj produkt</button>
            </div>
            </form>
          </div>
        </div>
      </div>
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
                <Pagination count={pagination.totalPages} page={page+1} onChange={handleChangea}></Pagination>
            </div>,
            }}
          />

        </div>
    </div>
  </Box>
  </>
  )
}

export default AdminProducts