import axios from "axios";

// export const actionGetNFTData = async (token) => {
//   let response;
//   let url = "https://api-uat.eativerse.io/eatieapi/citizens";
//   // let url = process.env.REACT_APP_EATIE_URL + "/citizens";
//   try {
//     response = await axios.get(url, {
//       headers: {
//         token: token,
//       },
//     });
//     let code = response.data.code;
//     if (code === 2000) {
//       console.log(response.data.result.citizens);
//       return { status: code, citizens: response.data.result.citizens };
//     } else {
//       return { status: code };
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const actionGetPlayerEaties = async (token) => {
  let response;
  let url = "https://api-uat.eativerse.io/player-eaties/eatiesW";
  try {
    response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    // console.log('actionGetPlayerEaties', response.data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const actionGetUserData = async (token) => {
  let response;
  let url = "https://api-uat.eativerse.io/eatieapi/loginW";
  // let url = process.env.REACT_APP_EATIE_URL + "/login";
  try {
    response = await axios.post(
      url,
      {  },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    // console.log('actionGetUserData', response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const actionLogout = async (token) => {
  let response;
  let url = "https://api-uat.eativerse.io/eatieapi/logoutW";
  // let url = process.env.REACT_APP_EATIE_URL + "/login";
  try {
    response = await axios.post(
      url,
      {  },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    // console.log('actionLogout', response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// export const actionGetCitizens = async (token) => {
//   let response;
//   let url = "https://api-uat.eativerse.io/eatieapi/citizens";
//   // let url = process.env.REACT_APP_CITIZEN_URL + "/citizens";
//   try {
//     response = await axios.get(url, {
//       headers: {
//         token: token,
//       },
//     });
//     let code = response.data.code;
//     if (code === 2000) {
//       console.log(response.data.result.citizens);
//       return { status: code, citizens: response.data.result.citizens };
//     } else {
//       return { status: code };
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const actionWithdraw = async (data, token) => {
  return new Promise((resolve, reject) => {
    console.log(data);
    let url = "https://api-uat.eativerse.io/player-eaties/withdraw";
    axios.post(
      url,
      // "https://api-uat.eativerse.io/eatieapi/withdraw",
      // process.env.REACT_APP_CITIZEN_URL + "/withdraw",
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "application/json",
        },
      }
    )
      .then(function (response) {
        // console.log(response);
        let code = response.data.code;
        return resolve({
          actionSuccess: true,
          status: code,
        });
      })
      .catch(function (error) {
        // console.log(error);
        return resolve({
          actionSuccess: true,
          status: 2000,
        });
      });
  });

  // let response;
  // console.log(data);

  // let url = "https://api-uat.eativerse.io/player-eaties/withdraw";
  // try {
  //   response = await axios.post(
  //     url,
  //     // "https://api-uat.eativerse.io/eatieapi/withdraw",
  //     // process.env.REACT_APP_CITIZEN_URL + "/withdraw",
  //     data,
  //     {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //         "content-type": "application/json",
  //       },
  //     }
  //   );
  //   console.log(response);
  //   let code = response.data.code;
  //   if (code === 2000) {
  //     return {
  //       actionSuccess: true,
  //       status: code,
  //     };
  //   } else {
  //     return { actionSuccess: true, status: code };
  //   }
  // } catch (error) {
  //   console.log(error);
  //   return { actionSuccess: false };
  // }
};

export const actionConnectWallet = async (token, walletAddress) => {
  let response;

  let url = "https://api-uat.eativerse.io/player-eaties/connect";
  try {
    response = await axios.post(
      url,
      {
        walletAddress: walletAddress,
      },
      {
        headers: {
          "Authorization": "Bearer " + token,
          "content-type": "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    // console.log("connectwallet", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
