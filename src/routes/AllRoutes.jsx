import React from 'react'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import PageNotFound from '../pages/PageNotFound'
import HomePage from '../pages/HomePage'
import { Route ,Routes } from 'react-router'
const AllRoutes = () => {
  return (
   <Routes  >
    <Route path='/'  element={<LoginPage/>}/>
    <Route path='/signup' element={<SignUpPage/>}/>
    <Route path ="*" element ={<PageNotFound/>}/>
    <Route/>
   </Routes>
 
  )
}

export default AllRoutes