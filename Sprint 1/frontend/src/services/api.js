import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://e186-2804-14d-68b2-2e8-e063-9311-61c7-4f0c.ngrok.io'
})