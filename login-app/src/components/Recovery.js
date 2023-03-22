import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Toast, { Toaster } from 'react-hot-toast'
import { verifyOTP } from '../helper/helper'
import { useAuthStore } from '../store/store'
import styles from '../styles/Username.module.css'

export const Recovery = () => {  

  const navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth)

  const [code, setCode] = useState('')

  const verifyOTPFun = (e) => {
    e.preventDefault()
    const VerifyPromise = verifyOTP({username, code})
    // Toast.promise(VerifyPromise, {
    //   loading :"Checking...",
    //   success : <b>Verified</b>,
    //   error : <b>Wrong OTP</b>
    // })
    
      VerifyPromise.then(res => {
        navigate('/Reset')
      })
  }

  return (
    <div className="mx-auto w-fit">

        <Toaster position='top-center' ></Toaster>

      <div className="p-6">
        <div className={styles.glass}>

        <div className="title flex flex-col items-center">
          <h4 className="text-5xl font-bold">Recovery</h4>
          <div className="py-4 w-2/3 text-xl text-center text-gray-500">
              Enter OTP to recover password
          </div>
        </div>

        <form className='py-20'>

          <div className="textbox flex flex-col items-center gap-6">

            <div className="input text-center">
            <span className="text-sm text-gray-500 px-3">
              Enter 6 digit OTP sent to your email address
            </span>
            <input onChange={(e) => setCode(e.target.value)} className={styles.textbox} type="text" placeholder='OTP' />
            </div>
            <button onClick={verifyOTPFun} className={styles.btn}>Sign In</button>
          </div>

          <div className="text-center py-4">
            <span className='text-gray-500' >Can't get OTP? <button className='text-red-500'>Resend</button></span>
          </div>

        </form>
         
        </div>
      </div>
    </div>
  )
}
