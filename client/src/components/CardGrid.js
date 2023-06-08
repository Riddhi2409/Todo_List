import React, { useState } from "react";
import { FiStar } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useUserAuth } from "../context/UserAuth";
import { useModalContext } from "../context/Modal";
import { BsFillCalendar2DateFill } from "react-icons/bs";

import axios from "axios";

function CardGrid({
  title,
  description,
  date,
  time,
  important,
  completed,
  _id,
  col,
}) {
  const { getId, OpenDeleteModal } = useModalContext();

  const [updatedImportant, setUpdatedImportant] = useState(important);
  const [updatedCompleted, setCompleted] = useState(completed);
  const { user } = useUserAuth();
  console.log();
  const handleDelete = () => {
    getId(_id);
    OpenDeleteModal();
  };
  const handleComplete = async () => {
    console.log(_id);
    await axios
      .post("http://localhost:8080/task/update/completed", {
        emailId: user.tokenId,
        _id,
        completed: updatedCompleted,
      })
      .then((response) => {
        console.log(response);
        setCompleted(response.data.completed);
        return response;
      })
      .catch((err) => {
        return err;
      });
  };
  const handleImportant = async () => {
    console.log(_id);
    await axios
      .post("http://localhost:8080/task/update/important", {
        emailId: user.tokenId,
        _id,
        important: updatedImportant,
      })
      .then((response) => {
        console.log(response);
        setUpdatedImportant(response.data.important);
        return response;
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <div className="flex flex-col w-sm h-md bg-white text-slate-700 rounded-lg p-4 dark:bg-slate-800 shadow-lg">
      <div>
        <h1 className="text-xl font-semibold  dark:text-white">{title}</h1>
      </div>
      {col ? (
        <div>
          <div className="text-base mt-4 h-[6rem] bg-gray-100  dark:bg-slate-800 dark:text-gray-100 overflow-y-auto p-2">
            <p>{description}</p>
          </div>
          <div className="flex flex-row justify-between gap-4 my-2 p-2 font-semibold  dark:text-white">
            <div className="flex gap-2 items-center">
              <BsFillCalendar2DateFill />
              <h1>{date.toString().split("T")[0]}</h1>
            </div>
            <h1>{time}</h1>
          </div>
          <div className="flex flex-row justify-between items-center border-dashed border-t-2 p-4">
            <button
              className={`rounded-xl w-28 text-center text-slate-700 font-semibold ${
                updatedCompleted ? "bg-green-300" : "bg-yellow-200"
              } px-2 py-1`}
              onClick={handleComplete}
            >
              {updatedCompleted ? "completed" : "uncompleted"}
            </button>

            <div className="flex flex-row gap-2 text-xl">
              <FiStar
                fill={updatedImportant ? "red" : "white"}
                color={updatedImportant ? "red" : "black"}
                onClick={handleImportant}
                cursor="pointer"
              />
              <MdDelete onClick={handleDelete} cursor="pointer" />
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="flex flex-row justify-between items-center mt-2 gap-1">
            <div className="w-4/5 h-[3rem] p-2 bg-slate-200 dark:bg-gray-700 dark:text-gray-100">{description}</div>
            <div className="flex flex-row gap-4">
              <button
                className={`rounded-xl w-28 text-center text-slate-700 font-semibold ${
                  updatedCompleted ? "bg-green-300" : "bg-yellow-200"
                } px-2 py-1`}
                onClick={handleComplete}
              >
                {updatedCompleted ? "completed" : "uncompleted"}
              </button>

              <div className="flex flex-row gap-2 text-xl dark:text-white">
                <FiStar
                  fill={updatedImportant ? "red" : "rgb(100 116 139)"}
                  color={updatedImportant ? "red" : "rgb(100 116 139)"}
                  onClick={handleImportant}
                  cursor="pointer"
                />
                <MdDelete onClick={handleDelete} cursor="pointer" />
              </div>
            </div>
          </div>
          <div>
          <div className="flex flex-row  gap-4 my-2 p-2 font-semibold dark:text-white">
            <div className="flex gap-2 items-center">
              <BsFillCalendar2DateFill />
              <h1>{date.toString().split("T")[0]}</h1>
            </div>
            <h1>{time}</h1>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardGrid;
