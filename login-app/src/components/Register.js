import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import avatar from '../asssets/profile.png'
import { useFormik } from 'formik'
import Toast, { Toaster } from 'react-hot-toast'
import { registerValidate } from '../helper/validate'
import convertToBase64 from '../helper/convert'
import { registerUser } from '../helper/helper'

import styles from '../styles/Username.module.css'

export const Register = () => {

  const [file, setFile] = useState()

    const formik = useFormik({
        initialValues:{
          email:"doyol56239@cnogs.com",
          username:"example123",
          password:"admin@123"
        },
        validate:registerValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit : async values => {
          values = await Object.assign(values, {profile:file || ""})
          let registerPromise = registerUser(values)
          Toast.promise(registerPromise, {
            loading: "Creating...",
            success : <b>Register Successfully...!</b>,
            error : <b>Could not</b>
          })
            console.log(values)
          }
    })

    const onUpload = async e => {
      const base64 = await convertToBase64(e.target.files[0])
      setFile(base64)
      console.log(base64)
    }

  return (
    <div className="mx-auto w-fit">

        <Toaster position='top-center' ></Toaster>

      <div className="p-6">
        <div className={styles.glass}>

        <div className="title flex flex-col items-center">
          <h4 className="text-5xl font-bold">Register</h4>
          <span className="py-4 text-xl text-center text-gray-500">
              Happy to join you!
          </span>
        </div>

        <form onSubmit={formik.handleSubmit} className='py-1'>
          <div className="profile flex justify-center py-4">
            <label htmlFor="profile">
            <img className={styles.profile_img} src={file || avatar} alt="avatar" />
            </label>
          </div>

          <input className='hidden' onChange={onUpload} type="file" name="profile" id="profile" />

          <div className="textbox flex flex-col items-center gap-6">
            <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email' />
            <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
            <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Password' />
            <button className={styles.btn} type="submit">Let's go</button>
          </div>

          <div className="text-center py-4">
            <span className='text-gray-500' >Already Register? <NavLink className='text-red-500' to='/'>Login Now</NavLink></span>
          </div>

        </form>
         
        </div>
      </div>
    </div>
  )
}
