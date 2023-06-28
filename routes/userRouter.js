import express from 'express'
import { login, register, addBlog, getBlogs } from '../controllers/userController.js';
const router = express.Router()
import upload from '../config/multer.js';

router.post('/register', register)
router.post('/login', login)
router.post('/add-blog',upload.single("myFile"), addBlog)
router.get('/get-blogs/:id', getBlogs)

export default router;    