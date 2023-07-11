import express from 'express'
import { login, register, addPlace, getPlaces } from '../controllers/userController.js';
const router = express.Router()

//post methods
router.post('/register', register)
router.post('/login', login)
router.post('/add-place', addPlace)

//get methods
router.get('/get-places/:id', getPlaces)
 

export default router;