import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { getBanner, setBanner } from '../../ReduxToolKit/Admin/bannerSlice';
import { adminbaseURL, mainURL } from '../../Base/Constent';
import axios from 'axios';

import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import { getVideos, setVideo } from '../../ReduxToolKit/Admin/videoSlice';

function VideoBanner() {
    const dispatch = useDispatch();
    const getVideosSlice = useSelector((state) => state.video.video);

console.log(getVideosSlice,'getVideosSlice')
useEffect(() => {
    axios.get(`${adminbaseURL}/videos`, { withCredentials: true })
      .then((response) => {
        dispatch(setVideo(response.data));
        console.log(response.data);
      })
  }, [dispatch]);

//   delete
const removeVideos = (id) => {
    axios.delete(`${adminbaseURL}/videos/delete/${id}`)
        .then((res) => {
            dispatch(getVideos()); // Fetch updated tasks
        });
}

    const columns = [
        {
          name: 'Item No',
          selector: (row, index) => index + 1,
          sortable: true,
          wrap: true,
          style: {
            borderLeft: '1px solid #ddd', // Add left border style here
            borderRight: '1px solid #ddd', // Add right border style here
            padding: '8px', // Add padding to the cells
          },
        },
        {
          name: 'Banner Name',
          selector: 'videoName', // Make sure to use the correct property name
          sortable: true,
          wrap: true,
          style: {
            borderRight: '1px solid #ddd', // Add right border style here
            padding: '8px', // Add padding to the cells
          },
        },
        {
          name: 'Banner Image',
          cell: (row) => (
            <video preload="auto" width="30px"  muted controlsList='nodownload'>
            <source src={`${mainURL}${row.videos}`} />
          </video>
          ),
          sortable: true,
          wrap: true,
          style: {
            borderRight: '1px solid #ddd', // Add right border style here
            padding: '8px', // Add padding to the cells
          },
        },
        {
            name: 'Actions',
            ignoreRowClick: true,
            cell: (row) => (
                <>
                    {/* <button onClick={() => handleEdit(row)}>Edit</button> */}
                    <div className="m-auto flex gap-3">
                    <button className='' onClick={() => removeVideos(row._id)}><AiFillDelete /></button>
                    <button onClick={() => removeProduct(row._id)}><AiFillEdit /></button>
                    </div>
                </>
            ),
            style: {
                borderRight: '1px solid #ddd', // Add right border style here
                padding: '8px', // Add padding to the cells
              },
        }
      ];
      

  return (
    <div className='sm:w-fit w-[100%] sm:mb-0 mb-10'>
        <DataTable
        title="Banner"
        columns={columns}
        data={getVideosSlice}
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
            width:"200px"
        },
    },
};

export default VideoBanner