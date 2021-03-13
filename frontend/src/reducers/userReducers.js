import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_RESET,
	USER_RECOVERY_EMAIL_REQUEST,
	USER_RECOVERY_EMAIL_SUCCESS,
	USER_RECOVERY_EMAIL_FAIL,
	USER_RECOVERY_EMAIL_RESET,
	USER_PASSWORD_RESET_REQUEST,
	USER_PASSWORD_RESET_SUCCESS,
	USER_PASSWORD_RESET_FAIL,
	USER_PASSWORD_RESET_RESET,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST: {
			return {
				loading: true,
			}
		}
		case USER_LOGIN_SUCCESS: {
			return {
				loading: false,
				userInfo: action.payload,
			}
		}
		case USER_LOGIN_FAIL: {
			return {
				loading: false,
				error: action.payload,
			}
		}

		case USER_LOGOUT: {
			return {}
		}
		default:
			return state
	}
}

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST: {
			return {
				loading: true,
			}
		}
		case USER_REGISTER_SUCCESS: {
			return {
				loading: false,
				success: true,
				// userInfo: action.payload
			}
		}
		case USER_REGISTER_FAIL: {
			return {
				loading: false,
				success: false,
				error: action.payload,
			}
		}
		case USER_REGISTER_RESET: {
			return {}
		}
		default:
			return state
	}
}
export const userRecoveryEmailReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_RECOVERY_EMAIL_REQUEST: {
			return {
				loading: true,
			}
		}
		case USER_RECOVERY_EMAIL_SUCCESS: {
			return {
				loading: false,
				success: true,
				successData: action.payload,
			}
		}
		case USER_RECOVERY_EMAIL_FAIL: {
			return {
				loading: false,
				success: false,
				error: action.payload,
			}
		}
		case USER_RECOVERY_EMAIL_RESET: {
			return {}
		}
		default:
			return state
	}
}
export const userResetPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_PASSWORD_RESET_REQUEST: {
			return {
				loading: true,
			}
		}
		case USER_PASSWORD_RESET_SUCCESS: {
			return {
				loading: false,
				success: true,
				successData: action.payload,
			}
		}
		case USER_PASSWORD_RESET_FAIL: {
			return {
				loading: false,
				success: false,
				error: action.payload,
			}
		}
		case USER_PASSWORD_RESET_RESET: {
			return {}
		}
		default:
			return state
	}
}
