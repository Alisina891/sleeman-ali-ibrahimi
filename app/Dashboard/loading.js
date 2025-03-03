'use client'
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div>
        <motion.div 
        className='flex justify-center mt-20'
        initial={{rotate: 0}}
        animate={{rotate: 360}}
        transition={{repeat: Infinity,duration: 1}} >
            <div className='border-t-4 border-blue-500 border-solid rounded-full w-12 h-12'></div>
        </motion.div>
    </div>
  )
}
