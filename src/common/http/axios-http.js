import Axios from 'axios';
import { getEnvVariables } from '../../helpers';

const { VITE_API_URL } = getEnvVariables();

const api = Axios.create({
    baseURL: VITE_API_URL
});

api.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token'),
    }

    return config;
});

export default api;