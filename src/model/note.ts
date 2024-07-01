import mongoose, {Schema, Model } from "mongoose";
import { Inote } from "../interface/interface";
import { Icontents } from '../interface/interface'

export const noteContent: Schema<Icontents> = new Schema({
    content:{
        type: String,
        required: true
    }
})

const noteSchema: Schema<Inote> = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name:{
        type: String,
        required: true
    },
    contents:{
        type:[noteContent],
        default: []
    }
});

const noteModel: Model <Inote> = mongoose.model <Inote> ("note", noteSchema);

export default noteModel;