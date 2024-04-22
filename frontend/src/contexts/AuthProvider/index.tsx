import { createContext, useState, useEffect } from 'react';
import { IContext, IAuthProvider, IUser } from './types';
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from './utils';

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({children}:IAuthProvider)=>{
const [user, setUser] = useState<IUser | null>()



useEffect(() => {
 const user = getUserLocalStorage()
 if(user){

    setUser(user)
 }

}, [])


async function authenticate(email: string, password: string){
const response = await LoginRequest(email, password)

if(!response){
    console.log('Error to authenticate')
}

const payload = {token:response.payload.accessToken, id: response.payload.accountId}

setUser(payload),
setUserLocalStorage(payload)

}
function logout(){
    setUser(null)
    setUserLocalStorage(null)
}

return(
    <AuthContext.Provider value={{...user, authenticate, logout}}>
{children}
    </AuthContext.Provider>
)


}