import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import styled from "styled-components";
import imgAiRMark01 from "../Assets/image/icons/eatie_icon.png";
import imgSolana01 from "../Assets/image/icons/polygon_logo.png";
import { customColor } from "../Config/Color";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomModalSimpleAlert from "./CustomModalSimpleAlert";
import { actionWithdraw } from "../Actions/MyNFT";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";

const CustomMyEachNFT = ({
  dataNFT,
  flagWalletConnected,
  publicKey,
  textMyNFT,
}) => {
  //   const [flagSelect, setFlagSelect] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [flagWithdraw, setFlagWithdraw] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openAlertWalletConnect, setOpenAlertWalletConnect] = useState(false);
  const handleOpenAlertWalletConnect = () => {
    setOpenAlertWalletConnect(true);
  };
  const handleCloseAlertWalletConnect = () => {
    setOpenAlertWalletConnect(false);
  };

  const [openAlertWalletConfirm, setOpenAlertWalletConfirm] = useState(false);
  const handleOpenAlertWalletConfirm = () => {
    setOpenAlertWalletConfirm(true);
  };
  const handleCloseAlertWalletConfirm = () => {
    setOpenAlertWalletConfirm(false);
  };

  const handleWithdraw = () => {
    // // disable withdraw function first
    // return ;
    if (!flagWalletConnected) {
      handleOpenAlertWalletConnect();
      return;
    }
    handleOpenAlertWalletConfirm();
  };

  const handleConfirm = () => {
    let data = {
      name: dataNFT.name,
      walletAddress: publicKey,
    };
    setFlagWithdraw(true);
    handleCloseAlertWalletConfirm();
    NotificationManager.info("Processing withdraw, please wait and keep the window open.", "", 20000);
    actionWithdraw(data, token).then((res) => {
      if (res.actionSuccess === false) {
        NotificationManager.error("Network error.", "", 10000);
        setFlagWithdraw(false);
        return;
      } else {
        if (res.status === 2000) {
          handleClose();
          window.location.reload();
        } else if (res.status === 1000) {
          navigate("/login");
          setFlagWithdraw(false);
        } else {
          NotificationManager.error("Something went wrong, please try again.", "", 10000);
          setFlagWithdraw(false);
        }
      }
    });
  };

  return (
    <>
      <StyledComponent
        onClick={() => {
          handleOpen();
        }}
      >
        <PartImage01>
          <img
            src={dataNFT.imageURL}
            width={"100%"}
            height={"100%"}
            style={{ borderRadius: "15px" }}
            alt=""
          />
        </PartImage01>

        <PartFooter01>
          <PartLeft01>
            <PartIcon01>
              <img src={imgAiRMark01} width={"100%"} height={"100%"} alt="" />
            </PartIcon01>
            <PartText01>{dataNFT.name}</PartText01>
          </PartLeft01>
        </PartFooter01>
          
        {false &&
          <PartFooter01>
            {!dataNFT.withdrawn ? (
              <>
                <PartLeft01>
                  <PartIcon01>
                    <img
                      src={imgAiRMark01}
                      width={"100%"}
                      height={"100%"}
                      alt=""
                    />
                  </PartIcon01>
                  <PartText01>{dataNFT.name}</PartText01>
                </PartLeft01>
                <PartWithdraw01>
                  {/* <img
                  src={imgWithdraw01}
                  width={"100%"}
                  height={"100%"}
                  alt=""
                /> */}
                </PartWithdraw01>
              </>
            ) : (
              <PartLeft01>
                <PartIcon01>
                  <img src={imgSolana01} width={"100%"} height={"100%"} alt="" />
                </PartIcon01>
                <PartText01>{dataNFT.name}</PartText01>
              </PartLeft01>
            )}
          </PartFooter01>
        }
      </StyledComponent>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      // BackdropComponent={customBackdrop}
      >
        <PartModal01>
          <img
            src={dataNFT.imageURL}
            width={"100%"}
            height={"100%"}
            style={{ borderRadius: "6px" }}
            alt=""
          />
          <PartModalFooter01 flagwithdraw={dataNFT.withdrawn ? 1 : 0}>
            <PartLeft01>
              <PartText02>{dataNFT.name}</PartText02>
            </PartLeft01>

            <PartWithdraw02>
              <PartIcon02>
                <img
                  src={imgAiRMark01}
                  width={"100%"}
                  height={"100%"}
                  alt=""
                />
              </PartIcon02>
            </PartWithdraw02>

            {/* {!dataNFT.withdrawn ? (
              <PartWithdraw02>
                <PartIcons01>
                  <PartIcon02>
                    <img
                      src={imgAiRMark01}
                      width={"100%"}
                      height={"100%"}
                      alt=""
                    />
                  </PartIcon02>
                  <PartRightIcon01>
                    <ArrowForwardIcon />
                  </PartRightIcon01>
                  <PartIcon02>
                    <img
                      src={imgSolana01}
                      width={"100%"}
                      height={"100%"}
                      alt=""
                    />
                  </PartIcon02>
                </PartIcons01>
                {!flagWithdraw ? (
                  <ButtonWithdraw01 onClick={() => handleWithdraw()}>
                    <ButtonWithdraw01>
                      <PartTextWithdraw01>
                        {textMyNFT.withdraw}
                      </PartTextWithdraw01>
                    </ButtonWithdraw01>
                  </ButtonWithdraw01>
                ) : (
                  <ButtonProceeding01>
                    {textMyNFT.proceeding}
                  </ButtonProceeding01>
                )}
              </PartWithdraw02>
            ) : (
              <PartWithdraw02>
                <PartIcon02>
                  <img
                    src={imgSolana01}
                    width={"100%"}
                    height={"100%"}
                    alt=""
                  />
                </PartIcon02>
              </PartWithdraw02>
            )} */}
          </PartModalFooter01>
          <CustomModalSimpleAlert
            title={textMyNFT.pleaseConnect}
            text={textMyNFT.pleaseConnectbeforeWithdraw}
            open={openAlertWalletConnect}
            handleClose={handleCloseAlertWalletConnect}
            textOK={textMyNFT.ok}
          />
        </PartModal01>
      </Modal>

      <Modal
        open={openAlertWalletConfirm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalPart02>
          <TextTitleWalletConnect02>
            {textMyNFT.withdrawto}
          </TextTitleWalletConnect02>
          <TextContentWalletConnect02>{publicKey}</TextContentWalletConnect02>
          <ButtonPart02>
            <ButtonCancel01 onClick={() => handleCloseAlertWalletConfirm()}>
              {textMyNFT.cancel}
            </ButtonCancel01>
            <ButtonConfirm01 onClick={() => handleConfirm()}>
              {textMyNFT.confirm}
            </ButtonConfirm01>
          </ButtonPart02>
        </ModalPart02>
      </Modal>
    </>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  position: relative;
  width: 100%;
  height: auto;
  // width: 200px;
  // height: 200px;
  cursor: pointer;

  transition: 0.5s;
  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
    // width: 150px;
    // height: 150px;
  }
`;

const PartImage01 = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 6px;
`;

const PartFooter01 = styled(Box)`
  display: flex;
  position: absolute;
  bottom: -40px;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  transition: 0.5s;
  @media (max-width: 1024px) {
    bottom: -40px;
  }
`;
const PartLeft01 = styled(Box)`
  display: flex;
  align-items: center;
`;

const PartWithdraw01 = styled(Box)`
  display: flex;
  min-width: 26px;
  min-height: 26px;

  transition: 0.5s;
  @media (max-width: 1024px) {
    min-width: 20px;
    min-height: 20px;
  }
`;

const PartWithdraw02 = styled(Box)`
  display: flex;
  align-items: center;

  transition: 0.5s;
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 10px;
  }
`;
const PartIcon02 = styled(Box)`
  display: flex;
  min-width: 46px;
  margin-right: 10px;

  transition: 0.5s;
  @media (max-width: 1024px) {
    min-width: 30px;
    margin-right: 0px;
  }
`;

const PartIcon03 = styled(Box)`
  display: flex;
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const PartRightIcon01 = styled(Box)`
  display: flex;
  margin-right: 10px;
  color: ${customColor.mainColor01};
  > svg {
    font-size: 2rem;
    transition: 0.5s;
    @media (max-width: 1024px) {
      width: 1.5rem;
    }
  }
  transition: 0.5s;
  @media (max-width: 1024px) {
    margin-right: 0px;
  }
`;

const ButtonWithdraw01 = styled(Box)`
  display: flex;
  width: 128px;
  height: 46px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: #f290d7;
  color: ${customColor.mainColor01};
  cursor: pointer;
`;
//${customColor.textColor03};

const ButtonProceeding01 = styled(Box)`
  display: flex;
  width: 128px;
  height: 46px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 2px solid ${customColor.textColor03};
  color: ${customColor.textColor03};
  font-family: "Rubik";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  cursor: pointer;
`;

const PartIcon01 = styled(Box)`
  display: flex;
  min-width: 36px;
`;
const PartText01 = styled(Box)`
  display: flex;
  margin-left: 5px;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: ${customColor.textColor02};
  margin-right: 10px;

  transition: 0.5s;
  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;

const PartText02 = styled(Box)`
  display: flex;
  color: ${customColor.mainColor01};
  font-family: "Rubik";
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 31px;
  /* identical to box height */
  letter-spacing: -0.02em;

  transition: 0.5s;
  @media (max-width: 1024px) {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    /* identical to box height */

    letter-spacing: -0.02em;
  }
`;

const PartIcons01 = styled(Box)`
  display: flex;
  align-items: center;

  transition: 0.5s;
  @media (max-width: 1024px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const PartTextWithdraw01 = styled(Box)`
  display: flex;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 160%;
`;

const PartModal01 = styled(Box)`
  display: flex;
  position: relative;
  width: 560px;
  height: 560px;
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

  @media (max-width: 1024px) {
    width: 350px;
    height: 350px;
  }

  @media (max-width: 500px) {
    width: 300px;
    height: 300px;
  }
`;

const PartModalFooter01 = styled(Box)`
  display: flex;
  position: absolute;
  bottom: -60px;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  transition: 0.5s;
  @media (max-width: 1024px) {
    bottom: ${({ flagwithdraw }) => (!flagwithdraw ? "-100px" : "-40px")};
    align-items: flex-start;
  }
`;

const ModalPart02 = styled(Box)`
  display: flex;
  width: 310px;
  position: fixed;
  flex-direction: column;
  align-items: center;
  padding: 25px;
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
  box-shadow: 4px 4px 21px rgba(0, 0, 0, 0.1);
  @keyframes back_animation1 {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`;

const TextTitleWalletConnect02 = styled(Box)`
  display: flex;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 160%;
  /* identical to box height, or 26px */

  text-align: center;
  color: ${customColor.mainColor02};
`;

const TextContentWalletConnect02 = styled(Box)`
  width: 100%;
  overflow-wrap: break-word;
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

const ButtonPart02 = styled(Box)`
  display: flex;
  height: 45px;
  width: 100%;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  cursor: pointer;
  margin-top: 20px;
`;

const ButtonCancel01 = styled(Box)`
  display: flex;
  flex: 1;
  height: 100%;
  background-color: ${customColor.backColor01};
  color: ${customColor.textColor02};
  border-radius: 6px;
  border: 1px solid ${customColor.backColor01};
  justify-content: center;
  align-items: center;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 160%;
  /* or 22px */

  text-align: center;
`;

const ButtonConfirm01 = styled(Box)`
  display: flex;
  flex: 1;
  height: 100%;
  background-color: #f290d7;
  color: ${customColor.mainColor01};
  border-radius: 6px;
  border: 1px solid #f290d7;
  justify-content: center;
  align-items: center;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 160%;
  /* or 22px */

  text-align: center;
`;

export const customBackdrop = styled(Box)`
  width: 100%;
  height: 100%;
  position: fixed;

  background-color: ${customColor.textColor03};
  opacity: 0.7;
`;

export default CustomMyEachNFT;
