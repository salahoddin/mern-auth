import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { resetPassword } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
// import { USER_PASSWORD_RESET_RESET } from '../constants/userConstants'

const ResetPasswordScreen = ({ history, match, location }) => {
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')
	const redirect = location.search ? location.search.split('=')[1] : '/'

	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	const userResetPassword = useSelector((state) => state.userResetPassword)
	const {
		success,
		successData,
		loading,
		error: userResetPasswordError,
	} = userResetPassword

	useEffect(() => {
		if (userLogin && userLogin.userInfo) {
			history.push(redirect)
		}
		if (success) {
			setPassword('')
			setConfirmPassword('')
			setError('')
		}

		// return () => dispatch({ type: USER_PASSWORD_RESET_RESET })
	}, [userInfo, success, userResetPasswordError])

	const resetPasswordHandler = (e) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			setError('Passwords did not match')
		} else {
			dispatch(resetPassword(match.params.resetToken, password))
			if (userResetPasswordError) {
				setError(userResetPasswordError)
			}
		}
	}

	return (
		<FormContainer>
			<h1>RESET PASSWORD</h1>
			{loading && <Loader></Loader>}
			{success && <Message variant='success'>{successData.data}</Message>}

			{error && <Message variant='danger'>{error}</Message>}
			<Form onSubmit={resetPasswordHandler}>
				<Form.Group controlId='password'>
					<Form.Label>New Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter new password...'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='confirmpassword'>
					<Form.Label>Confirm New Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm new password...'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Reset
				</Button>
			</Form>
		</FormContainer>
	)
}

export default ResetPasswordScreen
