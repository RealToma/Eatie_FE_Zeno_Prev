import React, { useState } from "react";
import { Box } from "@mui/material";
import styled from "styled-components";
import { TEXT_PRIVACY } from "../Config/Text";
import HeaderLogin from "../Layouts/HeaderLogin";
import FooterNFT from "../Layouts/FooterNFT";

const Terms = () => {
  const [lang, setLang] = useState(
    localStorage.getItem("flagLang") === "true" ? 'ch' : 'en'
  );

  const [textPrivacy, setTextPrivacy] = useState(
    localStorage.getItem("flagLang") === "true" ? TEXT_PRIVACY.CH : TEXT_PRIVACY.EN
  );

  const switchLangCallback = () => {
    setTextPrivacy(
      localStorage.getItem("flagLang") === "true" ? TEXT_PRIVACY.CH : TEXT_PRIVACY.EN
    );

    setLang(localStorage.getItem("flagLang") === "true" ? 'ch' : 'en');
  };

  return (
    <StyledComponent>
      <HeaderLogin switchLangCallback={switchLangCallback} />
      <BoxContent01>
        <BoxContentInner>
          <BoxHeader01>{textPrivacy.tnc.title}</BoxHeader01>
          <BoxDown01>        
            <Box>
                {[ ...Array(10).keys() ].map( i => (
                    <p>{textPrivacy.tnc.content}</p>
                ))}
            </Box>
          </BoxDown01>
        </BoxContentInner>
      </BoxContent01>
      <FooterNFT lang={lang} />
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #edeee6;
  
`;

const BoxContent01 = styled(Box)`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: #f290d7;
  padding: 1rem 0 3rem;
  flex-direction: column;
`;

const BoxContentInner = styled(Box)`
  display: flex;
  position: relative;
  width: 90%;
  background: #ffffff;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  flex-direction: column;
  transition: 0.5s;
`;

const BoxHeader01 = styled(Box)`
  display: flex;
  width: 100%;
  height: 60px;
  background: #f290d7;
  border-radius: 30px 30px 0px 0px;
  justify-content: center;
  align-items: center;
  font-family: "K2D";
  font-weight: 800;
  font-size: 30px;
  line-height: 130%;
  /* identical to box height, or 39px */

  text-align: center;

  /* White */

  color: #ffffff;

  transition: 0.5s;
  @media (max-width: 500px) {
    font-size: 26px;
  }
  @media (max-width: 350px) {
    font-size: 22px;
  }
`;

const BoxDown01 = styled(Box)`
  display: flex;
  width: 100%;
  border-radius: 0px 0px 30px 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  padding: 1rem 2rem;
  box-sizing: border-box;
  transition: 0.5s;
`;
export default Terms;
