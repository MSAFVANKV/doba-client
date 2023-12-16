// VideoForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadVideo, getVideos } from '../../ReduxToolKit/Admin/videoSlice';
import { Button, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, TextField, Container, Box } from '@mui/material';


function VideoForm() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.video.error);

  const [videos, setBannerVideos] = useState({
    videoName: "",
    videoFile: null,
  });

  const handleVideoNameChange = (e) => {
    setBannerVideos({
      ...videos,
      videoName: e.target.value,
    });
  };

  const handleVideoFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setBannerVideos({
      ...videos,
      videoFile: selectedFile,
    });
  };

  const uploadVideoFile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('videoName', videos.videoName);
      formData.append('videos', videos.videoFile);

      await dispatch(uploadVideo(formData));
      setBannerVideos({
        videoName: "",
        videoFile: null,
      });
      await dispatch(getVideos());
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    // <form onSubmit={uploadVideoFile} className='border p-2 w-[300px] h-[300px]'>
    //   {/* Your form inputs */}
    //   <input
    //         type="text"
    //         id="videoName"
    //         name="videoName"
    //         className="p-2 border rounded-md my-3"
    //         placeholder="Add your product's name"
    //         value={videos.videoName}
    //         onChange={handleVideoNameChange}
    //       />
    //       <div className="mt-5">
    //         <label htmlFor="bannerVideo" className="font-bold w-[282px] label_banner ">
    //           Add banner video
    //         </label>
    //         {/* video input */}
    //         <input
    //           type="file"
    //           id="bannerVideo"
    //           name="videos"
    //           accept=".mp4, .mkv"
    //           className=""
    //           onChange={handleVideoFileChange}
    //         />
    //       </div>
    //       <div className="flex justify-center pt-5">
    //         {videos.videoFile ? (
    //           <video src={URL.createObjectURL(videos.videoFile)} alt="" width="30px" />
    //         ) : null}
    //         </div>
         
    //   {error && <div className='text-red-500 p-5'>{error}</div>}
    //   <button type="submit" className="bt bg-slate-500 p-2 rounded-2xl font-bold text-white">
    //     SUBMIT
    //   </button>
    // </form>\
    <form onSubmit={uploadVideoFile}>
            <TextField
              type="text"
              id="videoName"
              name="videoName"
              label="Add your product's name"
              value={videos.videoName}
              onChange={handleVideoNameChange}
              fullWidth
              margin="normal"
            />
            <input
              type="file"
              id="bannerVideo"
              name="videos"
              accept=".mp4, .mkv"
              onChange={handleVideoFileChange}
            />
            <Box mt={3}>
              {videos.videoFile && (
                <video src={URL.createObjectURL(videos.videoFile)} alt="" width="30px" />
              )}
            </Box>
            <Box mt={3}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </form>
  );
}

export default VideoForm;
