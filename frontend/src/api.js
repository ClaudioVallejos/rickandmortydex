import axios from 'axios'
import config from './config.js'

//metodos de usuario
export const register = async ({name, email, password}) => {
    let url = `${config.API_URL}/users/register`;
    try {
        const response = await axios({
            url: url,
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            data: {
                name,
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
        if (response.statusText !== "OK") {
            throw new Error(response.data.message)
        }
        return response.data
    } catch (err) {
        return { error: err.response.data.message || err.message }
    }
}

export const getUser = async () => {
    let url = `${config.API_URL}/users/user`
    try {
        const response = await axios({
            url: url,
            method: 'GET',
            headers: { 'Content-Type': 'Application/json' },
            withCredentials: true,
        });
        if (response.statusText !== "OK") {
            throw new Error(response.data.message)
        }
        return response.data
    } catch (err) {
        return { error: err.response.data.message || err.message }
    }
}

export const logout = async () => {
    let url = `${config.API_URL}/users/logout`
    try {
        const response = await axios({
            url: url,
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            withCredentials: true,
        });
        if (response.statusText !== "OK") {
            throw new Error(response.data.message)
        }
        return response.data
    } catch (err) {
        return { error: err.response.data.message || err.message }
    }
}

export const getCharacters = async () => {
    let url = `${config.API_URL_CHARACTERS}/character`
    try {
        const response = await axios({
            url: url,
            method: 'GET',
            headers: { 'Content-Type': 'Application/json' }
        });
        if (response.status != 200) {
            throw new Error(response.data.message)
        }
        return response.data
    } catch (err) {
        return { error: err.response.data.message || err.message }
    }
}