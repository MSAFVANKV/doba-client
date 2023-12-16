import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik'
import '../../Components/Header/Header.css'
import { SignupSchema } from '../../ValidationSchema/SignUpSchema';
import { getAllAdmins, selectAdmin, signupAdmin } from '../../ReduxToolKit/Admin/AdminLoginSlice';
import { Button } from '@mui/material';


function SignUp({ openSignup }) {

    const dispatch = useDispatch();
    const adminError = useSelector((state) => state.admin?.error);
    // console.log(adminError,"adminError");

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: SignupSchema,
        onSubmit: async (values) => {
            try {
                await dispatch(signupAdmin(values));
      dispatch(getAllAdmins());

                openSignup();
                formik.resetForm();
            } catch (error) {
                // Handle any error if needed
                console.error('Error during admin signup:', error);
            }
        }
    })

    return (
        <div className='modal-container' onClick={(e) => { if (e.target.className === 'modal-container') openSignup() }}>
            <div >
                <form action="" onSubmit={formik.handleSubmit} 
                className="bg-white w-[350px] py-2 rounded-lg flex-col pt-10 flex items-center gap-4">
                <span className='font-bold'>CREATE NEW ADMIN</span>
                {adminError && <div className='text-red-600 font-bold'>{adminError}</div>}

                    <input type="email"
                        className='border border-black w-[80%] p-2 rounded-xl bg-slate-100'
                        name='email'
                        placeholder='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                     {formik.touched.email && formik.errors.email ? 
                        <div className='text-red-600'>{formik.errors.email}</div> : null}
                    <input type="password"
                        className='border border-black w-[80%] p-2 rounded-xl bg-slate-100'
                        name='password'
                        placeholder='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? 
                        <div className='text-red-600'>{formik.errors.password}</div> : null}
                    {/* <button type='submit' className='border bg-[#F26D1E] p-3 rounded-xl shadow-lg text-white font-bold hover:bg-[#f18e54]'>SUBMIT</button> */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="btn w-[100px]"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? 'Loading...' : 'CREATE'}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default SignUp