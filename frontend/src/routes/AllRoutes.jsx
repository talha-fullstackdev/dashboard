import React from 'react'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import PageNotFound from '../pages/PageNotFound'
import HomePage from '../pages/HomePage'
import { Navigate, Route ,Routes } from 'react-router'
const AllRoutes = () => {
  return (
   <Routes  >
    <Route path='/'  element={<Navigate to="/login"/>}/>
    <Route path='/login'  element={<LoginPage/>}/>
    <Route path='/signup' element={<SignUpPage/>}/>
    <Route path='/home' element={<HomePage/>}/>
    <Route path ="*" element ={<PageNotFound/>}/>
    <Route/>
   </Routes>
 
  )
}

export default AllRoutes