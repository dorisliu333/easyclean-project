import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  margin: 0px;
  padding: 0px 0px 16px;
  flex-shrink: 0;
  min-width: 0px;
  border: 0px;
`;
const Label = styled.label`
  display: block;
  color: rgb(41, 43, 50);
  font-family: museo-regular, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  font-size: 14px;
  font-weight: initial;
  line-height: 20px;
  letter-spacing: 0.25px;
  margin-bottom: 8px;
`;

const FormItem = ({ label, htmlFor, children }) => (
  <Item>
    <Label htmlFor={htmlFor}>{label}</Label>
    {children}
  </Item>
);

export default FormItem;
