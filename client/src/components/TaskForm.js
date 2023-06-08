import React from "react";
import { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useModalContext } from "../context/Modal";
import { useUserAuth } from "../context/UserAuth";
import axios from "axios";

function TaskForm() {
  const currentDate = new Date().toISOString().split('T')[0];
 
  const { user } = useUserAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const handleChange = async(e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      date,
      time,
      completed,
      important,
      emailId: user.tokenId,
    };
    console.log(newTask);
    await axios.post("http://localhost:8080/task",{...newTask})
            .then((Response)=>{
                return Response
            })
            .catch((err)=>{
                return err
            })
    closeModal();
  };
  const { closeModal } = useModalContext();
  const handleClose = (e) => {
    if (e.target.id == "wrapper") {
      closeModal();
    }
  };
  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div
        className="md:w-3/5 w-4/5 flex flex-col gap-2 p-4 text-slate-600 rounded-xl border-spacing-2 border-slate-800 z-50 bg-neutral-400 lg:w-2/5"
        id="nonwrapper"
      >
        <div className="flex flex-row text-xl justify-between p-2 items-center font-semibold">
          <h1>Add a task</h1>
          <RxCross2 onClick={closeModal} style={{ cursor: "pointer" }} />
        </div>
        <form className="text-lg font-medium rounded-md">
          <div className="flex flex-col m-4 gap-2 text-lg ">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g maths classwork"
              className="h-9 rounded-md p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col m-4 gap-2 text-lg ">
            <label htmlFor="email">Date</label>
            <input
              type="date"
              name="date"
              className="h-9 rounded-md p-2"
              onChange={(e) => {
                setDate(e.target.value);
              }}
              value={date}
              min={currentDate}
              required
            />
          </div>
          <div className="flex flex-col m-4 gap-2 text-lg ">
            <label htmlFor="Time">Time</label>
            <input
              type="time"
              name="time"
              className="h-9 rounded-md p-2"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
              required
            />
          </div>
          <div className="flex flex-col m-4 gap-2 text-lg">
            <label htmlFor="description">Description</label>
            <textarea
              id="message"
              name="message"
              className="h-13 rounded-md p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex gap-2 m-4 text-lg">
            <input
              type="radio"
              name="important task"
              value="important"
              onClick={() =>
                setImportant((prev) => {
                  return !prev;
                })
              }
              checked={important?true:false}
            />
            <label htmlFor="important">important task</label>
          </div>
          <div className="flex gap-2 m-4 text-lg">
            <input
              type="radio"
              name="completed task"
              value="completed"
              onClick={() =>
                setCompleted((prev) => {
                  return !prev;
                })
              }
              checked={completed?true:false}
            />
            <label htmlFor="important" id="completed task">
              completed task
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white h-10 font-semibold rounded-md"
            onClick={handleChange}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
