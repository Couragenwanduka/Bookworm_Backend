import bcrypt from 'bcryptjs'

export const hashPassword = async (password:string) => {
    try{
        const salt:string = await bcrypt.genSalt(10)
        const hash:string = await bcrypt.hash(password,salt)
        return hash
    }catch(error){
        console.log(error)
    }
}

export const comparePassword = async (password:string, hash:string) => {
    try{
        return await bcrypt.compare(password,hash)
    }catch(error){
        console.log(error)
    }
}