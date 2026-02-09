import api from "./axios"
// Get 
export const getexp=(data)=>{

    return api.get("/exp/getExp",data)

}

//  POST

export const createexp=(data)=>{
    return api.post("/exp/createExp",data)
}
