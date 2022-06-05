<script lang="ts" setup></script>

<template>
  <div>
    <div class="flex flex-row justify-center md:space-x-8">
      <div class="basis-1/3">
        <el-card class="box-card">
          <span> Search repositories </span>
        </el-card>
      </div>
      <div class="basis-1/3">
        <el-card class="box-card">
          <span>Search users</span>
        </el-card>
      </div>
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
