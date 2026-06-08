import express from 'express';
const router = express.Router();

import { BODY } from '@/constants/request-properties';
import { convertExcelToJsonFile, convertJsonToExcelFile } from '@/controllers/file';
import { fileUploadMiddleware, excelUploadMiddleware } from '@/middlewares/file-upload';
import requestValidatorMiddleware from '@/middlewares/request-validator';
import { convertJsonToExcelFileSchema } from '@/validators/file';

router.post('/upload-excel', excelUploadMiddleware, convertExcelToJsonFile);

router.post('/upload-json',
    fileUploadMiddleware,
    requestValidatorMiddleware([convertJsonToExcelFileSchema], [BODY]),
    convertJsonToExcelFile);

export default router;
