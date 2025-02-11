import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js"
export const authUser = async(req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).send({ error: 'Unauthorized User: No token provided' });
        }
        
        //For Logout Functionality
        const isBlackListed=await redisClient.get(token)
        if(isBlackListed){
            res.cookie('token',' ')
            return res.status(401).send({error:'Unauthorized User'})
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user data to the request object
        next(); 
    } catch (error) {
        // console.log(error);

        // Handle specific JWT errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({ error: 'Unauthorized User: Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ error: 'Unauthorized User: Token expired' });
        }

        return res.status(401).send({ error: 'Unauthorized User' });
    }
};