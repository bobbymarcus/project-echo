import React, { useEffect, useRef, PureComponent, useCallback } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";

const ReactGridLayout = WidthProvider(RGL);


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
  padding-bottom: 24px;
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
  padding: 1% 2% 2.5% 1%;
  margin-bottom: 20vh;
`;
const Item = styled.div`
  font-size: 40px;
  display: flex;
  border-radius: 15px;
  border: 10px solid white;
  flex-direction: column;
  cursor: grab;
  &:active {
    cursor: grabbing;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
    border: 10px solid white;
  }
`;
const ItemImage = styled.img`
  /* background-image: url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  align-items: center; */
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
  width: 100%;
  height: 75px;
  font-size: 16px;
  font-family: din-2014, sans-serif;
  font-weight: 600;
  color: #1B1825;
  display: flex;
  padding: 20px 15px 30px;
  border: none;
  overflow: hidden;
  pointer-events: auto;
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
  &:focus {
    outline-style: none;
  }
`;


// const DropzoneContainer = styled.div`
//   position: fixed;
//   width: 100%;
//   height: 40%;
//   left: 50%;
//   bottom: 0;
//   padding: 8% 0 0 0;
//   transform: translateX(-50%);
//   z-index: 2;
//   text-align: center;
//   visibility: hidden;
//   pointer-events: none;
//   & p {
//     color: white;
//     font-size: 24px;
//     pointer-events: auto;
//   }
//   & span {
//     cursor: pointer;
//     border-bottom: 3px solid white;
//   }
//   & span:hover {
//     color: grey;
//     border-color: grey;
//   }
// `;
// const DropzoneIcon = styled.img`
//   margin-bottom: 30px;
// `;

// function Dropzone() {
//   const onDrop = useCallback(acceptedFiles => {
//     // Do something with the files
//     {this.renderGridItems()}
//   }, []);
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
//   return (
//     <DropzoneContainer id="dropzone" {...getRootProps()}>
//       <DropzoneIcon src="img/upload.svg" />
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p>Drop the files here ...</p>
//       ) : (
//         <p> <span>Choose files</span> or drag them here </p>
//       )}
//     </DropzoneContainer>
//   );
// }

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
          <BoardTitle placeholder="Untitled" />
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
