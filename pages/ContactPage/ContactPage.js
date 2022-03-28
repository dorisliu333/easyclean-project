import React from 'react';
import styled from 'styled-components';

// import Button from '../Button';

// import { Layout } from 'antd';

// const { Header, Footer, Sider, Content } = Layout;

const FlexBody = styled.body`
  font-family: Arial;
  padding: 10px;
  background: #f1f1f1;
  display: flex;
`;

const Leftcolumn = styled.div`
  background: #aaa;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 25px 0px 25px 0px;
`;

const Rightcolumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  align-items: center;
  margin: 25px 30px 25px 30px;
`;

function ContactPage() {
  return (
    <FlexBody>
      <Leftcolumn>
        <div className="card">
          <h3>Contact Number</h3>
        </div>
        <div className="card">
          <h5>TITLE HEADING</h5>
          <h5>Title description, Sep 2, 2017</h5>
          {/* <div class="fakeimg" style="height:200px;">Image</div> */}
          <div className="fakeimg">Image</div>
          <p>Some text..</p>
        </div>
      </Leftcolumn>
      <Rightcolumn>
        <div className="Content">
          <h2>Contact Us</h2>
          <p>Article Title,href</p>
          {/* eslint-disable-next-line max-len */}
          <p>
            Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco.
          </p>
        </div>
      </Rightcolumn>
    </FlexBody>
  );
}
export default ContactPage;
