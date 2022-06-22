<script lang="ts" setup>
import useUserSearch from "../../hooks/useUserSearch";
import User from "../../models/User";

const emits = defineEmits<{
  (e: "select", user: User): void;
}>();

function selectUser(user: User): void {
  emits("select", user);
  searchField.value = "";
}

const { searchField, searchInGithub, searchUsers, searchInProcess } = useUserSearch();
</script>

<template>
  <div class="center">
    <span
      @click.prevent="(searchField = 'torvalds'), searchInGithub()"
      class="example_name"
      >Enter github username, for example
      <a href="" class="text-emerald-400">torvalds</a></span
    >
    <div class="find-user-field">
      <el-input
        class="input-field"
        placeholder="Enter github username"
        v-debounce:450ms="searchInGithub"
        clearable
        size="large"
        v-model="searchField"
      />
      <div class="user-suggestion">
        <ul>
          <li class="user-suggestion-item" v-if="!searchUsers.length && searchInProcess">
            ...
          </li>
          <TransitionGroup tag="ul" name="list">
            <li
              v-for="user in searchUsers"
              :key="user.id"
              class="user-suggestion-item"
              @click="selectUser(user)"
            >
              <el-avatar
                class="user-suggestion-avatar"
                :src="user.avatar_url"
                :size="60"
              />
              <span class="user-suggestion-name">{{ user.login }}</span>
            </li>
          </TransitionGroup>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.center {
  position: absolute;
  left: 40%;
  top: 25%;
}
$input-width: 400px;
.find-user-field {
  width: $input-width;
  margin-top: 10px;
}

.input-field {
  font-size: 20px;
}

.user-suggestion {
  margin-top: 8px;
  border-radius: 10px;
  position: fixed;
  width: $input-width;
}

.user-suggestion-item:hover {
  cursor: pointer;
  border: 1px solid gray;
}

.user-suggestion-item {
  border-radius: 10px;
  margin: 10px 2px 10px 2px;
  padding: 5px;
}

.user-suggestion-avatar {
  vertical-align: middle; /* | top | bottom */
}
div ul li .user-suggestion-name {
  display: inline-block;
  vertical-align: middle; /* | top | bottom */
  margin-left: 20px;
  font-size: 18px;
}

.example_name {
  font-size: 20px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
