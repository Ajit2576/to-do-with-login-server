import { Route, Router } from "react-router-dom";
import { signup, login, forgot } from "../controllers/user.controller.js";
import express  from "express";

const router = express.Router()

//Route for Registration 
router.post("/signup", signup)

//Route for Login
router.post("/login", login)

//Route for password forgot
router.post("/forgot", forgot)

//Route for reset password
// router.put("/reset", Reset) 

export default router;