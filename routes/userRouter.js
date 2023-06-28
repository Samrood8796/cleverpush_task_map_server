import express from 'express'
import { login, register, addBlog, getBlogs, deleteBlog, editBlog } from '../controllers/userController.js';
const router = express.Router()
import upload from '../config/multer.js';

//post methods
router.post('/register', register)
router.post('/login', login)
router.post('/add-blog', upload.single("myFile"), addBlog)

//get methods
router.get('/get-blogs/:id', getBlogs)

//put methods
router.put('/edit-blog', editBlog)

//delete methods
router.delete('/delete-blog/:userId/:id', deleteBlog)

export default router;    