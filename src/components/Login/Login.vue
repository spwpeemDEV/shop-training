<template>
  <v-container class="login-container" fluid>
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-6" elevation="12" rounded="xl">
          <v-card-title class="text-h5 font-weight-bold text-center mb-4">Login</v-card-title>
          <v-form @submit.prevent="onLogin">
            <v-text-field
              v-model="username"
              label="Username"
              type="username"
              :rules="[required]"
              variant="outlined"
            />
            <v-text-field
              v-model="password"
              label="password"
              type="password"
              :rules="[required]"
              variant="outlined"
            />

            <v-btn type="submit" block class="mt-4" color="primary">Login</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import authService, { type LoginPayload } from "@/services/api/features/login";
import { useAuthStore } from "@/plugins/stores/auth";

const username = ref("");
const password = ref("");
const router = useRouter();
const authStore = useAuthStore();

const required = (v: any) => {
  return !!v || "Field is required";
};

function parseJwt(token: string) {
  try {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(escape(payload)));
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
}

const onLogin = async () => {
  const payload: LoginPayload = {
    username: username.value,
    password: password.value,
  };

  try {
    const result = await authService.login(payload);
    if (!result) {
      return;
    }
    const decoded = parseJwt(result.token);

    authStore.setToken(result.token, Number(decoded.sub));

    router.push("/homepage");
  } catch (err) {
    console.error("Login failed", err);
  }
};
</script>

<style scoped>
.login-container {
  height: 100vh;
}
</style>
