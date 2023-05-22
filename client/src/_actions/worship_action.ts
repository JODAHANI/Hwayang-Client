import axios from "axios";
import { GET_WORSHIP, APPLY_WORSHIP, SUBTRACT_USER } from "./types";
import { Routes } from "constants/routeItems";

const { getWorship, postWorship } = Routes;

export const allGetWorship = async () => {
  try {
    const axiosRequest = await axios.get(getWorship);
    const { data } = axiosRequest;
    return {
      type: GET_WORSHIP,
      payload: data,
    };
  } catch (err) {
    return {
      type: GET_WORSHIP,
      payload: {
        success: false,
      },
    };
  }
};

export const applyWorship = async (body) => {
  try {
    const axiosRequest = await axios.post(postWorship, body);
    const { data } = axiosRequest;
    return {
      type: APPLY_WORSHIP,
      payload: data,
    };
  } catch (err) {
    return {
      type: APPLY_WORSHIP,
      payload: {
        success: false,
      },
    };
  }
};

export const subtractUser = async (body) => {
  try {
    const data = body;
    return {
      type: SUBTRACT_USER,
      payload: data,
    };
  } catch (err) {
    return {
      type: SUBTRACT_USER,
      payload: {
        success: false,
      },
    };
  }
};
