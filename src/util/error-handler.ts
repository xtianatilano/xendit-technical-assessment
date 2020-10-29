import { Response } from "express";

interface ErrorMessage {
    statusCode: number,
    message: string;
}

export class ErrorHandler extends Error {
    statusCode: number;
    message: string;

    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
}

/**
 * @param err ErrorMessage
 * @param res Response
 */
export const handleError = (err: ErrorMessage, res: Response) => {
    const { statusCode, message } = err;
    console.error(err);
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message
    });
};
