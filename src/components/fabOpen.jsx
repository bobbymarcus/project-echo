import { gsap, Power2 } from "gsap";

var drawerOpen = false;

export default function FabOpen() {
  var fabTimeline = gsap.timeline();
  if (drawerOpen === false) { // if drawer is open
    fabTimeline.to(".MuiFab-primary", 0.3, {
          backgroundColor: "rgba(0,0,0,.97)",
          width: "100vw",
          borderRadius: "0px",
          height: "40%",
          right: "0",
          bottom: "0",
          cursor: "unset",
          ease: Power2.easeInOut}, 0 )
      .to(".MuiTooltip-tooltip", 0, { display: "none" }, 0)
      .to("#dropzone", 0.3, {autoAlpha: "1"})
      .to(".MuiFab-label", 0, { pointerEvents: "all", right: "5%", bottom: "11.5%" }, 0)
      .to(".MuiTouchRipple-root", 0, { autoAlpha: "0"}, 0)
      .to(".MuiFab-label", 0.2, { transform: "rotate(45deg)", bottom: "80%", ease: Power2.easeInOut }, 0);
    fabTimeline.play();
    drawerOpen = true;
  } else { // if drawer is closed
    fabTimeline.to(".MuiFab-primary", 0.15, {
          backgroundColor: "rgba(0,0,0,1)",
          width: "56px",
          borderRadius: "100px",
          height: "56px",
          right: "4%",
          bottom: "30px",
          cursor: "pointer",
          ease: Power2.easeInOut}, 0)
      .to("#dropzone", 0.3, {autoAlpha: "0"}, 0)
      .to(".MuiFab-label", 0, { right: "5%" }, 0)
      .to(".MuiTouchRipple-root", 0, { autoAlpha: "1"}, 0)
      .to(".MuiFab-label", 0.15, {transform: "rotate(0deg)", bottom: "18%", right: "17px", ease: Power2.easeInOut}, 0)
      .to(".MuiTooltip-tooltip", 0, { autoAlpha: "1", delay: "1" });
    fabTimeline.play();
    drawerOpen = false;
  }
}
