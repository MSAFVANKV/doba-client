// SpecialDay.js
import React, { useState } from 'react';
import ImageForm from './ImageForm';
import VideoForm from './VideoForm';
import Banner from './Banner';
import VideoBanner from './VideoBanner';
import {  FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, TextField, Container, Box } from '@mui/material';


function SpecialDay() {
  const [fileType, setFileType] = useState("image");
  const [passData, setPassData] = useState(null)
  const getData = (data) => {
    console.log('Received bannerDetails in SpecialDay:', data);

    setPassData(data)
  }

  return (
    // <div className="pt-3 h-[100%] flex flex-col items-center">
    <Container maxWidth="md">
    <Box mt={3}>
      <h1 className='my-10 font-semibold text-[1.5rem]'>Upload your Banner</h1>
      {/* <div className="flex gap-2 mb-3">
        Upload as
        <input
          type="radio"
          name="UserType"
          value="image"
          checked={fileType === 'image'}
          onChange={() => setFileType('image')}
        /> Image
        <input
          type="radio"
          name="UserType"
          value="video"
          checked={fileType === 'video'}
          onChange={() => setFileType('video')}
        /> Video
      </div> */}
<FormControl component="fieldset">
          <FormLabel component="legend">Upload as</FormLabel>
          <RadioGroup row value={fileType} onChange={(e) => setFileType(e.target.value)}>
            <FormControlLabel value="image" control={<Radio />} label="Image" />
            <FormControlLabel value="video" control={<Radio />} label="Video" />
          </RadioGroup>
        </FormControl>
      {fileType === "image" ? (
        <ImageForm passData={passData} />
      ) : fileType === "video" ? (
        <VideoForm />
      ) : null}
 </Box>
      {fileType && fileType === 'image' && <Banner onBannerDetails={getData} />}
      {fileType && fileType === 'video' && <VideoBanner />}
    {/* </div> */}
    </Container>
  );
}

export default SpecialDay;
