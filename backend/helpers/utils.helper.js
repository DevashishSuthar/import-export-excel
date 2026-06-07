const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');
const excelToJson = require('convert-excel-to-json');

const { FILE_DIRECTORIES, GENERATED_FILE_TYPES } = require('../constants/global.constant');

const { PUBLIC_DIR, ASSETS_DIR, EXCELS_DIR } = FILE_DIRECTORIES;

const generateExcelFileFromJson = async (data) => {
    try {
        const { uniqueKeys, parseFileData, generatedFileType } = data;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(`Sheet-${Date.now()}`);
        worksheet.columns = uniqueKeys.map(key => {
            return { header: key, key, width: 20 };
        });
        worksheet.addRows(parseFileData);
        const isGeneratedFileCsv = generatedFileType === GENERATED_FILE_TYPES.CSV;
        const fileName = `${isGeneratedFileCsv ? 'csv' : 'excel'}-${Date.now()}.${generatedFileType}`;
        const excelFilePath = `${ASSETS_DIR}/${EXCELS_DIR}/${fileName}`;
        await workbook[generatedFileType].writeFile(path.join(__dirname, '..', PUBLIC_DIR, excelFilePath));
        return excelFilePath;
    } catch (error) {
        throw error;
    }
};

const generateJsonFileFromExcel = (data) => {
    const { filePath } = data;
    const jsonFileData = excelToJson({
        sourceFile: filePath,
        header: {
            rows: 1
        },
        columnToKey: {
            '*': '{{columnHeader}}'
        }
    });
    const totalFileData = [];
    for (let key in jsonFileData) {
        totalFileData.push(...jsonFileData[key]);
    };
    return totalFileData;
};

const readFile = (dirPath) => {
    return fs.readFileSync(dirPath, { encoding: 'utf-8' });
};

const writeFile = (data) => {
    const { filePath, fileData } = data;
    return fs.writeFileSync(filePath, fileData);
};

const deleteFile = (filePath) => {
    return fs.unlink(filePath, (err) => {
        if (err) throw error;
    });
};

module.exports = {
    readFile,
    writeFile,
    deleteFile,
    generateJsonFileFromExcel,
    generateExcelFileFromJson
};