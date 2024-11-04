import { isValidUsername } from "6pp"
export const ValidatorUsername=(username)=>{
if(!isValidUsername(username)){
    return {isValid:false, errorMessage:"Username is invalid"}
}
}