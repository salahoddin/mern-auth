import express from 'express'
import dotenv from 'dotenv'
import color from 'colors'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config({
	path: '.env',
})

connectDB()

const app = express()

app.use(express.json())

app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
	res.send('API is running....')
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)
