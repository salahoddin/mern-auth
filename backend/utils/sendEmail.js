import mailgun from 'mailgun-js'

const sendEmail = (options) => {
	const mg = mailgun({
		apiKey: process.env.MAILGUN_API_KEY,
		domain: process.env.MAILGUN_DOMAIN,
	})
	const data = {
		from: process.env.EMAIL_FROM,
		to: options.to,
		subject: options.subject,
		html: options.text,
	}

	mg.messages().send(data, (error, body) => {
		if (error) {
			console.log(error)
		}
		console.log(body)
	})
}

export default sendEmail
