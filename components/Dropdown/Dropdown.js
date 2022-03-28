import React, { Component } from 'react';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';

const DropdownWrap = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  display: block;
  border-radius: 5px;

  &:hover {
    border-color: blue;
    border-width: 1px;
    box-shadow: 0px 0px 4px blue;
  }
`;

const DropdownContent = styled.div`
  position: relative;
  display: block;
`;
const DropdownOpen = styled.div`
  letter-spacing: normal;
  background-color: rgba(255, 255, 255, 0.6);
  border: 1px solid #bbc2dc;
  border-radius: 4px;
  box-sizing: border-box;
  color: #292b32;
  cursor: pointer;
  display: block;
  font-size: 12px;
  font-weight: 500;
  height: 30px;
  letter-spacing: 0.1em;
  padding: 6px 10px 7px;
  position: relative;
  text-align: left;
  transition: background 0.5s linear, color 0.5s linear, border 0.5s linear;
  width: 100%;
`;

const DropdownSvg = styled.svg`
  float: right;
  position: relative;
  top: -3px;
  width: 10px;
  height: 19px;
`;

const DropdownItemsContainer = styled.div`
  display: block;
  background-color: #fff;
  border: 1px solid #bbc2dc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 5px;
  padding: 5px 0;
  position: absolute;
  width: 100%;
  z-index: 10;
`;

const DropdownItem = styled.div`
  fill: currentColor;
  border-bottom: 1px solid #bbc2dc;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 13px;
  font-weight: 300;
  padding: 15px 10px 8px;
  text-align: left;
`;

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside() {
    this.setState({
      isOpen: false,
    });
  }

  toggle = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  onClick = (item) => {
    this.setState(() => ({
      isOpen: false,
    }));
    const { handleClick } = this.props;
    handleClick(item);
  };

  render() {
    const { title, items } = this.props;
    const { isOpen } = this.state;
    return (
      <DropdownWrap>
        <DropdownContent>
          <DropdownOpen tabIndex={0} role="button" onKeyPress={this.toggle} onClick={this.toggle}>
            {title}
            <DropdownSvg>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="19" viewBox="0 0 12 12">
                <g id="down">
                  <path id="arrow" d="M1 4h10L6 9 1 4" />
                </g>
              </svg>
            </DropdownSvg>
          </DropdownOpen>
          {isOpen && (
            <DropdownItemsContainer>
              {items.map((item) => (
                <DropdownItem
                  key={item.key}
                  role="button"
                  id={item.key}
                  onKeyPress={() => this.onClick(item)}
                  onClick={() => this.onClick(item)}
                >
                  <span>{item.value} </span>
                </DropdownItem>
              ))}
            </DropdownItemsContainer>
          )}
        </DropdownContent>
      </DropdownWrap>
    );
  }
}

export default enhanceWithClickOutside(Dropdown);
