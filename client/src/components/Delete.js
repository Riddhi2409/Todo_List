import React from 'react'
import { useModalContext } from '../context/Modal'
import axios from 'axios';

function Delete() {
  const {closeDeleteModal,id,setId}=useModalContext();

  const handleDelete=async()=>{
    const _id=id;
    await axios.post("http://localhost:8080/task/delete",{_id})
    .then((response)=>{
      console.log(response)
      return response

    })
    .catch((err)=>{
      return err
    })
    setId('')
    closeDeleteModal()
  }

  return (
    <div className='fixed inset-0 backdrop-blur-sm flex justify-center items-center'>
      <div className='bg-slate-200 w-2/5 rounded-md p-4'>
      <h1 className='text-xl text-black font-semibold p-2'>Are you Sure?</h1>
      <h3 className='text-md text-slate-600 px-2'>This task will be deleted permanently</h3>
      <div className='mt-7 flex flex-row-reverse gap-4 mr-4'>
        <button className='bg-indigo-500 w-[5rem] rounded-md h-10'onClick={handleDelete}>confirm</button>
        <button onClick={closeDeleteModal} >cancel</button>
      </div>
      </div>
    </div>
  )
}

export default Delete
