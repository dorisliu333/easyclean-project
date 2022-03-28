import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import bgimage from './404.jpg'

const BackgroundImage = styled.img`
width: 100%;

`
const ReturnHomeButton = styled.button`
  width: 20px;
  height: 20px;
  
  position: absolute;
  z-index: 2;
`
export default class ErrorPage extends React.Component {
  render() {
    return (
        <>
        <BackgroundImage src={bgimage}></BackgroundImage>
        <ReturnHomeButton>Return Home<Link to='/'>Click Here Return Home</Link></ReturnHomeButton>
        </>
    )
  }
}