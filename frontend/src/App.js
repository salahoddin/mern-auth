import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import ResetPasswordScreen from './screens/ResetPasswordScreen'

const App = () => {
	return (
		<Router>
			<Header></Header>
			<main className='py-3'>
				<Container>
					<Route path='/login' component={LoginScreen}></Route>
					<Route path='/register' component={RegisterScreen}></Route>
					<Route
						path='/forgotpassword'
						component={ForgotPasswordScreen}
					></Route>
					<Route
						exact
						path='/resetpassword/:resetToken'
						component={ResetPasswordScreen}
					></Route>
					<Route path='/' component={HomeScreen} exact></Route>
				</Container>
			</main>
			<Footer></Footer>
		</Router>
	)
}

export default App
