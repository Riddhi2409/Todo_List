import React, { createContext } from "react";
import { useState,useContext } from "react";

const ModalContext = createContext();

const ModalProvider = ({children}) => {
    const [showModal,setShowModal] =useState(false);
    const [deleteModal,setDeleteModal]=useState(false);
    const [id,setId]=useState('');

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const closeDeleteModal=()=>{
        setDeleteModal(false);
    }
    const OpenDeleteModal=()=>{
        setDeleteModal(true);
    }
    const getId=(id)=>{
        setId(id);
    }

    return (
        <ModalContext.Provider value={{showModal,openModal,closeModal,closeDeleteModal,OpenDeleteModal,deleteModal,getId,id,setId}}>
            {children}
        </ModalContext.Provider>
    )

}

const useModalContext = () => {
    return useContext(ModalContext)
}

export {ModalProvider ,ModalContext,useModalContext};