import React, { useEffect, useRef, PureComponent, useCallback } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import styled from "styled-components";


const ReactGridLayout = WidthProvider(RGL);


// styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BoardWrapper = styled.div`
  position: absolute;
  top: 12%;
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
  padding-bottom: 24px;
  width: 100%;
  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
  &:focus {
    outline-style: none;
  }
`;
const Board = styled.div`
  position: relative;
  border: 1px solid #b6b6b6;
  box-shadow: 0 0 40px -20px rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 2%;
  margin-bottom: 20vh;
`;
const Item = styled.div`
  font-size: 40px;
  display: flex;
  border-radius: 15px;
  border: 10px solid white;
  flex-direction: column;
  background: #fff;
  cursor: grab;
  &:active {
    cursor: grabbing;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
    border: 10px solid white;
    & .grid-item-hover {
      opacity: 0;
    }
  }
  & span {
    width: 100%;
    height: 75px;
    background-image: linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.30) 98%);
    position: absolute;
    bottom: 65px;
    opacity: 0;
    transition: all .2s;
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
  color: #CCCCCC ;
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
    margin: 20px 10px;
    transform: translateY(60px);
    cursor: pointer;
  }
  &:active {
    opacity: 1 !important;
  }
`;

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
      const height2 = height + 300;
      return (
        <Item
          key={key}
          data-grid={{
            w: 1,
            h: height2 / width,
            x,
            y
          }}
        >
          <ItemImage src={src}  />
          <ItemComment placeholder="Add note" />
          <span />
          <ItemHover className="grid-item-hover">
            <img src="img/replaceBtn.svg" />
            <img src="img/deleteBtn.svg" />
          </ItemHover>
       </Item>
      );
    });
  };

  render() {
    const { layout } = this.state;
    const { gridWidth } = this.props;
    return (
      <Container>
        <BoardWrapper gridWidth={gridWidth}>
          <BoardTitle placeholder="Untitled"/>
          <Board>
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
          </Board>
        </BoardWrapper>
        {/* <Dropzone /> */}
      </Container>
    );
  }
}
