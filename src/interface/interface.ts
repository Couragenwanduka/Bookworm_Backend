import mongoose, { Document } from "mongoose";

export interface bookId{
        id: string;
        }

export interface Ibook extends Document{
        title: string;
        author: string;
        image: string;
        category:string;
        user:mongoose.Schema.Types.ObjectId;
    }
export interface Inote extends Document{
        user:mongoose.Schema.Types.ObjectId;
        name:string;
        contents:Icontents[];
}

export interface Icontents extends Document{
        content: string
}