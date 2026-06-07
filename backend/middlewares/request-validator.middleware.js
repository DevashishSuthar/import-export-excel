const apiHelper = require('../helpers/api.helper');
const { COMMON_MESSAGES } = require('../constants/messages.constant');
const { UNPROCESSABLE_ENTITY } = require('../constants/http-status-code.constant');

const requestValidatorMiddleware = (schemas = [], properties = []) => {
  return (req, res, next) => {
    if (schemas.length === properties.length) {
      const errors = [];
      for (const [index, schema] of schemas.entries()) {
        const property = properties[index];
        const { error } = schema.validate(req[property], { abortEarly: false });
        if (error) {
          const { details } = error;
          errors.push(...details);
        }
      }
      if (errors.length) {
        return apiHelper.failure(
          res,
          COMMON_MESSAGES.VALIDATION_ERROR,
          errors,
          UNPROCESSABLE_ENTITY
        );
      }
      next();
    } else {
      return apiHelper.failure(res, COMMON_MESSAGES.UNKNOWN_ERROR);
    }
  };
};

module.exports = requestValidatorMiddleware;