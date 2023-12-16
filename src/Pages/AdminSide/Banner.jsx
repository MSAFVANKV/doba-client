import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { getBanner, setBanner } from '../../ReduxToolKit/Admin/bannerSlice';
import { adminbaseURL, mainURL } from '../../Base/Constent';
import axios from 'axios';

import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import ImageForm from './ImageForm';

function Banner(props) {
    const dispatch = useDispatch();
    const getBannerSlice = useSelector((state) => state.banner.banner);
    const error = useSelector((state) => state.banner.error);
    const [editBannerDetails, setEditBannerDetails] = useState(null);

    const handleEditBanner = (bannerDetails) => {
      setEditBannerDetails(bannerDetails);
      props.onBannerDetails(bannerDetails);
    };
// console.log(getBannerSlice,'getBannerSlice')

useEffect(() => {
    axios.get(`${adminbaseURL}/allbanner`, { withCredentials: true })
      .then((response) => {
        dispatch(setBanner(response.data));
        console.log(response.data);
      })
  }, [dispatch]);

//   delete
const removeBanner = (id) => {
    axios.delete(`${adminbaseURL}/banner/delete/${id}`)
        .then((res) => {
            dispatch(getBanner()); // Fetch updated tasks
        });
}
   
    const columns = [
      {
        name: 'Item No',
        selector: (row, index) => index + 1,
        sortable: true,
        wrap: true,
        style: {
          borderLeft: '1px solid #ddd',
          borderRight: '1px solid #ddd',
          padding: '8px',
        },
      },
      {
        name: 'Banner Name',
        selector: (row) => row.bannerName,
        sortable: true,
        wrap: true,
        style: {
          borderRight: '1px solid #ddd',
          padding: '8px',
        },
      },
      {
        name: 'subtitle',
        selector: (row) => row.subtitle,
        sortable: true,
        wrap: true,
        style: {
          borderRight: '1px solid #ddd',
          padding: '8px',
        },
      },
      {
        name: 'Banner Image',
        cell: (row) => (
          <img
            src={`${mainURL}/Public/Banner/${row.file}`}
            alt={row.bannerName}
            style={{ width: '50px', height: '50px' }}
          />
        ),
        sortable: true,
        wrap: true,
        style: {
          borderRight: '1px solid #ddd',
          padding: '8px',
        },
      },
      {
        name: 'Actions',
        ignoreRowClick: true,
        cell: (row) => (
          <>
            <div className="m-auto flex gap-3">
              <button className='' onClick={() => removeBanner(row._id)}><AiFillDelete /></button>
              <button className='' onClick={() => handleEditBanner(row)}><AiFillEdit /></button>

            </div>
          </>
        ),
        style: {
          borderRight: '1px solid #ddd',
          padding: '0px',
        },
      }
    ];
    
  return (
    <div className='sm:w-[90%] w-screen'>
        {/* {
          editBannerDetails && <ImageForm editBannerDetails={editBannerDetails} />
        } */}
        <DataTable
        title="Banner"
        columns={columns}
        data={getBannerSlice}
        pagination
        highlightOnHover
        customStyles={customStyles}
        // subHeader
        />
    </div>
  )
}
const customStyles = {
    headCells: {
        style: {
            backgroundColor: '#e2e8f0',
            fontSize: '20px',
            fontWeight: 'bold',
        },
    },
    cells: {
        style: {
            padding: '16px',
            fontSize: '13px',
            fontWeight: 'bold',
        },
    },
};
export default Banner