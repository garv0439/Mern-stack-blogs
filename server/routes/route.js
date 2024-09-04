import express from 'express';
import { singupUser, loginUser } from '../controller/user-controller.js';



const router = express.Router();



router.post('/signup', singupUser);
router.post("/login", loginUser)


export default router;