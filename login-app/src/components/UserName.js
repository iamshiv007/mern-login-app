import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import avatar from '../asssets/profile.png'
import { useFormik } from 'formik'
import { Toaster } from 'react-hot-toast'
import { usernameValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'

import styles from '../styles/Username.module.css'

export const UserName = () => {


  const navigate = useNavigate()
  const setUsername = useAuthStore(state => state.setUsername)

    const formik = useFormik({
        initialValues:{
            username:"example123"
        },
        validate:usernameValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit : async values => {
          setUsername(values.username)
          navigate('/password')
          }
    })

  return (
    <div className="w-fit mx-auto">

        <Toaster position='top-center' ></Toaster>

      <div className="p-6">
        <div className={styles.glass}>

        <div className="title flex flex-col items-center">
          <h4 className="text-5xl font-bold">Hello again!</h4>
          <div className="py-4 w-2/3 text-xl text-center text-gray-500">
              Explore More by connecting with us
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className='py-1'>
          <div className="profile flex justify-center py-4">
            <img className={styles.profile_img} src={avatar} alt="avatar" />
          </div>

          <div className="textbox flex flex-col items-center gap-6">
            <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
            <button className={styles.btn} type="submit">Let's go</button>
          </div>

          <div className="text-center py-4">
            <span className='text-gray-500' >Not a Member? <NavLink className='text-red-500' to='/register'>Register Now</NavLink></span>
          </div>

        </form>
         
        </div>
      </div>
    </div>
  )
}
