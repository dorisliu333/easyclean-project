import React from 'react';
import styled from 'styled-components';
import './BlueCard.css';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  padding: 0px 0px 36px;
  // margin-top: 30px;
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
`;
const Container2 = styled.div`
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: space-between;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 32px;
  width: calc(100vw - 32px);
  max-width: 1180px;
  min-height: 134px;
  border-radius: 8px;
  background-color: rgb(22, 160, 213);
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const Afterpay1 = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-flex: 1;
  flex-grow: 1;
  min-width: 288px;
`;

const Afterpay2 = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  z-index: 0;
  margin-top: 32px;
  margin-bottom: 32px;
`;
const Text = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  -webkit-box-flex: 1;
  flex-grow: 1;
`;
const LearnMore = styled.div`
  min-width: 180px;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 0px;
  display: flex;
  flex-direction: row;
`;

const BlueCard = () => (
  <Wrapper>
    <Container1>
      <Container2>
        <Afterpay1>
          <Afterpay2>
            <svg width="200" height="36" viewBox="0 0 600 124.6" className="Afterpay_svg">
              <path
                className="white"
                /* eslint-disable-next-line max-len */
                d="M302 41.4c11.7 11.7 11.7 30.7 0 42.4-5.6 5.6-13.2 8.7-21.2 8.6-5.3 0-10.3-2-14.2-5.6l-.6-.5v33.5l-15.2 4.8V33.9H266v4.5l.6-.6c4.5-4.4 9.7-5 14.2-5 8-.1 15.6 3 21.2 8.6m-6.4 21.1c0-8.2-6.6-14.8-14.8-14.8S266 54.3 266 62.5c0 8.2 6.8 15.2 14.8 15.2 8.1 0 14.8-7 14.8-15.2"
              />
              <path
                className="white"
                /* eslint-disable-next-line max-len */
                d="M325 83.7C313.3 72 313.3 53 325 41.3c5.6-5.6 13.2-8.7 21.2-8.6 5.3 0 10.3 2 14.2 5.6l.6.5v-5h15.2v57.4H361v-4.5l-.6.6c-4.5 4.4-9.7 5-14.2 5-8 .1-15.6-3-21.2-8.6m6.4-21.2c0 8.2 6.6 14.8 14.8 14.8S361 70.7 361 62.5c0-8.2-6.8-15.2-14.8-15.2s-14.8 7.1-14.8 15.2"
              />
              <path
                className="white"
                /* eslint-disable-next-line max-len */
                d="M325 83.7C313.3 72 313.3 53 325 41.3c5.6-5.6 13.2-8.7 21.2-8.6 5.3 0 10.3 2 14.2 5.6l.6.5v-5h15.2v57.4H361v-4.5l-.6.6c-4.5 4.4-9.7 5-14.2 5-8 .1-15.6-3-21.2-8.6m6.4-21.2c0 8.2 6.6 14.8 14.8 14.8S361 70.7 361 62.5c0-8.2-6.8-15.2-14.8-15.2s-14.8 7.1-14.8 15.2m59.8 62.1l13.7-33.2L382 33.9h16.8L413 69.6l14.6-35.7h16.6l-36.5 90.7z"
              />
              <path
                className="white"
                /* eslint-disable-next-line max-len */
                d="M391.2 124.6l13.7-33.2L382 33.9h16.8L413 69.6l14.6-35.7h16.6l-36.5 90.7zm-362-32.8C13.1 91.8 0 78.7 0 62.6s13.1-29.2 29.2-29.2c7.9 0 14.6 4.2 18.8 7.7l1.2 1v-7.5h9.3v55.9h-9.3V83L48 84c-4.2 3.6-10.9 7.8-18.8 7.8m0-49.4C18.1 42.3 9 51.3 8.9 62.5s8.9 20.2 20 20.3c11.1.1 20.2-8.9 20.3-20v-.2c0-11.1-8.9-20.1-20-20.2m46.2 48.1V43.4h-8.5v-8.8h8.5V18.1c0-9.9 8-18 17.9-18.1h12.1L103 8.8h-9.1c-5.1.2-9.2 4.4-9.2 9.5v16.3h17.7v8.8H84.7v47.1h-9.3zm62 0c-10.1 0-18.3-8.2-18.3-18.3V43.4h-8.5v-8.8h8.5V0h9.3v34.6h17.7v8.8h-17.7V72c0 5.1 4.4 9.8 9.3 9.8h9.1l2.3 8.8h-11.7zm40 1c-7.2 0-14.1-3.1-18.9-8.5-4.5-4.8-7.1-11-7.6-17.6-.1-.9-.1-1.7-.1-2.6 0-2.2.3-4.4.7-6.6 1.1-5.1 3.5-9.7 7-13.6 9.5-10.5 25.6-11.3 36.1-1.8l1.8 1.8c3.5 3.8 6 8.5 7 13.5.5 2.7.7 5.5.7 8.3h-44.4v1c1.3 9.9 8.8 17.4 17.4 17.5 5.3-.2 10.3-2.3 14.2-5.8l7.8 4.7c-2 2.2-4.3 4-6.9 5.6-4.5 2.5-9.6 3.9-14.8 4.1m0-48.8c-7.2 0-13.9 5.2-16.6 12.8l-.1.2-.5 1.1h34.5l-.7-1.3c-2.6-7.6-9.3-12.9-16.6-12.8m35.8 47.8V34.6h9.3v7.1l1.3-1.4c3.3-3.6 13-6.6 19.4-6.9l-2.3 9.3c-10.2.3-18.5 8.3-18.5 18v29.8h-9.2zm311.3-40.8l16.3-9.4c-1.8-3.2-1.4-2.4-3-5.4-1.6-3-1.1-4.4 2.5-4.4 10.5-.1 20.9-.1 31.3 0 3.1 0 3.9 1.3 2.3 4.1-5.2 9.1-10.4 18.2-15.7 27.2-1.7 2.9-3.2 2.9-4.9 0-1.8-2.9-1.3-2.2-3.3-5.5l-16.2 9.4c.3.7.7 1.3 1.1 2 4 7 5.8 10.3 10 17.3 4.9 8.2 15.2 8.7 21.1 1.2.7-.8 1.3-1.7 1.8-2.7 9.9-17.1 19.7-34.2 29.5-51.3 1.1-1.7 1.8-3.6 2.3-5.6 1.5-6.6-2.6-13.2-9.3-14.7-.9-.2-1.8-.3-2.8-.3-21.1-.1-42.3-.1-63.4.1-6.9-.1-12.5 5.4-12.6 12.2 0 2.1.5 4.1 1.4 6 1.4 2.8 3 5.4 4.6 8 3.1 5 3.9 6.3 7 11.8m-47 52.8V83.8h-6.1c-3.5 0-4.3-1.3-2.6-4.4 5.2-9 10.4-17.9 15.6-26.9 1.6-2.7 2.9-2.9 4.7.1 5.2 9 10.4 18 15.5 27 1.6 2.9.9 4.1-2.4 4.2h-6.3v18.8h22c9.5-.1 15.1-8.7 11.5-17.5-.4-1-.9-1.9-1.4-2.9-9.7-17-19.5-33.9-29.3-50.9-1-1.8-2.2-3.4-3.6-4.8-4.9-4.6-12.6-4.4-17.2.4-.6.7-1.2 1.4-1.7 2.2-10.6 18.1-21.1 36.2-31.5 54.4-3.5 5.8-1.7 13.4 4.2 16.9 1.8 1.1 3.8 1.7 5.9 1.8 3 .4 16 .3 22.7.3"
              />
            </svg>
            <span className="span1">Now Available!</span>
          </Afterpay2>
        </Afterpay1>
        <Text>
          <div className="text1">
            <ul>
              <li className="Li1">
                <div>
                  <svg fill="#292b32" height="24" viewBox="0 0 24 24" width="24">
                    {/* eslint-disable-next-line max-len */}
                    <path d="M15.994 8.304a.75.75 0 111.064 1.057l-6.3 6.335a.75.75 0 01-1.096-.035L6.91 12.513a.75.75 0 111.13-.987l2.222 2.542 5.732-5.764z" />
                  </svg>
                </div>

                <div>
                  <span className="span2">Get it done now. Pay later.</span>
                </div>
              </li>
              <li className="Li1">
                <div>
                  <svg fill="#292b32" height="24" viewBox="0 0 24 24" width="24">
                    {/* eslint-disable-next-line max-len */}
                    <path d="M15.994 8.304a.75.75 0 111.064 1.057l-6.3 6.335a.75.75 0 01-1.096-.035L6.91 12.513a.75.75 0 111.13-.987l2.222 2.542 5.732-5.764z" />
                  </svg>
                </div>

                <div>
                  <span className="span2">Repay in 4 fortnightly instalments</span>
                </div>
              </li>
            </ul>

            <ul>
              <li className="Li1">
                <div>
                  <svg fill="#292b32" height="24" viewBox="0 0 24 24" width="24">
                    {/* eslint-disable-next-line max-len */}
                    <path d="M15.994 8.304a.75.75 0 111.064 1.057l-6.3 6.335a.75.75 0 01-1.096-.035L6.91 12.513a.75.75 0 111.13-.987l2.222 2.542 5.732-5.764z" />
                  </svg>
                </div>

                <div>
                  <span className="span2">No interest</span>
                </div>
              </li>
              <li className="Li1">
                <div>
                  <svg fill="#292b32" height="24" viewBox="0 0 24 24" width="24">
                    {/* eslint-disable-next-line max-len */}
                    <path d="M15.994 8.304a.75.75 0 111.064 1.057l-6.3 6.335a.75.75 0 01-1.096-.035L6.91 12.513a.75.75 0 111.13-.987l2.222 2.542 5.732-5.764z" />
                  </svg>
                </div>

                <div>
                  <span className="span2">Available on payments up to $1,500</span>
                </div>
              </li>
            </ul>
          </div>
        </Text>
        <LearnMore>
          <h2 className="span3">Learn more</h2>
        </LearnMore>
      </Container2>
    </Container1>
  </Wrapper>
);

export default BlueCard;
