import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { sendRecoveryEmail } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ForgotPasswordScreen = ({ history, location }) => {
	const [email, setEmail] = useState('')
	const [isBlank, setIsBlank] = useState(null)

	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	const userRecoveryEmail = useSelector((state) => state.userRecoveryEmail)
	const { loading, successData, success } = userRecoveryEmail

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (userInfo) {
			// redirect if already logged in
			history.push(redirect)
		}
	}, [history, userInfo, redirect, success, isBlank])

	const forgotpasswordHandler = (e) => {
		e.preventDefault(e)
		if (!email) {
			setIsBlank(true)
		} else {
			setIsBlank(false)
			dispatch(sendRecoveryEmail(email))
			setEmail('')
		}
	}

	return (
		<FormContainer>
			<h1>FORGOT PASSWORD</h1>
			{loading && <Loader></Loader>}
			{isBlank && (
				<Message variant='danger'>{'Please provide an email'}</Message>
			)}
			{success && !isBlank && (
				<Message variant='success'>{successData.data}</Message>
			)}
			<Form onSubmit={forgotpasswordHandler}>
				<Form.Group controlId='email'>
					<Form.Label>
						Please enter the email address you register your account with. We
						will send you reset password confirmation to this email.
					</Form.Label>

					<Form.Control
						type='email'
						placeholder='Enter email...'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Send Email
				</Button>
			</Form>
		</FormContainer>
	)
}

export default ForgotPasswordScreen
