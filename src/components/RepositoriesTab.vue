<template>
  <div class="flex justify-center full-height">
    <QList
      bordered
      class="rounded-borders full-width"
      style="max-width: 1024px"
      :style="{ height: getHeight }"
    >
      <QItemLabel class="q-pb-sm" header>
        {{ title }} ({{ count }})
      </QItemLabel>

      <div v-if="loading">
        <RepositoriesTabSkeleton />
      </div>

      <div :style="{ height: getHeight }" v-else>
        <RepositoriesTabList :repos="data" />
      </div>
    </QList>

    <div v-if="viewPagination" class="q-pt-sm flex flex-center">
      <QPagination v-model="currentPage" :max="totalPages" input />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import RepositoriesTabList from "./RepositoriesTabList.vue";
import RepositoriesTabSkeleton from "./RepositoriesTabSkeleton.vue";

type Props = {
  title?: string;
  viewPagination?: boolean;
  loading?: boolean;
  currentPage?: number;
  totalPages?: number;
  data: [],
  count: number;
};

const props = withDefaults(defineProps<Props>(), {
  title: "Repositórios",
  count: 0,
  totalPages: 0,
  currentPage: 1,
  viewPagination: true,
  loading: false,
});

const emit = defineEmits(['update:currentPage']);
const currentPage = computed({
  get() {
    return props.currentPage;
  },
  set(value) {
    emit('update:currentPage', value);
  }
})
const viewPagination = computed(() => props.viewPagination && props.totalPages > 0);
const getHeight = computed(() => 'calc(100% - 48px)');
</script>

<style scoped></style>
