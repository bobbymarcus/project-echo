import React, {PureComponent} from "react";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { gsap, Power2 } from "gsap";

const fabStyle = {
  margin: 0,
  top: "auto",
  right: "4%",
  bottom: 30,
  left: "auto",
  position: "fixed",
  backgroundColor: "black",
  zIndex: "100"
};

var drawerOpen = false;

function fabOpen() {
  var fabTimeline = gsap.timeline();
  if (drawerOpen === false) {
    fabTimeline
      .to(".MuiFab-primary", 0.3, {
          backgroundColor: "rgba(0,0,0,.95)",
          width: "100vw",
          borderRadius: "0px",
          height: "40%",
          right: "0",
          bottom: "0",
          ease: Power2.easeInOut}, 0 )
      .to(".MuiTooltip-tooltip", 0, { autoAlpha: "0" }, 0)
      .to(".MuiFab-label", 0, { right: "5%", bottom: "11.5%" }, 0)
      .to(".MuiFab-label", 0.2, { transform: "rotate(45deg)", bottom: "80%", ease: Power2.easeInOut }, 0);
    fabTimeline.play();
    drawerOpen = true;
  } else {
    fabTimeline
      .to(".MuiFab-primary", 0.15, {
          backgroundColor: "rgba(0,0,0,1)",
          width: "56px",
          borderRadius: "100px",
          height: "56px",
          right: "4%",
          bottom: "30px",
          ease: Power2.easeInOut}, 0)
      .to(".MuiFab-label", 0, { right: "5%" }, 0)
      .to(".MuiFab-label", 0.15, {transform: "rotate(0deg)", bottom: "18%", right: "17px", ease: Power2.easeInOut}, 0)
      .to(".MuiTooltip-tooltip", 0, { autoAlpha: "1", delay: "1" });
    fabTimeline.play();
    drawerOpen = false;
  }
}


export default class AddBtn extends PureComponent {
  render() {
    return (
      <Tooltip title="Add" TransitionComponent={Zoom}>
        <Fab style={fabStyle} color="primary" aria-label="add">
          <img onClick={fabOpen} src="img/fab.svg" alt="" />
        </Fab>
      </Tooltip>
    );
  }
}