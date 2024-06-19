import {Request, Response, NextFunction } from "express";
import AppError from "../error/appError";
import catchAsync from "../utils/catchAsync";
import {findUserByEmail} from "../services/user.service";
import {saveUser} from "../services/user.service";
import {validateSignUpSchema } from "../validator/validation";
import {validateSignInSchema } from "../validator/validation";
import {comparePassword} from  "../utils/bcrypt";


export const createUser = catchAsync( async (req:Request, res:Response, next:NextFunction) => {
       const {fullName, email, password} = req.body;
      
       const error = await validateSignUpSchema(fullName, email, password);
       if(error !== true) return next(new AppError(error, 400)); 

       const user = await findUserByEmail(email);
       if(user) return next(new AppError("User already exists", 400));

       const newUser = await saveUser(fullName, email, password);

      return res.status(200).json({success:true, message:'User saved successfully'})
})

export const signIn = catchAsync( async (req:Request, res:Response, next:NextFunction) => {
        const {email, password} = req.body;

        const error = await validateSignInSchema(email, password);
        if(error !== true) return next(new AppError(error, 400)); 

        const user = await findUserByEmail(email);
        if(!user) return next(new AppError("User does not exist", 400));
        
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch) return next(new AppError("Incorrect password", 400));
        
        return res.status(200).json({success:true, message:'User signed in successfully',user})
})