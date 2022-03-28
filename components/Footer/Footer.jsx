import React from 'react';
import styled from 'styled-components';
import './Footer.css';

const Title = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: red;
  margin-right: 40px;
  margin-left: 40px;
`;

const Footer = () => (
  <div>
    <div className="layout_footer-wrapper">
      <Title>
        <div href="" className="Title">
          Existing Members
        </div>
        <div href="" className="content">
          Post a task
        </div>
        <div href="" className="content">
          Browse tasks
        </div>
        <div href="" className="content">
          Login
        </div>
        <div href="" className="content">
          Help Center
        </div>
      </Title>

      <Title>
        <div href="" className="Title">
          Popular Categories
        </div>
        <div href="" className="content">
          Handyman Services
        </div>
        <div href="" className="content">
          Cleaning Services
        </div>
        <div href="" className="content">
          Delivery Services
        </div>
        <div href="" className="content">
          Removalists
        </div>
      </Title>
    </div>

    <div className="EasyTask">
      <div>EasyClean Pty. Ltd 2021©, All rights reserved</div>
    </div>
  </div>
);

export default Footer;
