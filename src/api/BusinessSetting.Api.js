import api from "./axios"
 //GET
  export const getBusinessSettingApi=()=>{
    return api.get("/auth/getBusinessSetting");
  }

  //POST

  export const saveBusinessSetting=(data)=>{
  return api.post("/auth/saveBusinessSetting",data);
  }