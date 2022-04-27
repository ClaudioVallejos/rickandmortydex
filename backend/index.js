import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import config from './config.js'
import userRouter from './routers/userRouter.js'

mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) return console.log(err)
    console.log('connected to mongodb')
});

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: config.ORIGIN
}))

app.use('/api/users', userRouter)
app.listen(config.PORT, () => {
    console.log(`running on: http://localhost:${config.PORT}`)
})