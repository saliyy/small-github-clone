<script lang="ts" setup>
import { onMounted } from "@vue/runtime-core";
import { shallowRef } from "vue";
import { useRouter } from "vue-router";
import UserCard from "@/components/user/UserCard.vue";
import User from "@/models/User";
import { getUserByName } from "@/services/GitHubAPIService";
import useLoading from "@/hooks/useLoading";
import { defineAsyncComponent } from "vue";
import Repository from "@/models/Repository";
import { AxiosResponse } from "axios";

interface UserShowProps {
  login: string;
  id?: number;
}
const props = defineProps<UserShowProps>();
const { startLoading, stopLoading } = useLoading();
const user = shallowRef<User | null>(null);
const router = useRouter();

onMounted(() => {
  startLoading();
  getUserByName(props.login)
    .then((res: AxiosResponse<User>) => {
      user.value = res.data || null;
    })
    .finally(() => {
      stopLoading();
    });
});

const AsyncReposList = defineAsyncComponent(
  () => import("@/components/user/UserRepositoriesList.vue")
);

function openRepo(repo: Repository): void {
  const DEFAULT_REPOSITORY_PATH = "/";

  router.push({
    name: "show-repo",
    params: {
      repoName: repo.name,
      ownerName: repo.owner.login,
      branch: repo.default_branch,
      path: DEFAULT_REPOSITORY_PATH,
    },
  });
}
</script>

<template>
  <div class="user-show flex justify-center gap-10">
    <div class="user-card">
      <user-card v-if="user" :user="user" />
    </div>
    <div class="user-repos w-2/4">
      <suspense>
        <async-repos-list v-if="user" :user="user" @select="openRepo" />
        <template #fallback> Load repositories... </template>
      </suspense>
    </div>
  </div>
</template>

<style lang="scss"></style>
