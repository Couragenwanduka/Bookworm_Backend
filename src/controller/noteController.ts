import { Request, Response, NextFunction } from "express";
import AppError from "../error/appError";
import catchAsync from "../utils/catchAsync";
import { getNotes } from "../services/note.service";
import { saveNote } from "../services/note.service";
import { findNotes } from "../services/note.service";
import { saveContents } from "../services/note.service";
import { validateIdSchema } from "../validator/validation";
import { validateNoteSchema } from "../validator/validation";
import { validateContentSchema } from "../validator/validation";

export const createNote = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
       const {id, name} = req.body;

       const error = await validateNoteSchema(id, name);
       if(error!== true) return next(new AppError(error, 400));

       const existingNote = await findNotes(id, name);
       if(existingNote) return next(new AppError('note already exists', 404));

       await saveNote(id, name);
       res.status(200).json({status:'success', message: 'note created successfully'});
})

export const addContents = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
       const {id, name, contents} = req.body;

       const error = await validateContentSchema(id, name, contents)
       if(error !== true) return next(new AppError(error, 400))

       await saveContents(id, name, contents)
       res.status(200).json({status:'success', message: 'contents saved successfully'})
})

export const findByUser = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
       const {id} = req.params

       const error = await validateIdSchema(id)
       if(error !== true) return next(new AppError(error, 400))

       const note = await getNotes(id)
       res.status(200).json({status:'success', note})

})