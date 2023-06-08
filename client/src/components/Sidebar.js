import React from 'react';
import Button from './Button';
import { NavLink } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { IoLogoWhatsapp } from "react-icons/io";
import { useUserAuth } from '../context/UserAuth';

const isNotActiveStyle = 'h-[2.5em] hover:text-rose-600 hover:bg-violet-100 pl-[15px] py-2  my-auto dark:hover:text-white dark:hover:bg-slate-700';
const isActiveStyle = 'h-[2.5em] text-rose-600 bg-violet-100 pl-[15px] py-2 my-auto border-r-4 border-red-400 dark:bg-slate-700 dark:text-white dark:border-white';

const category = [
    {name: 'All Tasks'},
    {name: "Today's Task"},
    {name: 'Important Task'},
    {name: 'Completed Task'},
    {name: 'Uncompleted Task'},
]

function Sidebar() {
    const {logout,user} = useUserAuth();
    
  return (
    <div className='flex flex-col dark:bg-slate-800 bg-white gap-10 justify-between h-full overflow-y-auto min-w-[20em] hide-scrollbar dark:text-slate-400'>
        <div className='flex flex-col justify-center'>
            <div className='flex flex-col items-center text-bold gap-10 mt-10'>
                <h1 className='font-bold text-lg'>TO-DO LIST</h1>
                
                <Button className="font-semibold bg-indigo-500 text-white h-10 w-[10em] rounded-md"/>
            </div>
                <div className='flex flex-col gap-4 mt-8 text-base '>
                {category.map((cat)=>(
                    <NavLink 
                        to={`/task/${cat.name.split(" ")[0]}`}
                        className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                        key={cat.name}
                    >{cat.name}
                    </NavLink>
                ))}
            </div>
            
            
        </div>
        <button 
              className='h-10 bg-orange-300 md:w-[10em] rounded flex flex-row justify-center gap-2 items-center font-semibold text-white w-[7em] mb-4 ml-4'
              onClick={logout}
            >
              <img src={user.picture} className='rounded-full w-8'/>
              Logout
            </button>
    </div>
  )
}

export default Sidebar
