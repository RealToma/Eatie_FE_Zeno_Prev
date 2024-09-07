import React, {useState} from "react";
import { Box } from "@mui/material";
import styled from "styled-components";
import { FOOTER } from "../Config/Text";
import { useNavigate } from "react-router-dom/dist";

const FooterNFT = ({lang}) => {
  const navigate = useNavigate();
  let textFooter = FOOTER.EN;

  if (lang === 'ch')
    textFooter = FOOTER.CH;

  return (
    <StyledComponent>
      <PartMax01>
        <TextCopyRight01>{textFooter.copyRight}</TextCopyRight01>
        <TextCopyRight01>
          <FooterLink
            onClick={() => {
              window.open('/terms-and-conditions','_blank');
              // navigate("/terms-and-conditions");
            }}
            >{textFooter.tnc}
          </FooterLink>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <FooterLink
            onClick={() => {
              window.open('/privacy-policy','_blank');
              // navigate("/privacy-policy");
            }}
            >{textFooter.pp}
          </FooterLink>
        </TextCopyRight01>
      </PartMax01>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  height: 80px;
  min-height: 80px;
  justify-content: center;
`;

const TextCopyRight01 = styled(Box)`
  font-family: "Karla";
  // font-style: italic;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;

  /* eatie pink */

  color: #f290d7;
`;

const PartMax01 = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 1440px;
  padding: 0px 50px;
  box-sizing: border-box;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  transition: 0.5s;
  @media (max-width: 500px) {
    padding: 2rem 30px;
  }
`;

const FooterLink = styled(Box)`
  display: inline-block;
  color: #f290d7;
  cursor: pointer;
  text-decoration: underline;
`;

export default FooterNFT;
