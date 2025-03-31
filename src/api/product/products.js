import api from "@/api/index";

const { http } = api;

export default {
  baseURL: "http://localhost:8001",
  url: "api/products",
  http,

  getProducts(page = 1) {
    return this.http(this.baseURL).post(`${this.url}/?page=${page}`);
  },
};
