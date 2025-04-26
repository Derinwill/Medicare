import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useGlobalErrorHandler = (errorMsg: unknown, suppressApiError:boolean = false, defaultMsg?: string ) =>{
    // Implement error handling logic here
    let message;
    console.error(errorMsg);
    const errorResponse = errorMsg as AxiosError;
    if(errorResponse.status === 400){
       let errorMsgData = errorResponse.response?.data as {
            error: string;
            message: string;
            path: string;
            statusCode: number;
            timestamp: number;
        }
        console.log('log', errorMsgData)
        message = errorMsgData.message
        if(suppressApiError){
            message = defaultMsg
        }
        toast.error(message)
    }else{
        toast.error("An error occured while processing request")
    }
}