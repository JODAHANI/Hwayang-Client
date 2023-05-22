import axios from "axios";
import { Routes, hwayangClientServer } from "constants/routeItems";
import {
  GET_GRACE_SHARE,
  COMBINE_GRACE_SHARE,
  DELETE_GRACE_SHARE,
  ADD_GRACE_SHARE,
} from "./types";
const { graceSharing, graceSharingWrite, graceSharingDelete } = Routes;

export const getGraceShare = async (body) => {
  try {
    const axiosRequest = await axios.post(
      `${hwayangClientServer}/${graceSharing}`,
      body
    );
    const { data } = axiosRequest;
    return {
      type: GET_GRACE_SHARE,
      payload: data,
    };
  } catch (err) {
    return {
      type: GET_GRACE_SHARE,
      payload: {
        success: false,
      },
    };
  }
};

export const addGraceSharing = async (body) => {
  try {
    const axiosRequest = await axios.post(
      `${hwayangClientServer}/${graceSharingWrite}`,
      body
    );
    const { data } = axiosRequest;
    return {
      type: ADD_GRACE_SHARE,
      payload: data,
    };
  } catch (err) {
    return {
      type: ADD_GRACE_SHARE,
      payload: {
        success: false,
      },
    };
  }
};

export const combineGraceSharing = async (body) => {
  return {
    type: COMBINE_GRACE_SHARE,
    payload: body,
  };
};

export const deleteGraceSharing = async (body) => {
  try {
    const axiosRequest = await axios.post(graceSharingDelete, body);
    const { data } = axiosRequest;
    return {
      type: DELETE_GRACE_SHARE,
      payload: data,
    };
  } catch (err) {
    return {
      type: DELETE_GRACE_SHARE,
      payload: {
        success: false,
      },
    };
  }
};
