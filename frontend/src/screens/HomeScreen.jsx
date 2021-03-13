import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

const HomeScreen = ({ match, location, history }) => {
	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)

	const logoutHandler = () => {
		dispatch(logout())
	}

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [isAdmin, setIsAdmin] = useState('')
	const [id, setId] = useState('')

	useEffect(() => {
		if (userLogin && userLogin.userInfo) {
			const {
				userInfo: { name, email, isAdmin, _id },
			} = userLogin

			setName(name)
			setEmail(email)
			setIsAdmin(isAdmin)
			setId(_id)
		} else {
			history.push('/login')
		}
	}, [userLogin])

	return (
		<>
			<ul>
				<li>{id}</li>
				<li>{name}</li>
				<li>{email}</li>
				<li>{isAdmin.toString()}</li>
				<button onClick={logoutHandler}>Logout</button>
			</ul>
		</>
	)
}

export default HomeScreen
