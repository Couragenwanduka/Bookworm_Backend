import mongoose, {Schema, Document, Model} from "mongoose";

interface Iuser extends Document{
    fullName: string;
    email: string;
    password: string;
    timeStamp: Date;
}
const userSchema: Schema <Iuser> = new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    
},
{
    timestamps:true,
});

const userModel: Model <Iuser> = mongoose.model <Iuser> ("user", userSchema);

export default userModel;