import express from 'express'
import guessRoute from './routes/guess.js'

const app = express()
app.use('/api/guess', guessRoute)


export default app
