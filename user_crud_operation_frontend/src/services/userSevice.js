
import axios from 'axios';
const USER_API_BASE_URL = "http://localhost:8000/user";

export const listUser  = async () => {
    return axios.get(USER_API_BASE_URL);
}

export const addUser = async (user) => {
    return await axios.post(USER_API_BASE_URL, user);
}

export const getUserById = async (id) => {
    return await axios.get(USER_API_BASE_URL + '/' + id);
}

export const updateUser = async (id, user) => {
    return await axios.put(USER_API_BASE_URL + '/' + id, user);
}

export const deleteUser = async (userId) =>  {
    return await axios.delete(USER_API_BASE_URL + '/' + userId);
}
