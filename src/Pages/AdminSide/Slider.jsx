import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { getSlider, setslider, uploadSlider } from '../../ReduxToolKit/Admin/SliderSlice';
import { adminbaseURL, mainURL } from '../../Base/Constent';
import axios from 'axios';
import { getProducts } from '../../ReduxToolKit/Admin/ProductsSlice';

// icons
import { AiFillDelete } from 'react-icons/ai'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { CiCircleAlert } from "react-icons/ci";



function Slider() {
    const dispatch = useDispatch()
    const sliderList = useSelector(state => state.slider?.slider);

    const [openSlider, setOpenSlider] = useState(false);
    const [sliderInfo, setSliderInfo] = useState({
        title: "",
        file: null, // For storing the selected image file
        description: "",
    });
    const [error, setError] = useState("")
    useEffect(() => {
        dispatch(getSlider()); // Fetch products when the component mounts
      }, [dispatch]);
// it helps for open and close slide Modal
    const openSliderModal = () => {
        setOpenSlider(!openSlider);
    };
    // 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSliderInfo({
            ...sliderInfo,
            [name]: value,
        });
    };
    // 
    const handleImageUpload = (e) => {
        const selectedVideo = e.target.files[0]; // Get the selected image file
        setSliderInfo({
            ...sliderInfo,
            image: selectedVideo,
        });
    };
    // validate form
    const validateForm = () => {
        const { title, image, description } = sliderInfo;
        const errors = [];

        if (!title) {
            errors.push('Product Title');
        }

        if (!image) {
            errors.push('Product Image');
        }

        if (!description) {
            errors.push('Product description');
        }

        if (errors.length > 0) {
            setError(`Please include the following fields: ${errors.join(', ')}`);
            return false;
        }

        setError('');
        return true;
    };
    // main part for upload form and file to sliderSlice and backend
    const upload = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        const formData = new FormData();
        if (!validateForm()) return;
        formData.append('title', sliderInfo.title)
        formData.append('image', sliderInfo.image)
        formData.append('description', sliderInfo.description)

        dispatch(uploadSlider(formData))
            .then(res => {
                setSliderInfo({
                    title: "",
                    image: null,
                    description: "",
                });
                openSliderModal(false)
                dispatch(getSlider());

            })
    }
    // fetch data to sliderslice
    useEffect(() => {
        axios.get(`${adminbaseURL}/allslider`, { withCredentials: true })
            .then((response) => {
                dispatch(setslider(response.data));
                console.log(response.data);
            })
    }, [dispatch]);

    //   delete table items

    const removeProduct = (id) => {
        axios.delete(`${adminbaseURL}/slider/delete/${id}`)
            .then((res) => {
                dispatch(getSlider()); // Fetch updated tasks
            });
    }

// this columns data is using in data table
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
                <img
                    src={`${mainURL}/Public/Slider/${row.file}`}
                    alt={row.title}
                    style={{ width: '50px', height: '50px' }}
                />
            ),
            sortable: true,
            wrap: true,
        },
        {
            name: 'Slider Title',
            selector: 'title', // Make sure to use the correct property name
            sortable: true,
            wrap: true,
        },
        {
            name: 'Description',
            selector: 'description', // Make sure to use the correct property name
            sortable: true,
            wrap: true,
        },
        {
            name: 'Actions',
            ignoreRowClick: true,
            cell: (row) => (
                <>
                    {/* <button onClick={() => handleEdit(row)}>Edit</button> */}
                    <button onClick={() => removeProduct(row._id)}><AiFillDelete /></button>
                </>
            ),
        }
    ];

    //   this is for checking anything is in form fields before clode
    const handleClose = () => {
        if (sliderInfo.title || sliderInfo.description || sliderInfo.image) {
            const result = window.confirm("You have unsaved changes. Are you sure you want to close?");
            if (result) {
                setSliderInfo({
                    title: "",
                    image: null,
                    description: "",
                });
                setOpenSlider();
            }
            return
        }
        setOpenSlider()
    }


    return (
        <div className='bg-slate-100 '>
            <div className="flex flex-col justify-center items-center h-full">

            <div className="flex flex-col justify-center items-center">
            <h1 className='my-10 font-semibold text-[1.5rem]'>Upload your slider</h1>


                {/* modal slider button */}
                <button onClick={openSliderModal}
                    className="bg-[#F26D1E] p-2 my-6 hover:bg-[#fd9559] rounded-xl text-white font-bold">
                    ADD SLIDER
                </button>
            </div>
            {/* madal for slider open here */}
            <div className="flex sm:items-center mb-5 sm:text-[1rem] text-[0.8rem]">
                <CiCircleAlert className='sm:w-10 w-6'/>
            Sliders section (EXPLORE) only show in home page if sliders are available !!
            </div>
            {openSlider && (
                <div
                    className="modal-container"
                    onClick={(e) => {
                        if (e.target.className === 'modal-container') handleClose(false);
                    }}
                >
                    <div className="w-[700px] h-[70%] bg-white">
                        <div
                            className="h-full overflow-y-auto"
                            style={{
                                padding: '20px', // Add padding for better content spacing
                            }}
                        >
                            {/* close Icon start*/}
                            <IoCloseCircleSharp className='float-right text-[2rem] cursor-pointer' onClick={handleClose}/>
                            {/* close Icon end*/}

                            {/* form field start */}

                            {error && <div className='p-5 bg-red-200 m-auto my-2 rounded-lg text-[#ca4747] font-bold'>{`incluse the field: ${error}`}</div>}
                            <form onSubmit={upload} className="flex flex-col justify-center mt-5 sm:mt-6 items-center gap-4">

                                <span className='font-bold text-[1.6rem]'>ADD DETAILS: SLIDER</span>
                                <div className="">
                                    <label htmlFor="productName" className="font-bold">
                                        Slider Title here
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="p-2 border rounded-md"
                                        placeholder="Add your Slider's Title"
                                        value={sliderInfo.title}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="sliderImage" className="font-bold">
                                        Add slider Image
                                    </label>
                                    <input type="file"
                                        id="sliderImage"
                                        name="image"
                                        className='p-2'
                                        onChange={handleImageUpload} />

                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="description" className="font-bold">
                                        Add Slider Description
                                    </label>
                                    <textarea name="description" id="description" cols="38" rows="5"
                                        value={sliderInfo.description}
                                        onChange={handleInputChange}
                                        className='p-2' />

                                </div>
                                <button type='submit'
                                    className="bg-[#F26D1E] p-2 hover:bg-[#fd9559] rounded-xl text-white font-bold"
                                > ADD SLIDER </button>
                            </form>
                            {/* form field end */}

                        </div>
                    </div>
                </div>
            )}
            {/* Data table start */}

            <div className=" w-[95%] mb-5">
                <DataTable
                    title="Add items"
                    columns={columns}
                    // data={productsList || []} 
                    data={sliderList}
                    pagination
                    highlightOnHover
                    customStyles={customStyles}
                    subHeader

                />
            </div>
            </div>
            {/* Data table end */}

        </div>
    );
}
// Styling for Data table react
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
            padding: '12px',
            fontSize: '12px',
            fontWeight: 'bold',
        },
    },
};
export default Slider;
