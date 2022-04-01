import axios from "axios";
import { requestConfig } from "./requests-easy-config";
import { BASE_URL } from "../../config";

const BASE_ENDPOINT = `${BASE_URL}/los-santos-de-la-parrilla/events`

export async function getEvents(){
    const response = await axios.get(BASE_ENDPOINT)
    return response.data;
}

export async function getEvent(id){
    const response = await axios.get(`${BASE_ENDPOINT}/${id}`);
    return response.data;
}

export async function getEventsPaginated(limit, page){
    const response = await axios.get(`${BASE_ENDPOINT}?limit=${limit}&page=${page}`);
    return response.data;
}

export async function createEvent(admin_key, title, description, image){
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if(image)formData.append('image', image, image.name);

    const response = await axios.post(BASE_ENDPOINT, formData, requestConfig(admin_key));
    return response.data;
}

export async function deleteEvent(admin_key, id){
    const response = await axios.delete(`${BASE_ENDPOINT}/${id}`, requestConfig(admin_key));
    return response.data;
}

export async function updateEvent(admin_key, id, title, description, image){
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if(image)formData.append('image', image, image.name);
    
    const response = await axios.put(`${BASE_ENDPOINT}/${id}`, formData, requestConfig(admin_key));
    return response.data;
}