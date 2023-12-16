// EnquiryForm.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormEnquiry, getEnquiryForm } from '../../ReduxToolKit/User/EnquirySlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { EnquiryFormSchema } from '../../ValidationSchema/SignUpSchema';
import {
  Button, FormControl,
  FormLabel, Radio, MenuItem, Select, InputLabel,
  RadioGroup, FormControlLabel,
  TextField, Container, Box, TextareaAutosize
} from '@mui/material';



function EnquiryForm() {
  const dispatch = useDispatch();
  //   const [email, setEmail] = useState('');
  //   const [contactNumber, setContactNumber] = useState('');
  //   const [businessType, setBusinessType] = useState('');
  //   const [productType, setproductType] = useState('');
  //   const [commends, setCommends] = useState('');
  //   const [fullName, setFullName] = useState('');
  // const [formState, setFormState] = useState({
  //   contactNumber: '',
  //   email: '',
  //   fullName: '',
  //   businessType: '',
  //   productType: "BOTH",
  //   commends: '',
  // });
  // const [error, setError] = useState('');

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormState({
  //     ...formState,
  //     [name]: value,
  //   });
  // };
  //   const validateForm = () => {
  //     if (
  //       formState.contactNumber &&
  //       formState.email &&
  //       formState.fullName &&
  //       formState.commends &&
  //       formState.businessType
  //     ) {
  //       setError('');
  //       return true;
  //     } else {
  //       let errorFields = [];
  //       for (const [key, value] of Object.entries(formState)) {
  //         if (!value) {
  //           errorFields.push(key);
  //         }
  //       }
  //       setError(errorFields.join(', '));
  //       return false;
  //     }
  //   };

  //  // ... (previous code)

  // const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       if(!validateForm()){
  //         return
  //       }

  //         await dispatch(FormEnquiry({ formState }));
  //         // console.log('Form submitted successfully');
  //            // Show success toast
  //       toast.success('Form submitted successfully,\n We will get you soon', {
  //         position: 'top-right',
  //         autoClose: 4000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });
  //         dispatch(getEnquiryForm());
  //         setFormState({
  //             contactNumber: '',
  //             email: '',
  //             fullName: '',
  //             businessType: '',
  //             commends: '',
  //         });
  //         console.log('Form state reset');
  //     } catch (error) {
  //         console.error('form adding error:', error);
  //     }
  // };


  // ... (remaining code)
  const [postOfficeData, setPostOfficeData] = useState([]);
  const [ pinError, setPinError ] = useState("")

  const formik = useFormik({
    initialValues: {
      contactNumber: '',
      email: '',
      fullName: '',
      businessType: '',
      // productType: "BOTH",
      // landMark: '',
      pincode: '',
      postOffice: '',
      district: '',
      state: '',
      commends: '',
    },
    validationSchema: EnquiryFormSchema,
    onSubmit: (values) => {
      dispatch(FormEnquiry({ formState: values })).then((res) => {
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
      }).catch((error) => {
        console.error('form adding error:', error);
      });
    },
  });

  const fetchPincodeData = async (pincode) => {
    const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data && data[0] && data[0].Status === 'Success') {
        const postofficeData = data[0].PostOffice.map((item) => item.Name);
        setPostOfficeData(postofficeData);

        formik.setFieldValue('district', data[0].PostOffice[0].District);
        formik.setFieldValue('state', data[0].PostOffice[0].State);
        setPinError("")
      } else {
        // toast.error('Invalid PIN Code', {
        //   position: 'top-right',
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        // });
        setPinError("Invalid PIN Code !!!")
      }
    } catch (error) {
      toast.error('An error occurred while fetching data.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="">
      <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />

      <form onSubmit={formik.handleSubmit} className='min-w-full p-5'>

        <div className="sm:my-10 sm:flex gap-5">
          <div className="w-full sm:mb-0 mb-5">
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
            {/* <input
              type="tel"
              inputMode="numeric"
              placeholder="Contact Number"
              name='contactNumber'
              className='email'
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit number"
              minLength="10"
              maxLength="10"
              required
            /> */}
            <TextField
              type="number"
              label="Phone Number"
              name="contactNumber"
              variant="outlined"
              className="w-[100%] "
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
              helperText={formik.touched.contactNumber && formik.errors.contactNumber}

            />
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col my-5">
          <TextField
            type="text"
            label="Full Name"
            name="fullName"
            variant="outlined"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </div>
        {/*  */}
          <div className="w-full mb-5">
            {/* <InputLabel id="businessType">BusinessType</InputLabel>  */}
            <TextField
              type="text"
              label="businessType"
              id=''
              name="businessType"
              variant="outlined"
              className="w-[100%] "
              value={formik.values.businessType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.businessType && Boolean(formik.errors.businessType)}
              helperText={formik.touched.businessType && formik.errors.businessType}
            />
          {/* <div className="w-full ">
            <FormControl variant="outlined">
            <InputLabel id="productType-label">Product Type</InputLabel>
            <FormControl variant="outlined" className="w-[100%]">
              <InputLabel id="productType-label">Product Type</InputLabel>
              <Select
                labelId="productType-label"
                id="productType"
                name="productType"
                variant="outlined"
                value={formik.values.productType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Product Type"
              >
                <MenuItem value="both">BOTH</MenuItem>
                <MenuItem value="idly">IDLY</MenuItem>
                <MenuItem value="dosa">DOSA</MenuItem>
              </Select>
            </FormControl>

            </FormControl>
          </div> */}
       
        </div>


       <div className="flex gap-2 my-5">
       <div className="w-full ">
          <TextField
            type="text"
            label="Pincode"
            name="pincode"
            className="w-[100%]"
            variant="outlined"
            placeholder="Enter PIN code"
            value={formik.values.pincode}
            onChange={(e) => {
              formik.handleChange(e);
              fetchPincodeData(e.target.value);
            }}
            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
            helperText={formik.touched.pincode && formik.errors.pincode}
          />
          {pinError&& <div className="text-red-900">{pinError}</div> }
          </div>
          {/* pin end */}
          <div className="w-full">
          <FormControl variant="outlined" className="w-full">
            <InputLabel id="postOffice-label">Post Office</InputLabel>
            <Select
              labelId="postOffice-label"
              id="postOffice"
              name="postOffice"
              variant="outlined"
              value={formik.values.postOffice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-[100%]"
              error={formik.touched.postOffice && Boolean(formik.errors.postOffice)}
            helperText={formik.touched.postOffice && formik.errors.postOffice}
            >
              {postOfficeData.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
       </div>
        {/* post office end*/}

       <div className="flex gap-2 my-5">
       <div className="w-full">
          <TextField
            type="text"
            label="District"
            name="district"
            className="w-[100%]"
            variant="outlined"
            InputProps={{ readOnly: true }}
            value={formik.values.district}
            onChange={formik.handleChange}
          />
        </div>
        <div className="w-full">
          <TextField
            type="text"
            label="State"
            name="state"
            className="w-[100%]"
            variant="outlined"
            InputProps={{ readOnly: true }}
            value={formik.values.state}
            onChange={formik.handleChange}
          />
        </div>
       </div>

        <div className="">
          <TextareaAutosize
            minRows={4}
            placeholder="How can we help you"
            name="commends"
            value={formik.values.commends}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // error={formik.touched.commends && Boolean(formik.errors.commends)}
            // helperText={formik.touched.commends && formik.errors.commends}
            className="p-2"
          />
          {formik.touched.commends && formik.errors.commends && (
            <span className=' text-[0.8rem] ms-5 rounded-lg text-[#f84c4c]'>
              {formik.errors.commends}
            </span>
          )}
        </div>
        {/* {error && (
          <div className='p-5 bg-red-200 m-auto my-2 rounded-lg text-[#ca4747] font-bold'>
            {`include the field: ${error}`}
          </div>
        )} */}
        <div className='flex justify-center'>
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

export default EnquiryForm;
