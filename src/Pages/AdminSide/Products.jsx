import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import ModalProducts from './ModalProducts'
import { adminbaseURL, mainURL } from '../../Base/Constent';
import { getProducts, setProducts } from '../../ReduxToolKit/Admin/ProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {AiFillDelete} from 'react-icons/ai'


function Products() {
  const dispatch = useDispatch()
  const productsList = useSelector(state => state.products?.products);

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null);

  // const openProductModal = () => {
  //   setModalOpen(!modalOpen);
  // };
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };
  const closeProductModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };
  const openAddProductModal = () => {
    setSelectedProduct(null); // Reset selectedProduct for adding a new product
    setModalOpen(true);
  };

  useEffect(() => {
    axios.get(`${adminbaseURL}/allproducts`, { withCredentials: true })
      .then((response) => {
        dispatch(setProducts(response.data));
        console.log(response.data);
      })
  }, [dispatch]);
  

  const removeProduct = (id) => {
    axios.delete(`${adminbaseURL}/product/delete/${id}`)
        .then((res) => {
            dispatch(getProducts()); // Fetch updated tasks
        });
}

const columns = [
  {
      name: 'Itm.No',
      selector: (row, index) => index + 1,
      sortable: true,
      wrap: true,
  },
  {
      name: 'Product Image',
      cell: row => (
        <div className='flex '>
        {row.file.map((filename, index) => (
          <img
            key={index}
            src={`${mainURL}/Public/ProductsImages/${filename}`}
            alt={`${row.productName} Image ${index + 1}`}
            style={{ width: '35px', height: '35px', marginRight: '10px ' , border:'0.5px black solid' }}
          />
        ))}
      </div>
      ),
      sortable: true,
      wrap: true,
  },
  {
      name: 'Product Name',
      selector: 'productName', // Make sure to use the correct property name
      sortable: true,
      wrap: true,
  },
  {
      name: 'Price',
      selector: 'price', // Make sure to use the correct property name
      sortable: true,
      wrap: true,
  },
  {
      name: 'Category',
      selector: 'category', // Make sure to use the correct property name
      sortable: true,
      wrap: true,
  },
  {
      name: 'Actions',
      ignoreRowClick: true,
      cell: (row) => (
          <>
               <button className='mx-3 border ' onClick={() => openProductModal(row)}>Edit</button>
              <button onClick={() => removeProduct(row._id)}><AiFillDelete/></button>
          </>
      ),
  }
];

  return (
 
  <div className="pt-10   bg-[#F6F8FC] p-5">
    <div className=" flex justify-center items-center">
    <button className='bg-[#F26D1E] text-white font-bold p-3 rounded-xl m-5' onClick={openAddProductModal}>ADD PRODUCTS</button>

    </div>
    <div className="flex flex-col text-start items-center ">
      <div className="bg-slate-300 w-[60%] flex flex-col p-2">
      <span>* BEFORE ADD PRODUCTS NOTE THESE INSTRECTIONS:</span>
      <span>*TRY ADD ALL FIELDS IN FORM</span>
      <span>*WHEN IMAGE UPLOAD YOU HAVE OPTION FOR SELECT 2 IMAGES:</span>
      <span>a) FIRST SELECT MAIN IMAGE FOR SHOWING HOME PAGES</span>
      <span>B) SECOND SELECT ANOTHER SIDE OF THE PACK</span>

      </div>
    </div>
    {modalOpen && <ModalProducts closeModal={closeProductModal} selectedProduct={selectedProduct}/>}
      <div className=" ">
      <DataTable
                    title="Add items"
                    columns={columns}
                    // data={productsList || []} 
                    data={productsList} 
                    pagination
                    highlightOnHover
                    customStyles={customStyles}
                    subHeader

                />
      </div>
  </div>

  )
}


const customStyles = {
  headCells: {
      style: {
          backgroundColor: '#e2e8f0',
          fontSize: '19px',
          fontWeight: 'bold',
      },
  },
  cells: {
      style: {
          padding: '10px',
          fontSize: '12px',
          fontWeight: 'bold',
      },
  },
};

export default Products