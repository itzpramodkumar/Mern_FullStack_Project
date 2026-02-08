import api from "./axios";
// GET

  export const getCostomerApi=()=>{
    return api.get("/customers/getcustomer");
  }

//POST

export const  createCostomerApi=(data)=>{
    return api.post("/customers/createcustomer",data);
}

// export const  ledgerApi=(customerId)=>{
//     return api.post(`/customers/${customerId}/ledger`);
// }

export const ledgerApi = (customerId, data) => {
  return api.post(`/customers/${customerId}/ledger`, data);
};


//PATCH
export const toggleApi=(customerId)=>{
    return api.patch(`/customers/${customerId}/status/togglecustomerstatus`);
}