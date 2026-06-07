const path = require('path');

const { FILE_DIRECTORIES } = require('../constants/global.constant');
const { BAD_REQUEST } = require('../constants/http-status-code.constant');
const { FILE_MESSAGES, COMMON_MESSAGES } = require('../constants/messages.constant');
const apiHelper = require('../helpers/api.helper');
const {
    readFile,
    writeFile,
    deleteFile,
    generateJsonFileFromExcel,
    generateExcelFileFromJson
} = require('../helpers/utils.helper');

const { PUBLIC_DIR, ASSETS_DIR, JSONS_DIR } = FILE_DIRECTORIES;

const convertJsonToExcelFile = async (req, res) => {
    try {
        const { file, fileValidationError, body } = req;
        if (fileValidationError) {
            return apiHelper.failure(res, COMMON_MESSAGES.JSON_FORMAT_ALLOWED, [], BAD_REQUEST);
        }
        if (!file) {
            return apiHelper.failure(res, COMMON_MESSAGES.FILE_REQUIRED, [], BAD_REQUEST);
        }
        const { path: filePath } = file;
        const { generatedFileType } = JSON.parse(JSON.stringify(body));
        const jsonStringifyFileData = await readFile(path.join(__dirname, '..', filePath));
        deleteFile(filePath);
        if (jsonStringifyFileData) {
            const parseFileData = JSON.parse(jsonStringifyFileData);
            const modifiedParseFileData = typeof parseFileData === 'object' && !Array.isArray(parseFileData) ? [parseFileData] : parseFileData;
            const uniqueKeysForHeader = Object.keys(modifiedParseFileData.reduce((result, obj) => Object.assign(result, obj), {}));
            const excelFilePath = await generateExcelFileFromJson({
                uniqueKeys: uniqueKeysForHeader,
                parseFileData: modifiedParseFileData,
                generatedFileType
            });
            return apiHelper.success(res, FILE_MESSAGES.GENERATE_EXCEL, { excelFilePath });
        }
        return apiHelper.failure(res, FILE_MESSAGES.GENERATE_EXCEL_ERROR, [], BAD_REQUEST);
    } catch (error) {
        return apiHelper.failure(res, error.message);
    }
};

const convertExcelToJsonFile = async (req, res) => {
    try {
        const { file, fileValidationError } = req;
        if (fileValidationError) {
            return apiHelper.failure(res, COMMON_MESSAGES.EXCEL_FORMAT_ALLOWED, [], BAD_REQUEST);
        }
        if (!file) {
            return apiHelper.failure(res, COMMON_MESSAGES.FILE_REQUIRED, [], BAD_REQUEST);
        }
        const { path: filePath } = file;
        const jsonFileData = generateJsonFileFromExcel({ filePath });
        deleteFile(filePath);
        if (jsonFileData && jsonFileData.length) {
            const baseFilePath = `${ASSETS_DIR}/${JSONS_DIR}/json-${Date.now()}.json`;
            writeFile({
                filePath: path.join(__dirname, '..', PUBLIC_DIR, baseFilePath),
                fileData: JSON.stringify(jsonFileData)
            });
            return apiHelper.success(res, FILE_MESSAGES.GENERATE_JSON, { jsonFilePath: baseFilePath });
        }
        return apiHelper.failure(res, FILE_MESSAGES.GENERATE_JSON_ERROR, [], BAD_REQUEST);
    } catch (error) {
        return apiHelper.failure(res, error.message);
    }
};

module.exports = {
    convertExcelToJsonFile,
    convertJsonToExcelFile
};
