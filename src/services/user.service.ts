import userModel from "../model/user";
import { hashPassword } from "../utils/bcrypt";



export const saveUser = async (fullName:string, email:string, password:string) => {
      try{  
         const hashedPassword: string | undefined = await hashPassword(password);

         const user = new userModel({
            fullName,
            email,
            password:hashedPassword
         });
         await user.save();
         return user; 
      }catch(error){
        console.log(error);
      }
}

export const findUserByEmail = async (email:string) => {
      try{
         const user = await userModel.findOne({email});
         return user; 
      }catch(error){
        console.log(error);
      }
}