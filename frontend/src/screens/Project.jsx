import React, { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import axios from '../config/axios'
import { useLocation } from "react-router-dom";

const Project = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [project,setProject]=useState({})

  const location = useLocation();
  // const users = [
  //   { id: 1, name: "user1" },
  //   { id: 2, name: "user2" },
  //   { id: 3, name: "user3" },
  //   { id: 4, name: "user4" },
  //   { id: 5, name: "user5" },
  //   { id: 6, name: "user6" },
  //   { id: 7, name: "user7" },
  //   { id: 8, name: "user8" },
  //   { id: 9, name: "user9" },
  //   { id: 10, name: "user10" },
  // ];

  // we will convert it into a state variable 
  const [users,setUsers]=useState([])

  const handleUserClick = (userId) => {
    setSelectedUser(prevSelected => {
      const newSelectedUserId = new Set(prevSelected);
      if (newSelectedUserId.has(userId)) {
        newSelectedUserId.delete(userId);
      } else {
        newSelectedUserId.add(userId);
      }
      console.log(Array.from(newSelectedUserId));
      return newSelectedUserId;
    });
  };
  
  // console.log(location.state) to debug location of project id 
  function addCollaborators(){
    axios.put('/projects/add-user',
      {
        projectId:location.state.project._id,
        users:Array.from(selectedUser)
      }).then(res=>{
        console.log(res.data);
        setIsModalOpen(false)
      })
  }
// getting all users and storing them in state variable
  useEffect(() => {
    axios.get('projects/get-project/'+location.state.project._id).then(res=>{
      setProject(res.data)
      console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })



    axios.get('/users/all').then(res=>{
      setUsers(res.data.users)
    }).catch((err)=>{
      console.log(err)
    })
  }, [])
  

  return (
    <main className="h-screen w-screen flex">
      <section className="left relative flex flex-col h-full min-w-72 bg-slate-300">
        <header className="flex justify-between p-4 px-4 w-full bg-slate-100">
          <button className="flex gap-2" onClick={() => setIsModalOpen(true)}>
            <i className="ri-user-add-line"></i>
            <p>Add Collaborators</p>
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
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "tween", duration: 0.4 }}
              className="absolute top-0 left-0 w-full h-full bg-white shadow-lg flex flex-col"
            >
              <header className="flex justify-between items-center p-4 bg-slate-100">
                <h2 className="text-lg ">Users</h2>
                <button
                  onClick={() => setShowProfile(false)}
                  className="text-red-600 text-xl font-extrabold hover:bg-red-600 hover:text-white w-7 transition-all duration-200"
                >
                  &#10005;
                </button>
              </header>

              <div className="users flex flex-col gap-2 ">
                {project.users && project.users.map(user => {
                  return (
                    <div key={user._id} className={`user flex gap-2 items-center p-2 rounded-md  hover:bg-slate-300 ${  Array.from(selectedUser).includes(user._id) ? 'bg-slate-300' : ""} hover:transition-transform duration-200`}>
                      <div className="aspect-square rounded-full w-fit cursor-pointer h-fit flex items-center px-1 ">
                        <i className="ri-user-fill"></i>
                      </div>
                      <h1 className="font-normal py-1 text-sm">{user.email}</h1>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <div className="bg-white p-4 w-96 max-w-full relative rounded-md shadow-lg flex flex-col">
              <header className="flex justify-between items-center mb-4">
                <h2 className="text-lg">Select User</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-red-600 text-xl font-extrabold hover:bg-red-600 hover:text-white w-7 transition-all duration-200"
                >
                  &#10005;
                </button>
              </header>

              <div className="user-list flex flex-col max-h-96 overflow-auto gap-2">
                {users.map(user => (
                  <div
                    key={user._id}
                    className={`user cursor-pointer flex ${
                      Array.from(selectedUser).includes(user._id) ? 'bg-slate-300' : ''
                    } hover:bg-slate-300 gap-2 items-center p-2 rounded-md transition-all duration-400`}
                    onClick={() => handleUserClick(user._id)}
                  >
                    <div className="aspect-square rounded-full w-fit cursor-pointer h-fit flex items-center px-1 "> 
                      <i className="ri-user-fill "></i>
                    </div>
                    <h1 className="font-normal py-1 text-sm">{user.email}</h1>
                  </div>
                ))}
              </div>

              <button onClick={addCollaborators} className="mt-4  bg-red-600 px-4 py-2  rounded-md text-white">
                Add Collaborators
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Project;
