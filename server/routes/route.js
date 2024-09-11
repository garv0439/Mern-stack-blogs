import express from 'express';

import { createPost, updatePost, deletePost, getPost, getAllPosts } from '../controller/post-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import { newComment, getComments, deleteComment } from '../controller/comment-controller.js';
import { loginUser, singupUser } from '../controller/user-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import { addLike, removeLike } from '../controller/like-controller.js';

import upload from '../utils/upload.js';
    
const router = express.Router();




router.post('/signup', singupUser);
router.post("/login", loginUser);


router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/create', authenticateToken, createPost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);


router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);


router.post('/like', addLike);
router.delete('/like', removeLike);



export default router;



