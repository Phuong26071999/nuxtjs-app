// import axios from "axios"

// const apiUrl = 'https://my-supplement-api.herokuapp.com'

// axios.defaults.baseURL = apiUrl;

// export default axios;

import axios from "axios";
    
// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";
    
const axiosProduct = axios.create({
    baseURL: 'https://my-supplement-api.herokuapp.com'
});
    
const axiosImage = axios.create({
    baseURL: 'https://api.unsplash.com'
});
    
    
export {
    axiosProduct,
    axiosImage
};