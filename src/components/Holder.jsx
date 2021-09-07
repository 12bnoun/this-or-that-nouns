import React from "react";
import styled from "styled-components";

const HolderWrapper = styled.div`
  background: #ffffff;
  height: 250px;
  width: 200px;
  border: 1px solid white;
  margin-right: 20px;
  /* border-radius: 10px; */
  cursor: pointer;
  perspective: 600px;
  border: 2px solid black;
  box-shadow: 10px 10px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.5);

  &:hover {
    border: 2px solid pink;
    box-shadow: 3px 3px pink;
  }

  @media (max-width: 700px) {
    margin-bottom: 20px;
    margin-top: 20px;
  }
`;

const HolderImg = styled.img`
  background: white;
  height: 180px;
  width: 190px;
  margin-top: 10px;
  cursor: pointer;
  border: 0px !important;
`;

const LowerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin-left: 15px;
  margin-right: 20px;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transform-style: preserve-3d;
  transform-origin: center right;
  transition: transform 1s;
`;

class Holder extends React.Component {
  render() {
    return (
      <HolderWrapper className="gg-holder" onClick={() => this.props.click()}>
        <HolderImg src={this.props.imgSrc} />
        <LowerWrapper>
          <div>{this.props.text}</div>
          <div>
            <i className="gg-heart gg-pink"></i>
          </div>
        </LowerWrapper>
      </HolderWrapper>
    );
  }
}

export default Holder;
