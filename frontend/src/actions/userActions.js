import axios from 'axios'
import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_RESET,
	USER_RECOVERY_EMAIL_REQUEST,
	USER_RECOVERY_EMAIL_SUCCESS,
	USER_RECOVERY_EMAIL_FAIL,
	USER_RECOVERY_EMAIL_RESET,
	USER_PASSWORD_RESET_REQUEST,
	USER_PASSWORD_RESET_SUCCESS,
	USER_PASSWORD_RESET_FAIL,
} from '../constants/userConstants'

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		})

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(
			'/api/users',
			{ name, email, password },
			config
		)

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		})

		// log in user after successful register
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})

		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		})

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(
			'/api/users/login',
			{ email, password },
			config
		)
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})

		// save the user to localstorage/ data is the user object
		// localStorage.setItem('authToken', data.token)
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const sendRecoveryEmail = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_RECOVERY_EMAIL_REQUEST,
		})

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(
			'/api/users/forgotpassword',
			{ email },
			config
		)
		dispatch({
			type: USER_RECOVERY_EMAIL_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_RECOVERY_EMAIL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const resetPassword = (resetToken, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_PASSWORD_RESET_REQUEST,
		})

		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.put(
			`/api/users/resetpassword/${resetToken}`,
			{
				password,
			},
			config
		)

		dispatch({
			type: USER_PASSWORD_RESET_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_PASSWORD_RESET_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo')
	dispatch({ type: USER_LOGOUT })
	dispatch({ type: USER_REGISTER_RESET })
	// dispatch({ type: ORDER_LIST_MY_RESET })
	// dispatch({ type: USER_LIST_RESET })
}
