import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "" as string,
    userId: null as number | null, 
  }),
  actions: {
    setToken(token: string, userId: number) {
      this.token = token;
      this.userId = userId;
    },
    logout() {
      this.token = "";
      this.userId = null;
    },
  },
      persist: true,  
});
