import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LinkItem = styled(Link)`
  text-decoration: none;
  display: block;
  font-size: 14px;
  padding: 12px 0;
  margin: 0 12px;
  font-weight: 400;
  cursor: pointer;
  border: 2px solid transparent;

  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
  }
  &:hover {
    color: rgb(35, 151, 183);
    border-top: 2px solid rgb(35, 151, 183);
  }
`;

export default LinkItem;
