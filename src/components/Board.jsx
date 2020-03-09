import React, { PureComponent } from "react";
import styled from "styled-components";

// styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BoardWrapper = styled.div`
  position: absolute;
  top: 15%;
  width: ${({ gridWidth }) => 100 * gridWidth}%;
  left: 50%;
  transform: translateX(-50%);
`;
const BoardTitle = styled.input`
  font-size: 50px;
  position: relative;
  color: #000;
  border: none;
  background: rgba(0, 0, 0, 0);
  padding-bottom: 28px;
  width: 100%;
  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
  &:focus {
    outline-style: none;
  }
`;
const BoardBackground = styled.div`
  position: relative;
  border: 1px solid #b6b6b6;
  box-shadow: 0 0 40px -20px rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 2%;
  margin-bottom: 20vh;
`;

export default class Board extends PureComponent {
  render() {
    return (
      <Container>
        <BoardWrapper gridWidth={this.props.gridWidth}>
          <BoardTitle placeholder="Untitled"/>
          <BoardBackground>
            {this.props.children}
          </BoardBackground>
        </BoardWrapper>
      </Container>
    );
  }
}
