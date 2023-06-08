import React from 'react'
import { useModalContext } from '../context/Modal'

function Button({className}) {
  const {openModal}=useModalContext()
  return (
    <div>
      <button className={className} onClick={openModal}>Add Task</button>
    </div>
  )
}

export default Button
