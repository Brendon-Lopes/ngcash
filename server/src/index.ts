import 'express-async-errors'
import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import userRouter from './routes/user.routes'
import globalErrorHandler from './utils/error-handling/global-error-handler'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.get('/', (req, res) => res.status(418).send())

app.use('/user', userRouter)

app.use(globalErrorHandler)

const PORT = process.env.PORT ?? 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
