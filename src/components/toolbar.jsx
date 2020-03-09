import React, { PureComponent } from "react";
import styled from "styled-components";

// components
import ToolTip from "./ToolTip";
import { FabOpenClose } from "./Fab";

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
const ProjectName = styled.p`
  position: absolute;
  left: 71px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  margin: 0;
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
// placeholder
const ToolbarRight = styled.img`
  position: absolute;
  right: 71px;
  top: 50%;
  transform: translateY(-50%);
`;

export default class Toolbar extends PureComponent {
  render() {
    return (
      <ToolbarWrapper>
        <ProjectName>Women's Retail Spring 2021</ProjectName>
        <ToolbarIcons>
          <ToolTip title="Add">
            <img onClick={FabOpenClose} src="img/toolbar/add.svg" alt="" />
          </ToolTip>
          <ToolTip title="Grid">
            <img src="img/toolbar/grid.svg" alt="" />
          </ToolTip>
          <ToolTip title="Lock">
            <img src="img/toolbar/lock.svg" alt="" />
          </ToolTip>
          <ToolTip title="Link">
            <img src="img/toolbar/link.svg" alt="" />
          </ToolTip>
      <img src="img/toolbar/divider.svg" alt="" />
          <ToolTip title="Undo">
            <img src="img/toolbar/undo.svg" alt="" />
          </ToolTip>
          <ToolTip title="Redo">
            <img src="img/toolbar/redo.svg" alt="" />
          </ToolTip>
        </ToolbarIcons>
        <ToolbarRight src="img/toolbarRight.svg" />
      </ToolbarWrapper>
    );
  }
}
