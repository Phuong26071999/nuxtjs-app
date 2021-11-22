import axios from "axios"

// const apiUrl = 'http://localhost:3001'

const apiUrl = 'https://my-supplement-api.herokuapp.com'

axios.defaults.baseURL = apiUrl;

export default axios;