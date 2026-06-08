import multer from 'multer';

import { FILE_DIRECTORIES } from '@/constants/global';
import { FIELD_NAMES, FILE_MIMETYPES } from '@/constants/multer';

const { JSON, XLS, XLSX } = FILE_MIMETYPES;
const { PUBLIC_DIR, ASSETS_DIR, EXCELS_DIR, FILES_DIR } = FILE_DIRECTORIES;

const getFileExtension = (file: any): string => {
    const fileNameArr = file.originalname.split('.');
    return fileNameArr[fileNameArr.length - 1];
};

const setFileName = (req: any, file: any, cb: any): void => {
    const fileExt = getFileExtension(file);
    cb(null, `${file.fieldname}-${Date.now()}.${fileExt}`);
};

const setDestinationForFile = (destinationPath: string) => {
    return (req: any, file: any, cb: any): void => cb(null, destinationPath);
};

const fileStorage = multer.diskStorage({
    destination: setDestinationForFile(`${PUBLIC_DIR}/${ASSETS_DIR}/${FILES_DIR}`),
    filename: setFileName,
});

const fileUploadMiddleware = multer({
    storage: fileStorage,
    fileFilter: (req: any, file: any, cb: any): void => {
        const fileExt = getFileExtension(file);
        if (fileExt === JSON) {
            req.fileValidationError = false;
            return cb(null, true);
        }
        req.fileValidationError = true;
        return cb(null, false);
    },
}).single(FIELD_NAMES.FILE);

const excelStorage = multer.diskStorage({
    destination: setDestinationForFile(`${PUBLIC_DIR}/${ASSETS_DIR}/${EXCELS_DIR}`),
    filename: setFileName,
});

const excelUploadMiddleware = multer({
    storage: excelStorage,
    fileFilter: (req: any, file: any, cb: any): void => {
        const fileExt = getFileExtension(file);
        if (fileExt === XLSX || fileExt === XLS) {
            req.fileValidationError = false;
            return cb(null, true);
        }
        req.fileValidationError = true;
        return cb(null, false);
    },
}).single(FIELD_NAMES.EXCEL);

export {
    fileUploadMiddleware,
    excelUploadMiddleware
};
