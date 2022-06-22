<script lang="ts" setup>
import { onMounted } from "@vue/runtime-core";
import User from "@/models/User";
import { getUserByName } from "@/services/GitHubAPIService";
import { OfficeBuilding, UserFilled, Location, School } from "@element-plus/icons-vue";

interface UserCardProps {
  user: User;
}

defineProps<UserCardProps>();
</script>

<template>
  <div>
    <div class="user">
      <div class="user_info">
        <div class="user_avatar">
          <img :src="user.avatar_url" />
        </div>
        <span class="user_name">{{ user.login }}</span>
        <span class="user_company">
          <el-icon><office-building /></el-icon>
          {{ user.company || " - " }}
        </span>
        <span class="user_blog" v-if="user.blog">
          <el-icon><school /></el-icon>
          {{ user.blog }}
        </span>
        <span class="user_social">
          <el-icon><user-filled /></el-icon>
          followers: {{ user.followers || 0 }} following:
          {{ user.following || 0 }}
        </span>
        <span class="user_location" v-show="user.location">
          <el-icon><location /></el-icon>
          {{ user.location }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.user {
  display: grid;
}

.user_name {
  font-size: 25px;
}

.user_info {
  grid-column: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user_avatar img {
  width: 200px;
  height: 200px;
  border-radius: 10%;
}
</style>
