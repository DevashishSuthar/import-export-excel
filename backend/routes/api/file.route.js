const express = require('express');
const router = express.Router();

const { BODY } = require('../../constants/request-properties.constant');
const { convertExcelToJsonFile, convertJsonToExcelFile } = require('../../controllers/file.controller');
const { fileUploadMiddleware, excelUploadMiddleware } = require('../../middlewares/file-upload.middleware');
const requestValidatorMiddleware = require('../../middlewares/request-validator.middleware');
const { convertJsonToExcelFileSchema } = require('../../validators/file.validator');

router.post('/upload-excel', excelUploadMiddleware, convertExcelToJsonFile);

router.post('/upload-json',
    fileUploadMiddleware,
    requestValidatorMiddleware([convertJsonToExcelFileSchema], [BODY]),
    convertJsonToExcelFile);

module.exports = router;
