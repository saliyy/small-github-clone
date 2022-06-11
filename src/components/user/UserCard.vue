<template>
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
    <div class="user_repositories">
      <user-repositories-list :git-hub-user="user" @open-repo="openRepo" />
    </div>
  </div>
</template>
