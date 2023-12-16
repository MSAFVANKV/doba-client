import React, { useState } from 'react';
import '../Header/Header.css';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import HeaderItems from '../Header/HeaderItems';
import SideBar from '../Header/SideBar';
import '../Header/Header.css';


// imported images
import logo from '../images/doba_logo.png';
import dashboard from '../../../assets/images/dashboard.png';
import slider from '../../../assets/images/slider.png';
import sms from '../../../assets/images/sms.png';
import banner from '../../../assets/images/banner.png';
import products from '../../../assets/images/products.png';
import logout from '../../../assets/images/logout.png';


import { AiFillHome } from 'react-icons/ai';

import { adminbaseURL } from '../../Base/Constent';
import { logoutAdmin } from '../../ReduxToolKit/Admin/AdminLoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import AdHeaderItem from './AdHeaderItem';

const navLinks = [
  {
    id: 1,
    path: '/admin/dashboard',
    display: 'DASHBOARD',
    icon: AiFillHome,
    src: dashboard,
  },
  {
    id: 2,
    path: '/admin/products',
    display: 'PRODUCTS',
    src: products,

  },
  {
    id: 3,
    path: '/admin/specialday',
    display: 'BANNER',
    src: banner,
  },
  {
    id: 4,
    path: '/admin/slider',
    display: 'SLIDER',
    src: slider,
  },
  {
    id: 5,
    path: '/admin/messages',
    display: 'MESSAGES',
    src: sms,
    gap:true,

  },
  // {
  //   id: 6,
  //   path: '/admin/crop',
  //   display: 'Crop',
  //   src: sms,
  //   gap:true,

  // },
];

function AdminSideBar({ onLogout, open, setOpen }) {
  const dispatch = useDispatch();
  const [logoutError, setLogoutError] = useState(null);
  const [toggle, setToggle] = useState(false);
  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);

  const SingleFormCollections = useSelector((state) => state.form.form);
  const enquiryFormCollections = useSelector((state) => state.enquiry.enquiry);

  // Calculate unread counts
  const unreadSingleCount = SingleFormCollections.filter((message) => !message.read).length;
  const unreadEnquiryCount = enquiryFormCollections.filter((message) => !message.read).length;

  const navigate = useNavigate();
  
  const handleImageClick = (path) => {
    navigate(path); // Use navigate to navigate to the specified path
    setOpen(false)
  };

    const toggleSidebar = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="flex gap-x-4 items-center">
        <img src={logo} alt='' className={`cursor-pointer w-14 duration-500 rounded-full ${open && 'rotate-[360deg]'}`} />
        <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && 'scale-0'}`}>DoBa </h1>
      </div>
      <ul className='pt-6'>
        {navLinks.map((item, index) => (
          <li key={item.id} className={`flex items-center text-gray-300 gap-x-4
          cursor-pointer p-2 hover:bg-light-white rounded-md ${item.gap ? 'mb-9': 'mb-2'}`}
          onClick={() => handleImageClick(item.path)}>
           
            <img src={item.src} alt={item.display} className="w-6 h-6 mr-2" />
            <NavLink to={item.path} className="text-white" >
              <span className={`${!open && 'hidden'} origin-left duration-200 `} >{item.display}</span>
              {item.path === '/admin/messages' && open &&(
              <span className={`w-5 h-5 ms-2 font-bold float-right flex justify-center items-center  rounded-full bg-red-500 text-white`}>
                {unreadSingleCount + unreadEnquiryCount}
              </span>
            )}
            {item.path === '/admin/messages' && !open &&(
              <span className={`w-5 h-5 sm:absolute hidden font-bold left-10  justify-center items-center  rounded-full bg-red-500 text-white`}>
                {unreadSingleCount + unreadEnquiryCount}
              </span>
            )}
            </NavLink>
          </li>
        ))}
        <div className="flex items-center text-gray-300 gap-x-4
          cursor-pointer p-2 hover:bg-light-white rounded-md" onClick={onLogout}>
          <img src={logout} alt="" className="w-6 h-6 mr-2"/> 
          <span className={`${!open && 'hidden'} origin-left duration-200`}>LOGOUT</span>
        </div>
        <button className="" ></button>
      </ul>
      {/* <div className="sm:hidden block">
      <div
          id='toggle'
          className={`bgtheme flex sm:hidden ${toggle ? 'active' : ''}`}
          onClick={toggleSidebar}
        ></div>
          
          {toggle && <SideBar items={navLinks} closeToggle={() => setToggle(false)} />}

         
          </div> */}
    </>
  );
}

export default AdminSideBar;
