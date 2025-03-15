import * as ai from "../services/gemini.services.js"

export const getResult = async(req,res)=>{
    try {
        const prompt=req.query.prompt;
        const result=await ai.generateResult(prompt);
        res.send(result);

    } catch (error) {
        res.status(500).send({message:error.message})
    }
}