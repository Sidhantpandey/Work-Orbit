import projectModel from '../models/project.models.js';

export const createProject = async ({name,userId}) => {
    if(!name){
        throw new Error('Name is required');
    }
    if(!userId){
        throw new Error('UserId is required');
    }
    const Project =await projectModel.create({name,users:[userId]});
}