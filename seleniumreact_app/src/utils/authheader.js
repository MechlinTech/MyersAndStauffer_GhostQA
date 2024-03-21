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

export const headerCypres = ()=>({
    "accept": "application/json",
    "Content-Type": "application/json",
    "X-CSRFTOKEN": "Duh1UZz5wjcXxcM36kckH2pZySKniYnMGBzxd4C6FGp5AhkSJGZgrr6IRcvAH5n1"
  }
  )