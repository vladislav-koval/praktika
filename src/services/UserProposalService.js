import axios from "axios";
import Cookies from "js-cookie";
import { API_URL, TOKEN } from "./ApiConstants";
import { requestFields } from "../form/formService";

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

export function setProposal(data) {
  return axios.post(`${API_URL}/proposal`,
    { ...data }
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

export function validateProposalPostRequest(data) {
  let errorMessage;
  console.log(data)

  if (data.calculationType.trim() === "" || data.email.trim() === "" || data.name.trim() === "" || data.orgName.trim() === "" || data.phone.trim() === "" || data.nameGenitive.trim() === "") {
    errorMessage = "Заполните обязательные поля";
    return errorMessage;
  }

  if (data.initialCategories.category1 === 0 && data.initialCategories.category2 === 0 && data.initialCategories.category3 === 0) {
    errorMessage = "Вы должны выбрать хотя бы один тип документа";
    return errorMessage;
  }

  if (data.initialCategories.category1 > 0) {
    requestFields["category1"].forEach(item => {
      if (!data.fields[item.id] || !data.fields[item.id].trim()) {
        errorMessage = "Заполните все поля для выбранных типов документов"
      }
    })
    if (errorMessage)
      return errorMessage;
  }

  if (data.initialCategories.category2 > 0) {
    requestFields["category2"].forEach(item => {
      if (data.fields[item.id] && data.fields[item.id].trim()) {
      } else {
        errorMessage = "Заполните все поля для выбранных типов документов"
      }
    })
    if (errorMessage)
      return errorMessage;
  }

  if (data.initialCategories.category3 > 0) {
    requestFields["category3"].forEach(item => {
      if (data.fields[item.id] && data.fields[item.id].trim()) {
      } else {
        errorMessage = "Заполните все поля для выбранных типов документов"
      }
    })
    if (errorMessage)
      return errorMessage;
  }

  return null;
}