import axios from 'axios'
import config from './config.js'

//registro de usuario
export const register = async ({username, email, password}) => {
    let url = `${config.API_URL}/users/register`;
    try {
        const response = await axios({
            url: url,
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            data: {
                username,
                email,
                password
            },
        });
        if (response.statusText !== "Created") {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        return { error: err.response.data.message || err.message };
    }
}

//registro de usuario
export const login = async ({email, password}) => {
    let url = `${config.API_URL}/users/login`
    try {
        const response = await axios({
            url: url,
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            withCredentials: true,
            data: {
                email,
                password
            },
        });
        console.log(response.statusText)
        if (response.statusText !== "OK") {
            throw new Error(response.data.message)
        }
        return response.data
    } catch (err) {
        return { error: err.response.data.message || err.message }
    }
}
