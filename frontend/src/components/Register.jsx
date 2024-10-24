import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
// import { useAuth } from '../context/AuthContext';

const Register = () => {

    const [message, setMessage] = useState('');
    const {registerUser, signInWithGoogle} = useAuth();
    console.log(registerUser);

    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } 
    } = useForm();

    //register user
    const onSubmit = async (data) => {
        console.log(data);
        try {
            await registerUser(data.email, data.password);
            alert("Registration Successful");
        } catch (error) {
            setMessage("Please provide a valid email and password");
            console.error(error);
        }
    }

    const handleGooglesignIn = async () => {
        try {
            await signInWithGoogle();
            alert("Login Successful");
            navigate("/");
        } catch (error) {
            alert("google sign in failed");
            console.error(error);
        }
    }


  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-semibold mb-4'>Please Register</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className='block text-gray-500 text-sm font-bold mb-2' htmlFor="email">Email</label>
                    <input 
                    {...register("email", { required: true })}
                    type="email" name='email' id='email' placeholder='Email Address' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-500 text-sm font-bold mb-2' htmlFor="password">Password</label>
                    <input 
                    {...register("password", { required: true })}
                    type="password" name='password' id='password' placeholder='Password' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                </div>
                {
                    message && <p className='text-red-500 text-xs mb-3'>{message}</p>
                }
                <div className=''>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Register</button>
                </div>
            </form>
            <p className='text-center align-baseline text-gray-500 font-md mt-4 text-sm'>Already have an account? <Link to="/login" className='text-blue-500 hover:text-blue-700'>Login</Link></p>
            
            {/* google sign-in */}
            <div className='mt-4'>
                <button 
                onClick={handleGooglesignIn}
                className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none
                focus:shadow-outline'>
                    <FaGoogle className='mr-2' />
                    Sign up with Google
                </button>
            </div>

            <p className='mt-5 text-center text-gray-500 text-sm'> @2024 Book Store. All rights reserved</p>
        </div>
    </div>
  )
}

export default Register