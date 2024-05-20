import React, { useState } from 'react'
import {PacmanLoader} from "react-spinners"
import { useAuth } from '../hooks/useAuth';
import { useUser } from '../hooks/useUser';
import { BiHomeAlt, BiLogInCircle, BiSelectMultiple } from "react-icons/bi";
import { MdExplore, MdOfflineBolt, MdPayments, MdPendingActions } from "react-icons/md";
import { GiFigurehead } from "react-icons/gi";
import { FaHome, FaUsers } from "react-icons/fa";
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { IoSchoolSharp } from "react-icons/io5";
import { IoMdDoneAll } from "react-icons/io";
import { BsFillPostcardFill } from 'react-icons/bs';
import { SiGoogleclassroom, SiInstructure } from 'react-icons/si';
//import { MdExplore } from 'react-icons/md';
import { TbBrandAppleArcade } from 'react-icons/tb';
import Scroll from '../hooks/useScroll';
const adminNavItems = [
    {
        to:"/dashboard/admin-home", 
        icon: <BiHomeAlt className='text-2xl'/>,
        label : "Dashboard Home"
    },
    {
        to:"/dashboard/manage-users", 
        icon: <FaUsers className='text-2xl'/>,
        label : "Manage Users"
    },
    {
        to:"/dashboard/manage-class", 
        icon: <BsFillPostcardFill className='text-2xl'/>,
        label : "Manage Class"
    },
    {
        to:"/dashboard/manage-applications", 
        icon: <TbBrandAppleArcade className='text-2xl'/>,
        label : "Applications"
    }

]

const lastMenuItems = [
    { 
        to: "/", 
    icon: <BiHomeAlt 
    className="text-2xl" />,
     label: "Main Home" 
    },
    // { to: "/browse", icon: <MdExplore className="text-2xl" />, label: "Browse" },
    {
         to: "/trending",
     icon: <MdOfflineBolt 
     className="text-2xl" />, 
     label: "Trending"
     },
    { 
        to: "/browse", 
    icon: <GiFigurehead 
    className="text-2xl" />, 
    label: "Following" 
    },
];

const instructorNavItem = [
    { 
        to: "/dashboard/instructor-cp", 
    icon: <FaHome className="text-2xl" />, 
    label: "Home"
 },
    { 
        to: "/dashboard/add-class", 
    icon: <MdExplore 
    className="text-2xl" />, 
    label: "Add A class"
     },
    { 
        to: "/dashboard/my-classes",
     icon: <IoSchoolSharp className="text-2xl" />, 
     label: "My Classes" 
        },
    { 
        to: "/dashboard/my-pending", 
    icon: <MdPendingActions 
    className="text-2xl" />, 
    label: "Pending Classes"
     },
    { 
        to: "/dashboard/my-approved", 
    icon: <IoMdDoneAll 
    className="text-2xl" />,
     label: "Approved Classes" 
    },
];
const students = [
    {
         to: "/dashboard/student-cp", 
    icon: <BiHomeAlt 
    className="text-2xl" />, 
    label: "Dashboard" 
    },
    { 
        to: "/dashboard/enrolled-class", 
    icon: <SiGoogleclassroom 
    className="text-2xl" />, 
    label: "My Enroll" 
    },
    {
         to: "/dashboard/my-selected", 
    icon: <BiSelectMultiple 
    className="text-2xl" />, 
    label: "My Selected Cart" 
    },
    {
         to: "/dashboard/my-payments", 
    icon: <MdPayments 
    className="text-2xl" />, 
    label: "Payment History" 
    },
    {
         to: "/dashboard/apply-instructor",
     icon: <SiInstructure 
     className="text-2xl" />, 
     label: "Apply for Instructor" 
    },
];

const DashboardLayout = () => {
    const [open,setOpen] = useState(true);
    const {loader,logout} = useAuth();
    const {currentUser} = useUser();
    const navigate = useNavigate();
    var role = currentUser?.role;
    
    //const role = "student"

    const handleLogOut = ()=>{
        
        
        {/*from sweet alert 2 implementing logout */}
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, LogOut me!"
          }).then((result) => {
            if (result.isConfirmed) {
            logout().then(
                Swal.fire({
                    title: "Logged Out!",
                    text: "You are logged out.",
                    icon: "success"
                  })
                  

            ).catch((err)=>{
                Swal.fire(
                    'Error!',err.message,"error"
                )
            });
              
            }
            navigate('/')
          });
    }
    if(loader){
        return <div className='flex justify-center items-center h-screen'><PacmanLoader color="#1F26B2" size={50}/></div>
    }
  return (
    <div className='flex'>
        <div className={`${open ? "w-72 overflow-y-auto" : "w-[90px] overflow-auto"} relative bg-gray-600 h-screen p-5 md:block hidden pt-8  duration-300`}>
            <div className='flex gap-x-1  items-center'>
                <img onClick={()=> setOpen(!open)} src='/laptop-logo.png' className={`cursor-pointer h-[40px] duration-500 ${open && "rotate-[360deg]"}`}/>
                <Link to='/'>
                <h1 onClick={()=> setOpen(!open)} className={`text-white cursor-pointer font-bold origin-left text-xl duration-200 ${!open && "scale-0"}`}>Smart Class Hub</h1>
            
                </Link>
                </div>
            {/*Navlinks */}
            {/*admin roles */}
            {
                role === "admin" && ( <ul className='pt-6'>
                    <p className={`ml-3 text-white ${!open && "hidden"}`}><small>Menu</small></p>
                    {
                        role === "admin" && adminNavItems.map((menuItem,index)=> (
                            <li key={index} className='mb-2'>
                                
                                <NavLink to={menuItem.to}
                                className={({ isActive }) =>
                                            `flex ${isActive ? "bg-red-500 text-white " : "text-white"
                                            }  duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-gray-500  font-bold text-sm items-center gap-x-4  `
                                        }>{menuItem.icon}
                                <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span></NavLink>
                            </li>
                        ))
                    }
                </ul>
            )}
            {/*instructor roles */}
            {
                role === "instructor" && ( <ul className='pt-6'>
                    <p className={`ml-3 text-white ${!open && "hidden"}`}><small>Menu</small></p>
                    {
                        role === "instructor" && instructorNavItem.map((menuItem,index)=> (
                            <li key={index} className='mb-2'>

                                <NavLink to={menuItem.to}
                                className={({ isActive }) =>
                                            `flex ${isActive ? "bg-red-500 text-white " : "text-white"
                                            }  duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-gray-500  font-bold text-sm items-center gap-x-4  `
                                        }>{menuItem.icon}
                                <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span></NavLink>
                            </li>
                        ))
                    }
                </ul>
            )}


            {/*student roles */}
            {
                role === "user" && ( <ul className='pt-6'>
                    <p className={`ml-3 text-white ${!open && "hidden"}`}><small>Menu</small></p>
                    {
                        role === "user" && students.map((menuItem,index)=> (
                            <li key={index} className='mb-2'>

                                <NavLink to={menuItem.to}
                                className={({ isActive }) =>
                                            `flex ${isActive ? "bg-red-500 text-white " : "text-white"
                                            }  duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-gray-500  font-bold text-sm items-center gap-x-4  `
                                        }>{menuItem.icon}
                                <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span></NavLink>
                            </li>
                        ))
                    }
                </ul>
            )}

            {/*useful links */}
            <ul className='mt-8 pt-6'>
                <p className={`ml-3 text-white mb-3 ${!open && "hidden"}`}><small>UseFul Links</small></p>
                {
                    lastMenuItems.map((menuItem,index)=> (
                            <li key={index} className='mb-2'>

                                <NavLink to={menuItem.to}
                                className={({ isActive }) =>
                                            `flex ${isActive ? "bg-red-500 text-white " : "text-white"
                                            }  duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-gray-500  font-bold text-sm items-center gap-x-4  `
                                        }>{menuItem.icon}
                                <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span></NavLink>
                            </li>
                        ))
                    }

                    <li>
                    <NavLink 
                            onClick={()=> handleLogOut()}
                                className='flex text-white  duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-gray-500  font-bold text-sm items-center gap-x-4  `
                                        '>
                                        <BiLogInCircle className='text-2xl'/>
                                <span className={`${!open && "hidden"} origin-left duration-200`}>Logout</span></NavLink>
                    </li>
            </ul>
        </div>
        <div className='h-screen overflow-y-auto px-8 flex-1'>
            <Scroll/>
            <Outlet/>
        </div>
    </div>
  )
}

export default DashboardLayout
