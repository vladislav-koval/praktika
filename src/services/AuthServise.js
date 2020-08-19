import axios from 'axios';
import Cookies from 'js-cookie'
import { API_URL, ROLE, TOKEN } from "./ApiConstants";

// const createSetAuthInterceptor = authorization => config => {
//   if (isAuthorized()) {
//     config.headers.authorization = authorization;
//   } else {
//     delete config.headers.authorization;
//   }
//   return config;
// };
//
// const setAuthInterceptor = (authorization) => {
//   const setAuthCb = createSetAuthInterceptor(authorization);
//   axios.interceptors.request.use(setAuthCb);
// };

const setAuth = (authorization, role) => {
  Cookies.set(TOKEN, authorization);
  Cookies.set(ROLE, role);
  // setAuthInterceptor(authorization);
}

export const logout = () => {
  Cookies.remove(TOKEN);
  Cookies.remove(ROLE);
}

export const isAuthorized = () => {
  const user = Cookies.get(ROLE);
  return !!user;
};

export function loginUser(login, password) {
  const authorization = "Basic " + btoa(login + ":" + password);

  return axios.get(`${API_URL}/auth`, {
    headers: {
      authorization
    }
  })
    .then(res => {
      const role = res.data[0].authority;
      setAuth(authorization, role);
      return res;
    })
    .catch(err => {
      throw Error(err.response.data.message);
    });
}

export function registerUser(login, password, name, surname, companyName) {

  return axios.post(`${API_URL}/register`, {
    login, password, name, surname, companyName
  }, {
    headers: {
      authorization: Cookies.get(TOKEN)
    }
  })
    .then(res => {
      return loginUser(login, password)
    })
    .catch(err => {
      throw Error(err.response.data.message);
    });
}

