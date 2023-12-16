import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, TextareaAutosize } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFeedbackInfo, feedbackUpload } from '../../ReduxToolKit/User/FeedBackSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userURL } from '../../Base/Constent';

function Feedback() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedbackInfo());
  }, [dispatch]);

  const validationSchema = Yup.object({
    email: Yup.string().email("Please Enter a Valid Email") // This will validate the format of the email
    .min(3, "Email should be at least 3 characters long")
    .required("Please Enter Email"),

    phone: Yup.string() .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit number')
    .required('Contact number is required'),
    feedbacks: Yup.string().required('Feedback is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
      feedbacks: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(feedbackUpload({ formState: values }))
        .then((res) => {
          // Handle success or error
          toast.success('Form submitted successfully', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          formik.resetForm();
        })
        .catch((error) => {
          console.error('form adding error:', error);
        });
    },
  });

  return (
    <div className="min-w-full p-5">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <form onSubmit={formik.handleSubmit}>
      <div className="flex  gap-2 mt-10">
          <div className="w-full">
            <TextField
              type="email"
              label="Email"
              name="email"
              variant="outlined"
              className="w-[100%] "
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <div className="w-full">
            <TextField
              type="number"
              label="Phone Number"
              name="phone"
              variant="outlined"
              className="w-[100%] "
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </div>
        </div>

        <div className="flex flex-col my-5">
          <TextareaAutosize
            minRows={4}
            placeholder="How can we help you"
            name="feedbacks"
            value={formik.values.feedbacks}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2"
          />
          {formik.touched.feedbacks && formik.errors.feedbacks && (
            <div className="text-[0.8rem] ms-5 rounded-lg text-[#ee5050] ">
              {formik.errors.feedbacks}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="btn w-[100px]"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Loading...' : 'SUBMIT'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Feedback;
