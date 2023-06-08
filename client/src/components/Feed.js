import React from 'react'

import { AiOutlineBars } from "react-icons/ai";
import { FiGrid } from "react-icons/fi";
import { useParams } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuth';
import { useState,useEffect } from 'react';
import { MdLightMode } from 'react-icons/md';
import {MdDarkMode } from 'react-icons/md';

import axios from 'axios';
import Layout from './Layout';
import { useModalContext } from '../context/Modal';
function Feed() {
  const [col,setCol]=useState(true);
  const {user}=useUserAuth();
  const {deleteModal,showModal}=useModalContext();
  const [darkMode,setDarkMode]=useState(false)

  const {categoryId}=useParams();
  console.log(categoryId);

  const [data,setData] = useState([])
  const[count,setCount]=useState(0)

  const getAllData = async(emailId) => {
    await axios.post(`http://localhost:8080/task/${categoryId?categoryId:'all'}`,{emailId})
        .then((response)=>{
            setData(response.data)
            setCount(response.data.length)
            return response
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
  }
  console.log(data);

  useEffect(()=>{
    if (user)(
      getAllData(user.tokenId)
    )
    console.log(data)
  },[user,categoryId,deleteModal,showModal])

  const handleTheme = () => {
    setDarkMode((prev)=>{return !prev})
    if (darkMode){
      document.documentElement.classList.add('dark')
    }
    else{
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className='flex flex-col m-10 gap-10'>
      <h1 className='text-4xl font-semibold text-slate-700 dark:text-white'>{categoryId ? categoryId : 'All'} Tasks ({count} tasks)</h1>
      <div className='flex flex-row gap-4 text-2xl justify-between'>
        <div className='flex gap-4'>
          <AiOutlineBars color={!col ? darkMode ? `red` : `blue` : `rgb(148 163 184)`} onClick={()=>setCol(false)}/>
          <FiGrid color={col ? darkMode ? `red` : `blue` : `rgb(148 163 184)`} onClick={()=>setCol(true)}/>
        </div>
        <div>
          {!darkMode && <MdLightMode onClick={handleTheme} color='white' cursor='pointer'/>}
          {darkMode && <MdDarkMode onClick={handleTheme} cursor='pointer' />}
        </div>
      </div>
      <Layout data={data} col={col}/>
    </div>
  )
}

export default Feed
