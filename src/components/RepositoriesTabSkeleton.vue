<template>
  <QItem v-for="index in 5" :key="index">
    <QItemSection class="gt-sm">
      <QItemLabel class="q-mt-sm">
        <QSkeleton type="text" width="20%" />
      </QItemLabel>

      <QItemLabel caption>
        <QSkeleton type="text" width="40%" />
      </QItemLabel>
    </QItemSection>

    <QItemSection class="col-2">
      <QItemLabel caption>
        <QSkeleton type="text" width="60%" />
      </QItemLabel>

      <QItemLabel>
        <QSkeleton type="text" width="75%" />
      </QItemLabel>
    </QItemSection>

    <QItemSection class="col-2">
      <QItemLabel caption>
        <QSkeleton type="text" width="60%" />
      </QItemLabel>

      <QItemLabel>
        <QSkeleton type="text" width="75%" />
      </QItemLabel>
    </QItemSection>

    <QItemSection side class="col-1" />
  </QItem>
</template>

<script setup lang="ts"></script>

<style scoped></style>
