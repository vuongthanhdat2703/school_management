import axios from "axios";
import {message} from 'antd'
import { getToken } from "./localstorage";
export const request = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000',
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    timeout: 30000,
  });
  
  request.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error)
      setTimeout(()=>     message.error('Error!'), 100)
      return Promise.reject(error);
    }
  );