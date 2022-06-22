<script lang="ts" setup>
import RepositoryFile from "@/models/RepositoryFile";
import { computed, defineProps } from "vue";

const props = defineProps<{
  file: RepositoryFile;
}>();

const convertedFileFromBase64 = computed((): string => {
  try {
    return Buffer.from(props.file.content, "base64").toString("binary");
  } catch (ex) {
    return "Cannot load file...";
  }
});
</script>

<template>
  <div>
    <pre>
      <code>
        {{ convertedFileFromBase64 }}
    </code>
    </pre>
  </div>
</template>

<style lang="scss" scoped>
code {
  font-size: 20px;
  color: white;
}
</style>
