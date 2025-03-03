'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useProduct } from '../Dashboard/ProductContext';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function Form() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { selectedColor, selectedModel, selectedBackModel, selectedSize } = useProduct();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    router.push('../thanks')
  };

  const imageSrc = useMemo(() => {
    if (selectedColor === 'White' && selectedModel === 'Sleeman Mark') {
      return '/images/white-sleeman.png';
    } else if (selectedColor === 'White' && selectedModel === 'Team Mark') {
      return '/images/white-team.png';
    } else if (selectedColor === 'White' && selectedModel === 'Rounds Mark') {
      return '/images/white-nobad.png';
    }

    if (selectedColor === 'Blue' && selectedModel === 'Sleeman Mark') {
      return '/images/blue-sleeman.png';
    } else if (selectedColor === 'Blue' && selectedModel === 'Team Mark') {
      return '/images/blue-team.png';
    } else if (selectedColor === 'Blue' && selectedModel === 'Rounds Mark') {
      return '/images/blue-nobad.png';
    }

    if (selectedColor === 'Black' && selectedModel === 'Sleeman Mark') {
      return '/images/black-sleeman.png';
    } else if (selectedColor === 'Black' && selectedModel === 'Team Mark') {
      return '/images/black-team.png';
    } else if (selectedColor === 'Black' && selectedModel === 'Rounds Mark') {
      return '/images/black-nobad.png';
    }
  }, [selectedColor, selectedModel]);

  return (
    <div className="flex flex-col justify-center items-center sm:px-10 min-w-full bg-white font-serif tracking-wide">
       <div className="flex flex-col justify-center items-center bg-white bg-cover bg-center bg-[url('/images/bg2.png')] max-w-[500px] px-12">
        <div className="w-full flex justify-between items-center px-3 mt-10 border-b-2 rounded-2xl border-white pb-3">
          <Image src="/images/logo.png" alt="logo-image" width={65} height={65} />
          <Image
            onClick={() => setModalIsOpen(true)}
            src="/images/menu.png"
            alt="menu-image"
            width={20}
            height={20}
            className=" cursor-pointer"
          />
        </div>

        <div className="flex flex-col justify-center items-center py-8 border-b">
          <h1 className="font-bold text-md tracking-wide">TELL US WHERE SHOULD WE SEND THIS</h1>
          <div className="flex justify-start items-center w-full gap-5 mt-5">
            <div className="p-3 bg-white rounded-lg">
              <Image alt="image" src={imageSrc} width={120} height={120} />
            </div>
            <div className="flex flex-col font-sans text-sm">
              <h1 className="font-bold">Sleeman Clear2.0 T-Shirt</h1>
              <h2 className="font-bold">Free</h2>
              <p>Colour: {selectedColor}</p>
              <p>Front Design: {selectedModel}</p>
              <p>Back Design: {selectedBackModel}</p>
              <p>Size: {selectedSize}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start w-full px-8 mt-5">
          <p className="font-semibold">Contact Information</p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-5">
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: 'This is required' })}
              className="w-full rounded py-1 pl-3 border border-gray-300 placeholder:text-black text-black"
            />
            {errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>}

            <div className="flex my-5 text-xs items-center">
              <input type="checkbox" className="w-6 h-6 mr-2" />
              <p>Keep me up to date on news and exclusive offers</p>
            </div>

            <p>Shipping Address</p>

            {['First Name', 'Last Name', 'Address', 'Apartment, suite, etc.', 'City', 'Postal Code', 'Phone'].map((field) => (
              <div key={field}>
                <input
                  type="text"
                  placeholder={field}
                  {...register(field.toLowerCase().replace(/[^a-z]/g, ''), { required: 'This is required' })}
                  className="w-full rounded my-1 py-1 pl-3 border border-gray-300 placeholder:text-black text-black"
                />
                {errors[field.toLowerCase().replace(/[^a-z]/g, '')] && (
                  <p className="text-red-600 text-xs">{errors[field.toLowerCase().replace(/[^a-z]/g, '')].message}</p>
                )}
              </div>
            ))}

            <select {...register('country', { required: 'This is required' })} className="w-full py-2 border border-gray-300 pl-2 my-1 text-black">
              <option value="" hidden>
                Country/Region
              </option>
              <option value="Canada">Canada</option>
            </select>
            {errors.country && <p className="text-red-600 text-xs">{errors.country.message}</p>}

            <button type="submit" className="bg-red-700 w-full rounded-lg py-2 mt-3">
              SUBMIT
            </button>
          </form>
        </div>
        <div className="w-full flex flex-col text-center text-sm px-3 mt-10">
          <p className="my-3 text-sm">You must be legal drinking age to enter this experience. Do not share this content with minors.</p>
          <p className="text-sm">Pins must be redeemed by or before October 23rd, 2022. Available while supplies last. View contest rules for details.</p>
        </div>
        <div className="w-full mt-10 flex px-3 justify-between text-xs mb-10">
          <p className="underline cursor-pointer">Privacy policy</p>
          <p className="underline cursor-pointer">Contest Rules</p>
        </div>
        {modalIsOpen && (
            <div className='fixed inset-0 bg-gray-200 bg-opacity-90 backdrop-blure-md flex items-center justify-center '>
              <motion.div
                initial={{ opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0 , scale: 0.8}}
                transition={{duration: 0.1,ease: "easeInOut"}}
                className='bg-white rounded shadow-lg  
                bg-gradient-to-t from-gray-200 to-gray-600 w-screen max-w-[400px] px-5' >
                    <div className='w-full h-32 '>
                    < Image 
                      src='/images/close.png'
                      alt='close-image'
                      width={25}
                      height={24}
                      className="mt-5 cursor-pointer hover:bg-gray-400 bg-gray-300 rounded p-1 "
                      onClick={() => setModalIsOpen(false)}/>
                    </div>
                    <div className="border-y-2 rounded-t-2xl rounded-b-2xl   w-full max-w-[500] flex flex-col text-center border-black mb-16 py-10">
                      <a href='http://sleeman-ali-ibrahimi.vercel.app/' ><h1 className='text-3xl font-bold  tex-2xl text-gray-800'>HOME</h1></a>
                  </div>
              </motion.div>
            </div> )}
      </div>
    </div>
  );
}


