import dotenv from 'dotenv';
dotenv.config();
//Se declara que parte del .env se usará en el index.js
export default {
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
    AGE_TOKEN: process.env.AGE_TOKEN,
    ORIGIN: process.env.ORIGIN
};