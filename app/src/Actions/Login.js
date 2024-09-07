import axios from "axios";

export const actionSendOTP = async (phoneNumber, areaCode) => {
  let url = "https://api-uat.eativerse.io/eatieapi/sendOTPW";
  let response;
  try {
    response = await axios.post(url, {
      phone: phoneNumber,
      areaCode: areaCode,
    });
    // console.log('actionSendOTP', response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
};

export const actionVerifyOTP = async (data) => {
  let url = "https://api-uat.eativerse.io/eatieapi/verifyOTPW";
  // let url = process.env.REACT_APP_EATIE_URL + "/verifyOTP";
  let response;
  try {
    response = await axios.post(url, data, {
      headers: {
        "content-type": "application/json",
      },
    });
    // console.log('actionVerifyOTP', response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
};
