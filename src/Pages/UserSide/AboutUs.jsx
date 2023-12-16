import React, { useEffect, useRef, useState } from 'react'
import Sample from './Sample'
import { motion } from 'framer-motion'

import inspiring from '../../../assets/images/inspiring.jpg'
import texture_3 from '../../../assets/images/texture-2.jpg'

// Details
import { about_Us } from '../../Components/AboutUs/Details'

import { GiHamburgerMenu } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { getVideos, getVideosHome } from '../../ReduxToolKit/Admin/videoSlice'
import { mainURL } from '../../Base/Constent'

function AboutUs() {
  const scrollRef = useRef();
  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(0);
  const [openDetail, setOpenDetail] = useState(false)
  const getVideosSlice = useSelector((state) => state.video?.video)

  const openAboutDeatail = () => {
    setOpenDetail(!openDetail)
  }

  const handleScrollTo = (index) => {
    // console.log("inside function")

    const itemRef = scrollRef.current.children[index];
    if (itemRef) {
      // console.log("inside if")
      itemRef.scrollIntoView({ behavior: 'auto' });
      setActiveIndex(index)
      window.scrollTo(0, 100);


    }
  };

  useEffect(() =>{
    dispatch(getVideosHome())
  },[dispatch])

  return (
    <motion.div
    initial={{width: 0}}
    animate={{width: '100%'}}
    exit={{x: window.innerWidth, transition: { duration: 0.3 }}}
    >
      <div className=" font-bold sm:text-[2rem] text-[1.5rem] text-white lg:h-[180px] sm:h-[120px] h-[100px] flex justify-center items-center"
        style={{ backgroundImage: `url(${texture_3})` }}>
        {/* <img src={texture_3} className='object-cover h-[100%]' alt="" /> */}
        <span>ABOUT</span>
      </div>
      {/* <a href="https://maps.app.goo.gl/6JjWvUt2dKR9SibK7" target="_blank">Click Here for location </a> */}
{/* videos */}


      <div className="sm:w-[100%]  flex justify-center">
        {/* Inside this div below is divided with two div */}
        <div className="sm:w-[70rem] w-[100%] bg-[white] md:flex">
          {/* First div */}
          <div className="md:w-[30%] w-[100%] md:flex hidden justify-center">
            <div className="w-[100%] h-[30px] bg-slate-300 mt-10 m-1">
              <div className="h-[50px] bg-red-600 justify-center flex items-center">
                <span className='text-white font-bold '>ABOUT</span>
              </div>
              <ul className='border'>
                {about_Us.map((item, index) => (
                  <div className="" key={item.id}>
                    <li className={`p-3 cursor-pointer hover:bg-slate-100 ${activeIndex === index ? 'bg-slate-400 hover:bg-slate-400 text-white' : ''}`} onClick={() => handleScrollTo(index)}>
                      {item.display}
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          {/* First div end */}
          <div className="flex justify-end p-5 md:hidden">
            <GiHamburgerMenu onClick={openAboutDeatail} className='text-[1.5rem] cursor-pointer' />
            {openDetail && <div className="modal-container" onClick={(e) => { if (e.target.className === 'modal-container' || e.target.id === 'close') openAboutDeatail() }}>
              <div className="h-[300px] bg-white opacity-90 sm:w-[50%] w-[250px]">
                <div className="h-[50px] bg-red-600 justify-center flex items-center">
                  <span className='text-white font-bold '>ABOUT</span>
                </div>
                <ul className='border'>
                  {about_Us.map((item, index) => (
                    <div className="" key={item.id}>
                      <li id='close' className={`p-3 cursor-pointer hover:bg-slate-100 ${activeIndex === index ? 'bg-slate-400 hover:bg-slate-400 text-white' : ''}`} onClick={() => handleScrollTo(index)}>
                        {item.display}
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>}
            {/* about modal end */}

          </div>
          {/* Second div */}
          <div className="md:w-[80%] w-[100%]  flex justify-center items-center">

            <div className="sm:w-[96%] w-[100%] max-h-[100%] flex overflow-x-hidden scroll-smooth bg-white rounded-xl scrollbar-none" ref={scrollRef}>
              {about_Us.map((item, index) => (
                <div className="min-w-full " key={item.id}>
                  <img src={item.image} alt="" className='md:h-[400px] object-fill sm:w-[100%] p-3 rounded-3xl object-left-top' />
                  <div className="p-5">
                    <p className='text-red-600 uppercase font-bold text-[1.2rem] my-5'>{item.author}</p>
                    {/* <p className='leading-8'>{item.quote}</p> */}

                    {/* team section */}
                    {item.id === 3 ? (
                      // Render team section only for item with id 3
                      <div className="md:flex gap-2">
                      <div className="md:w-[50%] mb-5">
                      <span className='text-red-600 uppercase font-bold text-[1.2rem] my-5'>{item.manager1}
                      <span className='text-gray-500'> (Manager)</span></span>

                      { item.quote1.map((quote1Item,index) => (
                          <div className="">
                          <div className="">{quote1Item}</div>
                        </div>
                        ))
                        }
                      </div>
                      <div className="md:w-[50%] mb-5">
                      <span className='text-red-600 uppercase font-bold text-[1.2rem] my-5'>{item.manager2}
                          <span className='text-gray-500'> (Manager)</span> </span>
                      { item.quote2.map((quote1Item,index) => (
                          <div className="">
                          <div className="lg:text-[1rem] text-[0.8rem]">{quote1Item}</div>
                        </div>
                        ))
                        }
                      </div>
                      </div>
                    ) : null}

                          {/* certification quality details show here */}
                          { item.quality &&
                            item.quality.map((qual,index) => (
                              <div className="" key={index}>
                                <p className='my-5'>{qual}</p>
                              </div>
                            ))
                          }
                           {item.id === 2 ? 
                        <span className='text-red-600 uppercase font-bold text-[1.2rem] my-5'>{item.author}</span> : null  
                        }
                    {item.id === 1 || item.id === 2 ? (
                      item.quote.map((quoteItem, index) => (
                        <div className="" key={index}>
                         
                          <p className="leading-6 lg:text-[1rem] text-[0.8rem]">{quoteItem}</p>
                        </div>
                      ))
                    ) : null}

                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Second div end */}
        </div>
        {/* Inside this end div above is divided with two div */}
      </div>

      <div className="flex justify-center items-center my-20">
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
    {getVideosSlice && getVideosSlice.length > 0 && (
      getVideosSlice.map((media) => (
        <div key={media._id} className="relative bg-white h-[250px] sm:h-[400px] sm:w-[400px] rounded-md overflow-hidden shadow-md">
          <div className="flex justify-center items-center h-12 bg-gray-700 text-white">
            <p className="font-bold">{media.videoName}</p>
          </div>
          <div className="h-[90%] ">
            {media.videos.map((video, index) => (
              <video
                key={index}
                preload="auto"
                controls
                muted
                className=" w-full h-full object-cover"
                controlsList="nodownload"
              >
                <source src={`${mainURL}${video}`} type="video/mp4" />
              </video>
            ))}
          </div>
        </div>
      ))
    )}
  </div>
</div>

    </motion.div>
  )
}

export default AboutUs
