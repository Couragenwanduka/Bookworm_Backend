import mongoose, {Schema, Model} from "mongoose";
import { Ibook } from "../interface/interface";

const bookSchema: Schema <Ibook> = new Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        ref:'category',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},{
    timestamps:true,
})

const bookModel: Model <Ibook> = mongoose.model <Ibook> ("book", bookSchema);

export default bookModel;