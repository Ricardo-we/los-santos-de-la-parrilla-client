import axios from "axios";
import { BASE_URL } from "../../config";
import { requestConfig } from './requests-easy-config';

const BASE_ENDPOINT = `${BASE_URL}/los-santos-de-la-parrilla/gallery`;


export async function getAllGallery(){
    const response = await axios.get(BASE_ENDPOINT);
    return response.data;
}

export async function getGalleryImage(id){
    const response = await axios.get(`${BASE_ENDPOINT}/${id}`);
    return response.data;
}

export async function createImage(admin_key, image){
    const formData = new FormData();
    formData.append('image', image, image.name);

    const response = await axios.post(BASE_ENDPOINT, formData, requestConfig(admin_key));
    return response.data;
}

export async function deleteImage(admin_key, id){
    const response = await axios.delete(`${BASE_ENDPOINT}/${id}`, requestConfig(admin_key));
    console.log(response.data)
    return response.data;
}