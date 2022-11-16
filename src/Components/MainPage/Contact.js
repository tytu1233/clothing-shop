import React, { useState } from 'react'
import MailService from '../../Services/MailService'
import Loader from '../Loader'
import { useFormik } from 'formik';
import { contactSchema } from '../schemas/contact';

const Contact = () => {

    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    const onSubmit = async () => {
        setLoading(true)
        MailService.contactUs(values).then((res) => {
            console.log(res.data)
            if(res.data === "wyslano") {
                setSent(true)
            }
        })
        setLoading(false)
  };

const { values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
        name: "",
        email: "",
        message: "",
    },
    validationSchema: contactSchema,
    onSubmit
});




    if(loading) {
        return <Loader/>
    }

  return (
    <div style={{height: '57vh'}} className="container py-5">

  <form id="contactForm" onSubmit={handleSubmit}>

    <div className="mb-3">
      <label className="form-label" htmlFor="name">Tytuł</label>
      <input className={`form-control ${errors.name && touched.name ? "invalid" : ""}`}                             onChange={handleChange}
                            onBlur={handleBlur} id="name" type="text" placeholder="Tytuł" />
      {errors.name && touched.name &&
        <small name="name" className="text-danger">{errors.name}</small>
      }
    </div>

    <div className="mb-3">
      <label className="form-label" htmlFor="email">Adres e-mail</label>
      <input className={`form-control ${errors.email && touched.email ? "invalid" : ""}`}                             onChange={handleChange}
                            onBlur={handleBlur} id="email" type="email" placeholder="Adres e-mail" />
      {errors.email && touched.email &&
        <small name="email" className="text-danger">{errors.email}</small>
      }
    </div>

    <div className="mb-3">
      <label className="form-label" htmlFor="message">Wiadomość</label>
      <textarea className={`form-control ${errors.message && touched.message ? "invalid" : ""}`}                             onChange={handleChange}
                            onBlur={handleBlur} id="message" type="text" placeholder="Wpisz swoją wiadomość" style={{height: '10rem'}}></textarea>
      {errors.message && touched.message &&
        <small name="message" className="text-danger">{errors.message}</small>
      }
    </div>

    <div className="d-grid">
      <button type="submit" className="btn btn-primary btn-dark">Wyślij</button>
    </div>

  </form>
    {sent ? <p style={{color: 'green'}} className='text-center p-4'>Wiadomość została wysłana</p> : null}
</div>
  )
}

export default Contact