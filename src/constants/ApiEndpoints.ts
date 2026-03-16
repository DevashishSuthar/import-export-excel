interface ApiEndpoints {
    generateExcelFromJson: string;
    generateJsonFromExcel: string;
}

export const FILE_ENDPOINTS: ApiEndpoints = {
    generateExcelFromJson: '/files/upload-json',
    generateJsonFromExcel: '/files/upload-excel',
};