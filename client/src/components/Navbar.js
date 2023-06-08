import React from 'react'
import Button from './Button'

import { useUserAuth } from '../context/UserAuth';
import { useModalContext } from '../context/Modal';


function Navbar() {
  const {logout,user} = useUserAuth();
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
 

  return (
    <div className=' w-full flex flex-row justify-between items-center pt-10 gap-4 max-[505px]:flex-col '>
        
        <div>
            <input type='text' placeholder='search task' className='h-10 mx-4 text-center bg-neutral-300 text-black md:w-[15em] lg:w-[20em] w-[15em] rounded-md font-bold max-[500px]:w-screen dark:bg-slate-800' />
        </div>
        <h1 className="max-[950px]:hidden text-xl font-semibold dark:text-slate-300">{date}</h1>
        <div className='flex justify-center md:gap-10 gap-6 '>
            <Button className="font-semibold bg-indigo-500 text-white h-10 md:w-[10em] rounded-md w-[9em] mr-4 lg:w-[14em]"/>
        </div>
      
    </div>
  )
}

export default Navbar
