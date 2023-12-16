import React, { useRef, useState } from 'react';
import contact1 from '../../../assets/images/contact1.png';
import EnquiryForm from '../../Components/UserForm/EnquiryForm';
import Feedback from '../../Components/UserForm/Feedback';
import { motion, } from 'framer-motion'

import { TiWorld } from "react-icons/ti";
import { IoIosCall } from "react-icons/io";

function Contact() {
  const scrollRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScrollTo = (index) => {
    const itemRef = scrollRef.current.children[index];
    if (itemRef) {
      itemRef.scrollIntoView({ behavior: 'auto' });
      setActiveIndex(index);
      if (window.innerWidth < 600) {
        window.scrollTo(0, 700); // Adjust the value as needed
      } else {
        window.scrollTo(0, 300);
      }

    }
  };

  return (
    <motion.div
    initial={{width: 0}}
    animate={{width: '100%'}}
    exit={{x: window.innerWidth, transition: { duration: 0.1 }}}
    >
          <div className=" sm:h-[50vh] h-[30vh] sm:mt-0 mt-10 flex flex-col justify-center items-center relative">
          <span className='md:text-[3rem]  sm:text-[2.5rem] text-[2rem] font-comforter2 font-semibold '>CONTACT US </span>
          <span className='md:text-[2rem] sm:text-[1.8rem] text-[1.5rem] sm:w-fit w-[90%] font-comforter2 sm:font-semibold '>
          "In the world of endless choices, choosing us is the best one you'll make today. Let's talk!"
          </span>
          {/* <span className='translate-x-3 transition-all'><IoIosCall /></span> */}
        <div className="w-[2px] h-[65%] -bottom-[6rem] absolute bg-red-400"></div>
        <div className="w-[10px] h-[10px] rounded-full -bottom-[6.4rem] absolute bg-blue-500"></div>
        </div>
      <div className="w-full sm:flex justify-center bg-white">
        {/*======  */}
    
        {/*======  */}

        <div className=" sm:w-[80%] sm:grid grid-cols-3 overflow-x-auto rounded-3xl  sm:shadow-slate-400 sm:shadow-xl  mb-10 border mt-[6rem]">
          <div className="bg-blue-600 flex flex-col items-center  py-10">
            <div className="w-20 h-20 rounded-full flex justify-center items-center bg-white mb-2">
              <img src={contact1} alt="contact img" className="" />
            </div>
            <div className="font-bold font-comforter2 text-white text-[2rem]">
              <span>CONNECT US</span>
            </div>
            <div className=" my-10">
              <ul className='text-white font-comforter2 text-[1.2rem] leading-8'>
                <li className='flex items-center'><IoIosCall />
                <a href="tel:+91 9747543802">+91 9747543802</a>
                </li>
                <li className='flex items-center'><TiWorld />E K Food Products</li>
                <li className='ps-4'> Near Post office</li>
                <li className='ps-4'> Kattangal rd, Mavoor</li>
                <li className='ps-4'>Calicut - 673661</li>
              </ul>
              
            </div>
          </div>
          {/* second col included all form sections start here */}
          <div className="col-span-2">
            <div className="w-[100%] h-[50px] top-0">
              <div className="text-center border-b-2 border-t-2 p-2 border-red-400">
                <span className={`cursor-pointer px-5 ${activeIndex === 0 ? 'font-bold' : ''}`} onClick={() => handleScrollTo(0)}>
                  General Enquiry
                </span>
                <span className={`cursor-pointer ${activeIndex === 1 ? 'font-bold' : ''}`} onClick={() => handleScrollTo(1)}>
                  Customer Feedback
                </span>
              </div>
            </div>
            {/* form starts here */}
            <div className="w-[100%] max-h-[100%] flex overflow-x-hidden scroll-smooth" ref={scrollRef}>
              {/* first form General Enquiry*/}
              <div className="min-w-full" id="enquiry">
                <EnquiryForm />
              </div>
              {/* second form Customer Feedback*/}
              <div className="min-w-full" id="feedback">
                <Feedback />
              </div>
            </div>
            {/* Second form */}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Contact;
