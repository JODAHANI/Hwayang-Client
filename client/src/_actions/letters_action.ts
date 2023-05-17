import axios from "axios";
import {
  GET_LETTERS,
  WRITE_LETTERS,
  ADD_LETTERS,
  COMBINE_LETTERS,
  EDIT_LETTERS,
  DELETE_LETTERS,
} from "./types";

export const getThanksLetters = async (body) => {
  try {
    const axiosRequest = await axios.post("/api/users/thanks-letters", body);
    const { data } = axiosRequest;
    return {
      type: GET_LETTERS,
      payload: data,
    };
  } catch (err) {
    return {
      type: GET_LETTERS,
      payload: {
        success: false,
      },
    };
  }
};

export const writeLetters = async (body, letters) => {
  try {
    const axiosLetter = await axios.post(
      "/api/users/thanks-letter/write",
      body
    );
    const { data } = axiosLetter;

    return {
      type: WRITE_LETTERS,
      payload: data,
    };
  } catch (err) {
    return { paylaod: { success: false } };
  }
};

export const combineLetters = async (body) => {
  return {
    type: COMBINE_LETTERS,
    payload: body,
  };
};

export const addLetters = async (body) => {
  return {
    type: ADD_LETTERS,
    payload: body,
  };
};

export const editLetters = async (body) => {
  try {
    const axiosRequest = await axios.post(
      "/api/users/thanks-letter/edit",
      body
    );
    const { data } = axiosRequest;
    return {
      type: EDIT_LETTERS,
      payload: data,
    };
  } catch (err) {
    return { paylaod: { success: false } };
  }
};

export const deleteLetters = async (body) => {
  try {
    const axiosLetterDelete = await axios.post(
      "/api/users/thanks-letter/delete",
      body
    );
    const data = axiosLetterDelete.data;
    return {
      type: DELETE_LETTERS,
      payload: data,
    };
  } catch (err) {
    return { paylaod: { success: false } };
  }
};
