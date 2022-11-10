import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import UsersService from '../../../Services/UsersService';
import { Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UsersActions from './UsersActions';
import { useFormik } from 'formik';
import { registerSchema } from '../../schemas/register';
import UsersDelete from './UsersDelete';


const AdminUsers = () => {
  const [rowId, setRowId] = useState(null);
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleted, setDelted] = useState(0)


  const onSubmit = async () => {
        UsersService.createUser(values)
        .then((response) => {
            console.log(response.data)
        })
    };

    const { values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
        name: "",
        surname: "",
        login: "",
        password: "",
        email: "",
        city: "",
        zipCode: "",
        street: "",
    },
    validationSchema: registerSchema,
    onSubmit
    });

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
    { field: 'name', headerName: 'Imie', width: 200, editable: true, },
    { field: 'surname', headerName: 'Nazwisko', width: 200, editable: true, },
    { field: 'login', headerName: 'Login', width: 200 },
    { field: 'password', headerName: 'Hasło', width: 200, editable: true, },
    { field: 'email', headerName: 'Email', width: 350 },
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
    <>
    <div className='d-flex justify-content-end mt-5'><AddCircleIcon type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" sx={{width: 40, height: 40}}/></div>
      <div onClick={() => setDelted(prev=>prev+1)} className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{overflowY: 'auto', height: '700px'}}>
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Dodawanie nowego użytkownika</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-outline mb-4">
                  <div className='form-group'>
                  <label className="form-label" htmlFor="signUpName">Imię</label>
                  <input type="text"
                  className={`form-control ${errors.name && touched.name ? "invalid" : ""}`}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="name"
                  placeholder='Podaj swoje imię'
                  />
                  {errors.name && touched.name &&
                          <small className="text-danger">{errors.name}</small>
                  }
                  </div>
              </div>

              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="signUpSurname">Nazwisko</label>
              <input type="text"
                  className={`form-control ${errors.surname && touched.surname ? "invalid" : ""}`}
                  value={values.surname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="surname"
                  placeholder='Podaj swoje nazwisko'
                  />
                  {errors.surname && touched.surname &&
                          <small className="text-danger">{errors.surname}</small>
                  }
              </div>

              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="signUpLogin">Login</label>
              <input type="text"
                  className={`form-control ${errors.login && touched.login ? "invalid" : ""}`}
                  value={values.login}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="login"
                  id="login"
                  placeholder='Podaj login'
                  />
                  {errors.login && touched.login &&
                          <small name="login" className="text-danger">{errors.login}</small>
                  }
              </div>

              <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="signUpPassword">Hasło</label>
                  <input type="password"
                  className={`form-control ${errors.password && touched.password ? "invalid" : ""}`}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="password"
                  placeholder='Podaj hasło'
                  />
                  {errors.password && touched.password &&
                          <small className="text-danger">{errors.password}</small>
                  }
              </div>

              <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="signUpMail">E-mail</label>
                  <input type="email"
                  className={`form-control ${errors.email && touched.email ? "invalid" : ""}`}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="email"
                  name="email"
                  placeholder='Podaj e-mail'
                  />
                  {errors.email && touched.email &&
                          <small name="email" className="text-danger">{errors.email}</small>
                  }
              </div>

              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="signUpCity">Miasto</label>
              <input type="text"
                  className={`form-control ${errors.city && touched.city ? "invalid" : ""}`}
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="city"
                  placeholder='Podaj miasto'
                  />
                  {errors.city && touched.city &&
                          <small className="text-danger">{errors.city}</small>
                  }
              </div>

              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="signUpStreet">Ulica</label>
              <input type="text"
                  className={`form-control ${errors.street && touched.street ? "invalid" : ""}`}
                  value={values.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="street"
                  placeholder='Podaj ulicę'
                  />
                  {errors.street && touched.street &&
                          <small className="text-danger">{errors.street}</small>
                  }
              </div>

              <div className="form-outline mb-4">
              <label className="form-label" htmlFor="signUpZipCode">Kod pocztowy</label>
              <input type="text"
                  className={`form-control ${errors.zipCode && touched.zipCode ? "invalid" : ""}`}
                  value={values.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="zipCode"
                  placeholder='Podaj kod pocztowy'
                  />
                  {errors.zipCode && touched.zipCode &&
                          <small className="text-danger">{errors.zipCode}</small>
                  }
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={() => {setDelted(prev=>prev+1)}} className="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
              <button type="submit" onClick={() => {setDelted(prev=>prev+1)}} className="btn btn-dark">Dodaj użytkownika</button>
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
          </>
  )
}

export default AdminUsers