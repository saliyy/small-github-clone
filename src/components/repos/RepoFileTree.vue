<script lang="ts" setup>
import RepositoryFile from "@/models/RepositoryFile.ts";
import { Folder, Document } from "@element-plus/icons-vue";
import { defineProps, defineEmits } from "vue";

interface RepositoryDirTreeProps {
  dir: RepositoryFile[];
}

defineProps<RepositoryDirTreeProps>();

const emits = defineEmits<{
  (e: "select", file: RepositoryFile): void;
}>();

function moveOnTree(file: RepositoryFile): void {
  emits("select", file);
}
</script>

<template>
  <div class="repository_content w-3/5 border h-1/4">
    <div class="repository_files">
      <ul>
        <li class="file" v-for="file in dir" :key="file.sha" @click="moveOnTree(file)">
          <div class="flex gap-3 content-center border p-1">
            <span class="file_icon">
              <el-icon>
                <document v-if="file.type === 'file'" />
                <folder class="text-blue-700" v-else />
              </el-icon>
            </span>
            <span class="file_name">
              {{ file.name }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.file:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
