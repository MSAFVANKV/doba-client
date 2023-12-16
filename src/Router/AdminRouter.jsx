import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Dashboard from '../Pages/AdminSide/Dashboard'
import AdminLogin from '../Pages/AdminSide/AdminLogin'
import SpecialDay from '../Pages/AdminSide/SpecialDay'
import { adminbaseURL } from '../Base/Constent'
import SignUp from '../Pages/AdminSide/SignUp'
import Products from '../Pages/AdminSide/Products'
import AdminHeader from '../Components/AdminHeader/AdminHeader'
import { useDispatch } from 'react-redux'
import Footer from '../Components/Footer/Footer'
import Slider from '../Pages/AdminSide/Slider'
import Messages from '../Pages/AdminSide/Messages'
import AdminSideBar from '../Components/AdminHeader/AdminSideBar'
import '../Styles/adminStyle.css'
import '../Components/Header/Header.css';

import {navLinks} from '../Components/AdminHeader/AdminHeader'

import AdminFooter from '../Components/AdminFooter/AdminFooter'

// icons
import { RiMenu2Line } from "react-icons/ri";
import { IoIosArrowForward } from 'react-icons/io'
import SideBar from '../Components/Header/SideBar'
import Sidebaritems from '../Components/AdminHeader/Sidebaritems'
import Error from '../Pages/UserSide/Error'
import ForgetPass from '../Components/Passwords/ForgetPass'
import ResetPass from '../Components/Passwords/ResetPass'


function AdminRouter() {
  const dispatch = useDispatch()

    const [isAdminLogin, setIsAdminLoggedIn] =useState(false);
    const [isSideBar,setSideBar] = useState(false);
    const [open, setOpen] = useState(false)
    const [toggle, setToggle] = useState(false);
    const [openToggle, setOpenToggle] = useState(false);


    const toggleSidebar = () => {
      setToggle(!toggle);
    };
    const openSideBar = () => {
      setSideBar(!isSideBar)
    }

    const handleAdminSignup = () => {
        setIsAdminLoggedIn(true);
        
    };

    const handleAdminLoginSuccess = () => {
        setIsAdminLoggedIn(true);
    };

    useEffect(() => {
            axios.get(`${adminbaseURL}/check-auth`, { withCredentials:true })
            .then(res => {
                if (res.data.isAuthenticated) {
                    setIsAdminLoggedIn(true)
                }
            })
    },[])

    
  const handleLogout = async () => {
    try {
        await axios.get(`${adminbaseURL}/logout`, { withCredentials: true });
        dispatch(setIsAdminLoggedIn(false))
    } catch (error) {
        console.error("Error during logout:", error);
    }
};

  return (
    <div> 
      <div className="flex ">
      {/* { isAdminLogin && <AdminHeader onLogout={handleLogout}/>} */}
      {/* <div className="sm:block hidden">
      { isAdminLogin && isSideBar && <AdminSideBar onLogout={handleLogout}/>}
      </div> */}
      {/* <div className={`  relative ${isSideBar ?'ps-[220px] transition-all duration-300' : 'ms-0'}`}>
        {isAdminLogin && <button className=' fixed sm:block hidden p-5' onClick={openSideBar}><RiMenu2Line className='text-[1.5rem]'/> </button>} */}
{isAdminLogin && (
  <>
    <div className={` ${open ? 'w-72 ' : 'sm:w-20 w-0'} duration-300 sm:p-4  z-50  pt-8 bg-blue-600 sm:h-auto h-full sm:relative fixed `}>
      <IoIosArrowForward
        className={`fixed sm:absolute cursor-pointer top-9 text-[1.75rem] border sm:-right-3  rounded-full duration-300 border-blue-600 ${open && 'rotate-180 -right-0'}`}
        onClick={() => setOpen(!open)}
      />
      <AdminSideBar onLogout={handleLogout} setOpen={setOpen} open={open} />
    </div>

    {/* <div className="sm:hidden block">
      <div
        id='toggle'
        className={`bgtheme flex sm:hidden ${toggle ? 'active' : ''}`}
        onClick={toggleSidebar}
      ></div>

      {toggle && 
        <div className={`${toggle ? 'w-[300px]' : 'w-0'} duration-300 h-[100%] bg-black z-50 absolute right-0 top-0`}>
          <Sidebaritems items={navLinks} closeToggle={() => setToggle(false)} />
        </div>
      }
    </div> */}
    {/* <div className={` ${openToggle ? 'w-72' : 'w-0'} duration-300  z-50  pt-8 bg-blue-600 absolute `}>
      <IoIosArrowForward
        className={`absolute cursor-pointer -right-3 top-9 text-[1.75rem] border rounded-full duration-300 border-blue-600 ${openToggle && 'rotate-180'}`}
        onClick={() => setOpenToggle(!openToggle)}
      />
      <AdminSideBar onLogout={handleLogout} openToggle={openToggle} />
    </div> */}
  </>
)}


   <div className="flex-1">
   <Routes>
        <Route path='/admin' element={isAdminLogin ?<Navigate to="/admin/dashboard" /> : <AdminLogin onAdminLoginSuccess={handleAdminLoginSuccess}/>} />
        {/* <Route path="/admin/signup" element={<SignUp adminSignup={handleAdminSignup} />} /> */}
        <Route path='/admin/dashboard'element={ isAdminLogin ?<Dashboard setIsAdminLoggedIn={setIsAdminLoggedIn}/> : <Navigate to={'/admin'}/>} />
        <Route path='/admin/specialday' element={isAdminLogin ?<SpecialDay/>: <Navigate to={'/admin'}/>} />
        <Route path='/admin/products' element={isAdminLogin ?<Products/>: <Navigate to={'/admin'}/>} />
        <Route path='/admin/slider' element={isAdminLogin ?<Slider/>: <Navigate to={'/admin'}/>} />
        <Route path='/admin/messages' element={isAdminLogin ?<Messages/>: <Navigate to={'/admin'}/>} />
        <Route path='/admin/forgot-password' element={isAdminLogin ?<ForgetPass/> : <Navigate to={'/admin'}/>}/>
        <Route path='/admin/reset-password/:id/:token' element={<ResetPass/> }/>

        <Route path='/*' element={<Error/> }/>

        {/* <Route path='/admin/crop' element={isAdminLogin ?<Crop/>: <Navigate to={'/admin'}/>} /> */}


    </Routes>

    {/* { isAdminLogin && <AdminFooter onLogout={handleLogout}/>} */}
   </div>
    {/* </div> */}
    </div>
    </div>
  )
}

export default AdminRouter