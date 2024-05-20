import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const DashboardNavigate = () => {
    const {currentUser,isLoading} = useUser()
    const role = currentUser?.role;
    if(isLoading){
        return <div className='flex justify-center items-center h-screen'><PacmanLoader color="#1F26B2" size={50}/></div>
    }


    if(role === "admin") return <Navigate to='/dashboard/admin-home' replace/>
    if(role === "instructor") return <Navigate to='/dashboard/instructor-cp' replace/>
    if(role === "user") return <Navigate to='/dashboard/student-cp' replace/>
  return (
    <div>
      dashboardNavigate
    </div>
  )
}

export default DashboardNavigate
