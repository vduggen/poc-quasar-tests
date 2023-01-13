<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import axios from 'axios';
import * as quasar from 'quasar';
import PeopleSearch from './assets/people_search.vue';
import { userMock, userReposMock } from './mocks';

const $quasar = quasar.useQuasar();

interface Repository {
  created_at: string;
  updated_at: string;
  description: string;
  name: string;
  html_url: string;
  fork: boolean;
}

interface UserInfo {
  followers: number;
  following: number;
  public_repos: number;
  bio: string;
  location: string;
  name: string;
  created_at: string;
  avatar_url: string;
  login: string;
  repos_url: string;
}

const repos = ref<Repository[] | null>(null);
const reposFork = ref<Repository[] | null>(null);
const user = ref<UserInfo | null>(null);
const username = ref('');
const isLoading = ref(false);
const fetchingRepos = ref(false);
const tab = ref('user');

async function fetchRepos(username: string) {
  fetchingRepos.value = true;
  const { data } = await axios.get(`https://api.github.com/users/${username}/repos`, {
    params: {
      sort: 'created_at',
      content: true
    }
  });
  // const data: Repository[] = await new Promise((resolve) => {
  //   setTimeout(() => resolve(userReposMock as Repository[]), 500)
  // });
  if (data.length > 0) {
    const reposTmp: Repository[] = [];
    const reposForkTmp: Repository[] = [];
    for (const repo of data) {
      if (repo.fork) {
        reposForkTmp.push({
          ...repo,
          created_at: quasar.date.formatDate(repo.created_at, 'DD/MM/YYYY HH:mm'),
          updated_at: quasar.date.formatDate(repo.updated_at, 'DD/MM/YYYY HH:mm'),
        })
      } else {
        reposTmp.push({
          ...repo,
          created_at: quasar.date.formatDate(repo.created_at, 'DD/MM/YYYY HH:mm'),
          updated_at: quasar.date.formatDate(repo.updated_at, 'DD/MM/YYYY HH:mm'),
        })
      }
    }
    repos.value = reposTmp;
    reposFork.value = reposForkTmp;
  } else {
    repos.value = null;
    reposFork.value = null;
  }
  fetchingRepos.value = false;
}

async function fetchUser() {
  try {
    isLoading.value = true;
    tab.value = "user";
    const { data } = await axios.get(`https://api.github.com/users/${username.value}`);
    // const data = userMock;
    const month = quasar.date.formatDate(data.created_at, 'MMMM');
    const monthInLowerCase = month.toLowerCase();
    const year = quasar.date.formatDate(data.created_at, 'YYYY');
    user.value = {
      ...data,
      created_at: `${monthInLowerCase} de ${year}`,
    } as unknown as UserInfo;
    repos.value = null;
    reposFork.value = null;
    isLoading.value = false;
  } catch (e: any) {
    console.log(e);
    let message = 'Não foi possível buscar informações do usuário';
    if (e.response.status === 404) {
      message = 'Usuário não encontrado'; 
    }
    if (e.response.status === 403) {
      message = 'Atingiu o limite de requisições';
    }
    $quasar.notify({
      type: 'negative',
      message: message,
      position: 'top'
    })
    user.value = null;
    repos.value = null;
    reposFork.value = null;
    isLoading.value = false;
  }
}

async function openRepo(url: string) {
  window.open(url, '_blank');
}

const reposIsEmpty = computed(() => {
  const countRepos = user?.value?.public_repos || 0;
  if (countRepos === 0) return true;
  return false;
})

const reposForkIsEmpty = computed(() => {
  return (reposFork.value || []).length === 0;
});

watch(
  () => tab.value,
  (tabName: string) => {
    const alreadyExistRepos = repos.value ? repos.value.length > 0 : false;
    const condition = !!(tabName !== 'user' && !reposIsEmpty.value && !alreadyExistRepos);
    if (condition && user.value) {
      fetchRepos(user.value.login);
    }
  }
)
</script>

<template>
  <div
    class="q-pt-md q-mx-auto"
    style="height: 100vh; max-width: 1024px; padding-bottom: .9375rem"
  >
    <div class="flex justify-center">
      <div class="row q-pb-md full-width items-center" >
        <div class="col-10 q-pr-md">
          <QInput
            v-model="username"
            outlined
            dense
            @keypress.enter="fetchUser"
            label="Username"
          >
            <template #prepend>
              <QIcon name="search" />
            </template>
          </QInput>
        </div>

        <div class="col-2 full-height">
          <QBtn
            class="full-width full-height"
            color="primary"
            @click="fetchUser"
            :loading="isLoading"
          >
            Buscar
          </QBtn>
        </div>
      </div>
    </div>

    <template v-if="isLoading || (user || (repos && reposFork))">
      <QTabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <QTab name="user" label="Informações do usuário" />
        <QTab
          :disable="reposIsEmpty"
          name="repos"
          label="Repositórios"
        />
        <QTab
          :disable="reposForkIsEmpty"
          name="reposFork"
          label="Repositórios Forks"
        />
      </QTabs>

      <QTabPanels v-model="tab" animated style="height: calc(100% - 92px);">
        <QTabPanel v-if="user || isLoading" class="q-pa-none" name="user">
          <div class="flex justify-center q-pb-md">
            <QList
              bordered
              separator
              class="rounded-borders full-width"
              style="max-width: 1024px"
            >
              <QItemLabel
                class="q-pb-sm"
                header
              >
                Informações do usuário
              </QItemLabel>

              <div class="q-pa-md">
                <template v-if="isLoading">
                  <QSkeleton
                    class="q-mx-auto block"
                    type="QAvatar"
                    size="94px"
                  />

                  <QSkeleton class="q-mt-md q-mx-auto block" type="text" width="20%" height="32px" />

                  <QSkeleton class="q-mx-auto block" type="text" width="40%" />

                  <div class="flex items-center justify-center">
                    <QIcon name="place" class="q-mr-sm" />
                    <QSkeleton type="text" width="20%" />                  
                  </div>

                  <div class="flex items-center justify-center">
                    <QIcon name="calendar_month" class="q-mr-sm" />
                    <QSkeleton type="text" width="20%" />
                  </div>
                  
                  <div class="row flex justify-center q-mt-md">
                    <div class="col-2 flex items-center column">
                      <QSkeleton type="text" width="20%" />
                      <p
                        class="text-center text-subtitle2 text-weight-regular text-grey-7 q-mb-none"
                      >
                        Seguidores
                      </p>
                    </div>

                    <div class="col-2 flex items-center column">
                      <QSkeleton type="text" width="20%" />
                      <p
                        class="text-center text-subtitle2 text-weight-regular text-grey-7 q-mb-none"
                      >
                        Seguindo
                      </p>
                    </div>

                    <div
                      class="col-2 flex items-center column"
                    >
                      <QSkeleton type="text" width="20%" />
                      <p
                        class="text-center text-subtitle2 text-weight-regular text-grey-7 q-mb-none"
                      >
                        Repositórios Públicos
                      </p>
                    </div>
                  </div>
                </template>

                <template v-else-if="user">
                  <QAvatar class="q-mx-auto block" size="94px">
                    <img :src="user.avatar_url">
                  </QAvatar>

                  <h5 class="text-center q-mt-md q-mb-none text-weight-medium">{{ user.name }}</h5>

                  <p
                    v-if="user.bio"
                    class="text-center text-subtitle2 text-weight-regular text-grey-7 q-mb-none"
                  >
                    {{ user.bio }}
                  </p>

                  <p
                    v-if="user.location"
                    class="text-center text-subtitle2 text-weight-regular text-grey-7 q-mb-none"
                  >
                    <QIcon name="place" /> {{ user.location }}
                  </p>

                  <p
                    class="text-center text-subtitle2 text-weight-regular text-grey-7 q-mb-none"
                  >
                    <QIcon name="calendar_month" />
                    Entrou em {{ user.created_at }}
                  </p>
                  
                  <div class="row flex justify-center q-mt-md">
                    <div class="col-2">
                      <h5 class="text-center q-my-none text-weight-medium">{{ user.followers }}</h5>
                      <p
                        class="text-center text-subtitle2 text-weight-regular text-grey-7 q-mb-none"
                      >
                        Seguidores
                      </p>
                    </div>

                    <div class="col-2">
                      <h5 class="text-center q-my-none text-weight-medium">{{ user.following }}</h5>
                      <p
                        class="text-center text-subtitle2 text-weight-regular text-grey-7 q-mb-none"
                      >
                        Seguindo
                      </p>
                    </div>

                    <div
                      class="col-2"
                    >
                      <h5 class="text-center q-my-none text-weight-medium">{{ user.public_repos }}</h5>
                      <p
                        class="text-center text-subtitle2 text-weight-regular text-grey-7 q-mb-none"
                      >
                        Repositórios Públicos
                      </p>
                    </div>
                  </div>
                </template>
              </div>
            </QList>
          </div>
        </QTabPanel>

        <QTabPanel
          :disable="reposIsEmpty"
          class="q-pa-none"
          name="repos"
        >
          <div class="flex justify-center full-height">
            <QList
              bordered
              class="rounded-borders full-width"
              style="max-width: 1024px"
            >
              <QItemLabel class="q-pb-sm" header>Repositórios Github ({{ (repos || []).length }})</QItemLabel>

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
                    v-for="(repo, index) in repos"
                    :key="index"
                  >
                    <QItem
                      clickable
                      v-ripple
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
        </QTabPanel>

        <QTabPanel
          :disable="reposForkIsEmpty"
          class="q-pa-none"
          name="reposFork"
        >
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
                        v-ripple
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
        </QTabPanel>
      </QTabPanels>
    </template>

    <template v-else>
      <div
        class="text-center flex items-center justify-center column q-mx-auto"
        style="width: 45%; height: calc(100% - 56px)"
      >
        <div class="q-mx-auto" style="width: 240px">
          <PeopleSearch />
        </div>
        <h4 class="q-mb-sm text-weight-bold">Busque informações do seu Github</h4>
        <p class="text-grey-7">Digite no input acima o seu username que é utilizado no Github para buscar informações</p>
      </div>
    </template>
  </div>
</template>

