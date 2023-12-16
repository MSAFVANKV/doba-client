import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from '../../Pages/UserSide/Home'
import Login from '../../Pages/UserSide/Login'
import Register from '../../Pages/UserSide/Register'
import Products from '../../Pages/UserSide/Products'
import SearchBarPage from '../../Pages/UserSide/SearchBarPage'
import AboutUs from '../../Pages/UserSide/AboutUs'
import Sample from '../../Pages/UserSide/Sample'
import { ProductDetail } from '../ProductDetails/ProductDetail'
import Contact from '../../Pages/UserSide/Contact'

import { AnimatePresence } from 'framer-motion'

function AnimationRoutes() {
    const location = useLocation()
  return (
    
    <AnimatePresence>
        <Routes location={location} key={location.pathname} >
      <Route path="/" element={<Navigate to={'/home'} />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/products" element={<Products />} />
      {/* <Route path="/products/search" element={<SearchBarPage />} /> */}
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/sample" element={<Sample />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/search/products" element={<SearchBarPage />} />
      <Route path="/contact" element={<Contact />} />

    </Routes>
    </AnimatePresence>
  )
}

export default AnimationRoutes