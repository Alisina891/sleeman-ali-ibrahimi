'use client'
import Image from 'next/image';
import { useState , useContext , useRef } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import translations from './translation';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';



export default function Page() {
  const {language } = useContext(LanguageContext);
  const [SavePass , setSavePass] = useState('');
  const [isClicked , setIsclicked] = useState(false)
  const [modalIsOpen , setModalIsOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef();

  const handllesSubmit = (e) => {
    e.preventDefault();
    setIsclicked(true);
    if (SavePass) {
      router.push('./Dashboard');
    } else {
      inputRef.current?.focus(); // اگر input خالی بود، فوکوس بگیرد
    }
  };

  return (
    <div className="flex flex-col justify-center items-center sm:px-20  max-w-full w-screen bg-white font-serif tracking-wide ">
       <div className="flex flex-col justify-center items-center bg-white bg-cover bg-center bg-[url('/images/bg2.png')] max-w-[500px] px-12">
      <div>
      <Image 
      src='/images/logo.png'
      alt="logo-image"
      width={180}
      height={180}
      className="mt-8"
      />
      </div>
      <div className="border-y-2 rounded-t-2xl rounded-b-2xl mt-6 mb-7 w-full max-w-[500]">
        <h1 className=" text-xl text-center font-extrabold font-serif my-14 ">{translations[language].title}</h1>
      </div>
       <div className='w-full px-2'>
       <form onSubmit={handllesSubmit}
       className='flex flex-col items-center justify-center'>
           <div className='h-20  min-w-full'>
            <label htmlFor='inputField'>
            <input
            ref={inputRef} 
            type='password' 
            placeholder='XXXXX'
            className='border border-gray-400 rounded text-center font-bold  py-3 min-w-full placeholder:text-black placeholder:text-xl ' 
            value={SavePass}
            onChange={(e) => setSavePass(e.target.value)} />
            </label>
            {!SavePass && isClicked=== true ?<p className=' w-full text-xs mt-1 text-red-500 left-0 top-0 uppercase'>{translations[language].error1}</p> :''}
           </div>
        </form>
         <div className='flex justify-center items-center min-w-full'>
         <button className='border-b rounded-lg pb-3 my-14 text-2xl font-extrabold w-72'
            onClick={() => setModalIsOpen(true)}>{translations[language].title1}</button>
         </div>
             
            <div className='min-w-full  flex flex-col h-20 items-end justify-end'>
            {!SavePass&& isClicked ? <p className='min-w-full left-0 mb-1 text-xs text-white uppercase font-bold'>{translations[language].error2}</p>: ''}
            <button className='flex min-w-full  justify-center text-center text-white bg-red-600 rounded-sm  py-3 text-lg font-bold  bottom-0' onClick={handllesSubmit}>{translations[language].letsGo}</button>
            </div>
        <div className="min-w-full flex flex-col text-center text-sm px-3 mt-10">
        <p className="my-3 text-sm">{translations[language].P1}</p>
        <p className="text-sm">{translations[language].P2}</p>
      </div>
      <div className=" w-full mt-10 flex px-3 justify-between text-xs mb-10">
      <p className=" underline cursor-pointer">{translations[language].P3}</p>
      <p className=" underline cursor-pointer">{translations[language].P4}</p>
      </div>
       </div>
      </div>
      {modalIsOpen && (
        <div className='fixed inset-0 bg-gray-200 bg-opacity-90 backdrop-blure-md flex items-center justify-center '>
                      <motion.div
                      initial={{ opacity: 0, scale: 0.8}}
                      animate={{opacity: 1, scale: 1}}
                      exit={{opacity: 0 , scale: 0.8}}
                      transition={{duration: 0.1,ease: "easeInOut"}}
                      className='bg-white rounded shadow-lg  
                      bg-gradient-to-t from-gray-300 to-gray-500 w-screen max-w-[400px] px-5' >
                        <div className='w-full h-32 '>
                        < Image 
                          src='/images/close.png'
                          alt='close-image'
                          width={25}
                          height={24}
                          className="mt-5 cursor-pointer hover:bg-gray-400 bg-gray-300 rounded p-1 "
                          onClick={() => setModalIsOpen(false)}/>
                        </div>
                        <div className="border-y-2 rounded-t-2xl rounded-b-2xl mt-6  w-full max-w-[500] flex flex-col text-center border-black mb-16">
                  <h1 className='text-3xl font-bold mt-5 text-black'>{translations[language].h1}   
                  </h1>
                  <h1 className=" text-md text-center font-extrabold font-serif mb-12 mt-5 text-black">{translations[language].title2}

                  </h1>
                </div>
          </motion.div>
       </div> )}
    </div>
  )
}


