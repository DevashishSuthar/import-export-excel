const COMMON_MESSAGES = {
    JSON_FORMAT_ALLOWED: 'Only .json format is allowed!',
    EXCEL_FORMAT_ALLOWED: 'Only .xls & .xlsx formats are allowed!',
    FILE_REQUIRED: 'File is required!',
    ROUTE_NOT_EXISTS: 'Requested route does not exists!',
    VALIDATION_ERROR: 'Data validation failed!',
    UNKNOWN_ERROR: 'Something went wrong, please try again later!',
    NO_DATA_FOUND: 'No data found!',
};

const FILE_MESSAGES = {
    GENERATE_EXCEL: 'Excel is generated successfully!',
    GENERATE_EXCEL_ERROR: 'Unable to generate excel!',
    GENERATE_JSON: 'Json is generated successfully!',
    GENERATE_JSON_ERROR: 'Unable to generate json!'
};

module.exports = {
    FILE_MESSAGES,
    COMMON_MESSAGES
};