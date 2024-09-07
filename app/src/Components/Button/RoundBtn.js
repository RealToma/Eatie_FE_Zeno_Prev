
import styled from 'styled-components'
import { customColor } from "../../Config/Color"

const StyledNextBtn = styled.div`
  font-size: 14px;
  font-weight:  700;
  line-height: 22.4px;
  background-color: ${(props) => props.bgColor};
  text-align: center;
  color: ${(props) => props.color};
  border: ${(props) => props.border};
  border-radius: 6px;
  a {
    text-decoration: none;
  }
`

const RoundBtn = (props) => {
  const { 
    children,
    bgColor = customColor.mainColor02,
    border = 'none',
    color = 'white',
   } = props
  
  return (
    <StyledNextBtn {...{ bgColor, border, color }}>
      {children}
    </StyledNextBtn>
  )
}

export default RoundBtn