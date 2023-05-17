import axios from "axios";

import {
  POST_PRAYS,
  ADD_PRAYS,
  DELETE_PRAY,
  EDIT_PRAY,
  COMBINE_PRAYS,
} from "./types";

export const postPrays = async (body) => {
  try {
    const request = await axios.post("/api/users/prays-request", body);
    const { data } = request;
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

export const addPrays = async (prays, newPray) => {
  try {
    prays.prayRequest.unshift(newPray);
    return {
      type: ADD_PRAYS,
      payload: prays,
    };
  } catch (err) {
    return { success: false };
  }
};

export const editPrays = async (body, prays) => {
  try {
    const axiosRequest = await axios.post("/api/users/edit/pray-request", body);
    let data = axiosRequest.data;
    prays.prays.prayRequest.forEach((item, idx) => {
      if (item._id === data.pray._id) {
        prays.prays.prayRequest[idx] = data.pray;
      }
    });
    return {
      type: EDIT_PRAY,
      payload: prays.prays,
    };
  } catch (err) {
    return { success: false };
  }
};

export const deletePrays = async (body, prays) => {
  try {
    const axiosRequest = await axios.post(
      "/api/users/delete/pray-request",
      body
    );
    let data = axiosRequest.data;
    const filterArray = prays.prays.prayRequest.filter((item) => {
      return item._id !== data.pray._id;
    });
    prays.prays.prayRequest = [...filterArray];
    return {
      type: DELETE_PRAY,
      payload: prays.prays,
    };
  } catch (err) {
    return { success: false };
  }
};
