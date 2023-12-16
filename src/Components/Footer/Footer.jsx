import React from 'react'

import waveWhite from '../../../assets/images/wave_white.svg'
import logo from '../../../assets/images/doba_logo.png'
import ItemsContainer from './ItemContainer'
// import SocialIcons from './SocialIcons'
import { Icons } from "./FooterMenu";

// import icons
import { FaFacebookF, FaTwitter, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    // <div>
    //   <div className="sticky bottom-0 w-full h-[90vh] bg-[#F26D1E]">
    //     <img src={waveWhite} alt="" />
    //     <div className="sm:w-[100px] w-[80px]  p-1 ms-9">
    //       <img src={logo} alt="" />
    //     </div>

    //   </div>
    // </div>
    // bg-[#F26D1E]bg-[#adF26D1E]bg-[#ffffff19]
    <footer className=" border-t-4 border-indigo-50 text-black sm:mt-28 mt-20">
       {/* <img src={waveWhite} alt="" /> */}
    <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#adF26D1E] py-7">
      <h1
        className="lg:text-3xl text-2xl md:mb-0 mb-6 lg:leading-normal font-semibold
       md:w-2/5"
      >
        <span className="text-teal-400">Welcome</span> to a world where every bite tells 
        a delicious story.
      </h1>
      <div className="sm:w-[100px] w-[80px]  p-1 ms-9">
      <img src={logo} alt="" />
      </div>
      {/* <div>
        <input
          type="text"
          placeholder="Enter Your ph.no"
          className="text-gray-800
         sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
        />
        <button
          className="bg-teal-400 hover:bg-teal-500 duration-300 px-5 py-2.5 font-[Poppins]
         rounded-md text-white md:w-auto w-full"
        >
          Request Code
        </button>
      </div> */}
    </div>
    <div className="md:flex md:justify-around">
        <ItemsContainer />
      </div>
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5
    text-center py-3 items-center text-sm  bg-[#F26D1E] text-white"
    >
      <span>© 2023 dobafoods All rights reserved.</span>
      <span>Terms · Privacy Policy</span>
      {/* <SocialIcons Icons={Icons} /> */}
      <div className="">
      
        <span
          className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
        >
          <FaFacebookF />
        
        </span>
        {/* <span
          className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
        >
          <FaTwitter />
        </span> */}
        <span
          className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
        >
            <a href="" target="_blank" rel="noopener noreferrer">
    <FaInstagram />
  </a>
        </span>
  
    </div>
    </div>
  </footer>
  )
}

export default Footer