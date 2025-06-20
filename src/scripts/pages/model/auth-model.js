import { login, register } from "../../data/api";

export const AuthModel ={
    async login({email, password}){
        return await login({email, password})
    },
    async register({name, email, password}){
        return await register({name, email, password});
    }
}