export const header = () => {
  let dataToken = JSON.parse(localStorage.getItem("userData"));
  let timeZone = dataToken.TimeZone;
  return {
    headers: {
      Authorization: `Bearer ${dataToken?.token}`,
      "X-API-TIMEZONE": timeZone,
    },
  };
};

export const headerForm = () => {
  let dataToken = JSON.parse(localStorage.getItem("userData"));
  let timeZone = dataToken.TimeZone;
  return {
    headers: {
      Authorization: `Bearer ${dataToken?.token}`,
      "Content-Type": "multipart/form-data",
      "X-API-TIMEZONE": timeZone,
    },
  };
};

export const headerCypres = () => ({
  accept: "application/json",
  "Content-Type": "application/json",
  "X-CSRFTOKEN":
    "Duh1UZz5wjcXxcM36kckH2pZySKniYnMGBzxd4C6FGp5AhkSJGZgrr6IRcvAH5n1",
});
