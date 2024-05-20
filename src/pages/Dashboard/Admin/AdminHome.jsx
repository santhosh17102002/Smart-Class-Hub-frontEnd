import React, { useEffect, useState } from 'react'
import { useUser } from '../../../hooks/useUser'
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import { Fade } from 'react-awesome-reveal';
import AdminStats from './AdminStats';

const AdminHome = () => {
    const {currentUser} = useUser();
    const axiosFetch = useAxiosFetch();
    const [users,setUsers] = useState([]);

    useEffect(() => {
        
        axiosFetch.get('/users').then((res)=>{
            setUsers(res.data)
            console.log(res.data)
        }).catch((err)=>console.log(err))
    }, []);
  return (
    <div >
      <Fade delay={1e3} cascade damping={1e-1}>
            <h1 className='text-center text-4xl font-bold my-7'>Welcome Back, <span className='text-secondary'>{currentUser?.name}</span></h1>
            <AdminStats users={users} />

        </Fade>
    </div>
  )
}

export default AdminHome
