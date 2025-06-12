<!-- <template>
  <v-container class="login-container" fluid>
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-6" elevation="12" rounded="xl">
          <v-card-title class="text-h5 font-weight-bold text-center mb-4">Login</v-card-title>
          <v-form @submit.prevent="onLogin">
            <v-text-field
              v-model="email"
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
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import productService from "@/services/api/features/product";

onMounted(() => {
  fetchProducts();
});

const email = ref("");
const password = ref("");
const router = useRouter();
const products = ref([]);

const required = (v: any) => {
  return !!v || "Field is required";
};

const fetchProducts = async () => {
  try {
    const data = await productService.getAll();
    products.value = data || [];
  } catch (error) {
    console.error("Failed to fetch products", error);
  }
};

const onLogin = () => {
  console.log("email", email.value);
  console.log("password", password.value);
};
</script>

<style scoped>
.login-container {
  height: 100vh;
}
</style> -->
