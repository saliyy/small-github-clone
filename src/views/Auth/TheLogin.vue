<script lang="ts" setup></script>

<template>
  <div class="login">
    <el-card class="login-form place-content-center">
      <template #header>
        <div class="card-header">
          <span>Sign In</span>
        </div>
      </template>
      <el-form>
        <el-input
          type="text"
          size="large"
          placeholder="login"
          class="mt-5 mb-3"
        ></el-input>
        <el-input
          type="password"
          size="large"
          show-password
          placeholder="password"
        ></el-input>
        <el-button type="success" class="mt-5">
          <span>Sign in!</span>
        </el-button>
        <el-button type="text" class="mt-5">
          <span>Dont have an account? Sign Up!</span>
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<style>
.login {
  display: flex;
  justify-content: center;
  margin-top: 15%;
}

.login-form {
  width: 400px;
}
</style>
