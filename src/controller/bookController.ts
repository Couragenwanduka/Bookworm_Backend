import { Request, Response, NextFunction } from "express";
import AppError from "../error/appError";
import catchAsync from "../utils/catchAsync";
import { fetchHTML } from "../helper/getText";
import { getAllBooks } from '../helper/bookApi';
import { SaveBooks } from "../services/book.service";
import { searchBooksByTitle } from '../helper/bookApi';
import {validateIdSchema } from '../validator/validation'
import { getSavedBooks } from "../services/book.service";
import { validateUrlSchema } from "../validator/validation";
import { validateBookSchema } from '../validator/validation';
import { validateGenreSchema } from '../validator/validation';
import { editSavedBookCategory } from "../services/book.service";
import { validateUpdateBookSchema } from "../validator/validation";


export const getBooks = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
       const books:object = await getAllBooks();
      
       if(!books) return next(new AppError('Error occurred while retrieving books', 404));
       res.status(200).json({status:'success',data:books})
})

export const findBooksByGenre = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
       const {genre} = req.params;
       
       const error = await validateGenreSchema(genre);
       if(error!== true) return next(new AppError(error, 400));
       
       const books:object = await searchBooksByTitle(genre);
       if(!books) return next(new AppError('Error occurred while retrieving books', 404));

       res.status(200).json({status:'success',data:books})
})

export const saveBook = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
       const {title, author, image, category, user} = req.body;

       const error = await validateBookSchema(title, author, category, user);
       if(error!== true) return next(new AppError(error, 400));

       await SaveBooks(title, author, image, category, user);
      res.status(200).json({success: true, message: 'books saved successfully'}) 
})

export const getSavedBook = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
       const {id} = req.params;
       
       const error = await validateIdSchema(id);
       if(error!== true) return next(new AppError(error, 400));

       const books = await getSavedBooks(id);
       res.status(200).json({success:true, savedBook: books})
})

export const updateSavedBookCategory = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
       const {id, newCategory}:any = req.body 
       
       const error = await validateUpdateBookSchema(id, newCategory);
       if(error!== true) return next(new AppError(error, 400));

       await editSavedBookCategory(id, newCategory);
       res.status(200).json({success: true, message: 'category updated successfully'})
})

export const getText = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
       const {url}:any = req.body

       const error = await validateUrlSchema(url);
       if(error !== true) return next(new AppError(error, 400));
       
       const text= await fetchHTML(url)
       if(!text) return next(new AppError('Error occurred while fetching text', 404));

       return res.status(200).json({message:"Text fetched successfully",text})    
})