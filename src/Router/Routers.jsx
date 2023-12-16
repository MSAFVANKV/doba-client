import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../Pages/UserSide/Home';
import Login from '../Pages/UserSide/Login';
import Register from '../Pages/UserSide/Register';
import SearchBarPage from '../Pages/UserSide/SearchBarPage';
import Products from '../Pages/UserSide/Products';
import AboutUs from '../Pages/UserSide/AboutUs';
import Sample from '../Pages/UserSide/Sample';
import { ProductDetail } from '../Components/ProductDetails/ProductDetail';
import Contact from '../Pages/UserSide/Contact';
import SideBar from '../Components/Header/SideBar';
import AnimationRoutes from '../Components/AnimationPages/AnimationRoutes';




function Routers() {
   const [toggle, setToggle] = useState(false);
  const toggleSidebar = () => {
    setToggle(!toggle);
  };
  return (
    <>
    {/* <div
    id='toggle'
    className={`bgtheme flex sm:hidden ${toggle ? 'active' : ''}`}
    onClick={toggleSidebar}
  >
    <div className={`${toggle ? 'w-[100%]  p-4' : ' w-0'} duration-300 h-full bg-opacity-95 -z-50 top-0 left-0  pt-8 bg-dark-purple  fixed`}>
    {toggle && <SideBar setToggle={setToggle} toggle={toggle} closeToggle={() => setToggle(true)} />}
    </div>
  </div> */}
  <div className="flex sm:hidden ">
    <SideBar/>
  </div>
    {/* <Routes>
      <Route path="/" element={<Navigate to={'/home'} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/search" element={<SearchBarPage />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/sample" element={<Sample />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/search/products/:query" element={<SearchBarPage />} />
      <Route path="/contact" element={<Contact />} />

    </Routes> */}
    <AnimationRoutes/>
    </>
  );
}

export default Routers;
