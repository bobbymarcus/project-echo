import React, { PureComponent, useCallback } from "react";
import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import FabOpen from "./fabOpen";
import { useDropzone } from "react-dropzone";
import { gsap, Power2 } from "gsap";




const fabStyle = {
  margin: 0,
  top: "auto",
  right: "4%",
  bottom: 30,
  left: "auto",
  position: "fixed",
  backgroundColor: "black",
  zIndex: "1"
};
const DropzoneContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 40%;
  left: 50%;
  bottom: 0;
  padding: 8% 0 0 0;
  transform: translateX(-50%);
  z-index: 2;
  text-align: center;
  visibility: hidden;
  pointer-events: none;
  & p {
    color: white;
    font-size: 24px;
    pointer-events: auto;
  }
  & span {
    cursor: pointer;
    border-bottom: 3px solid white;
  }
  & span:hover {
    color: grey;
    border-color: grey;
  }
`;
const DropzoneIcon = styled.img`
  margin-bottom: 30px;
`;
var addItem = gsap.timeline();

function Dropzone(props) {
  const onDrop = useCallback(files => {
    // Do something with the files
    
    const temporaryURL = files;
    
    addItem.to(".fjzbHS", 0.3, { autoAlpha: "1" }, 0)
          .to(".kerQIG", 0.3, {autoAlpha: "1"});
          // .set(".fjzbHS",{attr:{src:{temporaryURL}}});
    addItem.play();
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <DropzoneContainer id="dropzone" {...getRootProps()}>
      <DropzoneIcon src="img/upload.svg" />
      <input {...getInputProps()} />
      {isDragActive ? (
        <React.Fragment>
          <p>Drop the files here</p>
          <div class="dropzoneActive"> </div>
        </React.Fragment>
      ) : (
        <p>
          <span>Choose files</span> or drag them here
        </p>
      )}
    </DropzoneContainer>
  );
}

export default class AddBtn extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Tooltip title="Add" TransitionComponent={Zoom}>
          <Fab style={fabStyle} color="primary" aria-label="add">
            <div onClick={FabOpen}></div>
            <img src="img/fab.svg" alt="" />
          </Fab>
        </Tooltip>
        <Dropzone />
      </React.Fragment>
    );
  }
}
