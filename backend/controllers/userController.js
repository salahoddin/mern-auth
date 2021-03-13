import asyncHandler from 'express-async-handler'
import crypto from 'crypto'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import sendEmail from '../utils/sendEmail.js'

// @desc    Register a new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
	// email and pw are from body
	const { name, email, password } = req.body

	const userExist = await User.findOne({ email: email })
	// const isPwMatched = await user.matchPassword(password)

	if (userExist) {
		// 400 bad request
		res.status(400)
		throw new Error('User already exist')
	}

	const user = await User.create({
		name: name,
		email: email,
		password: password,
	})

	if (user) {
		// 201 something was created
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
	// email and pw are from body
	const { email, password } = req.body

	//	const user = await User.findOne({ email: email })
	const user = await User.findOne({ email }).select('+password')

	// const isPwMatched = await user.matchPassword(password)

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		})
	} else {
		// 401 unauthorized
		res.status(401)
		throw new Error('Invalid email or password')
	}
})

// @desc    forgot password
// @route   POST /api/users/forgotpassword
// @access  Public
const forgotPassword = asyncHandler(async (req, res, next) => {
	const { email } = req.body

	const user = await User.findOne({ email })

	if (!user) {
		//return next(new ErrorResponse('Email could not be sent', 404))
		res.status(404)
		throw new Error('Email could not be sent')
	}

	const resetToken = user.getResetPasswordToken()
	await user.save()

	const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`
	const message = `
	<h1>You have requested a password reset</h1>
	<p>Please go to this link to reset your password</p>
	<a href=${resetUrl} clicktracking=off>${resetUrl}</a>
	`
	try {
		await sendEmail({
			to: user.email,
			subject: 'Password reset request',
			text: message,
		})

		res.status(200).json({
			success: true,
			data: 'Email sent, check your inbox or spam folder for the reset link',
		})
	} catch (error) {
		// clear token/expire if there's an error
		user.resetPasswordToken = undefined
		user.resetPasswordExpire = undefined

		await user.save()
		res.status(500) // 500 is server error
		// throw new Error('Email could not be sent')
		throw new Error(error)
	}
})

// =================================================================================================================
const resetPassword = asyncHandler(async (req, res, next) => {
	let resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resetToken)
		.digest('hex')

	const user = await User.findOne({
		resetPasswordToken: resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	})

	if (!user) {
		res.status(400) // 500 is bad request
		throw new Error('Email could not be sent')
	}

	// reassign to new password
	user.password = req.body.password

	// reset variables
	user.resetPasswordToken = undefined
	user.resetPasswordExpire = undefined

	await user.save()

	res.status(201).json({
		success: true,
		data: 'Password has been reset successfully',
	})
})
// =================================================================================================================

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

// @desc    Get all user
// @route   GET /api/users
// @access  Private/admin

const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({})
	res.json(users)
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/admin

const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password')
	if (user) {
		res.json(user)
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

export {
	authUser,
	registerUser,
	forgotPassword,
	resetPassword,
	getUserProfile,
	getUserById,
}
