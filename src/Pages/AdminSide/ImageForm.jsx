// ImageForm.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadBanner, getBanner } from '../../ReduxToolKit/Admin/bannerSlice';
import { Button, TextField, Container, Box } from '@mui/material';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import { SketchPicker } from 'react-color'; // Import the color picker component
import { ToastContainer, toast } from 'react-toastify';

function ImageForm({passData}) {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.banner.error);
  console.log(passData,"passData")

  // const [bannerInfo, setBannerInfo] = useState({
  //   bannerName: "",
  //   subtitle:"",
  //   image: null,
  //   color: "#ffffff", // Default color
  // });
  const [bannerInfo, setBannerInfo] = useState({
    bannerName: passData ? passData.bannerName : "",
    subtitle: passData ? passData.subtitle : "",
    image: null,
    color: passData ? passData.color : "#ffffff",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBannerInfo({
      ...bannerInfo,
      [name]: value,
    });
  };

  const handleImageUpload = ({ fileList: newFileList }) => {
    setBannerInfo({
      ...bannerInfo,
      image: newFileList,
    });
  };

  const handleColorChange = (color) => {
    setBannerInfo({
      ...bannerInfo,
      color: color.hex,
    });
  };

  const validateForm = () => {
    const { image } = bannerInfo;
    if (!image) {
      toast.error('Must select an Image', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false; // Return false to indicate validation failure
    }
    return true; // Return true to indicate validation success
  };
  

  const upload = async (e) => {
    e.preventDefault();

    if(!validateForm()) { return}

    try {
      const formData = new FormData();
      formData.append('bannerName', bannerInfo.bannerName);
      formData.append('subtitle', bannerInfo.subtitle);
      formData.append('image', bannerInfo.image[0]?.originFileObj || null);
      formData.append('color', bannerInfo.color); // Add color to the form data

      await dispatch(uploadBanner(formData));
      setBannerInfo({
        bannerName: "",
        subtitle:"",
        image: null,
        color: "#ffffff", // Reset color to default after upload
      });
      await dispatch(getBanner());
    } catch (error) {
      console.error("Error uploading banner:", error);
    }
  };

  return (
    <>
     <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    <form onSubmit={upload}>
      <TextField
        type="text"
        id="bannerName"
        name="bannerName"
        label="Add your Banner Title"
        value={bannerInfo.bannerName}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
       <TextField
        type="text"
        id="subtitle"
        name="subtitle"
        label="Add your Banner Subtitle"
        value={bannerInfo.subtitle}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <ImgCrop rotationSlider aspect={19 / 7}>
        <Upload
          listType="picture-card"
          fileList={bannerInfo.image}
          onChange={handleImageUpload}
        >
          {bannerInfo.image ? null : '+ Upload'}
        </Upload>
      </ImgCrop>

      {/* Color Picker */}
      <div className="mt-3">
        <label className="block text-sm font-medium text-gray-700">Select Color For your Banner Text</label>
        <SketchPicker color={bannerInfo.color} onChange={handleColorChange} />
      </div>

      {error && <div className="text-red-500 p-5">{error}</div>}
      <Box mt={3}>
        {/* <Button type="submit" variant="contained" color="primary">
          Submit
        </Button> */}
         <Button type="submit" variant="contained" color="primary">
            {passData ? "Update" : "Submit"}
          </Button>
      </Box>
    </form>
    </>
  );
}

export default ImageForm;
