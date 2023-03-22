import React, { useState } from 'react'
import { useFormik } from 'formik'
import Toast, { Toaster } from 'react-hot-toast'
import { passwordValidate } from '../helper/validate'
import { resetPassword } from '../helper/helper'
import styles from '../styles/Username.module.css'
import { useAuthStore } from '../store/store'

export const Reset = () => {

  const [inputType, setInputType] = useState("password")
  const { username } = useAuthStore(state => state.auth)

    const formik = useFormik({
        initialValues:{
            password:"",
            cpassword:""
        },
        validate:passwordValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit : async values => {
            const resetPromise  = resetPassword({username, password:values.password})
            Toast.promise(resetPromise, {
              loading:'Updating...',
              success: <b>Password Updated Successfully</b>,
              error: <b>Error</b>
            })

            resetPromise.then(res => {
              console.log(res.data)
            })
          }
    })

    const changeInputType = () => {
      if(inputType === "password"){
      setInputType("text")
      } else {
        setInputType("password")
      }
    }

  return (
    <div className="w-fit mx-auto">

        <Toaster position='top-center' ></Toaster>

      <div className="my-6 mx-3">
        <div className={styles.glass}>

        <div className="title flex flex-col items-center">
          <h4 className="text-5xl font-bold">Reset</h4>
          <div className="py-4 text-xl text-center text-gray-500">
              Enter new password
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className='py-16'>

          <div className="textbox flex flex-col items-center">
            <input {...formik.getFieldProps('password')} className={styles.textbox} type={inputType} placeholder='Password' />
            <div className='self-start px-10 pt-1 pb-3'>
            <input className='mr-2' onChange={changeInputType} type="checkbox" name="" id="input_type" />
            <label className='text-sm' htmlFor='input_type'>Show password</label>
            </div>
            <input {...formik.getFieldProps('cpassword')} className={styles.textbox} type="password" placeholder='Repeat Password' />
            <button className={`${styles.btn} mt-4`} type="submit">Reset</button>
          </div>

        </form>
         
        </div>
      </div>
    </div>
  )
}
