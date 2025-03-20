import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import PageNotFound from '../pages/PageNotFound'
import HomePage from '../pages/HomePage'
import DashboardPage from '../pages/DashboardPage'
import TasksPage from '../pages/TasksPage'
import AttendancePage from '../pages/AttendancePage'
import ProgressPage from '../pages/ProgressPage'
import { Navigate, Route, Routes } from 'react-router'
import PropTypes from 'prop-types'

// Protected Route component to check for authentication
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

const AllRoutes = () => {
  return (
   <Routes>
    <Route path='/' element={<Navigate to="/login"/>} />
    <Route path='/login' element={<LoginPage/>} />
    <Route path='/signup' element={<SignUpPage/>} />
    <Route path='/home' element={
      <ProtectedRoute>
        <HomePage/>
      </ProtectedRoute>
    } />
    
    {/* Dashboard Routes */}
    <Route path='/dashboard' element={
      <ProtectedRoute>
        <DashboardPage/>
      </ProtectedRoute>
    } />
    <Route path='/dashboard/tasks' element={
      <ProtectedRoute>
        <TasksPage/>
      </ProtectedRoute>
    } />
    <Route path='/dashboard/attendance' element={
      <ProtectedRoute>
        <AttendancePage/>
      </ProtectedRoute>
    } />
    <Route path='/dashboard/progress' element={
      <ProtectedRoute>
        <ProgressPage/>
      </ProtectedRoute>
    } />
    
    <Route path="*" element={<PageNotFound/>} />
   </Routes>
  )
}

export default AllRoutes