import React from 'react'
import useTitle from '../hooks/UseTitle'
const HomePage = () => {
  useTitle("Home Page")
  return (
    <div className='text-4xl font-bold'>Welcome to home page</div>
  )
}

export default HomePage