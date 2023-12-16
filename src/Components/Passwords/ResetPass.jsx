import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import '../../Components/Header/Header.css';
import { forgotPass } from '../../ReduxToolKit/Admin/AdminLoginSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { adminbaseURL } from '../../Base/Constent';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@mui/material';


const validationSchema = Yup.object({
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        //     'Invalid password format: At least one uppercase letter, one lowercase letter, one number, and one special character'
        // )
        .required('Password is required'),
});



function ResetPass() {
    const navigate = useNavigate();
    const {id, token} = useParams()

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(`${adminbaseURL}/reset-password/${id}/${token}`, { password: values.password });
                // console.log(response.data, 'Password reset instructions sent successfully.');

                if (response.data.Status === "Success") {
                    navigate('/admin/dashboard');
                    toast.success('Password reset successfully', {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      });
                }
            } catch (error) {
                console.error('Error resetting password:', error);
            }
        },
    });

    return (
        <div className="modal-container">
              <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
            <div>
                <form onSubmit={formik.handleSubmit} className="bg-white w-[350px] py-2 rounded-lg flex-col pt-10 flex items-center gap-4">
                    <span className="font-bold">CHANGE PASSWORD</span>

                    <input
                        type="password"
                        className={`border w-[80%] p-2 rounded-xl bg-slate-100 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-black'}`}
                        name="password"
                        placeholder="Enter password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500">{formik.errors.password}</div>
                    ) : null}

                    {/* <button type="submit" className="border bg-[#F26D1E] p-2 w-[80%] my-5 rounded-xl shadow-lg text-white font-bold hover:bg-[#f18e54]">
                        UPDATE PASSWORD
                    </button> */}
                     <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="btn w-[100px]"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? 'Loading...' : 'UPDATE PASSWORD'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default ResetPass;

