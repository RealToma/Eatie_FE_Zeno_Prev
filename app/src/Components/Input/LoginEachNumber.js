import React from "react";
import styled from "styled-components";
import { Box } from "@mui/system";

const LoginEachNumber = ({ number, setNumber, innerRef, prevNumber }) => {
  const handleKeyDown = event => {
    if (event.key === 'Backspace') {
      // console.log('Backspace key pressed ✅');
      if (number.length === 1)
        setNumber("");
      else 
        prevNumber();
    }
  };

  return (
    <ButtonPhoneInput01
      component={"input"}
      type={"number"}
      value={number}
      maxLength={1}
      ref={innerRef}
      onChange={(e) => {
        // let tempNumber = number;
        // tempNumber[index] = e.target.value;
        // setNumber(tempNumber);
        const v = e.target.value.slice(0, 1);
        setNumber(v);
      }}
      onKeyDown={handleKeyDown}
    ></ButtonPhoneInput01>
  );
};

const ButtonPhoneInput01 = styled(Box)`
  display: flex;
  width: 45px;
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

  text-align: center;
  box-sizing: border-box;
  transition: 0.5s;
  -webkit-user-select: text;
  @media (max-width: 500px) {
    width: 42px;
    height: 45px;
    font-size: 17px;
  }
  @media (max-width: 350px) {
    width: 40px;
    height: 43px;
    font-size: 16px;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
    -moz-appearance: textfield;
  
`;

export default LoginEachNumber;
