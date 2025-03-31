import axios from "axios";

const http = (baseUrl) => {
  const http = axios.create({ baseURL: baseUrl });

  http.interceptors.request.use((config) => {
    config.headers.Accept = "application/json";

    return config;
  });

  return http;
};

export default {
  baseUrl: import.meta.env.VITE_APP_AUTH_SERVICE_URL,
  endpoint: `/api`,
  login(params) {
    return http(this.baseUrl).post(`${this.endpoint}/login`, params);
  },
};
