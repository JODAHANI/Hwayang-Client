import axios from "axios";
import { GET_NEW_FAMILY, COMBINE_NEW_FAMILYS } from "./types";
import { hwayangAdminApi } from "constants/routeItems";

export const getNewFamily = async (body) => {
  try {
    const axiosRequest = await axios.post(
      `${hwayangAdminApi}/new-family`,
      body
    );
    const { data } = axiosRequest;
    return {
      type: GET_NEW_FAMILY,
      payload: data,
    };
  } catch (err) {
    return {
      type: GET_NEW_FAMILY,
      payload: {
        success: false,
      },
    };
  }
};

export const combineNewFamily = async (body) => {
  return {
    type: COMBINE_NEW_FAMILYS,
    payload: body,
  };
};
