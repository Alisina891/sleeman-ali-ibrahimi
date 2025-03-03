'use client'
import Image from "next/image";


export default function Home() {
 
  return (
    <div className="flex flex-col justify-center items-center sm:px-20 max-w-full w-screen bg-white font-serif tracking-wide">
      <div className="flex flex-col justify-center items-center bg-white bg-cover bg-center bg-[url('/images/bg2.png')] max-w-[500px] px-12 ">
        <div>
          <Image 
            src='/images/logo.png'
            alt="logo-image"
            width={180}
            height={180}
            className="mt-8"
          />
        </div>
        <div className="border-y-2 rounded-b-2xl mt-6 mb-7 flex justify-center items-center flex-col">
            <h1 className="mt-8 font-bold text-4xl">THANK YOU!</h1>
          <h1 className="text-lg text-center font-extrabold font-sans my-5 uppercase ">
          for participating in our Sleeman free custom t-shirt program.
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center w-full text-center pb-64">
            <p>Your order has been received and you will receive your order within 3 - 5 weeks.</p>
        </div>
    </div>
    </div>
  );
}

