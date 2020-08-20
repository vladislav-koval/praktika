import axios from "axios";
import Cookies from "js-cookie";
import { API_URL, TOKEN } from "./ApiConstants";

export function getStages() {
  return axios.get(`${API_URL}/stages`, {
    headers: {
      authorization: Cookies.get(TOKEN)
    }
  })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw Error(err.response.data.message);
    })
}

export function setStages(stages) {
  return axios.post(`${API_URL}/stages`,
    [...stages]
  , {
    headers: {
      authorization: Cookies.get(TOKEN)
    }
  })
    .then(res => {
      return res;
    })
    .catch(err => {
      throw Error(err.response.data.message);
    });
}
