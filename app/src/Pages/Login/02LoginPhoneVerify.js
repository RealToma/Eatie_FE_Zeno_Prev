import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import styled from "styled-components";
import { TEXT_LOGIN } from "../../Config/Text";
import HeaderLogin from "../../Layouts/HeaderLogin";
import FooterNFT from "../../Layouts/FooterNFT";
import imgBtnRight01 from "../../Assets/Images/Icons/login_BtnRight01.png";
import imgCharacter01 from "../../Assets/Images/Characters/05_Astronaut_2048px 1.png";
import LoginEachNumber from "../../Components/Input/LoginEachNumber";
import { useNavigate, useLocation } from "react-router-dom";
import { actionVerifyOTP } from "../../Actions/Login";
import { actionSendOTP } from "../../Actions/Login";

const LoginVerify = () => {
  const [lang, setLang] = useState(
    localStorage.getItem("flagLang") === "true" ? 'ch' : 'en'
  );

  const countdownTime = 60;
  const [textLogin, setSiteCopy] = useState(
    localStorage.getItem("flagLang") === "true" ? TEXT_LOGIN.CH : TEXT_LOGIN.EN
  );
  const switchLangCallback = () => {
    setSiteCopy(
      localStorage.getItem("flagLang") === "true"
        ? TEXT_LOGIN.CH
        : TEXT_LOGIN.EN
    );
    setLang(localStorage.getItem("flagLang") === "true" ? 'ch' : 'en');
  };
  const navigate = useNavigate();
  let params = useLocation();
  // const [number, setNumber] = useState(new Array(6).fill(""));
  const [time, setTime] = useState(countdownTime);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittingResend, setSubmittingResend] = useState(false);
  const [lastSubmittedOtp, setLastSubmittedOtp] = useState("");

  const otpRef1 = useRef(null);
  const otpRef2 = useRef(null);
  const otpRef3 = useRef(null);
  const otpRef4 = useRef(null);
  const otpRef5 = useRef(null);
  const otpRef6 = useRef(null);

  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [otp5, setOtp5] = useState('');
  const [otp6, setOtp6] = useState('');

  const prevNumber1 = () => {
    // nothing
  }

  const prevNumber2 = () => {
    otpRef1.current.focus();
  }

  const prevNumber3 = () => {
    otpRef2.current.focus();
  }

  const prevNumber4 = () => {
    otpRef3.current.focus();
  }

  const prevNumber5 = () => {
    otpRef4.current.focus();
  }

  const prevNumber6 = () => {
    otpRef5.current.focus();
  }

  const updateOtp1 = (value) => {
    setOtp1(value)
    if (value !== "") {
      otpRef2.current.select();
      // otpRef2.current.focus();
    }
  }
  const updateOtp2 = (value) => {
    setOtp2(value);
    if (value !== "") {
      otpRef3.current.select();
      // otpRef3.current.focus();
    }
  }
  const updateOtp3 = (value) => {
    setOtp3(value);
    if (value !== "") {
      otpRef4.current.select();
      otpRef4.current.focus();
    }
  }
  const updateOtp4 = (value) => {
    setOtp4(value);
    if (value !== "") {
      otpRef5.current.select();
      otpRef5.current.focus();
    }
  }
  const updateOtp5 = (value) => {
    setOtp5(value);
    if (value !== "") {
      otpRef6.current.select();
      otpRef6.current.focus();
    }
  }
  const updateOtp6 = (value) => {
    setOtp6(value);
  }


  const initPrefix =
    !params.state || typeof params.state.prefix === "undefined"
      ? ""
      : params.state.prefix;
  const initOtpID =
    !params.state || typeof params.state.otpID === "undefined"
      ? ""
      : params.state.otpID;

  const [prefix, setPrefix] = useState(initPrefix);
  const [otpID, setOtpID] = useState(initOtpID);

  const handleResend = () => {
    if (!submittingResend) {
      setSubmittingResend(true);

      // setNumber(new Array(6).fill(""));
      setOtp1('');
      setOtp2('');
      setOtp3('');
      setOtp4('');
      setOtp5('');
      setOtp6('');

      setLastSubmittedOtp('');
      otpRef1.current.focus();

      actionSendOTP(params.state.phoneNumber, params.state.areaCode).then(
        (res) => {
          // console.log(res.result.otpID);
          setSubmittingResend(false);

          if (res.success === true) {
            setPrefix(res.result.prefix);
            setOtpID(res.result.otpID);
            return;
          } else {
            setError(textLogin.error.fail_send_otp);
            return;
          }
        }
      );
      setTime(countdownTime);
    }
  };

  const handleVerify = () => {
    if (!submitting) {
      let otp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;

      // ignore if same number
      if (otp !== '' && lastSubmittedOtp === otp) {
        return
      }

      setSubmitting(true);
      setError("");

      // console.log("n", number);
      // for (var i = 0; i < number.length; i++) {
      //   otp += number[i];
      // }
      let data = {
        otpID: otpID,
        otp: parseInt(otp),
      };

      let otpString = otp.toString();
      if (otpString.length !== 6) {
        setError(textLogin.error.empty_otp)
        setSubmitting(false);
        return;
      }

      setLastSubmittedOtp(otp);

      actionVerifyOTP(data).then((res) => {
        setSubmitting(false);

        // console.log(res);
        if (true === res.success) {
          localStorage.setItem("token", res.result.token);
          navigate("/member");
          // window.location.reload();
          return;
        } else {
          setError(textLogin.error.invalid_otp);
          return;
        }
      });
    }
  };



  useEffect(() => {
    if (initPrefix === "") {
      if (localStorage.getItem("token")) navigate("/member");
      else navigate("/login");
      return;
    }

    let timer = setInterval(() => {
      let tempTime = time;
      tempTime -= 1;
      if (tempTime < 0) {
        // navigate("/login");
        return;
      }
      setTime(tempTime);
    }, 1000);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    otpRef1.current.focus();
    window.scrollTo(0, 0);
  }, []);


  // hit enter on keyboard submits the form
  useEffect(() => {
    // submit on "enter"
    const keyDownHandler = function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleVerify();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [otp1, otp2, otp3, otp4, otp5, otp6, time, error, submitting, submittingResend, lastSubmittedOtp]);

  return (
    <StyledComponent>
      <HeaderLogin switchLangCallback={switchLangCallback} />
      <BoxContent01>
        <BoxLogin01>
          <BoxHeader01>{textLogin.header}</BoxHeader01>
          <BoxDown01>
            <TextTitle01>{textLogin.textCaptcha01}</TextTitle01>
            <BoxOFL01>
              <TextOFL01>{prefix} - </TextOFL01>
            </BoxOFL01>
            <BoxVerify01>
              <LoginEachNumber
                key={1}
                index={1}
                number={otp1}
                setNumber={updateOtp1}
                innerRef={otpRef1}
                prevNumber={prevNumber1}
              />
              <LoginEachNumber
                key={2}
                index={2}
                number={otp2}
                setNumber={updateOtp2}
                innerRef={otpRef2}
                prevNumber={prevNumber2}
              />
              <LoginEachNumber
                key={3}
                index={3}
                number={otp3}
                setNumber={updateOtp3}
                innerRef={otpRef3}
                prevNumber={prevNumber3}
              />
              <LoginEachNumber
                key={4}
                index={4}
                number={otp4}
                setNumber={updateOtp4}
                innerRef={otpRef4}
                prevNumber={prevNumber4}
              />
              <LoginEachNumber
                key={5}
                index={5}
                number={otp5}
                setNumber={updateOtp5}
                innerRef={otpRef5}
                prevNumber={prevNumber5}
              />
              <LoginEachNumber
                key={6}
                index={6}
                number={otp6}
                setNumber={updateOtp6}
                innerRef={otpRef6}
                prevNumber={prevNumber6}
              />
              {/* {new Array(6).fill("").map((each, index) => {
                return (
                  <LoginEachNumber
                    key={index}
                    index={index}
                    number={number[index]}
                    setNumber={handleUpdateNumber}
                  />
                );
              })} */}
            </BoxVerify01>
            <BoxError>{error}</BoxError>
            <BoxButtonRight01>
              <LeftBoxButton01
                onClick={() => {
                  navigate("/login");
                }}
              >
                {textLogin.btnBack}
              </LeftBoxButton01>
              <RightBoxButton01>
                {time > 0 && (
                  <TextTimeSecond01>
                    {time}
                    {textLogin.second}
                  </TextTimeSecond01>
                )}
                {time === 0 && (
                  <ButtonResend
                    onClick={() => {
                      handleResend();
                    }}
                  >
                    {textLogin.resend}
                  </ButtonResend>
                )}
                <ButtonRight01
                  onClick={() => {
                    handleVerify();
                  }}
                >
                  <img
                    src={imgBtnRight01}
                    width={"100%"}
                    height={"100%"}
                    alt=""
                  />
                </ButtonRight01>
              </RightBoxButton01>
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
  min-height: 600px;
  flex-direction: column;
  background-color: #edeee6;

  @media (max-width: 500px) {
    min-height: 400px;
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
  padding: 30px 85px;
  box-sizing: border-box;
  transition: 0.5s;
  @media (max-width: 1024px) {
    padding: 25px 30px;
  }
  @media (max-width: 500px) {
    padding: 20px 10px;
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
    font-size: 18px;
  }
  @media (max-width: 350px) {
    font-size: 16px;
  }
`;

const BoxVerify01 = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
`;

const BoxButtonRight01 = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 35px;
  transition: 0.5s;
  
  @media (max-width: 1024px) {
    margin-top: 15px;
    width: 75%;
    margin-left: 20%;
  }
`;

const ButtonRight01 = styled(Box)`
  display: flex;
  width: 66px;
  height: 66px;
  cursor: pointer;
  transform-origin: right center;

  @media (max-width: 1024px) {
    transform: scale(0.9);
  }

  @media (max-width: 500px) {
    transform: scale(0.8);
  }
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

  // bottom: -135px;
  // left: -200px;
  // transition: 0.5s;
  // @media (max-width: 1024px) {
  //   width: 250px;
  //   height: 250px;
  //   bottom: -160px;
  //   left: -120px;
  // }
  // @media (max-width: 500px) {
  //   bottom: -160px;
  //   left: -80px;
  //   width: 230px;
  //   height: 230px;
  // }
`;

const BoxOFL01 = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 8px;
`;

const TextOFL01 = styled(Box)`
  font-family: "K2D";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 130%;
  /* or 23px */

  text-align: center;

  color: #bba68e;
  
  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

const LeftBoxButton01 = styled(Box)`
  font-family: "K2D";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 130%;
  /* or 23px */

  color: #bba68e;
  cursor: pointer;
  z-index: 112;
  &:hover {
    text-shadow: 0px 0px 5px;
  }
`;

const TextTimeSecond01 = styled(Box)`
  font-family: "K2D";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  /* or 18px */

  color: #bba68e;
  margin-right: 28px;

  @media (max-width: 1024px) {
    margin-right: 15px;
  }

  @media (max-width: 500px) {
    margin-right: 5px;
  }
`;

const RightBoxButton01 = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const ButtonResend = styled(Box)`
  font-family: "K2D";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 130%;
  /* or 18px */

  color: #bba68e;
  margin-right: 28px;
  cursor: pointer;
  &:hover {
    text-shadow: 0px 0px 5px;
  }

  @media (max-width: 1024px) {
    margin-right: 15px;
  }

  @media (max-width: 500px) {
    margin-right: 5px;
  }
`;

export default LoginVerify;
