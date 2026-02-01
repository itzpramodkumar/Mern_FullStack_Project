import api from "./axios";
export const signupApi=(data)=>{
    return api.post("/auth/signup",data);
};
// login
export const loginApi =data=>{
    return api.post("/auth/login",data);
};