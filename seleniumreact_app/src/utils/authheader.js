

export const header =()=>{
    let dataToken = JSON.parse(sessionStorage.getItem("userData"));
    return {
        headers: {
           'Authorization': `Bearer ${dataToken?.token}`
       }
     }
}