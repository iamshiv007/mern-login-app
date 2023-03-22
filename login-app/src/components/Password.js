import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import avatar from '../asssets/profile.png'
import { useFormik } from 'formik'
import Toast, { Toaster } from 'react-hot-toast'
import { passwordValidate } from '../helper/validate'
import useFetch from '../hook/fetch.hook'
import { useAuthStore } from '../store/store'
import { verifyPassword, generateOTP } from '../helper/helper'
import styles from '../styles/Username.module.css'

export const Password = () => {

  const navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth)

  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)

  const [inputType, setInputType] = useState("password")

    const formik = useFormik({
        initialValues:{
            password:"admin@123"
        },
        validate:passwordValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit : async values => {
            console.log(values)
            let loginPromise = verifyPassword({ username, password : values.password})
            Toast.promise(loginPromise, {
              loading :"Checking...",
              success : <b>Login Successfully...!</b>,
              error : <b>Password not match</b>
            })

            loginPromise.then(res => {
              let { token } = res.data;
              localStorage.setItem('token', token)
              navigate('/Profile')
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

    const recoverFun = () => {
      const RecoverPromise = generateOTP(username)
      Toast.promise(RecoverPromise, {
        loading:"Sending..",
        success:<b>OTP Sent</b>,
        error: <b>OTP not sent</b>
      })

      RecoverPromise.then(res => {
        navigate('/Recovery')
      })
    }

    if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
    if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="mx-auto w-fit">

        <Toaster position='top-center' ></Toaster>

      <div className="p-6">
        <div className={styles.glass}>

        <div className="title flex flex-col items-center">
          <h4 className="text-5xl font-bold text-center">Hello {apiData?.firstName || apiData?.username}</h4>
          <div className="py-4 w-2/3 text-xl text-center text-gray-500">
              Explore More by connecting with us
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className='py-1'>
          <div className="profile flex justify-center py-4">
            <img className={styles.profile_img} src={apiData?.profile || avatar} alt="avatar" />
          </div>

          <div className="textbox flex flex-col items-center">
            <input {...formik.getFieldProps('password')} className={styles.textbox} type={inputType} placeholder='Password' />
            <div className='self-start px-10 pt-1 pb-3'>
            <input className='mr-2' onChange={changeInputType} type="checkbox" name="" id="input_type" />
            <label htmlFor='input_type'>Show password</label>
            </div>
            <button className={styles.btn} type="submit">Sign In</button>
          </div>

          <div className="text-center py-4">
            <span className='text-gray-500' >Forgot Password? <button type="button" className='text-red-500' onClick={recoverFun} >Recover Now</button></span>
          </div>

        </form>
         
        </div>
      </div>
    </div>
  )
}
