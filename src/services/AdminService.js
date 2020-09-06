import axios from "axios";
import { API_URL, TOKEN } from "./ApiConstants";
import Cookies from "js-cookie";

export function getAdminProposal(login) {
  return axios.get(`${API_URL}/admin/proposal`, {
    headers: {
      authorization: Cookies.get(TOKEN)
    },
    params: {
      login: login,
    }
  }).then(res => {
    return res;
  })
    .catch(err => {
      throw Error(err.response.data.message);
    });
}


export function makeAdminProposal(login, money) {
  return axios.get(`${API_URL}/admin/make-proposal`, {
    headers: {
      authorization: Cookies.get(TOKEN)
    },
    params: {
      price: money,
      login: login,
    }
  }).then(res => {
    return res;
  })
    .catch(err => {
      throw Error(err.response.data.message);
    });
}

export function getUsers() {
  return axios.get(`${API_URL}/admin/logins`, {
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

export function getUser(login) {
  return axios.get(`${API_URL}/admin/stages`, {
    headers: {
      authorization: Cookies.get(TOKEN)
    },
    params: {
      login: login,
    }
  }).then(res => {
    return res;
  })
    .catch(err => {
      throw Error(err.response.data.message);
    });
}
