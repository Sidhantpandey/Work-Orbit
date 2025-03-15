import React, { createContext, useState, useEffect } from "react";
import axios from "../config/axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]); // Store projects
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to fetch projects
  const fetchProjects = async () => {
    if (!user) return;
    setLoading(true); // Show loader
    try {
      const res = await axios.get("/projects/all");
      setProjects(res.data.projects);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
    setLoading(false); // Hide loader
  };

  useEffect(() => {
    if (user) fetchProjects();
  }, [user]); // Fetch projects when user logs in

  return (
    <UserContext.Provider value={{ user, setUser, projects, fetchProjects, loading }}>
      {children}
    </UserContext.Provider>
  );
};
