<template>
  <QTabs
    v-model="value"
    dense
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
    align="justify"
    data-test="tabs"
    narrow-indicator
  >
    <QTab
      name="user"
      label="Informações do usuário"
    />
    <QTab
      :disable="!user.existRepositories()"
      name="repos"
      data-test="tabRepos"
      label="Repositórios"
    />
    <QTab
      :disable="!user.existRepositories()"
      name="reposFork"
      data-test="tabReposFork"
      label="Repositórios Forks"
    />
  </QTabs>

  <QTabPanels
    v-model="value"
    animated
    style="height: calc(100% - 160px)"
  >
    <QTabPanel
      class="q-pa-none"
      name="user"
    >
      <UserInfoTab
        :user-info="user.userInfo"
        :is-loading="isLoading"
      />
    </QTabPanel>

    <QTabPanel
      :disable="!user.existRepositories()"
      class="q-pa-none"
      name="repos"
    >
      <RepositoriesTab
        v-model:currentPage="currentPage"
        :data="data.repos"
        :loading="fetchingRepos"
        :total-pages="totalPages"
        :count="data.getCountRepos()"
      />
    </QTabPanel>

    <QTabPanel
      :disable="!user.existRepositories()"
      class="q-pa-none"
      name="reposFork"
    >
      <RepositoriesTab
        :data="data.forks"
        :loading="fetchingRepos"
        :count="data.getCountForks()"
        title="Forks"
        :view-pagination="false" />
    </QTabPanel>
  </QTabPanels>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from "vue";
import UserInfoTab from "./UserInfoTab.vue";
import RepositoriesTab from "./RepositoriesTab.vue";
import User from "../entities/User";
import UserGateway, { RateLimit } from "../gateways/UserGateway";
import RepositoriesList from "../entities/RepositoriesList";

type Props = {
  user: User;
  isLoading: boolean;
  tab: string;
  rateLimit: RateLimit;
};
const props = defineProps<Props>();
const emit = defineEmits(['update:tab', 'update:rateLimit']);

const value = computed({
  get() {
    return props.tab
  },
  set(value) {
    emit('update:tab', value)
  }
})

const getLogin = computed(() => props?.user?.userInfo?.login || null);

const currentPage = ref(1);
const totalPages = ref(0);
let data = ref(new RepositoriesList());
const fetchingRepos = ref(false);
const alreadyFetched = ref(false);

const userGateway = inject("userGateway") as UserGateway;

async function fetchRepos() {
  fetchingRepos.value = true;
  const response = await userGateway.getReposByUsername(
    props.user.userInfo.login,
    currentPage.value
  );
  if (totalPages.value === 0) {
    const result = getTotalPages(response.headers.link);
    totalPages.value = result;
    data.value.setRepositories(response.data);
    alreadyFetched.value = true;
  } else {
    data.value.setRepos(response.data);
  }
  emit('update:rateLimit', response.rateLimit);
  fetchingRepos.value = false;
}

function getTotalPages(urlPagination: string): number {
  const patternNext = /(?<=<)([\S]*)(?=>; rel="Last")/i;
  const result = urlPagination.match(patternNext);
  if (result) {
    const patternPage = /(.+page=)([0-9]+)/;
    return +result[0].replace(patternPage, "$2");
  }
  return 0;
}

watch(
  () => currentPage.value,
  () => fetchRepos()
)

watch(
  () => getLogin.value,
  () => {
    alreadyFetched.value = false;
    totalPages.value = 0;
  }
)

watch(
  () => props.tab,
  (tabName: string) => {
    if (tabName !== 'user' && !alreadyFetched.value) {
      fetchRepos();
    }
  }
)
</script>

<style scoped></style>
