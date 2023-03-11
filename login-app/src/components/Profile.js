import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import avatar from '../asssets/profile.png'
import { useFormik } from 'formik'
import Toast, { Toaster } from 'react-hot-toast'
import { profileValidate } from '../helper/validate'
import convertToBase64 from '../helper/convert';
import styles from '../styles/Username.module.css'
import useFetch from '../hook/fetch.hook'
import { useAuthStore } from '../store/store'
import { updateUser } from '../helper/helper'

export const Profile = () => {

  const navigate = useNavigate()
  const [file, setFile] = useState()
  const { username } = useAuthStore(state => state.auth)

  const [{ isLoading, apiData, serverError }] = useFetch()

    const formik = useFormik({
        initialValues:{
            firstName : apiData?.firstName || "",
            lastName : apiData?.lastName || "",
            email : apiData?.email || "Doyol56239@cnogs.com",
            mobile : apiData?.mobile || "",
            address : apiData?.address || ""
        },
        enableReinitialize : true,
        validate:profileValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit : async values => {
          values = await Object.assign(values, { profile:file || apiData.profile ||  ""})
            console.log(values)
            const updatePromise = updateUser(values)
            
            Toast.promise(updatePromise, {
              loading: "Updating...",
              success : <b>Update Successfully...!</b>,
              error : <b>Could not Update!</b>
            })
          }
    })

    const onUpload = async e => {
      const base64 = await convertToBase64(e.target.files[0])
      setFile(base64)
      console.log(base64)
    }

     // logout handler function
     const userLogout = () => {
       localStorage.removeItem('token')
       navigate('/')
     }

    if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
    if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="w-fit mx-auto">

        <Toaster position='top-center' ></Toaster>

      <div className="p-6">
        <div className={`${styles.glass} w-[350px] md:min-w-[700px]`}>

        <div className="title flex flex-col items-center">
          <h4 className="text-5xl font-bold">Profile</h4>
          <div className="py-4 w-2/3 text-xl text-center text-gray-500">
          You can update the details.
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className='py-1'>
        <div className="profile flex justify-center py-4">
            <label htmlFor="profile">
            <img className={styles.profile_img} src={ apiData?.profile || file || avatar} alt="avatar" />
            </label>
          </div>

          <input className='hidden' onChange={onUpload} type="file" name="profile" id="profile" />

          <div className="textbox gap-6">

            <div className='md:flex gap-x-4 w-[85%] mx-auto'>
            <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} min-w-full md:min-w-[45%] mb-4`} type="text" placeholder='First Name' />
            <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} min-w-full md:min-w-[45%] mb-4`} type="text" placeholder='Last Name' />
            </div>

            <div className='md:flex gap-x-4  w-[85%] mx-auto'>
            <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} min-w-full md:min-w-[45%] mb-4`} type="text" placeholder='Mobile No.' />
            <input {...formik.getFieldProps('email')} className={`${styles.textbox} min-w-full md:min-w-[45%] mb-4`} type="text" placeholder='Email' />
            </div>

            <div className='w-[85%] mx-auto'>
            <input {...formik.getFieldProps('address')} className={`${styles.textbox} min-w-full mb-4`} type="text" placeholder='Address' />
            </div>

            <div className='mx-auto w-[85%]'>
            <button className={`${styles.btn} min-w-full`} type="submit">Update</button>
            </div>
          </div>

          <div className="text-center py-4">
            <span className='text-gray-500' >come back later? <button className='text-red-500 cursor-pointer' onClick={userLogout}>Logout</button></span>
          </div>

        </form>
         
        </div>
      </div>
    </div>
  )
}
