import Axios from '@/configs/Axios';
import { FILE_ENDPOINTS } from '@/constants/ApiEndpoints';

export const generateExcelFromJson = (data: FormData) => {
    return Axios.post(FILE_ENDPOINTS.generateExcelFromJson, data);
};

export const generateJsonFromExcel = (data: FormData) => {
    return Axios.post(FILE_ENDPOINTS.generateJsonFromExcel, data);
};