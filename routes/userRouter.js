import express from 'express'
const router = express.Router()
import { addUser, deleteUser, editUser, searchUser, allUsers, getUserDetails, changeStatus } from '../controllers/userController.js';
import upload from '../config/multer.js';

router.post('/add-user',upload.single("profile"), addUser)
router.put('/edit-user',editUser)
router.delete('/delete-user/:id', deleteUser)
router.get('/search-user/:key', searchUser)
router.get('/all-users', allUsers)
router.get('/get-user', getUserDetails)  
router.put('/change-status', changeStatus)
export default router; 