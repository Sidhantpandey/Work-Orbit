import React, { useState, useEffect, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../config/axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  socketInitialize,
  sendMessage,
  receiveMessage,
} from "../config/socket";
import { UserContext } from "../context/user.context.jsx";
import Markdown from "markdown-to-jsx";
import { extractCodeBlocks, removeCodeBlocks, hasCodeBlocks } from "../utils/codeExtractor";
import CodeExecutor from "../components/CodeExecutor";

const Project = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(new Set());
  const [project, setProject] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [codeBlocks, setCodeBlocks] = useState([]);
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const messageBox = useRef();

  const location = useLocation();

  const handleUserClick = (userId) => {
    setSelectedUser((prev) => {
      const updated = new Set(prev);
      updated.has(userId) ? updated.delete(userId) : updated.add(userId);
      return updated;
    });
  };

  const send = () => {
    if (!message.trim()) return;
    const outgoingMessage = {
      sender: { email: user.email },
      message,
      type: "outgoing",
    };
    sendMessage("project-message", outgoingMessage);
    appendOutgoingMessage(outgoingMessage);
    setMessage("");
  };

  function appendIncomingMessage(data) {
    const messageData = { ...data, type: "incoming" };
    
    // If it's an AI message, check for code blocks
    if (data.sender._id === "ai" && hasCodeBlocks(data.message)) {
      const blocks = extractCodeBlocks(data.message);
      const textWithoutCode = removeCodeBlocks(data.message);
      
      messageData.message = textWithoutCode;
      messageData.codeBlocks = blocks;
      
      // Update code blocks state for right panel
      setCodeBlocks(prev => [...prev, ...blocks.map((block, index) => ({
        ...block,
        id: `${Date.now()}-${index}`,
        messageId: `${data.sender._id}-${Date.now()}`
      }))]);
    }
    
    setMessages((prev) => [...prev, messageData]);
    scrollToBottom();
  }

  const appendOutgoingMessage = (data) => {
    setMessages((prev) => [...prev, { ...data, type: "outgoing" }]);
    scrollToBottom();
  };

  const handleExecutionResult = (result) => {
    const resultMessage = {
      sender: { _id: "system", email: "System" },
      message: result,
      type: "incoming"
    };
    setMessages((prev) => [...prev, resultMessage]);
    scrollToBottom();
  };
  const scrollToBottom = () => {
    if (messageBox.current) {
      messageBox.current.scrollTop = messageBox.current.scrollHeight;
    }
  };

  useEffect(() => {
    let unsubscribeFn;
  
    const init = async () => {
      try {
        const res = await axios.get("projects/get-project/" + location.state.project._id);
        setProject(res.data);
  
        socketInitialize(res.data._id); // Initialize socket for this project
  
        unsubscribeFn = receiveMessage("project-message", (data) => {
          appendIncomingMessage(data);
        });
      } catch (err) {
        console.error(err);
      }
  
      try {
        const resUsers = await axios.get("/users/all");
        setUsers(resUsers.data.users);
      } catch (err) {
        console.error(err);
      }
    };
  
    init();
  
    return () => {
      if (unsubscribeFn) {
        unsubscribeFn(); // clean up on unmount or before next run
      }
    };
  }, [location.state.project._id]);
  
  const addCollaborators = () => {
    axios
      .put("/projects/add-user", {
        projectId: location.state.project._id,
        users: Array.from(selectedUser),
      })
      .then((res) => {
        toast.success("Collaborators added successfully");
        setIsModalOpen(false);
        setSelectedUser(new Set());
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message || "Collaborators addition Failed!"
        );
      });
  };

  return (
    <main className="h-screen w-screen flex">
      {/* Chat + Sidebar */}
      <section className="left relative overflow-auto flex flex-col h-screen w-1/2 bg-slate-300">
        <header className="flex sticky top-0 justify-between p-4 px-4 w-full bg-slate-100 absolute z-20 top-0">
          <button
            className="flex gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="ri-user-add-line"></i>
            <p>Add Collaborators</p>
          </button>

          <button onClick={() => setShowProfile(!showProfile)}>
            <i className="ri-group-line"></i>
          </button>
        </header>

        <div className="conversation-area pt-16 flex-grow flex flex-col relative">
          <div
            ref={messageBox}
            className="overflow-auto mb-4 max-h-full message-area p-1 flex-grow flex flex-col gap-2"
          >
            {messages.map((msg, index) => {
              const isOutgoing = msg.sender?.email === user.email;
              const isSystem = msg.sender?._id === "system";

              return (
                <div
                  key={index}
                  className={`${
                    isOutgoing 
                      ? "ml-auto bg-slate-100" 
                      : isSystem
                      ? "mr-auto bg-yellow-100 border-l-4 border-yellow-500"
                      : "mr-auto bg-slate-100"
                  } flex flex-col w-fit max-w-80 p-2 rounded-md`}
                >
                  <small className="opacity-65 text-xs">{msg.sender?.email}</small>
                  <div className="text-sm">
                    {msg.sender._id === "ai" ? (
                      <div className="overflow-auto bg-blue-950 rounded-sm p-2 text-white max-w-96">
                        <Markdown>{msg.message}</Markdown>
                        {msg.codeBlocks && msg.codeBlocks.length > 0 && (
                          <div className="mt-2 text-xs text-blue-300">
                            📝 Code blocks available in the code panel →
                          </div>
                        )}
                      </div>
                    ) : isSystem ? (
                      <div className="font-mono text-xs whitespace-pre-wrap">
                        {msg.message}
                      </div>
                    ) : (
                      msg.message
                    )}
                  </div>
                </div>
              );
            })}

          </div>

          <div className="input-field w-full flex">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && send()}
              className="p-2 px-4 flex-grow border-none outline-none"
              type="text"
              placeholder="Enter the message"
            />
            <button onClick={send} className="px-5 bg-black">
              <i className="ri-send-plane-fill text-white"></i>
            </button>
          </div>
        </div>

        {/* Profile Slide Panel */}
        <AnimatePresence>
          {showProfile && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "tween", duration: 0.4 }}
              className="absolute top-0 z-50 left-0 w-full h-full bg-white shadow-lg flex flex-col"
            >
              <header className="flex justify-between items-center p-4 bg-slate-100">
                <h2 className="text-lg">Users</h2>
                <button
                  onClick={() => setShowProfile(false)}
                  className="text-red-600 text-xl font-extrabold hover:bg-red-600 hover:text-white w-7 transition-all duration-200"
                >
                  &#10005;
                </button>
              </header>
              <div className="users flex flex-col gap-2">
                {project.users?.map((user) => (
                  <div
                    key={user._id}
                    className={`user flex gap-2 items-center p-2 rounded-md hover:bg-slate-300 ${
                      selectedUser.has(user._id) ? "bg-slate-300" : ""
                    }`}
                  >
                    <div className="aspect-square rounded-full w-fit h-fit flex items-center px-1">
                      <i className="ri-user-fill"></i>
                    </div>
                    <h1 className="font-normal py-1 text-sm">{user.email}</h1>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Code Execution Panel */}
      <section className="right w-1/2 bg-gray-100 flex flex-col">
        <header className="bg-gray-800 text-white p-4">
          <div className="flex items-center gap-2">
            <i className="ri-code-s-slash-line"></i>
            <h2 className="text-lg font-semibold">Code Execution</h2>
          </div>
        </header>
        
        <div className="flex-grow overflow-auto p-4 space-y-4">
          {codeBlocks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <i className="ri-code-s-slash-line text-6xl mb-4"></i>
              <p className="text-lg">No code blocks yet</p>
              <p className="text-sm">Ask AI to generate some code and it will appear here</p>
            </div>
          ) : (
            codeBlocks.map((block) => (
              <div key={block.id} className="mb-4">
                <CodeExecutor
                  code={block.code}
                  language={block.language}
                  onExecutionResult={handleExecutionResult}
                />
              </div>
            ))
          )}
        </div>
        
        {codeBlocks.length > 0 && (
          <div className="bg-gray-200 p-3 border-t">
            <button
              onClick={() => setCodeBlocks([])}
              className="text-sm text-gray-600 hover:text-red-600 transition flex items-center gap-1"
            >
              <i className="ri-delete-bin-line"></i>
              Clear all code blocks
            </button>
          </div>
        )}
      </section>
      {/* Add Collaborator Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <div className="bg-white p-4 w-96 max-w-full rounded-md shadow-lg flex flex-col">
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
                {users.map((user) => (
                  <div
                    key={user._id}
                    className={`user cursor-pointer flex ${
                      selectedUser.has(user._id) ? "bg-slate-300" : ""
                    } hover:bg-slate-300 gap-2 items-center p-2 rounded-md transition-all duration-400`}
                    onClick={() => handleUserClick(user._id)}
                  >
                    <div className="aspect-square rounded-full w-fit h-fit flex items-center px-1">
                      <i className="ri-user-fill"></i>
                    </div>
                    <h1 className="font-normal py-1 text-sm">{user.email}</h1>
                  </div>
                ))}
              </div>

              <button
                onClick={addCollaborators}
                className="mt-4 bg-red-600 px-4 py-2 rounded-md text-white"
              >
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
