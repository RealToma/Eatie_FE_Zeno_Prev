import React from "react";
import { Box } from "@mui/material";
import styled from "styled-components";
import { customColor } from "../Config/Color";

const EachList = ({ image, text }) => {
  //   const [flagSelect, setFlagSelect] = useState(false);

  return (
    <ListEach01
      onClick={() => {
        // setFlagSelect(true);
      }}
    >
      <PartListEachContent01>
        {image ? (
          <PartListEachImage01>
            <img src={image} width={"100%"} height={"100%"} alt="" />
          </PartListEachImage01>
        ) : (
          <></>
        )}

        <PartListEachText01>{text}</PartListEachText01>
      </PartListEachContent01>
    </ListEach01>
  );
};

const ListEach01 = styled(Box)`
  display: flex;
  width: 100%;
  height: 30px;
  border-left: 5px solid rgba(255, 255, 255, 0);
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    border-left: 5px solid ${customColor.mainColor01};
  }

  transition: 0.5s;
  @media (max-width: 1024px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

const PartListEachContent01 = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
`;
const PartListEachImage01 = styled(Box)`
  width: 34px;
  height: 18px;
  margin-right: 10px;
  transition: 0.5s;
  @media (max-width: 1024px) {
    display: none;
  }
`;
const PartListEachText01 = styled(Box)`
  color: #ffffff;
  font-family: "K2D";
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 130%;

  transition: 0.5s;
  @media (max-width: 1024px) {
    color: ${customColor.mainColor02};
  }
`;

export default EachList;
