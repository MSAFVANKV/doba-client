import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { mainURL, userURL } from '../../Base/Constent';

// imported images
import texture_3 from '../../../assets/images/texture-2.jpg'
import UserForm from '../UserForm/UserForm';
import { LiaExternalLinkAltSolid } from 'react-icons/lia';


const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);


  useEffect(() => {
    // Fetch product details using the productId `${adminbaseURL}/allproducts`
    axios.get(`${userURL}/product/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));

    // Fetch similar products
    axios.get(`${userURL}/product/${productId}/similar`)
      .then((response) => setSimilarProducts(response.data))
      .catch((error) => console.error(error));

    window.scrollTo(0, 0);
  }, [productId]);

  // ======
  const openForm = () => {
    setShowForm(!showForm)
  }

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };
  if (!product) {
    return <div className='flex justify-center h-[300px] items-center font-bold text-[1.6rem] text-blue-500'>
      <span>Loading..</span>
    </div>;
  }

  return (
    <div>
      {/* Display product details */}
      <div className="lg:h-[200px] md:h-[150px] h-[100px] bg-contain text-white font-bold text-center flex justify-center items-center lg:text-[3rem] md:text-[2rem] text-[1.5rem]" style={{ backgroundImage: `url(${texture_3})` }}>
        <span>{product.productName}</span>
      </div>
      {/*  */}
      <div className="flex w-[100%]  justify-center items-center my-10">
        <div className="sm:grid sm:grid-cols-4 grid-cols-4 sm:w-[55rem] w-[100%]lg:h-[600px]">
          {/* ====== */}

          <div className='border sm:m-2 shadow-sm w-[100%] sm:h-[430px] h-[360px] col-span-2'>
            <img
              src={`${mainURL}/Public/ProductsImages/${product.file[selectedImage]}`}
              alt={product.productName}
              className='p-3 object-cover w-full h-full'
              // main  image
              // onClick={() => handleImageClick(0)}
            />
            {/* select images */}
            <div className="flex">
            <img
              src={`${mainURL}/Public/ProductsImages/${product.file[1]}`}
              alt={product.productName}
              className='p-3 object-cover w-[100px] h-[100px] cursor-pointer'
              // second image
              onClick={() => handleImageClick(1)}
            />
            <img
              src={`${mainURL}/Public/ProductsImages/${product.file[0]}`}
              alt={product.productName}
              className='p-3 object-cover w-[100px] h-[100px] cursor-pointer'
              // second image
              onClick={() => handleImageClick(0)}
            />
            </div>
          </div>
          {/* ====== */}
          
          <div className=" mx-5 text-[1.1rem]  col-span-2 px-7 py-10 sm:mt-0 mt-20">
            <h2 className='font-bold'>{product.productName}</h2>
            {/* <p>Price: ₹{product.price}</p> */}
            <p>{product.description}</p>
          </div>


          <div className="flex justify-center items-center sm:hidden  rounded-2xl">
            <button className='p-2 border-r-4 border-t shadow-md border-s border-[#F26D1E] rounded-2xl sm:my-0 my-5' onClick={openForm}>Enquiry For This item</button>
          </div>
        </div>

      </div>
      <div className="sm:flex hidden justify-center mt-10">
        {!showForm && <UserForm product={product} />}
      </div>
      {
        showForm && <UserForm product={product} />
      }

      {/* Add more details as needed */}
      {/* Similar Products */}
      <div className="m-5">
      <span className="text-lg font-bold mb-2 ">SIMILAR PRODUCTS:</span>
      </div>
      <div className="grid sm:grid-cols-4 md:grid-cols-6   grid-cols-1 justify-center items-center my-4">
        {similarProducts.map((similar) => (
          <div key={similar._id} className="w-[100%] sm:w-[170px] sm:ms-10 my-4 border rounded-md overflow-hidden shadow-md">
            <img
              src={`${mainURL}/Public/ProductsImages/${similar.file[0]}`}
              alt={similar.productName}
              className='w-full h-[120px] object-cover'
            />
            <div className="p-2">
              <p className="text-center font-bold text-sm mb-1">{similar.productName}</p>
              {/* Add other details as needed */}
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-xs">{/* Add other details, e.g., price, category, etc. */}</p>
                <Link to={`/product/${similar._id}`} className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs">
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>


  );
}

export { ProductDetail };  // Exporting ProductDetail as a named export
