import React from 'react'
import Items from './Items'

import poster from '../../../assets/images/DoBa_produts_poster_01.jpg'
import idly1 from '../../../assets/images/idly1.jpg'

import waveside from '../../../assets/images/waveside.svg'
import texture_2 from '../../../assets/images/texture-2.jpg'

import { motion } from 'framer-motion'


function Products() {
  return (
      
    <motion.div
    initial={{width: 0}}
    animate={{width: '100%'}}
    exit={{x: window.innerWidth, transition: { duration: 0.3 }}}
    >
      {/*  */}
      <div className="w-[100%] h-[200px] sm:h-[70vh] md:flex">
        <div className="lg:w-[50%] w-[100%] h-[100%] bg-slate-200 rounded-e-xl relative flex justify-center items-center">
          <span className='sm:w-[250px] w-[150px]  font-comforter sm:text-[2rem]'>"Is your day starting with a fresh start? Your day will be grateful."</span>
          <div className="bg-slate-400 h-[100%] w-[1rem] hidden md:block absolute right-0"></div>
          <div className="bg-slate-400 h-[1rem] w-[100%] md:hidden block absolute bottom-0 rounded-b-2xl"></div>
          {/* <img src={waveside} className='w-[70vh] sm:block hidden absolute -right-[16.5rem] -rotate-90 ' alt="" /> */}
          <div className="md:hidden block w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] gap-4 bg- bg-contain rounded-full" style={{backgroundImage:`url(${poster})`}}></div>

        </div>
        <div className="lg:w-[50%] w-[100%] hidden md:flex justify-center items-center bg-cover bg-center bg-no-repeat" >
           {/* rounded image start */}
        <div className="lg:w-[350px] md:w-[270px] md:flex justify-center items-center lg:h-[350px] md:h-[270px]  bg- bg-contain rounded-full" style={{backgroundImage:`url(${texture_2})`}}>
        <div className="lg:w-[350px] md:w-[250px] lg:h-[350px] md:h-[250px] bg-cover rounded-full shadow-2xl" style={{backgroundImage:`url(${idly1})`}}></div>

        </div>
                {/* <div className="lg:w-[100%] md:w-[250px] lg:h-[100%] md:h-[250px] shadow-2xl">
                  <img src={idly1} alt="" className='object-cover lg:w-[100%] lg:h-[100%]' />
                </div> */}

              {/* rounded image ends */}

        </div>
      </div>
      {/*  */}
      <div className="sm:mt-[8rem] mt-[1rem]">
          <Items/>
          
      </div>
    </motion.div>
  )
}

export default Products