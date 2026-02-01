import api from "./axios"
 //GET
  export const getBillingSettingApi=()=>{
    return api.get("/auth/getBillingSetting");
  }

  //POST

  export const saveBillingSettingApi=(data)=>{
    return api.post("/auth/saveBillingSetting",data);
  }