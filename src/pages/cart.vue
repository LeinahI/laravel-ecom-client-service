<template>
  <v-card class="mx-auto">
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Product Name</th>
          <th class="text-left">Quantity</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.product.name }}</td>
          <td>
            <v-number-input
              control-variant="split"
              inset
              :model-value="item.quantity"
              :min="0"
              @update:model-value="
                (value) => {
                  item.quantity = value;
                  updateCart(item.id, item.product_id, value);
                }
              "
            />
          </td>
          <td>
            <v-btn color="red" variant="text" @click="deleteCart(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script>
import { VNumberInput } from "vuetify/labs/VNumberInput";
import carts from "@/api/product/carts.js";
import _ from "lodash";

export default {
  components: {
    VNumberInput,
  },
  data() {
    return {
      items: [],
    };
  },
  async created() {
    await this.fetch();
  },
  methods: {
    async fetch() {
      await carts.getCart().then((response) => {
        const data = response.data;

        this.items = data;
      });
    },

    updateCart: _.debounce(async function (cartId, productId, quantity) {
      if (quantity < 1) {
        this.deleteCart(cartId);
      } else {
        await carts.updateCart(cartId, productId, quantity);
      }
    }, 1000),

    deleteCart: _.debounce(async function (cartId) {
      await carts.deleteCart(cartId).then(() => {
        this.items = this.items.filter((item) => item.id !== cartId);
      });
    }, 1000),
  },
};
</script>
