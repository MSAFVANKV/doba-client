import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string().min(6, 'Password is too short - should be 6 chars minimum.').required('Password is Required'),
});
export const SignupAdminSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string().min(6, 'Password is too short - should be 6 chars minimum.').required('Password is Required'),
    UserType: Yup.string().required('userType is Required'),
});

export const UserFormSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please Enter a Valid Email") // This will validate the format of the email
        .min(3, "Email should be at least 3 characters long")
        .required("Please Enter Email"),

    number: Yup.string()
        .min(10, "Enter a Valid Number")
        .max(10, "Enter a Valid Number")
        .required("Please Enter a number"),

    commends: Yup.string()
        .min(10, "Content should be at least 10 characters long")
        .required("Please Enter Commends"),

    fullName: Yup.string()
        .min(3, "name should be at least 3 characters long")
        .required("Please Enter Full Name"),

    pincode: Yup.string()
        .min(6, 'Enter a valid Pincode')
        .required('Please enter Pincode'),

    postOffice: Yup.string().required('Please select a Post Office'),

    landMark: Yup.string()
        .min(5, 'Landmark should be at least 5 characters long')
        .required('Please enter Landmark'),

    district: Yup.string().required('Please enter District'),

    state: Yup.string().required('Please enter State'),
});

export const EnquiryFormSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please Enter a Valid Email") // This will validate the format of the email
        .min(3, "Email should be at least 3 characters long")
        .required("Please Enter Email"),

    contactNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit number')
        .required('Contact number is required'),

    fullName: Yup.string().required('Full name is required'),

    businessType: Yup.string().required('Business type is required'),
    pincode: Yup.string()
        .min(6, 'Enter a valid Pincode')
        .required('Please enter Pincode'),

    postOffice: Yup.string().required('Please select a Post Office'),

    district: Yup.string().required('Please enter District'),

    state: Yup.string().required('Please enter State'),
    commends: Yup.string()
        .min(10, "Content should be at least 10 characters long")
        .required("Please Enter Commends"),
});
