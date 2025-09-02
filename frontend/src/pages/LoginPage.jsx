import React from 'react'
import { motion } from 'framer-motion';
import { Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); 
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl
    overflow-hidden'
    >
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 to-blue-500
      text-transparent bg-clip-text'>
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>

          <Input
            icon={Mail}
            type='text'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={Lock}
            type='text'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className='flex items-center mb-6'>
            <Link to='/forget-password' className='text-sm text-blue-400 hover:underline'>
              Forget password?
            </Link>
          </div>

          <motion.button
            className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white
            font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none
            focus:ring-2 focus:ring-bule-500 focus: ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Login
          </motion.button>

        </form>
      </div>

      <div className='px-8 py-2 bg-gray-900 bg-opacity-50 flex justify-center '>
        <p className='text-gray-400 text-sm'>
          Don't have an account?{" "}
          <Link to={"/signup"} className='text-blue-400 hover:underline'>
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default LoginPage