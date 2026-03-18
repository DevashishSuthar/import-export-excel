export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

export interface ExcelResponse {
    excelFilePath: string;
}

export interface JsonResponse {
    jsonFilePath: string;
}