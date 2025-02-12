import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: [true, 'Project name already exists'],
    },

    users:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timeStamps:true});

const Project = mongoose.model('Project', projectSchema);
export default Project 