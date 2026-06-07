const Joi = require('joi');

const { GENERATED_FILE_TYPES } = require('../constants/global.constant');

const convertJsonToExcelFileSchema = Joi.object().keys({
    generatedFileType: Joi.string().valid(...Object.values(GENERATED_FILE_TYPES)).required(),
});

module.exports = {
    convertJsonToExcelFileSchema
};