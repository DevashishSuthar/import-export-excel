import fs from 'fs';
import path from 'path';
import * as ExcelJS from 'exceljs';
import excelToJson from 'convert-excel-to-json';

import { FILE_DIRECTORIES, GENERATED_FILE_TYPES } from '@/constants/global';

const { PUBLIC_DIR, ASSETS_DIR, EXCELS_DIR } = FILE_DIRECTORIES;

interface GenerateExcelInput {
    uniqueKeys: string[];
    parseFileData: Record<string, unknown>[];
    generatedFileType: string;
}

interface WriteFileInput {
    filePath: string;
    fileData: string;
}

const generateExcelFileFromJson = async (data: GenerateExcelInput): Promise<string> => {
    const { uniqueKeys, parseFileData, generatedFileType } = data;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`Sheet-${Date.now()}`);

    worksheet.columns = uniqueKeys.map(key => ({ header: key, key, width: 20 }));
    worksheet.addRows(parseFileData);

    const isGeneratedFileCsv = generatedFileType === GENERATED_FILE_TYPES.CSV;
    const prefix = isGeneratedFileCsv ? 'csv' : 'excel';
    const fileName = `${prefix}-${Date.now()}.${generatedFileType}`;
    const excelFilePath = `${ASSETS_DIR}/${EXCELS_DIR}/${fileName}`;

    await workbook.xlsx.writeFile(path.join(process.cwd(), PUBLIC_DIR, excelFilePath));

    return excelFilePath;
};

const generateJsonFileFromExcel = (data: { filePath: string }): Record<string, unknown>[] => {
    const { filePath } = data;
    const fullFilePath = path.join(process.cwd(), filePath);

    const jsonFileData = excelToJson({
        sourceFile: fullFilePath,
        header: { rows: 1 },
        columnToKey: { '*': '{{columnHeader}}' },
    });

    if (!jsonFileData) return [];

    return Object.values(jsonFileData).flat();
};

const readFile = (dirPath: string): string => {
    return fs.readFileSync(dirPath, { encoding: 'utf-8' });
};

const writeFile = ({ filePath, fileData }: WriteFileInput): void => {
    fs.writeFileSync(filePath, fileData);
};

const deleteFile = (filePath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const fullFilePath = path.join(process.cwd(), filePath);
        fs.unlink(fullFilePath, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

export {
    readFile,
    writeFile,
    deleteFile,
    generateJsonFileFromExcel,
    generateExcelFileFromJson,
};