import axios from 'axios';
const BASE_API_URL= "http://localhost:1337/api";

const Services = axios.create({baseURL: String(BASE_API_URL)});
 
export default Services;