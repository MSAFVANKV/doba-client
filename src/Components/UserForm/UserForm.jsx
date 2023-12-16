import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { singleFormEnquiry } from '../../ReduxToolKit/User/SingleFormSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { UserFormSchema } from '../../ValidationSchema/SignUpSchema';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function UserForm({ product }) {
  const dispatch = useDispatch();
  const [postOfficeData, setPostOfficeData] = useState([]);
  const [ picError, setPinError ] = useState("")

  const formik = useFormik({
    initialValues: {
      number: '',
      email: '',
      fullName: '',
      productId: product._id,
      productName: product.productName,
      commends: '',
      landMark: '',
      pincode: '',
      postOffice: '',
      district: '',
      state: '',
    },
    validationSchema: UserFormSchema,
    onSubmit: (values) => {
      dispatch(singleFormEnquiry({ formState: values }))
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
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />

      <form
        onSubmit={formik.handleSubmit}
        className="sm:w-[500px  sm:border p-5 mt-20 rounded-3xl "
      >
        <span className="text-[1.3rem] pb-5 font-bold">Approach us for this Item</span>
        <div className="flex  gap-2 mt-10">
          <div className="">
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
          <div className="">
            <TextField
              type="number"
              label="Phone Number"
              name="number"
              variant="outlined"
              className="w-[100%] "
              value={formik.values.number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.number && Boolean(formik.errors.number)}
              helperText={formik.touched.number && formik.errors.number}
            />
          </div>
        </div>

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

        <div className="flex flex-col my-5">
          <TextField
            type="text"
            label="Product Name"
            name="productName"
            variant="outlined"
            InputProps={{ readOnly: true }}
            value={formik.values.productName}
            onChange={formik.handleChange}
          />
        </div>

       

        <div className="flex  my-5 gap-2">
          <div className="w-full ">
          <TextField
            type="text"
            label="Pincode"
            name="pincode"
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
          {picError&& <div className="text-red-900">{picError}</div> }
          </div>
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

      <div className="flex gap-2">
      <div className="w-full">
          <TextField
            type="text"
            label="District"
            name="district"
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
            variant="outlined"
            InputProps={{ readOnly: true }}
            value={formik.values.state}
            onChange={formik.handleChange}
          />
        </div>
      </div>
       
        <div className="flex flex-col my-5">
          <TextField
            type="text"
            label="landMark"
            name="landMark"
            variant="outlined"
            placeholder="Enter your landMark here"
            value={formik.values.landMark}
            error={formik.touched.landMark && Boolean(formik.errors.landMark)}
            helperText={formik.touched.landMark && formik.errors.landMark}
            onChange={formik.handleChange}
          />
        </div>

        <div className="flex flex-col my-5">
          <TextareaAutosize
            minRows={4}
            placeholder="How can we help you"
            name="commends"
            value={formik.values.commends}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2"
          />
          {formik.touched.commends && formik.errors.commends && (
            <div className="text-[0.8rem] ms-5 rounded-lg text-[#ee5050] ">
              {formik.errors.commends}
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

export default UserForm;
