<template>
  <div class="flex justify-center full-height">
              <QList
                bordered
                class="rounded-borders full-width"
                style="max-width: 1024px"
              >
                <QItemLabel class="q-pb-sm" header>Forks ({{ (reposFork || []).length }})</QItemLabel>

                <div v-if="fetchingRepos">
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
                </div>

                <div style="height: calc(100% - 40.8px)" v-else>
                  <QScrollArea class="full-width full-height">
                    <div
                        v-for="(repo, index) in reposFork"
                      :key="index"
                    >
                      <QItem
                        clickable
                        
                        @click="openRepo(repo.html_url)"
                      >
                        <QItemSection class="gt-sm">
                          <QItemLabel class="q-mt-sm">{{ repo.name }}</QItemLabel>
                          <QItemLabel v-if="repo.description" caption>{{ repo.description }}</QItemLabel>
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
                </div>
              </QList>
          </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>