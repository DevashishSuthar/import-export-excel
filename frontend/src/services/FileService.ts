import Axios from '@/configs/Axios';
import { FILE_ENDPOINTS } from '@/constants/ApiEndpoints';
import type { AxiosResponse } from 'axios';
import type { ApiResponse, ExcelResponse, JsonResponse } from '@/types/ApiTypes';

export const generateExcelFromJson = (data: FormData): Promise<AxiosResponse<ApiResponse<ExcelResponse>>> => {
    return Axios.post(FILE_ENDPOINTS.generateExcelFromJson, data);
};

export const generateJsonFromExcel = (data: FormData): Promise<AxiosResponse<ApiResponse<JsonResponse>>> => {
    return Axios.post(FILE_ENDPOINTS.generateJsonFromExcel, data);
};