import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

const Project = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <main className="h-screen w-screen flex">
      <section className="left relative flex flex-col h-full min-w-72 bg-slate-300">
        <header className="flex justify-between p-4 px-4 w-full bg-slate-100">
          <button className="flex gap-1 ">
            <i className="ri-user-add-line"></i>
            <p>Add Colloborators</p>
          </button>

          <button onClick={() => setShowProfile(!showProfile)}>
            <i className="ri-group-line"></i>
          </button>
        </header>

        <div className="conversation-area flex-grow flex flex-col h-full">
          <div className="message-area p-1 flex-grow flex flex-col gap-2">
            <div className="incoming-message max-w-64 flex flex-col bg-slate-50 w-fit p-1 rounded-md">
              <small className="opacity-65 text-xs">example@gmail.com</small>
              <p className="text-sm">Lorem ipsum dolor sit amet. lorem50</p>
            </div>

            <div className="outgoing-message max-w-64 ml-auto flex flex-col bg-slate-50 w-fit p-2 rounded-md">
              <small className="opacity-65 text-xs">example@gmail.com</small>
              <p className="text-sm">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="input-field w-full flex">
            <input
              className="p-2 px-4 flex-grow border-none outline-none"
              type="text"
              placeholder="Enter the message"
            />
            <button className="px-5 bg-black">
              <i className="ri-send-plane-fill text-white "></i>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showProfile && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }} // Start position (off-screen left)
              animate={{ x: "0%", opacity: 1 }} // Slide in
              exit={{ x: "-100%", opacity: 0 }} // Slide out
              transition={{ type: "tween", duration: 0.4 }} // Smooth animation
              className="absolute top-0 left-0 w-full h-full bg-white shadow-lg flex flex-col"
            >
              <header className="flex justify-between items-center p-4 bg-slate-100">
                <h2 className="text-lg ">Users</h2>
                <button
                  onClick={() => setShowProfile(false)}
                  className="text-red-600 text-xl font-extrabold  hover:bg-red-600 hover:text-white w-7 transition-all duration-200"
                  
                >
                &#10005;
                </button>
              </header>

              <div className="users flex flex-col gap-2">
                <div className="user cursor-pointer hover:bg-slate-200 p-1 flex gap-2 items-center ">
                  <div className="aspect-square rounded-full p-1  m-1 text-white flex items-center justify-center bg-slate-600">
                    <i className="ri-group-fill"></i>
                  </div>

                  <h1>Username</h1>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
};

export default Project;
