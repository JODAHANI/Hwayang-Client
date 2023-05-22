import axios from "axios";
import { GET_NOTICE, GET_NEW_FAMILYS, GET_THANKS_LETTERS } from "./types";
import { hwayangClientServer } from "constants/routeItems";

export const getNotification = async () => {
  try {
    const axiosRequest = await axios.get(
      `${hwayangClientServer}/notification/get-notifications`
    );
    const { data } = axiosRequest;
    return {
      type: GET_NOTICE,
      payload: data,
    };
  } catch (err) {
    return {
      type: GET_NOTICE,
      payload: {
        success: false,
      },
    };
  }
};

export const getNewFamilys = async (body) => {
  try {
    const axiosRequest = await axios.post(
      `http://localhost:80/api/admin/new-family`,
      body
    );
    const { data } = axiosRequest;
    return {
      type: GET_NEW_FAMILYS,
      payload: data,
    };
  } catch (err) {
    return {
      type: GET_NEW_FAMILYS,
      payload: {
        success: false,
      },
    };
  }
};

export const getThanksLetters = async (body) => {
  try {
    const axiosRequest = await axios.post(
      `${hwayangClientServer}/thanks-letter`,
      body
    );
    const { data } = axiosRequest;
    return {
      type: GET_THANKS_LETTERS,
      payload: data,
    };
  } catch (err) {
    return {
      type: GET_THANKS_LETTERS,
      payload: {
        success: false,
      },
    };
  }
};
