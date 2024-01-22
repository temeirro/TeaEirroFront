import {IUploadedFile} from "./imageconvert.ts";

export interface IRegisterForm {
    name: string;
    lastName: string;
    image: IUploadedFile | null;
    email: string;
    password: string;
    phone: string;
}
export interface ILogin {
    email: string,
    password: string
}
export interface IRegister {
    name: string;
    lastName: string;
    image: string | undefined;
    email: string;
    password: string;
    phone:string;
}

export interface ILoginResult {
    token: string
}

export interface IUserLoginInfo {
    name: string,
    email: string,
    lastName: string,
}

export enum AuthUserActionType {
    LOGIN_USER = 'AUTH_LOGIN_USER',
    LOGOUT_USER = 'AUTH_LOGOUT_USER'
}

export interface ILoginResult {
    token: string
}

export interface IUser {
    email: string,
    image: string,
    name: string,
    lastName: string,
}

export interface IImage {
    image_name: string
}
export interface IAuthUser {
    isAuth: boolean;
    user?: IUser;
}