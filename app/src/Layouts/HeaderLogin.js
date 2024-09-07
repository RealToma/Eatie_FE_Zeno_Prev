import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import styled from "styled-components";
import { eatieColor } from "../Config/Color";
import { useNavigate } from "react-router-dom";
import { TEXT_HEADER_HOME } from "../Config/Text";
import { BiDotsVerticalRounded } from "react-icons/bi";
import imgLogoPink01 from "../Assets/Images/Icons/logo_small_pink01.svg";

const HeaderLogin = ({ switchLangCallback }) => {
  const navigate = useNavigate();
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [textHeaderHome, setTextHeader] = useState(
    localStorage.getItem("flagLang") === "true"
      ? TEXT_HEADER_HOME.CH
      : TEXT_HEADER_HOME.EN
  );

  const switchFlagLanguage = (value) => {
    localStorage.setItem("flagLang", value ? "true" : "false");
    if (switchLangCallback) switchLangCallback(value);
  };

  return (
    <StyledComponent>
      <PartMax01>
        <BoxLogo01
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={imgLogoPink01} width={"100%"} height={"100%"} alt="" />
        </BoxLogo01>
        <ButtonPoint01
          onClick={() => {
            console.log(localStorage.getItem("flagLang"));
            if (localStorage.getItem("flagLang") === "true") {
              localStorage.removeItem("flagLang");
              localStorage.setItem("flagLang", "false");
              setTextHeader(TEXT_HEADER_HOME.EN);
              switchFlagLanguage(false);
            } else {
              localStorage.removeItem("flagLang");
              localStorage.setItem("flagLang", "true");
              setTextHeader(TEXT_HEADER_HOME.CH);
              switchFlagLanguage(true);
            }
          }}
        >
          {textHeaderHome.language}
        </ButtonPoint01>
        <ButtonMenu01>
          <BiDotsVerticalRounded />
        </ButtonMenu01>
      </PartMax01>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropComponent={customBackdrop}
      >
        <ModalBox></ModalBox>
      </Modal>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  height: 100px;
  min-height: 100px;
  /* position: fixed; */
  justify-content: center;
  z-index: 100;
`;

const PartMax01 = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 1440px;
  padding: 0px 50px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;

  transition: 0.5s;
  @media (max-width: 500px) {
    padding: 0px 30px;
  }
`;

const ButtonPoint01 = styled(Box)`
  display: flex;
  cursor: pointer;
  position: relative;
  font-family: "K2D";
  font-style: italic;
  font-weight: 700;
  font-size: 24px;
  line-height: 31px;
  color: ${eatieColor.pink01};

  transition: 0.5s;
  &:hover {
    text-shadow: 0px 0px 10px;
  }

  transition: 0.5s;
  @media (max-width: 1024px) {
    display: flex;
  }
`;

const BoxLogo01 = styled(Box)`
  display: flex;
  width: 155px;
  height: 52px;
  cursor: pointer;

  transition: 0.5s;
  @media (max-width: 1024px) {
    width: 143px;
    height: 49px;
  }
`;

const ButtonMenu01 = styled(Box)`
  display: none;
  font-size: 2.5rem;
  color: ${eatieColor.pink01};

  cursor: pointer;
  transition: 0.5s;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const ModalBox = styled(Box)`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  backdrop-filter: blur(3px);

  padding: 50px;
  box-sizing: border-box;

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

  @media (max-width: 500px) {
    transition: 0.5s !important;
    padding: 20px;
  }
`;

export const customBackdrop = styled(Box)`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: ${eatieColor.white};
  opacity: 0.8;
`;

export default HeaderLogin;
