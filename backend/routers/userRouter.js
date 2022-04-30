import express from 'express'
import expressAssyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import config from '../config.js'

const userRouter = express.Router()

userRouter.get('/user', expressAssyncHandler(async (req, res) => {
    try {
        const cookie = req.cookies['token']
        const verified = jwt.verify(cookie, config.JWT_SECRET)
        if (!cookie || !verified) {
            return res.status(401).send({ status: 400, message: 'No autorizado', error: true })
        }
        const authUser = await User.findOne({ _id: verified._id })
        const { password, ...content } = await authUser.toJSON()
        res.status(200).send({ status: 200, message: 'success!', content: content })
    } catch (err) {
        res.status(401).send({ status: 400, message: 'No autorizado', error: true })
    }

}))

userRouter.post('/register', expressAssyncHandler(async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hasedPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hasedPassword
    })

    const userExist = await User.findOne({ email: req.body.email })

    if (userExist) return res.status(400).send({ status: 400, message: 'el email ingresado ya se encuentra registrado', error: true })

    const createdUser = await newUser.save()

    if (!createdUser) {
        return res.status(400).send([{ status: 400, message: 'Error al crear el usuario', error: true }])
    } else {
        const { password, ...content } = await createdUser.toJSON()
        res.status(201).send({ status: 201, message: 'Nuevo Ususario Creado', content: content })
    }
}))

userRouter.post("/login", expressAssyncHandler(async (req, res) => {
    const { password, email } = req.body;

    const loginUser = await User.findOne({ email: email })
    if (!loginUser) {
        return res.status(400).send({ status: 400, message: 'Usuario no encontrado', error: true })
    }
    const validPass = await bcrypt.compare(password, loginUser.password);
    if (!validPass) {
        return res.status(400).send({ status: 400, message: 'Contraseña incorrecta', error: true })
    }
    const name = loginUser.name
    const token = jwt.sign({ _id: loginUser._id }, config.JWT_SECRET)
    res.cookie(
        'token',
        token,
        {
            httpOnly: true,
            maxAge: config.AGE_TOKEN
        }
    )
    res.status(200).send({ status: 200, message: 'Login Exitoso!', content: { name } })
}))

userRouter.post('/logout', expressAssyncHandler(async (req, res) => {
    res.cookie(
        'token',
        '',
        {
            maxAge: 0
        }
    )
    res.status(200).send({ status: 200, message: 'Logout Exitoso!', content: {} })
}))

export default userRouter;