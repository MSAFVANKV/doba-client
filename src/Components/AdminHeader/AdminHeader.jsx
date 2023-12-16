import React, { useState } from 'react'
import '../Header/Header.css';
import { NavLink, Link } from 'react-router-dom';

// imported images
import logo from '../images/doba_logo.png';
import { AiFillHome } from 'react-icons/ai';
import HeaderItems from '../Header/HeaderItems';
import SideBar from '../Header/SideBar';
import { adminbaseURL } from '../../Base/Constent';
import { logoutAdmin } from '../../ReduxToolKit/Admin/AdminLoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import AdHeaderItem from './AdHeaderItem';

export const navLinks = [
  {
    id: 1,
    path: '/admin/dashboard',
    display: 'DASHBOARD',
    icon: AiFillHome,
  },
  {
    id: 2,
    path: '/admin/products',
    display: 'PRODUCTS',
  },
  {
    id: 3,
    path: '/admin/specialday',
    display: 'BANNER',
  },
  {
    id: 4,
    path: '/admin/slider',
    display: 'SLIDER',
  },
  {
    id: 4,
    path: '/admin/messages',
    display: 'MESSAGES',
  },
];

function AdminHeader({onLogout}) {
  const dispatch = useDispatch();
  const [logoutError, setLogoutError] = useState(null);
  const [toggle, setToggle] = useState(false);
  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);


  const toggleSidebar = () => {
    setToggle(!toggle);
  };
//   const handleLogout = async () => {
//     try {
//         await dispatch(logoutAdmin());
//         // Clear any previous logout errors
//         setLogoutError(null);
//     } catch (error) {
//         // Handle logout error
//         setLogoutError("Logout failed. Please try again.");
//     }
// };

  return (
    <>
      <header className='bg-white h-[100px] sticky_header sm:hidden '>
        <div className='flex justify-between items-center'>
          {/* logo start==================== */}
          <div className='logo p-1 ms-9'>
            <img src={logo} alt='' />
          </div>
          {/* log end==================== */}
          {/* Menu sart================== */}
          <div className='hidden sm:flex'>
            <ul className='flex gap-5 items-center'>
              {navLinks.map((items, index) => (
                <AdHeaderItem items={items} Icon={items.icon} index={index} />
              ))}
            </ul>
          </div>
          <div className=''>
           <button className="btn hidden sm:flex" onClick={onLogout}>LOGOUT</button>

            {logoutError && <p className="error">{logoutError}</p>}
          </div>
        
        </div>
      </header>
      <div className="">
      <div
          id='toggle'
          className={`bgtheme flex sm:hidden ${toggle ? 'active' : ''}`}
          onClick={toggleSidebar}
        ></div>
          
          {toggle && <SideBar items={navLinks} closeToggle={() => setToggle(false)} />}

         
          </div>
    </>
  )
}

export default AdminHeader