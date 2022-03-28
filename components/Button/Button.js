import styled, { css } from 'styled-components';

const Button = styled.button`
  outline: 0;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
  //background-color: rgb(224, 68, 109);
  color: white;
  border-radius: 160px;
  font-weight: bold;
  letter-spacing: 0.25px;

  //为组件的props里添加一个css对象,sm、md是键名,值为css样式.同时调用该对象中的某个键名对应的值.
  ${(props) =>
    ({
      xs: css`
        font-size: 12px;
        padding: 2px 12px;
      `,
      sm: css`
        font-size: 14px;
        padding: 6px 16px;
      `,
      md: css`
        font-size: 16px;
        padding: 10px 24px;
      `,
      lg: css`
        font-size: 16px;
        padding: 8px 16px;
        width: 100%;
        line-height: 24px;
      `,
    }[props.size || 'md'])}

  ${(props) =>
    ({
      primary: css`
        background-color: rgb(224, 68, 109);
        color: white;
      `,
      green: css`
        background-color: rgb(125, 179, 67);
        color: white;
      `,
      blue: css`
        background-color: rgb(24, 119, 242);
      `,
      white: css`
        background-color: white;
        color: black;
        border-color: rgb(231, 235, 251);
      `,
      black: css`
        background-color: black;
        color: white;
      `,
      offerStatusTrue: css`
        background-color: rgb(229, 240, 217);
        color: rgb(125, 179, 67);
        margin-right: 20px;
        cursor: default;
      `,
      offerStatusFalse: css`
        background-color: transparent;
        color: rgb(187, 194, 220);
        margin-right: 20px;
        cursor: default;
      `,
      grey: css`
        background-color: rgb(190, 202, 207);
        color: white;
      `,
      red: css`
        display: inline-block;
        text-align: center;
        white-space: nowrap;
        box-sizing: border-box;
        margin: 0px;
        border-color: rgba(0, 0, 0, 0);
        color: rgb(255, 255, 255);
        padding: 8px 16px;
        letter-spacing: 0.15px;
        background-color: rgb(231, 82, 69);
      `,
      close: css`
        white-space: nowrap;
        box-sizing: border-box;
        margin: 0px;
        border-width: 2px;
        border-style: solid;
        padding: 8px 16px;
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        letter-spacing: 0.15px;
        width: 100%;
        border-color: rgb(231, 235, 251);
        background-color: rgb(246, 248, 253);
        color: rgb(0, 143, 180);
      `,
      transparent: css`
        background-color: transparent;
        color: black;
        border-color: rgb(231, 235, 251);
        &:hover {
          color: rgb(43, 161, 192);
          background-color: white;
          transition: all 0.25s ease 0s;
        }
      `,
      square: css`
        transform: translate(-50%);
        z-index: 1;
        background: #008fb4;
        border-radius: 4px;
        box-shadow: 4px 6px 8px rgb(187 194 220 / 60%);
        color: #fff;
        font-size: 11px;
        font-weight: 700;
        height: 34px;
        left: 50%;
        margin: 10px auto;
        position: absolute;
        text-align: center;
        top: 0;
        /* transform: translate(-50%,-100%);
        transition: transform .6s cubic-bezier(.68,-.55,.265,1.55),opacity .6s ease; */
        width: 222px;
      `,
      left: css`
        transform: translate(-50%);
        z-index: 1;
        background: #008fb4;
        border-radius: 8px;
        box-shadow: 4px 6px 8px rgb(187 194 220 / 60%);
        color: #fff;
        font-size: 1rem;
        font-weight: 700;
        height: 34px;
        display: inline-block;
        padding: 0%;
        margin-left: 48%;
        text-align: center;
        top: 0;
        width: 222px;
      `,
      tab: css`
        background-color: transparent;
        color: black;
        padding: 16px 0px;
        margin: 0px 16px;
        border-top: 2px solid transparent;
        border-bottom: 2px solid transparent;
        border-left: transparent;
        border-right: transparent;
        border-radius: 0px;
        &:hover {
          padding: 16px 0px;
          border-top-color: black;
        }
      `,
      mapDropdownButton: css`
        height: 3rem;
        width: 10rem;
        padding: 0;
        background-color: rgb(43, 161, 192);
        cursor: pointer;
        color: white;
        border-radius: 15px;
        font-weight: bold;
        letter-spacing: 0.25px;
        color: white;
        border-color: rgb(231, 235, 251);
        &:hover {
          color: rgb(43, 161, 192);
          background-color: white;
          transition: all 0.25s ease 0s;
        }
      `,
      mapDropdown: css`
        background-color: transparent;
        width: 100%;
        color: black;
        padding: 0px;
        margin: 0px auto;
        border-top: 2px solid transparent;
        border-bottom: 2px solid transparent;
        border-left: transparent;
        border-right: transparent;
        border-radius: 0px;
        &:hover {
          transition: transform 2s;
        }
      `,
    }[props.variant || 'primary'])}
`;

export default Button;
