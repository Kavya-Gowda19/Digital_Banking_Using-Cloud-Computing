import Axios from "axios"



export const Insert_Product = (val) =>{
    return url.post("/api/insert",val)
}

export const Insert_Account = (val) =>{
    return url.post("/account/insert",val)
}

export const Insert_Deposit = (val) =>{
    return url.post("/deposit/insert",val)
}

export const Insert_withdraw = (val) =>{
    return url.post("/deposit/withdraw",val)
}



export const View_Account = ()=>{
    return url.get("/account/view")
}

export const View_Helpline = ()=>{
    return url.get("/contact/view")
}

export const View_Product = ()=>{
    return url.get("/api/view")
}
export const Single_Product = (id) => {
    return url.get(`/api/view/${id}`)
}

export const Update_Product = (id,product) =>{
    return url.put(`/api/update/${id}`,product)
}

export const DeleteProduct =(id)=>{
    return url.delete(`/api/delete/${id}`) 
}

export const DeleteAccount =(id)=>{
    return url.delete(`/account/delete/${id}`) 
}

export const Deletehelpline =(id)=>{
    return url.delete(`/contact/delete/${id}`) 
}


// Party

export const Insert_Party=(val)=>{
    return url.post("/api/party_insert",val)
}


export const View_Party=()=>{
    return url.get("/api/party_view")
}






const url = Axios.create({
    baseURL:"http://localhost:8081"
})
