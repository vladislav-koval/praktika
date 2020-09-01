import axios from "axios";
import Cookies from "js-cookie";
import { API_URL, TOKEN } from "./ApiConstants";

export function getTypes() {
  return axios.get(`${API_URL}/options`, {
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


export function getProposal() {
  return axios.get(`${API_URL}/proposal`, {
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