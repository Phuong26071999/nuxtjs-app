import { axiosProduct, axiosImage } from "./config";

// export function callApiFetch(params = {}) {
//     return axios.get('/user', { params });
// }

// export function callApiAdd(params) {
//     return axios.post('/user', params)
//         .then(response => response)
//         .catch(error => error)
// }
// ============================ Product =============================
export function callApiGetProduct() {
    return axiosProduct.get('/products');
}

export function callApiGetProductID(id) {
    return axiosProduct.get(`/products/${id}`);
}

export function callApiPostProduct(data) {
    return axiosProduct.post('/products', data);
}

export function callApiPutProduct(data) {
    return axiosProduct.put(`/products/${data.id}`, data);
}

export function callApiDelProduct(id) {
    return axiosProduct.delete(`/products/${id}`);
}

// ============================ Image =============================
export function callApiImage(params) {
    return axiosImage.get(`/search/photos`, {params});
}