<template>
  <div class="profile-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-wrapper">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      <p class="mt-4">กำลังโหลดข้อมูล...</p>
    </div>

    <!-- Error State -->
    <v-alert v-else-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <!-- Profile Content -->
    <div v-else-if="user" class="profile-content">
      <!-- Header -->
      <div class="profile-header">
        <v-avatar size="80" color="primary" class="mb-4">
          <span class="text-h4 text-white">{{ userInitials }}</span>
          >
        </v-avatar>
        <h1 class="text-h4 mb-2">{{ user.name.firstname }} {{ user.name.lastname }}</h1>
        <p class="text-subtitle-1 text-grey-600">@{{ user.username }}</p>
      </div>

      <!-- Profile Cards -->
      <div class="profile-cards">
        <!-- Personal Information -->
        <v-card class="mb-4" elevation="2">
          <v-card-title class="bg-primary text-white">
            <v-icon left class="mr-2">mdi-account</v-icon>
            ข้อมูลส่วนตัว
          </v-card-title>
          <v-card-text class="pa-4">
            <div class="info-row">
              <v-icon class="info-icon">mdi-email</v-icon>
              <div>
                <div class="info-label">อีเมล</div>
                <div class="info-value">{{ user.email }}</div>
              </div>
            </div>
            <div class="info-row">
              <v-icon class="info-icon">mdi-phone</v-icon>
              <div>
                <div class="info-label">เบอร์โทรศัพท์</div>
                <div class="info-value">{{ user.phone }}</div>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- Address Information -->
        <v-card class="mb-4" elevation="2">
          <v-card-title class="bg-secondary text-white">
            <v-icon left class="mr-2">mdi-map-marker</v-icon>
            ที่อยู่
          </v-card-title>
          <v-card-text class="pa-4">
            <div class="info-row">
              <v-icon class="info-icon">mdi-home</v-icon>
              <div>
                <div class="info-label">ที่อยู่</div>
                <div class="info-value">
                  {{ user.address.number }} {{ user.address.street }}<br />
                  {{ user.address.city }} {{ user.address.zipcode }}
                </div>
              </div>
            </div>
            <div class="info-row">
              <v-icon class="info-icon">mdi-map</v-icon>
              <div>
                <div class="info-label">พิกัด</div>
                <div class="info-value">
                  {{ user.address.geolocation.lat }}, {{ user.address.geolocation.long }}
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <!-- No User State -->
    <div v-else class="no-user">
      <v-icon size="64" color="grey">mdi-account-off</v-icon>
      <p class="text-h6 mt-4">ไม่พบข้อมูลผู้ใช้</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/plugins/stores/auth";
import userService, { type User } from "@/services/api/features/user";

const router = useRouter();
const authStore = useAuthStore();

const user = ref<User | null>(null);
const loading = ref(true);
const error = ref("");

const fetchUserData = async () => {
  try {
    loading.value = true;
    if (!authStore.userId) {
      return;
    }
    const userData = await userService.getById(authStore.userId);
    if (userData) {
      user.value = userData;
    } else {
      error.value = "ไม่สามารถโหลดข้อมูลผู้ใช้ได้";
    }
  } catch (err) {
    error.value = "เกิดข้อผิดพลาดในการโหลดข้อมูล";
    console.error("Error fetching user data:", err);
  } finally {
    loading.value = false;
  }
};

const userInitials = computed(() => {
  if (!user.value) return "";
  return `${user.value.name.firstname.charAt(0)}${user.value.name.lastname.charAt(
    0
  )}`.toUpperCase();
});

onMounted(() => {
  fetchUserData();
});
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.profile-header {
  text-align: center;
  margin-bottom: 32px;
  padding: 32px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  border-radius: 12px;
}

.profile-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  padding: 12px 0;
}

.info-row:not(:last-child) {
  border-bottom: 1px solid #e0e0e0;
}

.info-icon {
  margin-right: 16px;
  margin-top: 4px;
  color: #666;
}

.info-label {
  font-weight: 500;
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
}

.info-value {
  font-size: 16px;
  color: #333;
  line-height: 1.4;
}

.profile-actions {
  display: flex;
  justify-content: center;
  margin-top: 32px;
  padding: 24px;
}

.no-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #666;
}

/* Responsive */
@media (max-width: 600px) {
  .profile-container {
    padding: 16px;
  }

  .profile-actions {
    flex-direction: column;
    gap: 12px;
  }

  .profile-actions .v-btn {
    margin: 0 !important;
  }
}
</style>
