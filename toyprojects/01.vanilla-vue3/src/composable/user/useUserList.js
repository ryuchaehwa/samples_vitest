import { ref } from "vue";
import { userRepository } from "@/api/user/user.repo";
import { transformUserList } from "@/api/user/user.trans";

export function useUserList() {
  const user = ref(null);
  const users = ref(null);
  const isLoading = ref(false);

  const loadUser = async () => {
    console.log("composable: loadUser");
    isLoading.value = true;
    try {
      const { data } = await userRepository.getUsers();
      console.log("-data", data);
      users.value = transformUserList(data); // 여기서 우리 '표준'인 Trans 호출!
    } finally {
      isLoading.value = false;
    }
  };

  return { users, isLoading, loadUser };
}
