import React, { useState } from "react";
import { Box } from "@mui/material";
import styled from "styled-components";
import { customColor } from "../../Config/Color";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import imgMark01 from "../../Assets/image/mark_AiR03.png";
// import imgApple01 from "../../Assets/image/icons/apple01.png";
// import imgGoogle01 from "../../Assets/image/icons/google01.png";
// import imgFacebook01 from "../../Assets/image/icons/facebook01.png";
import imgNFT01 from "../../Assets/image/nfts/OP nft_IT_A 1_shadow.png";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import { actionLogin } from "../../Actions/Auth";

const Login = (props) => {
  const { textLogin } = props;
  const { redirectPath = "/myNFT" } = props;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgAlert, setMsgAlert] = useState("");

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = () => {
    if (email === "") {
      setMsgAlert(textLogin.ta01);
      return;
    }
    if (email !== "") {
      if (!isValidEmail(email)) {
        setMsgAlert(textLogin.ta02);
        return;
      }
    }
    if (password === "") {
      setMsgAlert(textLogin.ta03);
      return;
    }
    let loginData = {
      type: "email",
      handle: email,
      password: password,
      keepToken: true,
    };
    actionLogin(loginData).then((res) => {
      if (res.status === 1001) {
        setMsgAlert(textLogin.ta04);
      } else if (res.status === 1002) {
        setMsgAlert(textLogin.ta05);
      } else if (res.status === 2000) {
        localStorage.setItem("userInfo", JSON.stringify(res.playerInfo.player));
        localStorage.setItem("userToken", res.playerInfo.userToken);
        localStorage.setItem("token", res.playerInfo.token);
        if (res.playerInfo.player.name === undefined) {
          navigate("/createPlayer");
        } else {
          navigate(redirectPath);
          window.location.reload();
        }
      } else {
        setMsgAlert(textLogin.ta06);
      }
    });
  };

  return (
    <PartSign01>
      <PartHeader01>
        <img src={imgMark01} width={"170px"} height={"47px"} alt="" />
      </PartHeader01>
      <PartContent01>
        <TextTitle01>{textLogin.tt01}</TextTitle01>
        <InputCustom01
          component={"input"}
          placeholder={textLogin.ti01}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></InputCustom01>
        <PartNext01>
          <InputCustom02
            component={"input"}
            type={"password"}
            placeholder={textLogin.ti02}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></InputCustom02>
          <ButtonNext01 onClick={() => handleLogin()}>
            <ArrowForwardIcon sx={{ color: customColor.mainColor01 }} />
          </ButtonNext01>
        </PartNext01>
        <TextMessage01>{msgAlert}</TextMessage01>
        {/* <PartBorder01>
          <PartLine01></PartLine01>
          <TextOr01>or</TextOr01>
          <PartLine01></PartLine01>
        </PartBorder01>
        <PartOtherSign01>
          <EachSign01>
            <img src={imgApple01} width={"100%"} height={"100%"} alt={""} />
          </EachSign01>
          <EachSign01>
            <img src={imgGoogle01} width={"100%"} height={"100%"} alt={""} />
          </EachSign01>
          <EachSign01>
            <img src={imgFacebook01} width={"100%"} height={"100%"} alt={""} />
          </EachSign01>
        </PartOtherSign01> */}
      </PartContent01>
      <PartSignin01
        onClick={() => {
          navigate("/signup");
        }}
      >
        <PartLeft01>
          <PartUp01>{textLogin.tr01} </PartUp01>
          <PartDown01>{textLogin.tr02}</PartDown01>
        </PartLeft01>
        <PartRight01>
          <NavigateNextIcon sx={{ color: customColor.mainColor02 }} />
        </PartRight01>
      </PartSignin01>
      <PartImage01>
        <img src={imgNFT01} width={"100%"} height={"100%"} alt="" />
      </PartImage01>
    </PartSign01>
  );
};

const PartSign01 = styled(Box)`
  display: flex;
  position: fixed;
  width: 386px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  filter: drop-shadow(4px 4px 21px rgba(0, 0, 0, 0.1));
  border-radius: 16px;
  background: ${customColor.backColor01};
  align-items: center;
  transition: 0.5s;
  @media (max-width: 500px) {
    width: 300px;
  }
`;

const PartHeader01 = styled(Box)`
  display: flex;
  width: 100%;
  height: 91px;
  border-radius: 16px 16px 0px 0px;
  background-color: ${customColor.mainColor02};
  justify-content: center;
  align-items: center;

  transition: 0.5s;
  @media (max-width: 500px) {
    height: 80px;
  }
`;

const TextTitle01 = styled(Box)`
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

const PartContent01 = styled(Box)`
  display: flex;
  width: 100%;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 0px 0px 16px 16px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  background-color: ${customColor.mainColor01};
  transition: 0.5s;
  @media (max-width: 500px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const InputCustom01 = styled(Box)`
  display: flex;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 6px;
  color: ${customColor.textColor02};
  background-color: ${customColor.backColor03};
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  height: 45px;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  margin-top: 20px;
`;

const InputCustom02 = styled(Box)`
  display: flex;
  width: 100%;
  flex: 1;
  outline: none;
  border: none;
  border-radius: 6px;
  color: ${customColor.textColor02};
  background-color: ${customColor.backColor03};
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  height: 45px;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  margin-right: 10px;
`;

const PartNext01 = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 10px;
`;

const ButtonNext01 = styled(Box)`
  display: flex;
  width: 45px;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: ${customColor.mainColor02};
  cursor: pointer;
`;

const TextMessage01 = styled(Box)`
  display: flex;
  width: 100%;
  height: 20px;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  color: ${customColor.textColor04};
  margin-top: 10px;
`;

// const PartBorder01 = styled(Box)`
//   display: flex;
//   width: 100%;
//   margin-top: 10px;
//   gap: 10px;
//   align-items: center;
// `;
// const PartLine01 = styled(Box)`
//   display: flex;
//   height: 1px;
//   flex: 1;
//   background-color: ${customColor.backColor01};
// `;

// const TextOr01 = styled(Box)`
//   display: flex;
//   font-family: "Rubik";
//   font-style: normal;
//   font-weight: 400;
//   font-size: 16px;
//   line-height: 160%;
//   color: ${customColor.textColor01};
// `;

// const PartOtherSign01 = styled(Box)`
//   display: flex;
//   width: 100%;
//   justify-content: space-evenly;
// `;

// const EachSign01 = styled(Box)`
//   display: flex;
//   width: 45px;
//   height: 45px;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
// `;

const PartImage01 = styled(Box)`
  display: flex;
  position: absolute;
  bottom: -100px;
  left: -200px;
  width: 250px;
  height: 250px;
  transition: 0.5s;
  @media (max-width: 900px) {
    display: none;
  }
`;
const PartSignin01 = styled(Box)`
  display: flex;
  position: absolute;
  right: 0px;
  bottom: -80px;
  border-radius: 9px;
  background-color: ${customColor.mainColor01};
  width: 170px;
  padding: 12px;
  box-sizing: border-box;
  justify-content: space-between;
  cursor: pointer;
`;
const PartLeft01 = styled(Box)`
  display: flex;
  flex-direction: column;
`;
const PartUp01 = styled(Box)`
  display: flex;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: ${customColor.textColor02};
`;

const PartDown01 = styled(Box)`
  display: flex;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  text-align: center;
  letter-spacing: -0.02em;
  color: ${customColor.mainColor02};
`;

const PartRight01 = styled(Box)`
  display: flex;
  align-items: center;
`;
export default Login;
