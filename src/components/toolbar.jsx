import React, { PureComponent } from "react";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

const ToolbarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: #1c1b1e;
  box-shadow: 0 0 50px 20px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;
const ToolbarIcons = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  & img {
    padding: 0 8px;
    cursor: pointer;
  }
`;
const ToolbarRight = styled.img`
  position: absolute;
  right: 71px;
  top: 50%;
  transform: translateY(-50%);
`;
const ToolbarLeft = styled.p`
  position: absolute;
  left: 71px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  margin: 0;
`;

export default class Toolbar extends PureComponent {
  render() {
    return (
      <ToolbarWrapper>
        <ToolbarIcons>
          <Tooltip title="Add" TransitionComponent={Zoom}>
            <img src="img/add.svg" alt="" />
          </Tooltip>
          <Tooltip title="Grid" TransitionComponent={Zoom}>
            <img src="img/grid.svg" alt="" />
          </Tooltip>
          <Tooltip title="Lock" TransitionComponent={Zoom}>
            <img src="img/lock.svg" alt="" />
          </Tooltip>
          <Tooltip title="Link" TransitionComponent={Zoom}>
            <img src="img/link.svg" alt="" />
          </Tooltip>
          <img src="img/divider.svg" alt="" />
          <Tooltip title="Undo" TransitionComponent={Zoom}>
            <img src="img/undo.svg" alt="" />
          </Tooltip>
          <Tooltip title="Redo" TransitionComponent={Zoom}>
            <img src="img/redo.svg" alt="" />
          </Tooltip>
        </ToolbarIcons>
        <ToolbarRight src="img/toolbarRight.svg" />
        <ToolbarLeft>D03 PF2020</ToolbarLeft>
      </ToolbarWrapper>
    );
  }
}
