import { createGlobalStyle } from 'styled-components';
import spaceAge from './fonts/space_age-webfont.woff2';
import spaceAge1 from './fonts/space_age-webfont.woff';

export default createGlobalStyle`
@font-face {
   font-family: spaceAge;
    font-style: normal;
    font-weight: normal;
    src: url(${spaceAge}), url(${spaceAge1});;

}

 * {
    box-sizing: border-box;
    padding: 0;
    margin:0;
    line-height: 1.5;
 }

 body {
   font-family: sans-serif;
   background-color: #121212;
   color: #F3F8FF;
 }
 main {
    padding: 15px 20px;
 }
 .sr-only{
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
 }

`;
