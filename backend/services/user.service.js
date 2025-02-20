import userModel from "../models/user.models.js"



export const createUser=async ({name,email,password})=>{
    if(!name || !email || !password ){
        throw new Error('Fields cannot be empty')
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User Already Exists" });
    }
    const hashedPassword=await userModel.hashPassword(password)
    const user=await userModel.create({
        name,
        email,
        password:hashedPassword
    });
    return user
}

// this query will not return the logged in user thats why we passed here userId which will be loggedIn
export const getAllUsers=async({userId})=>{
    const users=await userModel.find({
        _id:{
            $ne:userId
        }
    })
    return users;
}