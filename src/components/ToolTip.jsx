import React, {PureComponent} from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

export default class ToolTip extends PureComponent {
  render() {
    return (
    <Tooltip TransitionComponent={Zoom} placement={this.props.placement} title={this.props.title} arrow>
      {this.props.children}
    </Tooltip>
    );
  }
}
