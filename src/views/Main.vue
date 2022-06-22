<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goTo = (path: string) => router.push({ path: path });
</script>

<template>
  <div class="container mx-auto">
    <div class="flex justify-center">
      <el-card class="box-card w-80" @click="goTo('/users')">
        <span>Go!</span>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box-card:hover {
  background-color: #373737;
  cursor: pointer;
  span {
    color: white;
  }
}
</style>
