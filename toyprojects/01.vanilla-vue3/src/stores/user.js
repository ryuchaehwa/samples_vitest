import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { userRepository } from "@/api/user/user.repo";
import { transformUserList } from "@/api/user/user.trans";

export const useUserStore = defineStore("user", () => {
  // State
  const users = ref([]);
  const errorMessage = ref("");

  // Getters (Computed)
  //   const adminUsers = computed(() => {
  //     return users.value.filter((user) => user.role === "admin");
  //   });

  // Actions
  async function fetchUsers() {
    errorMessage.value = "";
    try {
      const response = await userRepository.getUsers();
      users.value = transformUserList(response.data);
    } catch (error) {
      users.value = [];
      errorMessage.value = "서버 에러가 발생했습니다.";
    }
  }

  return { users, errorMessage, fetchUsers };
});
