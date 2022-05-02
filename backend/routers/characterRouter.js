import express from 'express'
import expressAssyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import Favorite from '../models/favoriteModel.js'
import config from '../config.js'

const characterRouter = express.Router()

characterRouter.post("/favorite", expressAssyncHandler(async (req, res) => {
    try{
        const { id, name, image, status, origin, gender, species } = req.body
        const cookie = req.cookies['token']
        const verified = jwt.verify(cookie, config.JWT_SECRET)
    
        if (!cookie || !verified) {
            return res.status(401).send({ status: 400, message: 'No autorizado', error: true })
        }

        const favoriteExist = await Favorite.findOne({ characterId: id })

        if (favoriteExist){
            await favoriteExist.remove()
            return res.status(200).send({ status: 200, message: 'Personaje removido de tus favoritos!', content: {} })
        }

        const newFavorite = new Favorite({
            characterId: id,
            origin: origin.name,
            userId: verified._id,
            name,
            image,
            status,
            gender,
            species,
        })
    
        const savedFavorite = await newFavorite.save()
    
        const user = await User.findOne({ _id: verified._id })
        user.favorites = user.favorites.concat(savedFavorite._id)
        await user.save()
    
        res.status(200).send({ status: 200, message: 'Favorito guardado!', content: {} })
    }catch(err){
        res.status(401).send({ status: 400, message: 'Favorito no guardado', error: err })
    }
}))

export default characterRouter;