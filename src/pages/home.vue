<template>
  <v-row>
    <v-col class="pa-10" cols="12" md="4" v-for="item in items" :key="item.id">
      <v-card class="mx-auto">
        <v-img height="600px" class="mx-auto" :src="item.image" cover></v-img>

        <div class="pa-2">
          <v-card-title>{{ item.name }}</v-card-title>

          <v-card-subtitle> ₱{{ item.price }} </v-card-subtitle>

          <v-btn
            class="mt-2"
            color="primary"
            variant="tonal"
            rounded
            text="Add to Cart"
            @click="addToCart(item.id)"
          />
        </div>
      </v-card>
    </v-col>
  </v-row>

  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="totalItems"
      class="my-4"
      :total-visible="5"
    ></v-pagination>
  </div>
</template>

<script>
import products from "@/api/product/products.js";
import carts from "@/api/product/carts.js";
import { ref } from "vue";

export default {
  name: "Home",
  setup() {
    const page = ref(1);

    return {
      page,
    };
  },
  data() {
    return {
      items: [],
      totalItems: 0,
    };
  },
  watch: {
    page() {
      this.fetch();
    },
  },
  async created() {
    await this.fetch();
  },
  methods: {
    async fetch() {
      await products.getProducts(this.page).then((response) => {
        const data = response.data;

        this.items = data.data;
        this.totalItems = data.last_page;
      });
    },

    async addToCart(productId) {
      await carts.addToCart(productId).then(() => {
        alert("Product added to cart");
      });
    },
  },
};
</script>
