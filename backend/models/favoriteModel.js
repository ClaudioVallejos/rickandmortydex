import mongoose from 'mongoose'

const favoriteSchema = new mongoose.Schema({
    characterId: {type: String, required: true},
    origin: {type: String, required: true},
    userId: {type: String, ref: 'User' , required: true},
    name: {type: String, required: true},
    image: {type: String, required: true},
    status: {type: String, required: true},
    gender: {type: String, required: true},
    species: {type: String, required: true},
});

export default mongoose.model('Favorite', favoriteSchema);