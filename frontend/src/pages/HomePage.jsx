import React from 'react'
import {motion} from 'framer-motion'
const HomePage = () => {
  return (
    <div  
    className='className="max-w-md bg-gray-800 bg-opacity-50 backdrop-filter
    backdrop-blur-xl rounded-xl shadow-xl overflow-hidden'>
     <motion.div
        className='p-8'
        initial={{opacity:0, y:-50}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5}}
     >
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 to-blue-500 text-transparent bg-clip-text'>
            Mern Authorization App
        </h2>
        
     </motion.div>
    </div>
  )
}

export default HomePage