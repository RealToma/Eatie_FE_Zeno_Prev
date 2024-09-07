import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";
import styled from "styled-components";
import { TEXT_MyNFT } from "../Config/Text";
import { customColor } from "../Config/Color";
// import imgMark01 from "../Assets/image/mark01.png";
// import imgLogo02 from "../Assets/image/logo02.png";
// import imgGetMore01 from "../Assets/image/icons/get_more01.png";
import imgPhantom01 from "../Assets/image/icons/polygon_logo.png";
import imgMetamask01 from "../Assets/Images/Icons/metamask.png";
import imgPlaceholder from "../Assets/Images/Back/nft_placeholder01.png";
import EachList from "../Components/EachList";
import CustomMyEachNFT from "../Components/CustomMyEachNFT";
import {
  actionConnectWallet,
  // actionGetCitizens,
  actionGetPlayerEaties,
  actionGetUserData,
  actionLogout,
} from "../Actions/MyNFT";
import { NotificationManager } from "react-notifications";
import CustomModalSimpleAlert from "../Components/CustomModalSimpleAlert";
import HeaderLogin from "../Layouts/HeaderLogin";
import FooterNFT from "../Layouts/FooterNFT";
import { BiWallet } from "react-icons/bi";

import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

const MyNFT = () => {
  const [lang, setLang] = useState(
    localStorage.getItem("flagLang") === "true" ? "ch" : "en"
  );

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [myNFTData, setMyNFTData] = useState();
  const [userInfo, setUserInfo] = useState();
  const [textMyNFT, setSiteCopy] = useState(
    localStorage.getItem("flagLang") === "true" ? TEXT_MyNFT.CH : TEXT_MyNFT.EN
  );
  const switchLangCallback = () => {
    setSiteCopy(
      localStorage.getItem("flagLang") === "true"
        ? TEXT_MyNFT.CH
        : TEXT_MyNFT.EN
    );
    setLang(localStorage.getItem("flagLang") === "true" ? "ch" : "en");
  };
  const [openConnectWallet, setOpenConnectWallet] = useState(false);
  const handleOpenConnectWallet = () => {
    setOpenConnectWallet(true);
  };
  const handleCloseConnectWallet = () => {
    setOpenConnectWallet(false);
  };

  const [openWalletHelp, setOpenWalletHelp] = useState(false);
  const handleOpenWalletHelp = () => {
    setOpenWalletHelp(true);
  };
  const handleCloseWalletHelp = () => {
    setOpenWalletHelp(false);
  };

  const [openAlertWalletConnected, setOpenAlertWalletConnected] =
    useState(false);
  const handleOpenAlertWalletConnected = () => {
    setOpenAlertWalletConnected(true);
  };
  const handleCloseAlertWalletConnected = () => {
    setOpenAlertWalletConnected(false);
  };

  const [flagWalletConnected, setFlagWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [phantom, setPhantom] = useState();

  useEffect(() => {
    const tempPhantom = new PhantomWalletAdapter();
    setPhantom(tempPhantom);
    if (tempPhantom._readyState === "NotDetected") {
      return;
    }
    if (tempPhantom._wallet === null) {
      return;
    }

    const wallet = {
      address: tempPhantom.publicKey.toString(),
    };
    setPublicKey(wallet.address);
    // setFlagWalletConnected(true);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    actionGetPlayerEaties(token).then((res) => {
      // console.log("playerEaties", res);
      if (typeof res.success !== "undefined" && res.success === true) {
        if (
          res.result.walletAddress === null ||
          res.result.walletAddress === undefined ||
          res.result.walletAddress === ""
        ) {
          setFlagWalletConnected(false);
        } else {
          // setFlagWalletConnected(true);
          setPublicKey(res.result.walletAddress);
        }
      } else {
        NotificationManager.error(
          "Cannot load user data, please refresh and try again.",
          "",
          10000
        );
      }
    });

    actionGetUserData(token).then((res) => {
      // console.log("actionGetUserData", res);
      if (typeof res.success !== "undefined" && res.success === true) {
        setUserInfo(res.result.profile);

        let myNFTs = [];
        if (typeof res.result.data.eaties !== "undefined") {
          myNFTs = res.result.data.eaties;
        }

        localStorage.setItem("token", res.result.token);

        // console.log(myNFTs);
        setMyNFTData(myNFTs);
      } else {
        if (typeof res.message_name !== "undefined") {
          if (res.message_name === "token_expired") {
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }
        }

        NotificationManager.error(
          "Cannot load user data, please refresh and try again.",
          "",
          10000
        );
      }
    });

    // actionGetCitizens(token).then((res) => {
    //   if (res.status === 2000) {
    //     setMyNFTData(res.citizens);
    //   } else if (res.status === 1000) {
    //     navigate("/loginPhone");
    //   } else {
    //     setMyNFTData([]);
    //   }
    // });
  }, []);

  const shortWalletAddress = (address) => {
    return address.slice(0, 4) + "..." + address.slice(-4);
  };

  const handleSwitch = async () => {
    try {
      // polygon mainnet = 137, testnet mumbai = 80001
      const chainId = 80001;
      console.log(window.ethereum.networkVersion);
      if (window.ethereum.networkVersion !== chainId) {
        await window.ethereum
          .request({
            method: "wallet_addEthereumChain",
            // mainnet
            //   params: [{
            //     chainId: `0x${Number(chainId).toString(16)}`,
            //     rpcUrls: ["https://rpc-mainnet.matic.network/"],
            //     chainName: "Matic Mainnet",
            //     nativeCurrency: {
            //         name: "MATIC",
            //         symbol: "MATIC",
            //         decimals: 18
            //     },
            //     blockExplorerUrls: ["https://polygonscan.com/"]
            // }]

            //testnet
            params: [
              {
                chainId: `0x${Number(chainId).toString(16)}`,
                rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
                chainName: "Matic Testnet(Mumbai)",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://mumbai.polygonscan.com"],
              },
            ],
          })
          .then(() => {
            //   setConnected(true);
          });

        await window.ethereum
          .request({
            method: "wallet_switchEthereumChain",
            // mainnet
            //   params: [{
            //     chainId: `0x${Number(chainId).toString(16)}`,
            //     rpcUrls: ["https://rpc-mainnet.matic.network/"],
            //     chainName: "Matic Mainnet",
            //     nativeCurrency: {
            //         name: "MATIC",
            //         symbol: "MATIC",
            //         decimals: 18
            //     },
            //     blockExplorerUrls: ["https://polygonscan.com/"]
            // }]

            //testnet
            params: [
              {
                chainId: `0x${Number(chainId).toString(16)}`,
                // rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
                // chainName: "Matic Testnet(Mumbai)",
                // nativeCurrency: {
                //   name: "MATIC",
                //   symbol: "MATIC",
                //   decimals: 18,
                // },
                // blockExplorerUrls: ["https://mumbai.polygonscan.com"],
              },
            ],
          })
          .then(() => {
            //   setConnected(true);
          });
        console.log("You have successfully switched to Correct Network");
      }
    } catch (error) {
      console.log(error);
      //   setConnected(false);
      // NotificationManager.error(
      //   "Failed to switch to " + NETWORK_NAME + " network.",
      //   "ERROR",
      //   3000
      // );
    }
  };

  const handleConnectWallet = async () => {
    // connect metamask
    if (typeof window.ethereum === "undefined") {
      NotificationManager.error(
        "Please install Metamask Wallet Plugin.",
        "",
        3000
      );
      handleCloseConnectWallet();
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      handleSwitch();
      setFlagWalletConnected(true);
      handleCloseConnectWallet();
      handleOpenAlertWalletConnected();
    } catch (error) {
      console.error(error);
    }

    // connect phantom

    // const { solana } = window;
    // if (!solana) {
    //   NotificationManager.error(
    //     "Please install Solana Phantom Wallet Plugin.",
    //     "",
    //     3000
    //   );
    //   handleCloseConnectWallet();
    //   // return;
    // }
    // if (flagWalletConnected === true) {
    //   return;
    // }
    // try {
    //   const network = "devnet";
    //   // const phantom = new PhantomWalletAdapter();
    //   if (phantom._readyState === "NotDetected") {
    //     NotificationManager.error(
    //       "Please install Solana Phantom Wallet Plugin.",
    //       "",
    //       10000
    //     );
    //     handleCloseConnectWallet();
    //     return;
    //   }
    //   await phantom.disconnect();
    //   await phantom.connect();
    //   const rpcUrl = clusterApiUrl(network);
    //   const connection = new Connection(rpcUrl, "confirmed");
    //   const wallet = {
    //     address: phantom.publicKey.toString(),
    //   };
    //   if (wallet.address) {
    //     const signedMessage = await signMsg();
    //     if (signedMessage === false) {
    //       throw new Error("Failed to sign message");
    //     }

    //     const userWallet = signedMessage.publicKey;
    //     const signature = signedMessage.signature;

    //     // ************************************************************************************
    //     // Jabie - now need to add codes to submit the wallet and signature to Gabriel to verify and save the wallet
    //     // ************************************************************************************
    //     actionConnectWallet(token, wallet.address).then(async (res) => {
    //       console.log(res);
    //       if (res.success === true) {
    //         const accountInfo = await connection.getAccountInfo(
    //           new PublicKey(wallet.address),
    //           "confirmed"
    //         );
    //         setPublicKey(wallet.address);
    //         setFlagWalletConnected(true);
    //         handleCloseConnectWallet();
    //         handleOpenAlertWalletConnected();
    //         console.log(accountInfo);

    //         actionGetUserData(token).then((res) => {
    //           console.log("actionGetUserData", res);
    //           if (res.success === true) {
    //             setUserInfo(res.result.profile);

    //             let myNFTs = [];
    //             if (typeof res.result.data.eaties !== "undefined") {
    //               myNFTs = res.result.data.eaties;
    //             }

    //             console.log(myNFTs);
    //             setMyNFTData(myNFTs);
    //           } else {
    //             if (typeof res.message_name !== "undefined") {
    //               if (res.message_name === "token_expired") {
    //                 localStorage.removeItem("token");
    //                 navigate("/login");
    //                 return;
    //               }
    //             }
    //           }
    //         });
    //       }
    //     });
    //   }
    // } catch (err) {
    //   handleCloseConnectWallet();
    //   console.log(err);
    // }

    /* this code is only for google chrome desktop using window.solana */

    // if (typeof window.solana === "undefined") {
    //   NotificationManager.error(
    //     "Please install Solana Phantom Wallet Plugin.",
    //     "",
    //     3000
    //   );
    //   return;
    // }
    // if (true !== window.solana.isPhantom) {
    //   NotificationManager.error("No Phantom Wallet found.", "", 3000);
    //   return;
    // }
    // try {
    //   let response;
    //   try {
    //     response = await window.solana.connect();
    //     if (!window.solana.isConnected) {
    //       if (true !== window.solana.isPhantom) {
    //         NotificationManager.error("Not connected.", "", 3000);
    //         return;
    //       }
    //       handleCloseConnectWallet();
    //       return;
    //     }

    //     let tempPublicKey = response.publicKey.toString();
    //     setPublicKey(tempPublicKey);
    //     setFlagWalletConnected(true);
    //     handleCloseConnectWallet();
    //     handleOpenAlertWalletConnected();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return;
    // }
  };

  const signMsg = async () => {
    try {
      // jabie - sign verify message
      const userId = userInfo.displayID;
      const message = `Sign this message for authenticating with your wallet. eatie ID: ${userId}`;
      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = await window.solana.request({
        method: "signMessage",
        params: {
          message: encodedMessage,
        },
      });
      // console.log(signedMessage);

      return {
        publicKey: signedMessage.publicKey,
        signature: signedMessage.signature,
      };
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  return (
    <StyledComponent>
      <HeaderLogin switchLangCallback={switchLangCallback} />
      <PartContent01>
        <PartContent02>
          <PartSidebar01>
            <PartList01>
              <EachList
                text={
                  myNFTData
                    ? "My eaite NFT" +
                      " (" +
                      Object.keys(myNFTData).length +
                      ")"
                    : "My eaite NFT"
                }
              />
            </PartList01>

            <PartDown01>
              <PartAccount01>
                <PartBorder01></PartBorder01>
                <TextUsername01>{userInfo?.name}</TextUsername01>
                <TextID01>{userInfo?.displayID}</TextID01>
                <PartLogout01
                  onClick={() => {
                    localStorage.removeItem("token");
                    actionLogout(token).then((res) => {
                      console.log("actionLogout", res);
                      navigate("/login");
                      window.location.reload();
                    });
                  }}
                >
                  <ButtonLogout01>{textMyNFT.tLogout01}</ButtonLogout01>
                </PartLogout01>
              </PartAccount01>

              <PartConnectWallet01>
                <Box
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => {
                    if (flagWalletConnected) {
                      return;
                    }
                    handleOpenConnectWallet();
                  }}
                >
                  <PartWalletIcon01>
                    <BiWallet />
                  </PartWalletIcon01>
                  <PartWalletText01>
                    {!flagWalletConnected
                      ? textMyNFT.tConnectWallet01
                      : shortWalletAddress(publicKey)}
                  </PartWalletText01>
                </Box>

                <Box onClick={handleOpenWalletHelp}>
                  <svg
                    stroke="#f290d7"
                    fill="#f290d7"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1.5em"
                    width="1.5em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                  </svg>
                </Box>
              </PartConnectWallet01>
            </PartDown01>
          </PartSidebar01>
          <PartSidebar02>
            <PartSidebarUp01>
              <PartCollectionName01>
                {myNFTData
                  ? `My eaite NFT ( ${Object.keys(myNFTData).length} )`
                  : "My eaite NFT"}
              </PartCollectionName01>
              <PartUserInfo01>
                <UserLeft01>
                  <TextUsername01>{userInfo?.name}</TextUsername01>
                  <TextID01>{userInfo?.displayID}</TextID01>
                </UserLeft01>
                <PartLogout02
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                    window.location.reload();
                  }}
                >
                  <ButtonLogout01>{textMyNFT.tLogout01}</ButtonLogout01>
                </PartLogout02>
              </PartUserInfo01>
            </PartSidebarUp01>
            <PartSidebarDown01>
              <Box onClick={handleOpenWalletHelp} sx={{ cursor: "pointer" }}>
                <svg
                  stroke="#f290d7"
                  fill="#f290d7"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                </svg>
              </Box>
              <PartConnectWallet02
                onClick={() => {
                  if (flagWalletConnected) {
                    return;
                  }
                  handleOpenConnectWallet();
                }}
              >
                <PartWalletIcon01>
                  <BiWallet />
                </PartWalletIcon01>
                <PartWalletText01>
                  {!flagWalletConnected
                    ? textMyNFT.tConnectWallet01
                    : shortWalletAddress(publicKey)}
                </PartWalletText01>
              </PartConnectWallet02>
            </PartSidebarDown01>
          </PartSidebar02>
          <PartDisplayNFT01>
            <Box display={"flex"} width="100%" position={"relative"}>
              {/* <PartGetMore01
                onClick={() => {
                  navigate("/buyNFT");
                }}
              >
                <PartGetMoreIcon01>
                  <img
                    src={imgGetMore01}
                    width={"100%"}
                    height={"100%"}
                    alt=""
                  />
                </PartGetMoreIcon01>
                <PartGetMoreText01>{textMyNFT.tGetMore}</PartGetMoreText01>
              </PartGetMore01> */}
              <PartDisplayNFT02>
                {myNFTData?.map((each, index) => {
                  return (
                    <CustomMyEachNFT
                      key={index}
                      dataNFT={each.eatie}
                      flagWalletConnected={flagWalletConnected}
                      publicKey={publicKey}
                      textMyNFT={textMyNFT}
                    />
                  );
                })}

                {!(myNFTData?.length > 0) &&
                  [...Array(8)].map((each, index) => {
                    return (
                      <ImagePlaceholder key={index}>
                        <img
                          src={imgPlaceholder}
                          width={"100%"}
                          height={"100%"}
                          alt=""
                        />
                      </ImagePlaceholder>
                    );
                  })}
                {/* 
                {myNFTData?.length < 8
                  ? [...Array(12 - myNFTData?.length)].map((each, index) => {
                    return (
                      <ImagePlaceholder key={index}>
                        <img
                          src={imgPlaceholder}
                          width={"100%"}
                          height={"100%"}
                          alt=""
                        />
                      </ImagePlaceholder>
                    );
                  })
                  : [...Array(8)].map((each, index) => {
                    return (
                      <ImagePlaceholder key={index}>
                        <img
                          src={imgPlaceholder}
                          width={"100%"}
                          height={"100%"}
                          alt=""
                        />
                      </ImagePlaceholder>
                    );
                  })} */}
              </PartDisplayNFT02>
            </Box>
          </PartDisplayNFT01>
        </PartContent02>
      </PartContent01>
      <FooterNFT lang={lang} />
      <Modal
        open={openConnectWallet}
        onClose={handleCloseConnectWallet}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PartModalWalletConnect01>
          <TextTitleWalletConnect01>
            {textMyNFT.tConnectWallet01}
          </TextTitleWalletConnect01>
          <TextContentWalletConnect01>
            {textMyNFT.byconnecting}
          </TextContentWalletConnect01>
          <ButtonConnectPhantom01 onClick={() => handleConnectWallet()}>
            <ImagePhantom01>
              <img src={imgMetamask01} width={"100%"} height={"100%"} alt="" />
            </ImagePhantom01>
            <TextPhantom01>{textMyNFT.connectPhantom}</TextPhantom01>
          </ButtonConnectPhantom01>
          <ButtonCancelConnectPhantom01
            onClick={() => {
              handleCloseConnectWallet();
            }}
          >
            {textMyNFT.cancel}
          </ButtonCancelConnectPhantom01>
        </PartModalWalletConnect01>
      </Modal>

      <CustomModalSimpleAlert
        title={textMyNFT.walletConnected}
        text={textMyNFT.walletConnected + " " + shortWalletAddress(publicKey)}
        open={openAlertWalletConnected}
        textOK={textMyNFT.ok}
        handleClose={handleCloseAlertWalletConnected}
      />

      <Modal
        open={openWalletHelp}
        onClose={handleCloseWalletHelp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PartModalWalletConnect01>
          <TextTitleWalletConnect01>
            {textMyNFT.walletHelpTitle}
          </TextTitleWalletConnect01>
          <TextContentWalletConnect01>
            {textMyNFT.walletHelpDetail}
          </TextContentWalletConnect01>
          <ButtonConnectPhantom01
            onClick={() =>
              window.open(
                "https://help.phantom.app/hc/en-us/sections/4406292675731-The-Basics",
                "_blank"
              )
            }
          >
            <TextPhantom01>{textMyNFT.walletHelpButton}</TextPhantom01>
          </ButtonConnectPhantom01>
          <ButtonCancelConnectPhantom01
            onClick={() => {
              handleCloseWalletHelp();
            }}
          >
            {textMyNFT.walletHelpCloseButton}
          </ButtonCancelConnectPhantom01>
        </PartModalWalletConnect01>
      </Modal>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: ${customColor.backColor01};
`;

const PartContent01 = styled(Box)`
  display: flex;
  width: 100%;
  max-width: 1440px;
  flex: 1;
  overflow-y: auto;
  height: 100%;
  padding: 70px 50px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 50px 30px;
  }
  @media (max-width: 500px) {
    padding: 40px 30px;
  }
`;

const PartContent02 = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  background-color: ${customColor.mainColor01};

  transition: 0.5s;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const PartSidebar01 = styled(Box)`
  display: flex;
  min-width: 270px;
  background-color: #f290d7;
  border-radius: 30px 0px 0px 30px;
  flex-direction: column;
  padding-top: 30px;
  box-sizing: border-box;
  justify-content: space-between;

  transition: 0.5s;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const PartList01 = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const PartDown01 = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const PartAccount01 = styled(Box)`
  display: flex;
  width: 100%;
  padding: 0px 20px;
  box-sizing: border-box;
  flex-direction: column;
  color: ${customColor.mainColor01};
`;

const TextUsername01 = styled(Box)`
  display: flex;
  width: 100%;
  font-family: "K2D";
  font-style: normal;
  font-weight: 800;
  font-size: 21px;
  line-height: 130%;
`;

const TextID01 = styled(Box)`
  display: flex;
  font-family: "K2D";
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 130%;
  opacity: 0.45;
`;

const PartDisplayNFT01 = styled(Box)`
  display: flex;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;

  transition: 0.5s;
  @media (max-width: 1200px) {
    padding: 15px;
  }
  @media (max-width: 1024px) {
    flex: 1;
    height: 100%;
    overflow-y: auto;
  }
`;

const PartDisplayNFT02 = styled(Box)`
  display: grid;
  overflow-y: auto;
  /* flex-wrap: wrap;
  justify-content: space-between; */
  width: 100%;
  grid-template-columns: auto auto auto auto;
  grid-column-gap: 10px;
  // grid-column-gap: auto;
  grid-row-gap: 50px;
  transition: 0.5s;
  @media (max-width: 1400px) {
    grid-template-columns: auto auto auto;
  }

  @media (max-width: 1024px) {
    grid-template-columns: auto auto auto auto;
  }
  @media (max-width: 900px) {
    grid-template-columns: auto auto auto;
  }
  @media (max-width: 700px) {
    grid-template-columns: auto auto;
    grid-column-gap: 8px;
  }
  /* 
  @media (min-width: 1024px) {
    ::-webkit-scrollbar {
      width: 15px;
    }

    ::-webkit-scrollbar-track {
      background-color: #e4e4e4;
      border-radius: 100px;
      cursor: pointer;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #F290D7;
      border-radius: 100px;
    }
  } */
`;

// const PartGetMore01 = styled(Box)`
//   display: flex;
//   z-index: 30;
//   position: absolute;
//   bottom: 0px;
//   right: 0px;
//   width: 90px;
//   height: 90px;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   border-radius: 100%;
//   background-color: #F290D7;
//   color: ${customColor.backColor01};
//   cursor: pointer;

//   transition: 0.5s;
// `;

// const PartGetMoreIcon01 = styled(Box)`
//   display: flex;
//   width: 30px;
//   height: 30px;
//   justify-content: center;
//   align-items: center;
// `;

// const PartGetMoreText01 = styled(Box)`
//   display: flex;
//   font-family: "Rubik";
//   font-style: normal;
//   font-weight: 700;
//   font-size: 12px;
//   line-height: 160%;
//   /* or 19px */
//   text-align: center;
// `;

const PartLogout01 = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 20px;
  opacity: 0.45;
`;
const ButtonLogout01 = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ffffff;
  border-radius: 8px;
  width: 100px;
  height: 26px;
  font-family: "K2D";
  // font-style: italic;
  font-weight: 800;
  font-size: 16px;
  line-height: 130%;
  /* or 21px */

  text-align: center;

  /* White */

  color: #ffffff;
  cursor: pointer;
`;

const PartBorder01 = styled(Box)`
  display: flex;
  width: 100%;
  background-color: ${customColor.backColor01};
  height: 1px;
  margin-bottom: 10px;
`;
const PartConnectWallet01 = styled(Box)`
  display: flex;
  margin-top: 20px;
  width: 100%;
  height: 55px;
  padding: 0px 20px;
  box-sizing: border-box;
  background-color: rgb(255, 222, 243);
  align-items: center;
  border-radius: 0px 0px 0px 30px;
  cursor: pointer;
  justify-content: space-between;
`;

const PartWalletIcon01 = styled(Box)`
  align-items: center;
  color: #f290d7;
  font-size: 1.5rem;
`;

const PartWalletText01 = styled(Box)`
  color: #f290d7;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 130%;
  margin-left: 5px;
`;

const PartModalWalletConnect01 = styled(Box)`
  display: flex;
  position: fixed;
  width: 420px;
  flex-direction: column;
  align-items: center;
  padding: 35px;
  box-sizing: border-box;
  border-radius: 16px;
  background-color: ${customColor.mainColor01};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: box-shadow 300ms;
  transition: transform 505ms cubic-bezier(0, 0, 0.2, 1) 0ms !important;
  outline: none;
  animation: back_animation1 0.5s 1;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  @keyframes back_animation1 {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }

  transition: 0.5s;
  @media (max-width: 500px) {
    width: 300px;
    padding: 20px;
  }
`;

const TextTitleWalletConnect01 = styled(Box)`
  display: flex;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 160%;
  /* identical to box height, or 26px */

  text-align: center;
  color: #f290d7;
`;

const TextContentWalletConnect01 = styled(Box)`
  display: flex;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  /* or 22px */

  text-align: center;
  color: ${customColor.textColor03};
  margin-top: 10px;
`;

const ButtonConnectPhantom01 = styled(Box)`
  display: flex;
  height: 45px;
  width: 100%;
  background-color: ${customColor.backColor06};
  color: ${customColor.mainColor01};
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 20px;
`;

const ImagePhantom01 = styled(Box)`
  display: flex;
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const TextPhantom01 = styled(Box)`
  display: flex;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 160%;
  /* or 22px */

  text-align: center;
  color: ${customColor.mainColor01};
`;

const ButtonCancelConnectPhantom01 = styled(Box)`
  display: flex;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  /* or 22px */

  text-align: center;
  color: #f290d7;
  cursor: pointer;
  margin-top: 20px;
`;

const ImagePlaceholder = styled(Box)`
  display: flex;
  width: 100%;
  height: auto;
  // width: 200px;
  // height: 200px;
  cursor: pointer;

  transition: 0.5s;
  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
    // width: 192px;
    // height: 192px;
  }
`;

const PartSidebar02 = styled(Box)`
  display: none;
  width: 100%;
  min-height: 200px;
  background: #f290d7;
  border-radius: 30px 30px 0px 0px;
  transition: 0.5s;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

const PartSidebarUp01 = styled(Box)`
  display: flex;
  flex: 1;
  height: 100%;
  padding: 20px 28px;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.5s;
  @media (max-width: 350px) {
    padding: 15px 20px;
  }
`;

const PartCollectionName01 = styled(Box)`
  display: flex;
  width: 100%;
  font-family: "K2D";
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 130%;
  /* or 31px */

  text-align: center;

  /* White */

  color: #ffffff;
`;

const PartSidebarDown01 = styled(Box)`
  display: flex;
  width: 100%;
  // justify-content: flex-end;
  justify-content: space-between;
  height: 48px;
  padding: 0px 28px;
  box-sizing: border-box;
  align-items: center;
  background: #fbdef3;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.06);

  transition: 0.5s;
  @media (max-width: 350px) {
    padding: 0px 20px;
  }
`;

const PartConnectWallet02 = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const PartUserInfo01 = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserLeft01 = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const PartLogout02 = styled(Box)`
  display: flex;
  opacity: 0.45;
`;
export default MyNFT;
