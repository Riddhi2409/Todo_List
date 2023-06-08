import React,{useContext,useEffect, useState} from 'react';
import { createPortal } from 'react-dom';
import './App.css';
import Login from './components/Login';
import { useUserAuth,authContext} from './context/UserAuth';
import Home from './components/Home';
import { Routes,Route } from 'react-router';
import TaskForm from './components/TaskForm';
import { useModalContext } from './context/Modal';
import axios from 'axios';
import Delete from './components/Delete';

function App() {
  const { isAuthen,user}=useContext(authContext)
  console.log(isAuthen,user,"app");
  
  

  const {showModal,deleteModal}=useModalContext();
  return (
    <div className='w-screen dark:bg-gray-900 '>
      {isAuthen && showModal && createPortal(<TaskForm />,document.body)}
      {isAuthen && deleteModal && createPortal(<Delete />,document.body)}
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={isAuthen ? <Home /> : <Login />} />
    </Routes>
    </div>
  )


  
}

export default App;
