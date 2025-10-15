import axios from 'axios';

export const BASE_URL = 'http://localhost:3000';

export const register = (username, email, password) => {
   return axios.post(`${BASE_URL}/users/signup`, { username, email, password }, {
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
       }
     })
     .then((res) => res.data) 
     .catch((error) => {
       if (error.response) {
         throw new Error(`${error.response.status} - ${error.response.data.message || "Erro na requisição"}`);
       } else {
         throw new Error("Erro de conexão: verifique se o servidor está rodando");
       }
     });
};

export const authorize = (email, password) => {
  return axios.post(`${BASE_URL}/users/signin`, { email, password }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
    .then((res) => res.data) 
    .catch((error) => {
      if (error.response) {
        throw new Error(`${error.response.status} - ${error.response.data.message || "Erro na requisição"}`);
      } else {
        throw new Error("Erro de conexão: verifique se o servidor está rodando");
      }
    });
};

export const getUserInfo = (token) => {
  return axios.get(`${BASE_URL}/users/me`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  })
  .then((res) => res.data) 
  .catch((error) => {
    if (error.response) {
      throw new Error(`${error.response.status} - ${error.response.data.message || "Erro na requisição"}`);
    } else {
      throw new Error("Erro de conexão: verifique se o servidor está rodando");
    }
  });
}