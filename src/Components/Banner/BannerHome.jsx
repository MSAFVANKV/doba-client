import React, { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { getBanner, setBanner } from '../../ReduxToolKit/Admin/bannerSlice';
import { adminbaseURL, mainURL, userURL } from '../../Base/Constent';
import { RxArrowTopRight } from 'react-icons/rx';
import logo from '../images/doba_logo.png';
import wave from '../../../assets/images/wave_2.svg'
import axios from 'axios';

function BannerHome() {
  const dispatch = useDispatch();
  const getBannerSlice = useSelector((state) => state.banner.banner);


  useEffect(() => {
    axios.get(`${userURL}/get/allbanner`, { withCredentials: true })
      .then((response) => {
        dispatch(setBanner(response.data));
        console.log(response.data);
      })
  }, [dispatch]);
 

  return (
    <>
      <div className="text-center w-[100%] py-[0.1rem]"></div>
      <div className="flex items-center justify-center">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 1,
              // spaceBetween: 15,
            }
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          autoplay={{ // Configure autoplay settings
            delay: 5000, // Delay between slides in milliseconds (e.g., 3000ms = 3 seconds)
            disableOnInteraction: false, // Allow user interaction (e.g., clicking) to stop autoplay
          }}
          // loop={false}
          speed={2000}
          className="w-[100%] "
        >
          {getBannerSlice && getBannerSlice.length > 0 && getBannerSlice.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col gap-6 group relative shadow-lg text-white hover:shadow-2xl px-6 py-8 h-[210px] md:h-[350px] lg:h-[450px] w-[100%] cursor-pointer">
                {/* <div
                  className="absolute inset-0 bg-contain bg-no-repeat bg-center w-[100%] h-[100%]"
                  style={{ backgroundImage: `url(${mainURL}/Public/Banner/${item.file})` }}
                /> */}
                <img src={`${mainURL}/Public/Banner/${item.file}`} alt="" 
                className='absolute inset-0 w-[100%] h-[100%]'/>
                <div className='absolute inset-0 bg-black opacity-5 group-hover:opacity-10' />
                <div className="relative flex flex-col justify-center items-center gap-3">
                <p className={`lg:text-[60px]  text-[30px] font-bold capitalize`} style={{ color: item.color }}>{item.bannerName}</p>
                <p className={`lg:text-[30px]  font-bold capitalize`} style={{ color: item.color }}>{item.subtitle}</p>
                </div>
                <img src={logo} alt="" className='absolute bottom-5 left-5 w-[50px] h-[50px] text-black group-hover:text-blue-600  duration-100' />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </>
  );
}

export default BannerHome;
