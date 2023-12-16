import React, { useState } from 'react'
import '../../Components/Header/Header.css'
import { useDispatch } from 'react-redux'
import { login, loginAdmin } from '../../ReduxToolKit/Admin/AdminLoginSlice'

function AdminLogin({ onAdminLoginSuccess }) {
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const hanleSubmit = (e) => {
        e.preventDefault();

        dispatch(loginAdmin({ email, password })) // Pass the email and password as an object
            .then((res) => {
                if (res.payload) {
                    dispatch(onAdminLoginSuccess());
                    setEmail("");
                    setPassword("");
                }
            })
            .catch((error) => {
                console.error('Login error:', error);
            });
    }

    return (
        <div className='modal-container'>
            <div>
                <form onSubmit={(e)=>{hanleSubmit(e)}} className="bg-white w-[350px] h-[300px] rounded-lg flex-col pt-10 flex items-center gap-4">
                <span className='font-bold'>ADMIN LOGIN</span>
                    <input type="email"
                        className='border border-black w-[80%] p-2 rounded-xl bg-slate-100'
                        value={email}
                        placeholder='email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="password"
                        className='border border-black w-[80%] p-2 rounded-xl bg-slate-100'
                        value={password}
                        placeholder='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit' className='border bg-[#F26D1E] p-3 rounded-xl shadow-lg text-white font-bold hover:bg-[#f18e54]'>SUBMIT</button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin