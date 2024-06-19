import { Request, Response, NextFunction } from "express";
import AppError from "./appError";
import dotenv from 'dotenv'

dotenv.config()

export = (err:any, req:Request, res:Response, next:NextFunction) => {
    if (process.env.NODE_ENV === 'development' && err instanceof AppError) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
          });
        return;
    }

    if (process.env.NODE_ENV === 'production' && err instanceof AppError){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
        return;
    }
    console.log(err)
    res.status(500).json("Something Went Wrong!");
}