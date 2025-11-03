import axios from 'axios';
import * as token from "./token.js";

class Api {
    constructor(options) {
        this._baseURL = options.baseUrl;
        this._headers = options.headers;
    }

    _getAuthorizationHeaders() {
      return {
        ...this._headers,
        authorization: `Bearer ${token.getToken()}`,
      }
    }

    createTask(data) {
      const { title, frequency, moodTag, isMandatory } = data;

      if (!title || !frequency || !moodTag || isMandatory === undefined) {
        return Promise.reject("Todos esses campos são obrigatórios.");
      }

       return axios.post(`${this._baseURL}/tasks`, data, { headers: this._getAuthorizationHeaders() })
       .then((res) => {
        return res.data;
      })
          .catch((error) => {

      const errorMessage = error.response 
        ? `Error: ${error.response.status} - ${error.response.data.message || error.message}` 
        : `Network error: ${error.message}`;
      return Promise.reject(errorMessage);
    });
    }

    getTasks() {
      return axios.get(`${this._baseURL}/tasks`, { headers: this._getAuthorizationHeaders() })
      .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return Promise.reject(`Error: ${error.response ? error.response.status : error.message}`);
        });
    }

    getTasksByMood() {
      return axios.get(`${this._baseURL}/tasks/mood`, { headers: this._getAuthorizationHeaders() })
      .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return Promise.reject(`Error: ${error.response ? error.response.status : error.message}`);
        });
    }

      deleteTask(id) {
        return axios.delete(`${this._baseURL}/tasks/${id}`, { headers: this._getAuthorizationHeaders() })
        .then((res)=>{
          return res.data;
        })
        .catch((error)=>{
          return Promise.reject(`Error: ${error.response ? error.response.status : error.message}`);
        })
    }

    updateTask(id, { title, type, frequency, daysOfWeek, moodTag, isMandatory }) {
      if (!id) {
        return Promise.reject("O ID é obrigatório.");
      }

      const updatedFields = {};

       if (title !== undefined) updatedFields.title = title;
       if (type !== undefined) updatedFields.type = type;
       if (frequency !== undefined) updatedFields.frequency = frequency;
       if (daysOfWeek !== undefined) updatedFields.daysOfWeek = daysOfWeek;
       if (moodTag !== undefined) updatedFields.moodTag = moodTag;
       if (isMandatory !== undefined) updatedFields.isMandatory = isMandatory;
    
      return axios.patch(`${this._baseURL}/tasks/${id}`, updatedFields, { headers: this._getAuthorizationHeaders() })
        .then((res) => res.data)
        .catch((error) => {
          const errorMessage = error.response 
            ? `Error: ${error.response.status} - ${error.response.data.message || error.message}` 
            : `Network error: ${error.message}`;
          return Promise.reject(errorMessage);
        });
    }

    updateStatus(id, status) {
      if (!id) {
        return Promise.reject("O ID é obrigatório.");
      }
    
      return axios.patch(`${this._baseURL}/tasks/${id}/status`, {status}, { headers: this._getAuthorizationHeaders() })
        .then((res) => res.data)
        .catch((error) => {
          const errorMessage = error.response 
            ? `Error: ${error.response.status} - ${error.response.data.message || error.message}` 
            : `Network error: ${error.message}`;
          return Promise.reject(errorMessage);
        });
    }
}

const api = new Api({
    baseUrl: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export { api };