import api from "@/api/index.js";

const { http } = api;

export default {
  baseUrl: import.meta.env.VITE_APP_PRODUCT_SERVICE_URL,
  url: "api/cart",
  http,

  addToCart(productId, quantity = 1) {
    return this.http(this.baseUrl).post(this.url, {
      product_id: productId,
      quantity: quantity,
    });
  },

  getCart() {
    return this.http(this.baseUrl).get(this.url);
  },

  updateCart(cartId, productId, quantity) {
    return this.http(this.baseUrl).put(`${this.url}/${cartId}`, {
      product_id: productId,

      quantity: quantity,
    });
  },

  deleteCart(cartId) {
    return this.http(this.baseUrl).delete(`${this.url}/${cartId}`);
  },
};
