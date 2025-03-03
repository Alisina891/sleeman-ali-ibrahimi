'use client'
import {useMemo, useState } from 'react'
import Image from 'next/image';
import { useProduct } from './ProductContext'
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { LanguageContext } from './../context/LanguageContext';
import translations from './translations';
import { useContext } from 'react';

const images = [{
  id: 1,
  bigImage: '/images/white-sleeman.png',
  smallImage: '/images/WhiteIcon.svg',
  color:      'White',
  part:       'colour'
},{
  id: 2,
  bigImage:   '/images/blue-sleeman.png',
  smallImage:  '/images/RoyalIcon.svg',
  color:        'Blue',
  part:         'colour'
},{
  id: 3,
  bigImage:   '/images/black-sleeman.png',
  smallImage:  '/images/BlackIcon.svg',
  color:       'Black',
  part:         'colour'
},{
  id: 4,
  smallImage: '/images/21.svg',
  part:       'f-design',
  model:      'Sleeman Mark'
  
},{
  id: 5,
  smallImage: '/images/22.svg',
  part:       'f-design',
  model:      'Team Mark'
},{
  id: 6,
  smallImage:  '/images/23.svg',
  part:         'f-design',
  model:         'Rounds Mark'
},{
  id: 7,
  smallImage:  '/images/b1.svg',
  part:         'b-design',
  backmodel:    'Sleeman Clear Mark'
},{
  id: 8,
  smallImage:    '/images/b2.svg',
  part:          'b-design',
  backmodel:     'Clear Mark'

},{
  id: 9,
  p:            'S',
  part:         'size',
  size:         'S',
},{
  id: 10,
  p:          'M',
  part:         'size',
  size:         'M'
},{
  id: 11,
  p:           'L',
  part:        'size',
  size:         'L' 
  },{
    
  id: 12,
  p:         'XL',
  part:     'size',
  size:      'XL'
  },]

export default function Page() {
  const [back , setback] = useState(false);
  const {selectedColor , setSelectedColor  , setSelectModel  , setSelectBackModel , setSelectSize , selectedModel ,selectedBackModel ,selectedSize} = useProduct();

  const [selectedId , setSelectedId ] = useState(images[0].id);
  
  const [selected, setSelected] = useState( images[0]?.bigImage);
  const [modalIsOpen , setModalIsOpen] = useState(false);
  const [fiter , setFilter ] =useState('colour');
  const router = useRouter();
  const {language } = useContext(LanguageContext);

  const filterItems = fiter === '' ? images: images.filter((image) => image.part === fiter);

  const handleImageSelected = (image) => {
    if (image.color) {
      setSelectedColor(image.color);
    } 
    if (image.model) {
      setSelectModel(image.model)
    }
    setSelectedId(image.id);
    if (image.bigImage) {
      setSelected(image.bigImage)
    }
    if (image.backmodel){
      setSelectBackModel(image.backmodel)
    }
    if (image.size) {
      setSelectSize(image.size)
    }
  }
  
  
  


  const handleClick = () => {
    if (fiter === 'colour'){
      setFilter('f-design');
    } else if  (fiter === 'f-design'){
      setFilter('b-design')
    } else if (fiter === 'b-design') {
          setFilter('size')
    } else if (fiter === 'size'){
        router.push('../infoForm')
    }
  }

  const imageSrc = useMemo(() => {
    if (back && selectedColor === 'White' &&   selectedBackModel === 'Sleeman Clear Mark'){
      return '/images/white-team-back.png'
    }  else if (back && selectedColor === 'White' &&  selectedBackModel === 'Clear Mark'){ 
      return '/images/white-clear-back.png'
    } else if (back && selectedColor === 'white') {
      return '/images/white-team-back.png'
    } else if (selectedColor === 'White' && selectedModel === 'Sleeman Mark') {
      return '/images/white-sleeman.png';
    }  else if (selectedColor === 'White' && selectedModel === 'Team Mark'){
      return '/images/white-team.png'
    } else if (selectedColor === 'White' && selectedModel === 'Rounds Mark'){
      return '/images/white-nobad.png'
    }

    if (back && selectedColor === 'Blue' &&   selectedBackModel === 'Sleeman Clear Mark'){
      return '/images/blue-team-back.png'
    }  else if (back && selectedColor === 'Blue' &&  selectedBackModel === 'Clear Mark'){ 
      return '/images/blue-clear-back.png'
    } else if (back && selectedColor === 'Blue') {
      return '/images/blue-team-back.png'
    } else if  (selectedColor === 'Blue' && selectedModel === 'Sleeman Mark') {
      return '/images/blue-sleeman.png'
    } else if (selectedColor === 'Blue' && selectedModel === 'Team Mark') {
      return '/images/blue-team.png'
    } else if (selectedColor === 'Blue'  && selectedModel === 'Rounds Mark'){
      return '/images/blue-nobad.png'
    }

    if (back && selectedColor === 'Black' &&  selectedBackModel === 'Sleeman Clear Mark'){
      return '/images/black-team-back.png'
    }  else if (back && selectedColor === 'Black' && selectedBackModel === 'Clear Mark'){ 
      return '/images/black-clear-back.png'
    } else if (back && selectedColor === 'Black') {
      return '/images/black-team-back.png'
    } else if  (selectedColor === 'Black' && selectedModel === 'Sleeman Mark') {
      return '/images/black-sleeman.png'
    } else if (selectedColor === 'Black' && selectedModel === 'Team Mark'){
      return '/images/black-team.png'
    } else if ( selectedColor === 'Black' && selectedModel === 'Rounds Mark'){
      return '/images/black-nobad.png'
    }

    

    return selected;
  }, [selectedColor, selectedId, selected , back]);

  const Imagesize = useMemo(() => {
  if (selectedSize === 'S'){
    return 'h-[300px] w-[300px]';
  } else if (selectedSize === 'M'){
    return 'h-[315px] w-[315px]'
  } else if (selectedSize === "L"){
    return 'h-[330px]  w-[330px]'
  } else if (selectedSize === "XL"){
    return 'h-[350px] w-[350px]'
  }
  } ,[selectedId])


  return (
    <div className="flex flex-col justify-center items-center sm:px-10  min-w-full  bg-white font-serif tracking-wide ">
     <div className=" w-full flex flex-col justify-center items-center bg-white bg-cover bg-center bg-[url('/images/bg2.png')] max-w-[500px] px-12">
      <div className='w-full flex justify-between items-center px-3 mt-10 border-b-2 rounded-2xl border-white pb-3 '>
        <Image
        src='/images/logo.png'
        alt='logo-image'
        width={65}
        height={65}
        />
        <Image
        onClick={() => setModalIsOpen(true)}
        src='/images/menu.png'
        alt='menu-image'
        width={20}
        height={20}
        className='cursor-pointer'
        />
        
      </div>

      <div className='flex min-w-full mt-7 text-white text-xs font-bold gap-5 pl-3'>
        <button onClick={() => setback(false)}>{translations[language].front}</button>
        <button onClick={() => setback(true)}>{translations[language].back}</button>
      </div>

      <div className='flex flex-col items-center justify-center min-h-[500] -mx-5'>
        <Image
        src={imageSrc}
        alt='Shirt'
        width={300}
        height={300}
        className={Imagesize}
        />
       </div>
       <Image
        src='/images/review.svg'
        alt='review'
        width={25}
        height={25}
        className='-mt-20 mb-5'
        />
     </div>

     <div className="flex w-full  max-w-[480px] px-3  bg-[url('/images/box.png')]  items-center justify-start flex-col">
        <div className='w-full max-w-md mx-auto'>
        <div className='flex text-xl sm:px-10 min-w-fullf font-extrabold h-20 overflow-auto  text-black mt-5 max-w-[450px] gap-3'>
        <button className={`px-2 py-1 ${fiter === 'colour' ? 'bg-red-700  rounded-xl text-white  ' : ''} `}
        onClick={() =>  setFilter('colour')}>{translations[language].colour}</button>
        <button className={`flex items-center gap-1 ${fiter === 'f-design' ? 'bg-red-700  rounded-xl text-white px-1 ' : ''} `} 
        onClick={() => setFilter('f-design')}>{translations[language].front}<span>{translations[language].design}</span> </button>
        <button className={`flex items-center gap-1 ${fiter === 'b-design' ? 'bg-red-700  rounded-xl text-white px-1 ' : ''} `}
        onClick={() => setFilter('b-design')}>{translations[language].back}<span>{translations[language].design}</span> </button>
        <button className={`px-2 py-1 ${fiter === 'size' ? 'bg-red-700  rounded-xl text-white px-1 ' : ''} `}
        onClick={() => setFilter('size')}>{translations[language].size}</button>
        </div>
        </div>
        <div className='mt-5 rounded-sm border-t-2 border-black w-full flex items-center  justify-center gap-8    pt-16 min-h-[200px]  '>
           {filterItems.map((image) => (
            <button 
            key={image.id}
            onClick={() => handleImageSelected(image)}>
              { image.part === 'size' ? <p className= {`${selectedId === image.id ? 'bg-red-700 text-4xl p-3 rounded-lg' : 'text-black text-3xl font-extrabold '} `}>{image.p}</p> :   <Image
            alt='Icon'
            src={image.smallImage}
            width={70}
            height={70}
            className={`${selectedId === image.id? 'p-3 bg-red-700 h-[105] w-[105] rounded-md' : ''} ` }
            />
             }
             {selectedId === image.id ?<p className=' text-red-700 font-extrabold font-sans '>{translations[language].selected}</p> : ''}
             
            </button>
           ))}
        </div>

        <div className='w-full mt-10 px-2 flex flex-col items-center justify-center'>
          <button className='text-white bg-red-700 text-xl w-full py-3 font-extrabold rounded'
          onClick={handleClick}>{translations[language].next}</button>

          <p className='mt-5 text-black text-center text-xs mb-5'>{translations[language].p1}</p>
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
                <a href='http://localhost:3000/' ><h1 className='text-3xl font-bold  tex-2xl text-gray-800'>{translations[language].menu}</h1></a>
      </div>
            </motion.div>
        </div> )}
    </div>
  )
}
