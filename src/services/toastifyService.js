import { toast } from "react-toastify";
import {toastifyConfig} from "../config/toastifyConfig";

export const toastifyService = {
  success: (message) => {
    toast.success(message, toastifyConfig);
  },
  warning: (message) => {
    toast.warning(message, toastifyConfig);
  },
  error: (message) => {
    toast.error(message, toastifyConfig);
  },
  info: (message) => {
    toast.info(message, toastifyConfig);
  },
};