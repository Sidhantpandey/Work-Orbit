import express from "express"
import {Router} from "express"
import * as aiController from "../controllers/gemini.controller.js"

const router =express()

router.get('/get-result',aiController.getResult)

export default router;