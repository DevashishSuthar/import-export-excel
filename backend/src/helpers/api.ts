import { Response } from 'express';
import { SUCCESS, INTERNAL_SERVER_ERROR } from '@/constants/http-status-code';

const success = (res: Response, message: string = '', data: any = {}, meta: any = {}, errors: any[] = [], success: boolean = true): void => {
    res.status(SUCCESS).json({
        success,
        message,
        data,
        meta,
        errors,
    });
};

const failure = (res: Response, message: string = '', errors: any[] = [], statusCode: number = INTERNAL_SERVER_ERROR): void => {
    res.status(statusCode).json({
        success: false,
        message,
        data: {},
        meta: {},
        errors,
    });
};

export {
    success,
    failure,
};
