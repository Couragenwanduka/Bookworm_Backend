import { bookId } from "../interface/interface";
import { signUpSchema, signInSchema, genreSchema, categorySchema, idSchema, bookSchema, updateBookSchema, urlSchema} from "./yup"

export const validateSignUpSchema = async (fullName:string, email:string, password:string) => {

        try{
         const valid = await signUpSchema.validate({fullName, email, password},{ abortEarly: false });
         return true;
        }catch(error:any){
            return error.errors
        }
}

export const validateSignInSchema = async (email:string , password:string) => {
    
        try{
        const valid = await signInSchema.validate( {email:email, password:password},{ abortEarly: false });
        return true;
        }catch(error:any){
            return error.errors;
        }
}

export const validateGenreSchema = async (name:string) => {
        try{
        const valid = await genreSchema.validate( {genre:name},{ abortEarly: false });
        return true;
        }catch(error:any){
            return error.errors;
        }
}

export const validateCategorySchema = async (name:string, user:string) => {
        try{
        const valid = await categorySchema.validate( {name, user},{ abortEarly: false });
        return true;
        }catch(error:any){
            return error.errors;
        }
}

export const validateIdSchema = async (id:string) => {
        try{
        const valid = await idSchema.validate( {id},{ abortEarly: false });
        return true;
        }catch(error:any){
            return error.errors;
        }
}

export const validateBookSchema = async (title:string, author:string, category:string, user:string) => {
        try{
        const valid = await bookSchema.validate( {title, author, category, user},{ abortEarly: false });
        return true;
        }catch(error:any){
            return error.errors;
        }
}

export const validateUpdateBookSchema = async (id:Array<bookId>, newCategory:string) => {
        try{
        const valid = await updateBookSchema.validate( {id, newCategory},{ abortEarly: false });
        return true;
        }catch(error:any){
            return error.errors;
        }
}

export const validateUrlSchema = async (url:string) => {
        try{
        const valid = await urlSchema.validate( {url},{ abortEarly: false });
        return true;
        }catch(error:any){
            return error.errors;
        }
}