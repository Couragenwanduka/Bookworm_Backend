import bookModel from "../model/savedBook";
import { bookId } from "../interface/interface";

export const SaveBooks = async (title:string, author:string, image:string, category:string, user:string) => {
        try{
          const newBook = new bookModel({
             title,
             author,
             image,
             category,
             user
          });
          await newBook.save();
        }catch(error){
            console.log(error);
        }
}

export const getSavedBooks = async (user:string) => {
        try{
            const books = await bookModel.find({user});
            return books;
        }catch(error){
            console.log(error);
        }
}

export const editSavedBookCategory = async (book:Array<bookId>, newCategory:string) => {
       try{
            const books = await bookModel.updateMany({_id:{$in:book}},{category:newCategory});
            return books;
       }catch(error){
         console.log(error);
       }
}