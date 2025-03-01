import projectModel from "../models/project.models.js";
import mongoose from "mongoose";

export const createProject = async ({ name, userId }) => {
  if (!name) {
    throw new Error("Name is required");
  }
  if (!userId) {
    throw new Error("UserId is required");
  }

  try {
    // handling duplicate project errors
    const project = await projectModel.create({
      name,
      users: [userId],
    });

    return project; 
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Project with this name already exists");
    }
    throw error;
  }
};

export const getAllProjectsbyUserId = async (userId) => {
  if(!userId){
    throw new Error("UserId is required");
  }

  const alluserProjects=await projectModel.find({users:userId});
  return alluserProjects;
}

export const addUserToProject = async ({ projectId, users ,userId }) => {
  if(!projectId){
    throw new Error("ProjectId is required");
  }
  if(!users){
    throw new Error("Users are required");
  }
  if(!userId){
    throw new Error("UserId is required");
  }
  if(!mongoose.Types.ObjectId.isValid(projectId)){
    throw new Error("ProjectId is not valid");
  }
  if (!Array.isArray(users) || users.some(id => !mongoose.Types.ObjectId.isValid(id))) {
    throw new Error("Invalid userId in users array");
  }
  

    console.log(userId);
  // that user which want to add new user first we will check if it exists in that project or not
  const project=await projectModel.findOne({
      _id:projectId,
      users:userId
    });

  if(!project){
    throw new Error("User does not belong to this project ");
  }
  const updatedProject=await projectModel.findOneAndUpdate({
    _id:projectId
  },{
    $addToSet:{
      users:{
        $each:users
      }
    }
  },{
    new:true
  })
  return updatedProject;
}

export const getProjectById = async (projectId) => {  
  if (!projectId) {
    throw new Error("ProjectId is required");
  }

  if(!mongoose.Types.ObjectId.isValid(projectId)){
    throw new Error("ProjectId is not valid");
  }
  const project = await projectModel.findOne({
    _id: projectId,
  }).populate("users");
  return project;
}

