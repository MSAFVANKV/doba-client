import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import { Link } from 'react-router-dom';

import img from '../../../assets/images/doba_product_2.jpeg'
import { getProducts, getProductsHome } from '../../ReduxToolKit/Admin/ProductsSlice';
import { mainURL } from '../../Base/Constent';

// icons
import { BsFillHeartFill } from 'react-icons/bs'
import { LiaExternalLinkAltSolid } from 'react-icons/lia'
// Importing ProductDetail as a named import
import { ProductDetail } from '../../Components/ProductDetails/ProductDetail';

import { motion } from 'framer-motion'


function Items() {
  const dispatch = useDispatch()

  const getProductSlice = useSelector(state => state.products?.products);
  useEffect(() => {
    dispatch(getProductsHome()); // Fetch products when the component mounts
  }, [dispatch]);

  console.log(getProducts, 'getProducts')

  const [likedItems, setLikedItems] = useState([]);

  // const home_Product_Cards = [
  //   {
  //     id: 1,
  //     name: "IDLY",
  //     image: img,
  //     price: 2000,
  //     offer: "20%",
  //   },
  //   {
  //     id: 2,
  //     name: "IDLY",
  //     image: img,
  //     price: 2000,
  //     offer: "20%",
  //   },
  //   {
  //     id: 3,
  //     name: "Dosa",
  //     image: img,
  //     price: 2000,
  //     offer: "20%",
  //   },
  //   {
  //     id: 4,
  //     name: "IDLY",
  //     image: img,
  //     price: 2000,
  //     offer: "20%",
  //   },
  //   {
  //     id: 5,
  //     name: "IDLY",
  //     image: img,
  //     price: 2000,
  //     offer: "20%",
  //   },
  //   {
  //     id: 6,
  //     name: "IDLY",
  //     image: img,
  //     price: 2000,
  //     offer: "20%",
  //   },
  // ];

  const handleLikeClick = (itemId) => {
    if (likedItems.includes(itemId)) {
      // Unlike the item
      setLikedItems(likedItems.filter((id) => id !== itemId));
    } else {
      // Like the item
      setLikedItems([...likedItems, itemId]);
    }
  };
  return (
    <motion.div
    initial={{width: 0}}
    animate={{width: '100%'}}
    exit={{x: window.innerWidth, transition: { duration: 0.3 }}}
    >
      <h2 className='text-center sm:text-[2rem] text-[1.5rem] font-bold'>WHAT WE HAVE</h2>
      <div className='grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 justify-center items-center gap-5 mx-2 sm:mx-10 my-5 sm:my-10'>
        {getProductSlice.map((item, index) => (
          <Link to={`/product/${item._id}`} key={item._id}>


            {/* <div className="flex flex-col gap-6 group relative shadow-lg text-black hover:shadow-2xl
              rounded-xl md:px-6 py-8 w-[100px] h-[110px] sm:h-[180px] sm:w-[200px] md:h-[200px] md:w-[215px] lg:h-[200px] lg:w-[250px] cursor-pointer">
              <div
                className="absolute gap inset-0 bg-cover bg-center rounded-xl"
                style={{ backgroundImage: `url(${mainURL}/Public/ProductsImages/${item.file})` }}
              />

              <div className=' absolute inset-0 bg-black opacity-5 group-hover:opacity-20 rounded-xl' />
              <div className="relative flex flex-col text-black p-3 border bg-white opacity-50 sm:group-hover:opacity-80 gap-2">
                <p className='lg:text-[18px] md:text-[15px] text-[12px] font-bold'>{item.productName.length > 15
                  ? `${item.productName.slice(0, 15)}...`
                  : item.productName}</p>
                <p className='lg:text-[18px] md:text-[15px] text-[12px]  font-bold'>₹{item.price}</p>

              </div>
              <LiaExternalLinkAltSolid className='sm:block absolute hidden bottom-5 left-5 sm:w-[35px] sm:h-[35px] text-black 
               group-hover:text-blue-600 group-hover:rotate-45 duration-100'/>
            </div> */}
            <div key={item._id} className="h-[150px] w-[100%] md:h-[215px] md:w-[215px] lg:h-[310px] lg:w-[300px]  my-4 border rounded-md overflow-hidden shadow-md">
            <img
              src={`${mainURL}/Public/ProductsImages/${item.file[0]}`}
              alt={item.productName}
              className='w-full lg:h-[250px] h-[100px] p-1 '
            />
            <div className="p-2">
              <p className="text-center font-bold text-sm mb-1">{item.productName}</p>
              {/* Add other details as needed */}
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-xs "></p>
              </div>
            </div>
          </div>
            {/* <ProductDetail product={item} /> */}
          </Link>
        ))}
      </div>


    </motion.div>
  );
}

export default Items;
