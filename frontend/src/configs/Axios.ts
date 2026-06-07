import axios from 'axios';

import { VITE_API_URL } from '@/configs/Env';
import { showLoader, hideLoader } from '@/redux/Slices/LoaderSlice';
import store from '@/store/Store';

const axiosInstance = axios.create({
    baseURL: VITE_API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        store.dispatch(showLoader());

        return config;
    },
    (error) => {
        store.dispatch(hideLoader());
        Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        store.dispatch(hideLoader());
        return response;
    },
    (error) => {
        store.dispatch(hideLoader());
        return error;
    }
);

export default axiosInstance;
