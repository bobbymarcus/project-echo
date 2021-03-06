import React, { PureComponent, useCallback } from "react";
import styled from "styled-components";
import { gsap, Power2 } from "gsap";
import { useDropzone } from "react-dropzone";

// components
import Fab from "@material-ui/core/Fab";
import ToolTip from "./ToolTip";

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
  width: 50%;
  padding: 7% 0 5% 0;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  z-index: 2;
  text-align: center;
  visibility: hidden;
  cursor: pointer;
  & p {
    color: white;
    font-size: 24px;
    pointer-events: auto;
  }
  & span {
    cursor: pointer;
    border-bottom: 3px solid white;
    padding-bottom: 6px;
  }
  & span:hover {
    color: #5368FF;
    border-color: #5368FF;
  }
  &:focus {
    outline-style: none;
  }
`;
const DropzoneIcon = styled.img`
  margin-bottom: 30px;
`;
const DropzoneCloud = styled.img`
  bottom: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 50vw;
  z-index: -1;
`;


// fab open/close animation
var fabOpenClose = false;
export function FabOpenClose() {
  var fabTimeline = gsap.timeline();
  if (fabOpenClose === false) { // if drawer is closed -> open it
    fabTimeline.to(".MuiFab-primary", 0.3, {
          backgroundColor: "rgba(0,0,0,.95)",
          width: "100vw",
          borderRadius: "0px",
          height: "40%",
          right: "0",
          bottom: "0",
          cursor: "unset",
          ease: Power2.easeInOut}, 0 )
      .to("#dropzone", 0.3, {autoAlpha: "1"})
      .to(".MuiTouchRipple-root", 0, { autoAlpha: "0"}, 0)
      .to(".MuiFab-label", 0, { pointerEvents: "all", right: "5%", bottom: "11.5%" }, 0)
      .to(".MuiFab-label", 0.2, { transform: "rotate(45deg)", bottom: "80%", ease: Power2.easeInOut }, 0);
    fabTimeline.play();
    fabOpenClose = true;
  } else { // if drawer is open -> close it
    fabTimeline.to(".MuiFab-primary", 0.15, {
          backgroundColor: "rgba(0,0,0,1)",
          width: "56px",
          borderRadius: "100px",
          height: "56px",
          right: "4%",
          bottom: "30px",
          cursor: "pointer",
          ease: Power2.easeInOut}, 0)
      .to("#dropzone", 0.15, {autoAlpha: "0"}, 0)
      .to(".MuiTouchRipple-root", 0, { autoAlpha: "1"}, 0)
      .to(".MuiFab-label", 0, { right: "5%" }, 0)
      .to(".MuiFab-label", 0.15, {transform: "rotate(0deg)", bottom: "18%", right: "17px", ease: Power2.easeInOut}, 0);
    fabTimeline.play();
    fabOpenClose = false;
  }
};

// file upload
function Dropzone(props) {
  const onDrop = useCallback(files => {
      // Do something with the files on upload
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <DropzoneContainer id="dropzone" {...getRootProps()}>
      <DropzoneIcon src="img/upload.svg" />
      <input {...getInputProps()} />
      {isDragActive ? (
        <React.Fragment>
          <DropzoneCloud class="dropzoneActive" src="img/cloudDrop.png" />
          <p>Add images by dropping them here</p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p><span>Choose files</span> or drag them here</p>
          <DropzoneCloud src="img/cloud.png" />
        </React.Fragment>
      )}
    </DropzoneContainer>
  );
}

export class AddImagesFab extends PureComponent {
  render() {
    return (
      <React.Fragment>
          <Fab style={fabStyle} color="primary" aria-label="add">
          <ToolTip title="">
            <div className="fabHotspot" onClick={FabOpenClose}></div>
            </ToolTip>
            <img onClick={FabOpenClose} src="img/fab.svg" alt="" />
          </Fab>
        <Dropzone />
      </React.Fragment>
    );
  }
}
