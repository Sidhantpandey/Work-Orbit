import projectModel from "../models/project.models.js";
import * as projectService from "../services/project.service.js";
import { validationResult } from "express-validator";
import userModel from "../models/user.models.js";

export const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;
    const loggedInUser = await userModel.findOne({ email: req.user.email });
    const userId = loggedInUser._id;
    const newProject = await projectService.createProject({ name, userId });
    

    return res.status(201).json(newProject);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {

    const loggedInUser = await userModel.findOne({ email: req.user.email });

    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const alluserProjects = await projectService.getAllProjectsbyUserId(loggedInUser._id);

    return res.status(200).json({ projects: alluserProjects });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};


export const addUserToProject = async (req, res) => {
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  } 
  try {
    const {projectId,users}=req.body;
    const loggedInUser=await userModel.findOne({email:req.user.email});

    const project=await projectService.addUserToProject({projectId,users,userId:loggedInUser._id});
    return res.status(200).json({project});
  } catch (error) {
    return res.status(400).json({message:error.message});
  }
}

export const getProjectById = async (req, res) => {
  const {projectId}=req.params;
  try {
    const project=await projectService.getProjectById(projectId);
    return res.status(200).json(project);
  } catch (error) {
    console.log(error);
    return res.status(400).json({message:error.message});
  }
};

