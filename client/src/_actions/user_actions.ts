import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT,
  GET_LOGOS,
  USER_WORSHIP_DATA,
  CANCEL_WORSHIP,
  GET_USER_DATA,
} from "./types";

import { Routes } from "constants/routeItems";

const { worshipCancel } = Routes;

export const loginUser = async (dataTosubmit: object) => {
  let request = await axios.post("/api/users/login", dataTosubmit);
  const data = request.data;
  return {
    type: LOGIN_USER,
    payload: data,
  };
};

export const registerUser = async (dataTosubmit) => {
  let request = await axios.post("/api/users/register", dataTosubmit);
  const data = request.data;
  return {
    type: REGISTER_USER,
    payload: data,
  };
};
export const auth = async () => {
  const request = await axios.get("/api/users/auth");
  const data = request.data;
  return {
    type: AUTH_USER,
    payload: data,
  };
};

export const userLogout = async () => {
  const request = await axios.get("/api/users/logout");
  const data = request.data;
  return {
    type: LOGOUT,
    payload: data,
  };
};

export const getProclamation = async () => {
  const request = await axios.get("/api/users/proclamation");
  const data = request.data;
  return {
    type: GET_LOGOS,
    payload: data,
  };
};

export const getUserWorshipData = async (body) => {
  try {
    const request = await axios.post("/api/users/user/worship-data", body);
    const data = request.data;
    return {
      type: USER_WORSHIP_DATA,
      payload: data,
    };
  } catch (err) {
    return {
      type: USER_WORSHIP_DATA,
      payload: { success: false },
    };
  }
};

export const getUserData = async (body) => {
  try {
    const request = await axios.post("/api/users/user-data", body);
    const data = request.data;
    return {
      type: GET_USER_DATA,
      payload: data,
    };
  } catch (err) {
    return {
      type: GET_USER_DATA,
      payload: { success: false },
    };
  }
};

export const cancelWorship = async (body) => {
  try {
    const axiosRequest = await axios.post(worshipCancel, body);
    const { data } = axiosRequest;
    return {
      type: CANCEL_WORSHIP,
      payload: data,
    };
  } catch (err) {
    return {
      type: CANCEL_WORSHIP,
      payload: {
        success: false,
      },
    };
  }
};

export const notificationImageSave = async (dataTosubmit) => {
  const config: any = {
    header: { "content-type": "multipart/form-data" },
  };
  const request = await axios.post(
    "/api/admin/notification/image-save",
    dataTosubmit,
    config
  );

  const data = request.data;
  return data;
};

export const postNotification = async (dataTosubmit) => {
  const request = await axios.post(
    "/api/admin/notification/upload-notification",
    dataTosubmit
  );
  const data = request.data;
  return data;
};
