import api from './api';
import { API_ROUTES } from '../constants/api';
export const authApi = {
    login: async (data) => {
        const response = await api.post(API_ROUTES.AUTH.LOGIN, data);
        return response.data;
    },
    register: async (data) => {
        const response = await api.post(API_ROUTES.AUTH.REGISTER, data);
        return response.data;
    },
    getPairingToken: async () => {
        const response = await api.get(API_ROUTES.AUTH.PAIR);
        return response.data;
    },
    linkDevice: async (data) => {
        const response = await api.post(API_ROUTES.AUTH.LINK, data);
        return response.data;
    },
    validateDeviceSecret: async (data) => {
        const response = await api.post(API_ROUTES.AUTH.VALIDATE_SECRET, data);
        return response.data;
    },
};
