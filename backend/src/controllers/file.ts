import path from 'path';
import { Request, Response } from 'express';

import { FILE_DIRECTORIES } from '@/constants/global';
import { BAD_REQUEST } from '@/constants/http-status-code';
import { FILE_MESSAGES, COMMON_MESSAGES } from '@/constants/messages';
import { success, failure } from '@/helpers/api';
import {
    readFile,
    writeFile,
    deleteFile,
    generateJsonFileFromExcel,
    generateExcelFileFromJson
} from '@/helpers/utils';

const { PUBLIC_DIR, ASSETS_DIR, JSONS_DIR } = FILE_DIRECTORIES;

const convertJsonToExcelFile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { file, fileValidationError, body } = req as any;
        if (fileValidationError) {
            failure(res, COMMON_MESSAGES.JSON_FORMAT_ALLOWED, [], BAD_REQUEST);
            return;
        }
        if (!file) {
            failure(res, COMMON_MESSAGES.FILE_REQUIRED, [], BAD_REQUEST);
            return;
        }
        const { path: filePath } = file;
        const { generatedFileType } = JSON.parse(JSON.stringify(body));
        const jsonStringifyFileData = await readFile(path.join(process.cwd(), filePath));
        deleteFile(filePath);
        if (jsonStringifyFileData) {
            const parseFileData = JSON.parse(jsonStringifyFileData);
            const modifiedParseFileData = typeof parseFileData === 'object' && !Array.isArray(parseFileData) ? [parseFileData] : parseFileData;
            const uniqueKeysForHeader = Object.keys(modifiedParseFileData.reduce((result: any, obj: any) => Object.assign(result, obj), {}));
            const excelFilePath = await generateExcelFileFromJson({
                uniqueKeys: uniqueKeysForHeader,
                parseFileData: modifiedParseFileData,
                generatedFileType
            });
            success(res, FILE_MESSAGES.GENERATE_EXCEL, { excelFilePath });
            return;
        }
        failure(res, FILE_MESSAGES.GENERATE_EXCEL_ERROR, [], BAD_REQUEST);
    } catch (error) {
        failure(res, (error as Error).message);
    }
};

const convertExcelToJsonFile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { file, fileValidationError } = req as any;
        if (fileValidationError) {
            failure(res, COMMON_MESSAGES.EXCEL_FORMAT_ALLOWED, [], BAD_REQUEST);
            return;
        }
        if (!file) {
            failure(res, COMMON_MESSAGES.FILE_REQUIRED, [], BAD_REQUEST);
            return;
        }
        const { path: filePath } = file;
        const jsonFileData = generateJsonFileFromExcel({ filePath });
        deleteFile(filePath);
        if (jsonFileData && jsonFileData.length) {
            const baseFilePath = `${ASSETS_DIR}/${JSONS_DIR}/json-${Date.now()}.json`;
            writeFile({
                filePath: path.join(process.cwd(), PUBLIC_DIR, baseFilePath),
                fileData: JSON.stringify(jsonFileData)
            });
            success(res, FILE_MESSAGES.GENERATE_JSON, { jsonFilePath: baseFilePath });
            return;
        }
        failure(res, FILE_MESSAGES.GENERATE_JSON_ERROR, [], BAD_REQUEST);
    } catch (error) {
        failure(res, (error as Error).message);
    }
};

export {
    convertExcelToJsonFile,
    convertJsonToExcelFile
};
