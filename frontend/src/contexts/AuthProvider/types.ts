export interface IUser{
email?: string
password?:string
id?: string
}

export interface ILogged{
    logged?: boolean
}

export interface IContext extends IUser{
    authenticate:(email: string, password: string)=>Promise<void>
    logout:()=>void
}


export interface IAuthProvider{
children: JSX.Element
}