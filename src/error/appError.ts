class AppError extends Error{
    public statusCode: number;
    public status: string;
    public isOperational: boolean;

    constructor(message:string , statusCode:number){
        super(message)
        
        this.message = message;
        this.statusCode = statusCode || 500;
        this.status= `${statusCode}` . startsWith('4') ? 'fail' :' error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError
