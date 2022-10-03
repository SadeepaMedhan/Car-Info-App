import axios from "axios";

//base_url
const instance = axios.create({
    baseURL: 'http://127.0.0.1:4000/'
})
export default instance;