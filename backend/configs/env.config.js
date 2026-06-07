const dotenv = require('dotenv');

dotenv.config();

const { NODE_ENV, PORT } = process.env;

module.exports = {
    NODE_ENV,
    PORT
};