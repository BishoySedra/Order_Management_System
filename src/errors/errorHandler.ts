import { customError } from "./error"

export const errorHandler = (error: Error) => {

    if (error instanceof customError) {
        return {
            message: error.message,
            status: error.statusCode
        }
    }
    
    return {
        message: 'Internal server error',
        status: 500
    }
    
}