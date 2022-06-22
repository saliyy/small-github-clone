<script setup lang="ts">
import { ref } from "@vue/runtime-core";
import User from "@/models/User";
import SearchUserField from "@/components/user/SearchUserField.vue";
import { useRouter } from "vue-router";

const user = ref<User | null>(null);
const router = useRouter();
function select(selectedUser: User): void {
  router.push({ name: "show-user", params: { login: selectedUser.login } });
}
</script>

<template>
  <div class="center">
    <search-user-field @select="select" />
  </div>
</template>

<style lang="scss" scoped></style>
