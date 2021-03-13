import express from 'express'
import {
	authUser,
	registerUser,
	forgotPassword,
	resetPassword,
} from '../controllers/userController.js'
import { protect, admin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)

router.post('/login', authUser)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resetToken', resetPassword)

// router
// 	.route('/profile')
// 	.get(protect, getUserProfile)
// 	.put(protect, updtateUserProfile)

// router
// 	.route('/:id')
// 	.delete(protect, admin, deleteUser)
// 	.get(protect, admin, getUserById)
// 	.put(protect, admin, updateUser)

export default router
