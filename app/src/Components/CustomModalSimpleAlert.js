import React from "react";
import { Box, Modal } from "@mui/material";
import styled from "styled-components";
import { customColor } from "../Config/Color";

const CustomModalSimpleAlert = ({ title, text, open, handleClose, textOK }) => {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalPart01>
        <TextTitleWalletConnect01>{title}</TextTitleWalletConnect01>
        <TextContentWalletConnect01>{text}</TextContentWalletConnect01>
        <Button01 onClick={() => handleClose()}>
          <TextPhantom01>{textOK}</TextPhantom01>
        </Button01>
      </ModalPart01>
    </Modal>
  );
};

const ModalPart01 = styled(Box)`
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

const TextTitleWalletConnect01 = styled(Box)`
  display: flex;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 160%;
  /* identical to box height, or 26px */

  text-align: center;
  color: #F290D7;
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

const Button01 = styled(Box)`
  display: flex;
  height: 45px;
  width: 100%;
  background-color: #F290D7;
  color: ${customColor.mainColor01};
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 20px;
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



export default CustomModalSimpleAlert;
