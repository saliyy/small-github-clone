<script lang="ts" setup>
import Repository from "@/models/Repository";
import { defineProps, onMounted, ref, shallowReactive, watch, defineEmits } from "vue";
import User from "@/models/User";
import { getUserRepos } from "../../services/GitHubAPIService";

const props = defineProps<{
  user: User;
}>();

const emits = defineEmits<{
  (e: "select", repo: Repository): void;
}>();

const repos = shallowReactive<Repository[]>([]);

const query = ref({
  page: 1,
  per_page: 10,
});

const loading = ref(false);

watch(query.value, () => {
  loadRepositories();
});

onMounted(() => {
  loadRepositories();
});

function loadRepositories() {
  loading.value = true;
  getUserRepos(props.user.login, query.value)
    .then((res) => {
      repos.values = res.data || [];
    })
    .finally(() => {
      loading.value = false;
    });
}

function select(repo: Repository): void {
  emits("select", repo);
}
</script>

<template>
  <div>
    <span class="repos-count">public repositories: {{ user.public_repos || 0 }}</span>
    <ul class="repos-list" v-loading="loading" v-show="user.public_repos">
      <TransitionGroup tag="ul" name="list">
        <li
          v-for="repo in repos.values"
          :key="repo.url"
          class="repos-item"
          @click="select(repo)"
        >
          <div>
            <span
              >{{ repo.name }}
              <span v-if="repo.description">{{ repo.description }}</span></span
            >
          </div>
        </li>
      </TransitionGroup>
    </ul>
    <div class="repos-pagination" v-if="user.public_repos">
      <el-pagination
        background
        layout="prev, pager, next"
        @next-click="query.page++"
        @prev-click="query.page--"
        :current-page="query.page"
        @current-change="(page) => (query.page = page)"
        :total="user.public_repos"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.repos-list {
  margin-top: 20px;
  border: 1px solid #c2c2c2;
  border-radius: 4px;
  padding: 10px;
}

li {
  width: fit-content;
  padding: 5px;
  margin: 0px 10px 0 10px;
}

li:hover {
  border: 1px solid #a9a9a9;
  border-radius: 4px;
  cursor: pointer;
}

.repos-pagination {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.repos-count {
  font-size: 20px;
  color: black;
  padding: 5px;
  border-radius: 4px;
}
</style>
