import { Request, Response, NextFunction } from 'express';
import AppError from "../error/appError";
import catchAsync from "../utils/catchAsync";
import { validateIdSchema } from '../validator/validation';
import { findCategory } from '../services/category.service'
import { createCategory } from '../services/category.service';
import { findCategoryById } from '../services/category.service';
import { validateCategorySchema } from '../validator/validation'



export const saveCategory = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
       const {name, user} = req.body;

       const error = await validateCategorySchema(name, user);
       if(error !== true) return next(new AppError(error, 400));

       const category = await findCategoryById(name, user);
       if(category) return next(new AppError('category already exists', 404));

       await createCategory(name, user);
       res.status(200).json({status:'success',data:category});
})

export const getCategory = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
       const { id }= req.params

       const error = await validateIdSchema(id);
       if(error!== true) return next(new AppError(error, 400));

       const category = await findCategory(id)
       if(!category) return next(new AppError('category does not exist', 404));
       res.status(200).json({status:'success',data:category});
})