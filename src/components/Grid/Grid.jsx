import React, { PureComponent, useCallback } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";

// components
import ToolTip from "../ToolTip";


const ReactGridLayout = WidthProvider(RGL);

// styled components
const Item = styled.div`
  font-size: 40px;
  display: flex;
  border-radius: 15px;
  border: 10px solid white;
  flex-direction: column;
  background: #fff;
  cursor: grab;
  & > .react-resizable-handle {
    position: absolute;
    width: 40px;
    height: 40px;
    right: 0;
    bottom: 65px;
    padding: 10px;
    cursor: se-resize;
    background-image: url("/img/resize.svg");
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0;
    transition: opacity .3s;
    filter: invert(1);
  }
  &:hover {
    & > .react-resizable-handle {
      opacity: 1;
    }
    & > .grid-item-hover img {
      opacity: 1;
      transform: translateY(0px);
      transition: all .2s;
      overflow: visible;
    }
  }
  &:active {
    cursor: grabbing;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
    border: 10px solid white;
    & .grid-item-hover {
      opacity: 0;
    }
    & .react-resizable-handle  {
      transition: opacity 0s;
      opacity: 0;
    }
  }
`;
const ItemImage = styled.img`
  justify-content: center;
  display: flex;
  height: calc(100% + 500px);
  width: 100%;
  pointer-events: none;
  object-fit: cover;
  overflow: hidden;
  border-radius: 5px;
`;
const ItemComment = styled.textarea`
  width: 70%;
  height: 1vh;
  min-height: 50px;
  font-size: 16px;
  font-family: din-2014, sans-serif;
  font-weight: 600;
  color: #1B1825 ;
  display: flex;
  margin: 15px 25% 0 5%;
  border: none;
  overflow: hidden;
  pointer-events: auto;
  resize:none;
  &::placeholder {
    color: #CCCCCC;
  }
  &:focus {
    outline-style: none;
  }
`;
const ItemHover = styled.div`
  position: absolute;
  width: auto;
  left: 50%;
  transform: translateX(-50%);
  bottom: 65px;
  overflow: hidden;
  display: flex;
  & img {
    opacity: 0;
    transition: all .2s;
    width: 40px;
    margin: 5px 10px;
    transform: translateY(60px);
    cursor: pointer;
    &:hover {
      transform: scale(1.1) !important;
    }
  }
  &:active {
    opacity: 1 !important;
  }
  & div {
    &:focus {
      outline-style: none;
    }
  }
`;

function ReplaceImage(props) {
  const onDrop = useCallback(files => {
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()}>
      <ToolTip title="Replace" placement="top">
        <img className="gridItemBtn" src="img/replaceBtn.svg" alt="replace item" />
      </ToolTip>
      <input {...getInputProps()} />
    </div>
  );
};

export default class Grid extends PureComponent {
  state = {
    layout: []
  };
  static defaultProps = {
    className: "layout",
    isResizable: true,
    onLayoutChange: () => {}
  };
  resetLayout = () => {
    this.setState({
      layout: []
    });
  };
  handleResize = (itemArray, before, after, placholder, event) => {
    const { h: beforeHeight, w: beforeWidth } = before;
    const aspectRatio = beforeHeight / beforeWidth;
    const { w: afterWidth } = after;
    after.h = aspectRatio * afterWidth;
  };
  keepInBounds = layout => {     // sometimes the grid layout gives items a negative y-value so they go out of bounds. This corrects for that.
    const newLayout = layout.map(obj => {
      const copiedObject = { ...obj };
      if (obj.y < 0) obj.y = 0;
      return copiedObject;
    });
    this.setState({ layout: newLayout });
    return newLayout;
  };
  renderGridItems = () => {
    const { data } = this.props;
    return data.map(obj => {
      const { width, height, x, y, src, key } = obj;
      return (
        <Item
          key={key}
          data-grid={{
            w: 1,
            h: height / width,
            x,
            y
          }}
        >
          <ItemImage src={src}  />
          <ItemComment placeholder="Add note" />
          <ItemHover className="grid-item-hover">
            <ReplaceImage />
              <div>
              <ToolTip title="Delete" placement="top">
                <img className="gridItemBtn" src="img/deleteBtn.svg" alt="delete item"/>
                </ToolTip>
              </div>
          </ItemHover>
       </Item>
      );
    });
  };

  render() {
    const { layout } = this.state;
    return (
      <ReactGridLayout
        {...this.props}
        layout={layout}
        onResize={(...args) => this.handleResize(...args)}
        onLayoutChange={this.keepInBounds}
        onDrag={this.keepInBounds}
        draggableCancel="textarea"
      >
        {this.renderGridItems()}
      </ReactGridLayout>
    );
  }
}
