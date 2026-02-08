import api from "./axios";


// get 

export const getEmpApi=(data)=>{
    return api.get("/employee/getEmp",data)
}

// POST

export const createEmpApi=(data)=>{
    return api.post("employee/createEmp",data)
}
