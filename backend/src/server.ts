import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

// local imports
import env from '@/configs/env';
import { NOT_FOUND } from '@/constants/http-status-code';
import { COMMON_MESSAGES } from '@/constants/messages';
import { FILE_DIRECTORIES } from '@/constants/global';
import { failure } from '@/helpers/api';

const { PORT } = env;
const { PUBLIC_DIR } = FILE_DIRECTORIES;

// create express server
const app = express();

// use middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving static files without using public folder
app.use(express.static(PUBLIC_DIR));

// import all the routes
import routes from '@/routes';
app.use(routes);

// import index script
import '@/scripts';

app.get('/', (_req: Request, res: Response) => {
    res.send('Server is up and running!');
});

// catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
    const error = new Error(COMMON_MESSAGES.ROUTE_NOT_EXISTS);
    (error as any).status = NOT_FOUND;
    next(error);
});

// error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    failure(res, err.message, [], NOT_FOUND);
});

// start server
app.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});