import { Router } from "express";
import { body } from "express-validator";
import * as projectController from "../controllers/project.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

// Only logged users will be able to create a project so we will use auth middleware here
const router = Router();

router.post(
  "/create",
  authMiddleware.authUser,
  body("name").isString().withMessage("Name is Required"),
  projectController.createProject
);

// to get list of all projects and display it on the dashboard

router.get("/all", authMiddleware.authUser, projectController.getAllProjects);
//end point for getting project by id
router.get('/get-project/:projectId',authMiddleware.authUser,projectController.getProjectById);

//creating end point for add users to project
router.put(
  "/add-user",
  authMiddleware.authUser,
  body("projectId").isString().withMessage("Project ID is required"),
  body("users")
    .isArray({ min: 1 })
    .withMessage("Users must be a String")
    .bail()
    .custom((users) => users.every((user) => typeof user === "string"))
    .withMessage("Users must be a string"),
    
  projectController.addUserToProject
);

// route to get detail of a project 

// route.get('/get-project',authMiddleware.authUser,projectController.getProjects)

export default router;
