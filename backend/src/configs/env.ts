import dotenv from 'dotenv';

dotenv.config();

const env = {
    NODE_ENV: process.env.NODE_ENV!,
    PORT: process.env.PORT!
};

export default env;