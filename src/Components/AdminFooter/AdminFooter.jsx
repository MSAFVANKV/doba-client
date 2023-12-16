import React from 'react'
import Footer from '../Footer/Footer'
import ItemsContainer from '../Footer/ItemContainer'

// imported img
import adminwave from '../../../assets/images/adminwave.svg'
import logo from '../../../assets/images/doba_logo.png'

import { FaFacebookF, FaTwitter, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';



function AdminFooter({onLogout}) {
  return (
    <div>
      {/* <Footer/> */}
    <footer className="bg-[#F26D1E] text-white">
    <img src={adminwave} alt="" />

    <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7">
      <h1
        className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
       md:w-2/5"
      >
        <span className="text-teal-400">Free</span> until you're ready to
        launch
      </h1>
      <div className="sm:w-[100px] w-[80px]  p-1 ms-9">
      <img src={logo} alt="" />
      </div>
    </div>
    {/* <ItemsContainer /> */}
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
    text-center pt-2  text-sm pb-8"
    >
      <span>© 2023 DoBa. All rights reserved.</span>
      <span>Terms · Privacy Policy</span>
      {/* <SocialIcons Icons={Icons} /> */}
      <div className="text-teal-500">
      
        <span
          className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
        >
          <FaFacebookF />
        
        </span>
        <span
          className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
        >
          <FaTwitter />
        </span>
        <span
          className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
        >
            <a href="https://linkedin.com/in/muhammed-safvan-kv-648388250/" target="_blank" rel="noopener noreferrer">
    <FaInstagram />
  </a>
        </span>
  
    </div>
    </div>
  </footer>
    </div>
  )
}

export default AdminFooter