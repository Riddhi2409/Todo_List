import React from "react";
import { useState } from "react";

import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";

import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";

function Home({data}) {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <div className="flex md:flex-row flex-col h-screen">
      <div className="hidden md:flex h-screen">
        <Sidebar />
        
      </div>
      <div className="flex md:hidden flex-row">
        <div className="flex flex-row justify-between mt-8 ml-8 w-screen p-6 text-xl font-semibold">
          <div>
            <HiMenu
              fontSize={40}
              className="cursor-pointer"
              onClick={() => setToggleSidebar(true)}
            />
          </div>
          <div className="max-[400px]:hidden">
            <h1>{date}</h1>
          </div>
          <div >
            <h1>TO-DO List</h1>
          </div>
        </div>
        {toggleSidebar && (
          <div className="fixed bg-white h-screen shadow-md z-10">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll">
        <Navbar />
        <Routes>
          <Route path="/*" element={<Feed />} />
          <Route path="/task/:categoryId" element={<Feed />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
