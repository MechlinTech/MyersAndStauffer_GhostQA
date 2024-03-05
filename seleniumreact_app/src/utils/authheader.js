export const header = () => {
    let dataToken = JSON.parse(sessionStorage.getItem("userData"));
    return {
        headers: {
            'Authorization': `Bearer ${dataToken?.token}`
        }
    }
}

export const headerForm = () => {
    let dataToken = JSON.parse(sessionStorage.getItem("userData"));
    return {
        headers: {
            'Authorization': `Bearer ${dataToken?.token}`,
            "Content-Type": "multipart/form-data",
        }
    }
}