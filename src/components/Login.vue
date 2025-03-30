<template>
  <div>
    <v-container class="mb-6">
      <v-row
        class="text-center align-center justify-center"
        align="center"
        style="height: 150px"
        no-gutters
      >
        <v-col cols="6">
          <v-card>
            <v-card-title class="pa-2 ma-2">
              <h2>Login</h2>
            </v-card-title>

            <hr class="mx-10" />

            <v-card-text>
              <v-form class="pa-2 ma-2" @submit.prevent="submit">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="email"
                        label="Email"
                        required
                        type="email"
                        rounded
                        variant="solo"
                      />
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="password"
                        label="Password"
                        required
                        type="password"
                        rounded
                        variant="solo"
                      />
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-btn
                        class="primary"
                        size="large"
                        variant="tonal"
                        rounded
                        type="submit"
                      >
                        Login
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import auth from "@/api/auth/auth.js";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async submit() {
      await auth
        .login({
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          const data = response.data;

          /*  data.expires_in = new Date(
            Date.now() + data.expires_in
          ).toISOString(); */

          data.expires_in = new Date(Date.now() + data.expires_in)
            .toLocaleString("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })
            .replace(",", "");

          localStorage.setItem("auth", JSON.stringify(data));
        })
        .catch()
        .finally();
    },
  },
};
</script>
