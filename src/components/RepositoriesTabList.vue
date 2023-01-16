<template>
  <QScrollArea class="full-width full-height">
    <div v-for="(repo, index) in repos" :key="index">
      <QItem clickable @click="openRepo(repo.html_url)">
        <QItemSection class="gt-sm">
          <QItemLabel class="q-mt-sm">{{ repo.name }}</QItemLabel>
          <QItemLabel v-if="repo.description" caption>
            {{ repo.description }}
          </QItemLabel>
        </QItemSection>

        <QItemSection class="col-2">
          <QItemLabel caption>Data de criação:</QItemLabel>
          <QItemLabel>{{ repo.created_at }}</QItemLabel>
        </QItemSection>

        <QItemSection class="col-2">
          <QItemLabel caption>Ultima atualização:</QItemLabel>
          <QItemLabel>{{ repo.updated_at }}</QItemLabel>
        </QItemSection>

        <QItemSection side class="col-1">
          <QBtn
            size="12px"
            flat
            dense
            round
            icon="open_in_new"
            @click="openRepo(repo.html_url)"
          />
        </QItemSection>
      </QItem>

      <QSeparator />
    </div>
  </QScrollArea>
</template>

<script setup lang="ts">
import Repository from '../entities/Repository';

type Props = {
  repos: Repository[]
}

defineProps<Props>();

async function openRepo(url: string) {
  window.open(url, "_blank");
}
</script>

<style scoped></style>
