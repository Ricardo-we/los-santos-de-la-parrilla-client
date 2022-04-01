import { BASE_URL } from "../../config";
import { requestConfig } from "./requests-easy-config";
import axios from "axios";

const BASE_ENDPOINT = `${BASE_URL}/los-santos-de-la-parrilla/admin`;

export async function getAdmin(username, password, email){
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);

    const response = await axios.post(BASE_ENDPOINT + '/check-admin', formData);
    return response.data;
}

export async function getAdmins(key){
    const response = await axios.get(BASE_ENDPOINT, requestConfig(key))
    return response.data;
}

export async function addAdmin(key, username, password, email){
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);

    const response = await axios.post(BASE_ENDPOINT, formData, requestConfig(key));
    console.log(response.data)
    return response.data;
}

export async function updateAdmin(key, id, username, password, email){
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('id', id);

    const response = await axios.put(BASE_ENDPOINT, formData, requestConfig(key));
    return response.data;
}

export async function deleteAdmin(key, id){
    const response = await axios.delete(`${BASE_ENDPOINT}/${id}`, requestConfig(key));
    return response.data;
}