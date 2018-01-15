import React from "react";
import { toast } from "react-toastify";
import * as constants from "../common/constants";
import ToastComponent from "../components/common/toast-component";

const toaster = (message, type) => {
  switch (type) {
    case constants.SUCCESS:
      type = toast.TYPE.SUCCESS;
      break;
    case constants.INFO:
      type = toast.TYPE.INFO;
      break;
    case constants.WARNING:
      type = toast.TYPE.WARNING;
      break;
    case constants.ERROR:
      type = toast.TYPE.ERROR;
      break;
    default:
      type = toast.TYPE.DEFAULT;
      break;
  }
  toast(<ToastComponent message={message} />, {
    autoClose: 3000,
    type: type,
    position: toast.POSITION.BOTTOM_CENTER
  });
};

export default toaster;
