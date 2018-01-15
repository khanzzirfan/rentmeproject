import React, { Component } from "react";
import PropTypes from "prop-types";
import logo from "../../logo.svg";

class ToastComponent extends Component {
  render() {
    const { message } = this.props;
    return (
      <div>
        <img src={logo} className="toast-logo" alt="logo" />
        <div id="toast-message" className="toast-content">
          {message}
        </div>
      </div>
    );
  }
}

ToastComponent.PropTypes = {
  message: PropTypes.string.Required
};

export default ToastComponent;
