import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PageNotFound } from './components/PageNotFound'
import { Password } from './components/Password'
import { Profile } from './components/Profile'
import { Recovery } from './components/Recovery'
import { Register } from './components/Register'
import { Reset } from './components/Reset'
import { UserName } from './components/UserName'

const router = createBrowserRouter([

    {
        path:'/',
        element:<UserName/>
    },
    {
        path:'/Register',
        element:<Register/>
    },
    {
        path:'/Password',
        element:<Password/>
    },
    {
        path:'/Profile',
        element:<Profile/>
    },
    {
        path:'/Recovery',
        element:<Recovery/>
    },
    {
        path:'/Reset',
        element:<Reset/>
    },
    {
        path:'/PageNotFound',
        element:<PageNotFound/>
    }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}></RouterProvider>
);