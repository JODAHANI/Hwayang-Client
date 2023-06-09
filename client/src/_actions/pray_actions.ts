import axios from "axios";

import {
  POST_PRAYS,
  ADD_PRAYS,
  DELETE_PRAY,
  EDIT_PRAY,
  COMBINE_PRAYS,
  WRITE_PRAY,
} from "./types";
import { hwayangClientServer } from "constants/routeItems";

export const postPrays = async (body) => {
  try {
    const request = await axios.post(
      `${hwayangClientServer}/prays-request`,
      body
    );
    const { data } = request;
    console.log(data);
    return {
      type: POST_PRAYS,
      payload: data,
    };
  } catch (err) {
    return {
      type: POST_PRAYS,
      paylaod: { success: false },
    };
  }
};

export const combinePrays = async (body) => {
  return {
    type: COMBINE_PRAYS,
    payload: body,
  };
};

export const writeNewPrays = async (body) => {
  try {
    const axiosRequest = await axios.post(
      `${hwayangClientServer}/pray-request/write`,
      body
    );
    const { data } = axiosRequest;
    return {
      type: WRITE_PRAY,
      payload: data,
    };
  } catch (err) {
    return {
      type: WRITE_PRAY,
      payload: {
        success: false,
      },
    };
  }
};

export const addPray = async (data) => {
  try {
    return {
      type: ADD_PRAYS,
      payload: data,
    };
  } catch (err) {
    return {
      type: ADD_PRAYS,
      payload: {
        success: false,
      },
    };
  }
};

export const editPrays = async (body) => {
  try {
    const axiosRequest = await axios.post(
      `${hwayangClientServer}/edit/pray-request`,
      body
    );
    const { data } = axiosRequest;
    return {
      type: EDIT_PRAY,
      payload: data,
    };
  } catch (err) {
    return { success: false };
  }
};

export const deletePrays = async (body, prays) => {
  try {
    const axiosRequest = await axios.post(
      `${hwayangClientServer}/delete/pray-request`,
      body
    );
    const { data } = axiosRequest;
    return {
      type: DELETE_PRAY,
      payload: data,
    };
  } catch (err) {
    return { success: false };
  }
};
