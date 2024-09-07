import React, { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import styled from "styled-components";
import { eatieColor } from "../Config/Color";
import { useNavigate } from "react-router-dom";
import { TEXT_HEADER_HOME } from "../Config/Text";
import { BiDotsVerticalRounded } from "react-icons/bi";
import imgLogoWhite01 from "../Assets/Images/Icons/logo_small_white01.png";
import imgLogoPink01 from "../Assets/Images/Icons/logo_small_pink01.png";

const HeaderHome = () => {
  const navigate = useNavigate();
  const textHeaderHome = TEXT_HEADER_HOME.EN;
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [flagScroll, setFlagScroll] = useState(false);
  const handleScroll = () => {
    let position = window.pageYOffset;
    console.log(position);
    if (position > 80) {
      setFlagScroll(true);
    } else {
      setFlagScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <StyledComponent>
      <PartMax01>
        <ButtonPoint01 flagscroll={flagScroll ? 1 : 0}>
          {textHeaderHome.language}
        </ButtonPoint01>
        <BoxLogo01
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          <img
            src={flagScroll === false ? imgLogoWhite01 : imgLogoPink01}
            width={"100%"}
            height={"100%"}
            alt=""
          />
        </BoxLogo01>
        <ButtonMenu01 flagscroll={flagScroll ? 1 : 0}>
          <BiDotsVerticalRounded />
        </ButtonMenu01>
        <ButtonPoint01
          flagscroll={flagScroll ? 1 : 0}
          onClick={() => {
            navigate("/login");
          }}
        >
          {textHeaderHome.login}
        </ButtonPoint01>
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
  position: fixed;
  justify-content: center;
  z-index: 100;
`;

const PartMax01 = styled(Box)`
  display: flex;
  width: 100%;
  max-width: 1440px;
  min-height: 100px;
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
  color: ${({ flagscroll }) =>
    !flagscroll ? eatieColor.white : eatieColor.pink01};

  transition: 0.5s;
  &:hover {
    text-shadow: 0px 0px 10px;
  }

  transition: 0.5s;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const BoxLogo01 = styled(Box)`
  display: flex;
  width: 155px;
  height: 52px;

  transition: 0.5s;
  @media (max-width: 1024px) {
    width: 143px;
    height: 49px;
  }
`;

const ButtonMenu01 = styled(Box)`
  display: none;
  font-size: 2.5rem;
  color: ${({ flagscroll }) =>
    !flagscroll ? eatieColor.white : eatieColor.pink01};

  cursor: pointer;
  transition: 0.5s;
  @media (max-width: 1024px) {
    display: flex;
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

export default HeaderHome;
