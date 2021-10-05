import { LoginData } from "./login.types"

export const login = (user:LoginData, history:History) =>{
    return{
        type:"LOGIN",
        payload:{account: user,
                history: history}
    }
}



  
