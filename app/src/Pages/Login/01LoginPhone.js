import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import styled from "styled-components";
import { TEXT_LOGIN } from "../../Config/Text";
import HeaderLogin from "../../Layouts/HeaderLogin";
import FooterNFT from "../../Layouts/FooterNFT";
import imgBtnRight01 from "../../Assets/Images/Icons/login_BtnRight01.png";
import imgCharacter01 from "../../Assets/Images/Characters/05_Astronaut_2048px 1.png";
import { useNavigate } from "react-router-dom";
import { actionSendOTP } from "../../Actions/Login";

const LoginPhone = () => {
  const [lang, setLang] = useState(
    localStorage.getItem("flagLang") === "true" ? 'ch' : 'en'
  );

  const [textLogin, setSiteCopy] = useState(
    localStorage.getItem("flagLang") === "true" ? TEXT_LOGIN.CH : TEXT_LOGIN.EN
  );
  const switchLangCallback = () => {
    setSiteCopy(
      localStorage.getItem("flagLang") === "true" ? TEXT_LOGIN.CH : TEXT_LOGIN.EN
    );
    setLang(localStorage.getItem("flagLang") === "true" ? 'ch' : 'en');
  };

  const [areaCode, setAreaCode] = useState(+852);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleNext = () => {
    if (!submitting) {
      setSubmitting(true);
      setError("");
      // console.log(phoneNumber);

      if (
        phoneNumber.length !== 8 ||
        phoneNumber.substring(0, 1) === "1" ||
        phoneNumber.substring(0, 1) === "2" ||
        phoneNumber.substring(0, 1) === "3"
      ) {
        setSubmitting(false);
        return setError(textLogin.error.invalid_phone);
      }
      actionSendOTP(phoneNumber, areaCode).then((res) => {
        // console.log(res);
        setSubmitting(false);
        if (res.code === 105) {
          return setError(textLogin.error.account_not_exist);
        }
        if (res.success === true) {
          navigate("/otp", {
            state: {
              otpID: res.result.otpID,
              prefix: res.result.prefix,
              phoneNumber: phoneNumber,
              areaCode: areaCode,
            },
          });
          return;
        } else {
          if (res.message_name === "account_not_exist" || res.message_name === "account_incomplete") {
            setError(textLogin.error.account_not_exist);
          } else {
            setError(textLogin.error.invalid_phone);
          }
          return;
        }
      });
    }
  };

  const checkPhoneNumber = (phone) => {
    if (!submitting) {
      if (
        phone.length !== 8 ||
        phone.substring(0, 1) === "1" ||
        phone.substring(0, 1) === "2" ||
        phone.substring(0, 1) === "3"
      ) {
        return setError(textLogin.error.invalid_phone);
      }

      setError("");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/member");
    }
  });

  // hit enter on keyboard submits the form
  useEffect(() => {
    // submit on "enter"
    const keyDownHandler = function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleNext();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [phoneNumber, submitting, areaCode, error]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <StyledComponent>
      <HeaderLogin switchLangCallback={switchLangCallback} />
      <BoxContent01>
        <BoxLogin01>
          <BoxHeader01>{textLogin.header}</BoxHeader01>
          <BoxDown01>
            <TextTitle01>{textLogin.textPhone01}</TextTitle01>
            <BoxPhone01>
              <ButtonPhoneCountry01
                component={"input"}
                type={"tel"}
                maxLength={"3"}
                value={"+ " + areaCode}
                disabled={true}
                onChange={(e) => {
                  setAreaCode(e.target.value);
                }}
              ></ButtonPhoneCountry01>
              <ButtonPhoneInput01
                component={"input"}
                type={"tel"}
                maxLength={"8"}
                value={phoneNumber}
                onChange={(e) => {
                  let val = e.target.value.replace(/\D+/g, '')
                  setPhoneNumber(val);
                }}

                onBlur={(e) => {
                  checkPhoneNumber(e.target.value);
                }}
              ></ButtonPhoneInput01>
            </BoxPhone01>
            <BoxError>{error}</BoxError>
            <BoxRegisterNow
              onClick={() => {
                console.log("A");
                window.open("https://eatieprod.page.link/download", "_blank");
              }}
            >
              Register Now!
            </BoxRegisterNow>

            <BoxButtonRight01>
              <ButtonRight01
                onClick={() => {
                  handleNext();
                }}
              >
                <img
                  src={imgBtnRight01}
                  width={"100%"}
                  height={"100%"}
                  alt=""
                />
              </ButtonRight01>
            </BoxButtonRight01>
          </BoxDown01>
          <ImageCharacter01>
            <img src={imgCharacter01} width={"100%"} height={"100%"} alt="" />
          </ImageCharacter01>
        </BoxLogin01>
      </BoxContent01>
      <FooterNFT lang={lang} />
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  height: 100vh;
  min-height: 500px;
  flex-direction: column;
  background-color: #edeee6;

  @media (max-width: 500px) {
    min-height: 300px;
  }
`;

const BoxContent01 = styled(Box)`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const BoxLogin01 = styled(Box)`
  display: flex;
  position: relative;
  width: 500px;
  background: #ffffff;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  flex-direction: column;
  transition: 0.5s;
  @media (max-width: 1024px) {
    width: 390px;
  }
  @media (max-width: 500px) {
    width: 320px;
  }
  @media (max-width: 350px) {
    width: 280px;
  }
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
  font-style: italic;
  font-weight: 800;
  font-size: 30px;
  line-height: 130%;
  /* identical to box height, or 39px */

  text-align: center;

  /* White */

  color: #ffffff;

  transition: 0.5s;
  @media (max-width: 500px) {
    font-size: 18px;
  }
  @media (max-width: 350px) {
    font-size: 16px;
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
  padding: 30px 0px;
  box-sizing: border-box;
  transition: 0.5s;
  @media (max-width: 1024px) {
    padding: 25px 0px;
  }
  @media (max-width: 500px) {
    padding: 20px 0px;
  }
`;

const TextTitle01 = styled(Box)`
  font-family: "K2D";
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 130%;
  /* or 31px */

  text-align: center;

  /* eatie pink */

  color: #f290d7;
  transition: 0.5s;
  @media (max-width: 500px) {
    font-size: 20px;
  }
  @media (max-width: 350px) {
    font-size: 18px;
  }
`;

const BoxPhone01 = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const ButtonPhoneCountry01 = styled(Box)`
  display: flex;
  width: 85px;
  height: 47px;
  background: #bba68e;
  border-radius: 8px;
  outline: none;
  border: none;
  justify-content: center;
  align-items: center;
  font-family: "K2D";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 130%;
  /* or 23px */

  text-align: center;

  /* White */

  color: #ffffff;
  margin-right: 10px;
  transition: 0.5s;
  @media (max-width: 500px) {
    width: 70px;
    height: 45px;
    font-size: 16px;
  }
  @media (max-width: 350px) {
    width: 60px;
    height: 40px;
    font-size: 15px;
  }
`;

const ButtonPhoneInput01 = styled(Box)`
  display: flex;
  width: 221px;
  height: 47px;
  outline: none;
  border: none;
  background: #edeee6;
  opacity: 0.48;
  border-radius: 8px;
  font-family: "K2D";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 130%;
  /* or 23px */

  text-align: left;
  padding: 0px 15px;
  box-sizing: border-box;
  transition: 0.5s;
  -webkit-user-select: text;
  @media (max-width: 500px) {
    width: 200px;
    height: 45px;
    font-size: 16px;
  }
  @media (max-width: 350px) {
    width: 170px;
    height: 40px;
    font-size: 15px;
  }
`;

const BoxButtonRight01 = styled(Box)`
  display: flex;
  justify-content: flex-end;
  width: 70%;
  margin-top: 10px;
  transition: 0.5s;
  transform-origin: right center;
  @media (max-width: 1024px) {
    width: 85%;
    transform: scale(0.9);
  }

  @media (max-width: 500px) {
    transform: scale(0.8);
  }
`;

const ButtonRight01 = styled(Box)`
  display: flex;
  width: 66px;
  height: 66px;
  cursor: pointer;
`;

const ImageCharacter01 = styled(Box)`
  display: flex;
  position: absolute;
  width: 270px;
  height: 270px;

  bottom: -65px;
  left: -180px;
  transition: 0.5s;
  
  @media (max-width: 1024px) {
    transform: scale(0.75);
    bottom: -105px;
    left: -130px;
  }

  @media (max-width: 500px) {
    transform: scale(0.6);
  }
`;

const BoxError = styled(Box)`
  display: flex;
  height: 15px;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: red;
  text-align: left;
  padding-top: 20px;
  font-family: "K2D";

  transition: 0.5s;

  @media (max-width: 500px) {
    font-size: 14px;
  }

  @media (max-width: 350px) {
    font-size: 13px;
  }
`;

const BoxRegisterNow = styled(Box)`
  transform: translate(0, 52px);
  font-family: "K2D";
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  text-align: center;
  color: #f290d7;
  cursor: pointer;
  z-index:2;
  text-decoration: underline;
  
  @media (max-width: 1024px) {
    font-size: 18px;
  }

  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

export default LoginPhone;
