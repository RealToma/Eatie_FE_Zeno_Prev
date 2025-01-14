import map from 'lodash/map'
import keys from 'lodash/keys'
import reduce from 'lodash/reduce'
import { css } from 'styled-components'

import { customColor, eatieColor } from './../../Config/Color'

const baseFontSize = 16
const breakpointValues = [0, 430, 1024, 1440]
const breakpoints = map(
  breakpointValues,
  (breakpointValue) => `${breakpointValue}px`
)

breakpoints.xs = breakpoints[0]
breakpoints.sm = breakpoints[1]
breakpoints.md = breakpoints[2]
breakpoints.lg = breakpoints[3]

const mq = reduce(
  keys(breakpoints),
  (acc, label) => {
    acc[label] = (...args) => css`
      @media (min-width: ${breakpoints[label]}) {
        ${css(...args)};
      }
    `
    return acc
  },
  {}
)

export default {
  colors: {
    ...customColor,
    ...eatieColor,
  },
  // fonts: {
  //   roboto: 'Roboto, sans-serif',
  //   robotocon: 'Roboto Condensed, sans-serif',
  //   merriweather: 'Merriweather, serif',
  //   abril: 'Abril Fatface, serif',
  //   notoSansTc: 'Noto Sans TC',
  //   notoSerifTc: 'Noto Serif TC',
  // },
  breakpoints,
  variables: {
    baseFontSize,
  },
  mq,
}
