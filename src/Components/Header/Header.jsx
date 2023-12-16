import React, { useState } from 'react';
import './Header.css';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// imported images
import logo from '../images/doba_logo.png';

// imported icons
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import HeaderItems from './HeaderItems';
import SideBar from './SideBar';
import axios from 'axios';
import { userURL } from '../../Base/Constent';

const navLinks = [
  {
    id: 1,
    path: '/home',
    display: 'HOME',
    icon: AiFillHome,
  },
  {
    id: 2,
    path: '/products',
    display: 'PRODUCTS',
  },
  {
    id: 3,
    path: '/aboutus',
    display: 'ABOUT US',
  },
  {
    id: 4,
    path: '/contact',
    display: 'CONTACT',
  }
];

function Header() {
  const [toggle, setToggle] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState([]);

  const navigate = useNavigate();
  const toggleSidebar = () => {
    setToggle(!toggle);
    
  };
  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };
  
  const handleSearchChange = async (e) => {
    const query = e.target.value;

    if (query === '') {
      setActiveSearch([]);
      return false;
    }

    try {
      const response = await axios.get(`${userURL}/search/products/${query}`);
      setActiveSearch(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };
  // Header.jsx
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (activeSearch && activeSearch.length > 0) {
        navigate('/search/products', { state: { searchResults: activeSearch } });
        setActiveSearch([]); // Clear search results
        e.target.reset();
      }
      else{
        toast.error('Don\'t Find Anything...', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
          });
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      // Handle error, show a message, etc.
    }
  };
  

  return (
    <>
      <header className='bg-white sm:h-[90px] h-[70px] sticky_header shadow-md'>
        <div className='flex justify-between items-center'>
          {/* logo start==================== */}
          <div className='sm:w-[90px] w-[70px] p-1 sm:ms-9 m-1'>
           <a href="/"> <img src={logo} alt='' /></a>
          </div>
          {/* log end==================== */}
          {/* Menu sart================== */}
          <div className='hidden sm:flex'>
            <ul className='flex gap-5 items-center'>
              {navLinks.map((items, index) => (
                <HeaderItems items={items} Icon={items.icon} index={index} key={index}/>
              ))}
            </ul>
          </div>
            {/* Search input */}
            <div className='sm:flex items-center hidden'>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search..."
                className='border relative border-gray-300 rounded-md p-1 mr-2'
                onChange={(e)=> handleSearchChange(e)}
              />
                  {/* <Link to={`/search/products/${activeSearch}`}> */}
              <button type="submit" className='text-gray-600 absolute right-1 -translate-x-1/2 translate-y-1/2'>
                <AiOutlineSearch />
              </button>
              {/* </Link> */}
            </form>
          </div>
        
        </div>
        <ToastContainer position="top-right"
        autoClose={4000}
    
         />
      </header>
      {/* <div className="">
      <div
          id='toggle'
          className={`bgtheme flex sm:hidden ${toggle ? 'active' : ''}`}
          onClick={toggleSidebar}
        ></div>
          
          {toggle && <SideBar items={navLinks} closeToggle={() => setToggle(false)} />}

         
          </div> */}
          {/* <div className={`fixed flex justify-center items-center right-7 top-7 w-[50px] h-[50px] bg-gray-200 z-[999]`}>
                <span className='w-[90px] h[100px] bg-black absolute'>5</span>
          </div> */}
        
    </>
  );
}

export default Header;
