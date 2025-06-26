import { Response } from "express";

interface ReponseHandlerInterface {
    code?: number;
    message?: string;
    res: Response;
    data?: any;
}

const errorResponse = (props: ReponseHandlerInterface) => {
    const { code, res, message } = props;

    res.status(code || 500).json({
        meta: {
            status: false,
            message: message,
        },
    });
};

const successResponse = (props: ReponseHandlerInterface) => {
    const { code, message, data, res } = props;

    res.status(code || 200).json({
        meta: {
            status: true,
            message: message,
        },
        data: data,
    });
};

export const responseHandler = {
    errorResponse,
    successResponse,
};
