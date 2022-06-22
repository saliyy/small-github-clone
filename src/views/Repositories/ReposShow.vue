<script lang="ts" setup>
import { AxiosResponse } from "axios";
import {
  defineProps,
  onMounted,
  reactive,
  shallowReactive,
  shallowRef,
  watch,
} from "vue";
import useLoading from "@/hooks/useLoading";
import Branch from "@/models/Branch";
import Repository from "@/models/Repository";
import RepositoryFile from "@/models/RepositoryFile";
import {
  getReposBranches,
  getReposFiles,
  getRepository,
} from "@/services/GitHubAPIService";
import RepoFile from "@/components/repos/RepoFile.vue";
import RepoFileTree from "@/components/repos/RepoFileTree.vue";
import { BreadCrumbItem } from "@/components/layout/BaseBreadCrumb.ts";
import { Collection } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();

const props = withDefaults(
  defineProps<{
    repoName: string;
    ownerName: string;
    branch: string;
    path?: string;
  }>(),
  {
    path: "/",
  }
);

const query = reactive({
  ownerName: props.ownerName,
  branch: props.branch,
  repoName: props.repoName,
  path: "",
});

watch(query, () => {
  loadRepositoryFiles();
});

const reposBranches = shallowReactive<Branch[]>([]);
const { startLoading, stopLoading } = useLoading();
const repo = shallowRef<Repository | null>(null);
const reposFiles = shallowReactive<RepositoryFile[]>([]);
let selectedFile = reactive<RepositoryFile | null>(null);
const breadCrumbs = reactive<BreadCrumbItem[]>([
  {
    uid: 1,
    label: props.ownerName,
    onClick: () => openUserProfile(),
  },
  {
    uid: 2,
    label: props.repoName,
    onClick: () => processBreadCrumb(),
  },
]);

function openUserProfile(): void {
  router.push({ name: "show-user", params: { login: props.ownerName } });
}

function processBreadCrumb(): void {
  //
}

onMounted(() => {
  startLoading();
  Promise.all([
    loadRepository(),
    loadRepositoryBranches(),
    loadRepositoryFiles(),
  ]).finally(() => {
    stopLoading();
  });
});

function loadRepository() {
  getRepository(query.ownerName, query.repoName).then(
    (res: AxiosResponse<Repository>) => {
      repo.value = res.data || null;
    }
  );
}

function loadRepositoryBranches(): void {
  getReposBranches(query.ownerName, query.repoName).then(
    (res: AxiosResponse<Branch[]>) => {
      reposBranches.values = res.data || [];
    }
  );
}

function loadRepositoryFiles(): void {
  startLoading();
  getReposFiles(query)
    .then((res: AxiosResponse<RepositoryFile[]>) => {
      reposFiles.values = res.data || [];
    })
    .finally(() => {
      stopLoading();
    });
}

function select(file: RepositoryFile) {
  if (file.type === "dir") {
    query.path += `/${file.name}`;
  } else {
    selectedFile = file;
  }
}
</script>

<template>
  <div class="container mx-auto ml-32">
    <span>
      <el-icon><collection /></el-icon>
    </span>
    <div class="repository_path">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          class="repository_path-item"
          v-for="breadCrumbItem in breadCrumbs"
          :key="breadCrumbItem.uid"
        >
          <span @click="breadCrumbItem.onClick()">{{ breadCrumbItem.label }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="repository_branches">
      <el-select v-model="query.branch">
        <el-option
          v-for="branch in reposBranches.values"
          :label="branch.name"
          :value="branch.name"
          :key="branch.sha"
        />
      </el-select>
    </div>
    <div class="flex mt-2">
      <repo-file-tree v-if="!selectedFile" :dir="reposFiles.values" @select="select" />
      <repo-file v-else :file="selectedFile" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
span {
  font-size: 22px;
}

.repository_name {
  margin-left: 5px;
}

.repoistory_owner {
  cursor: pointer;
  margin-left: 5px;
}

.repository_path {
  display: inline-block;
  margin-left: 5px;
}

.repository_path-item:hover {
  span {
    cursor: pointer;
    text-decoration: underline;
  }
}

.repository_branches {
  margin-top: 10px;
}
</style>
