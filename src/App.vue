<script setup lang="ts">
import { ref, reactive } from 'vue';
import Header from './components/Header.vue';
import Empty from './components/Empty.vue';
import Tabs from './components/Tabs.vue';
import User from './entities/User';
import UserInfo from './entities/UserInfo';
import { RateLimit } from './gateways/UserGateway';

const isLoading = ref(false);
const tab = ref('user');
const rateLimit = ref<RateLimit>({
  used: 0,
  limit: 0,
  time: '',
});

const data = reactive({
  user: new User()
})

function handleLoading(value: boolean = false) {
  isLoading.value = value;
}

function changeTab(tabName: string) {
  tab.value = tabName;
}

function handleUser(userInfo: UserInfo) {
  data.user.setUserInfo(userInfo);
}
</script>

<template>
  <div class="q-pt-md q-mx-auto home">
    <Header
      @handle-user="handleUser"
      @handle-loading="handleLoading"
      @change-tab="changeTab"
      v-model:rateLimit="rateLimit"
    />

    <template v-if="isLoading || data.user.userInfo">
      <Tabs
        v-model:tab="tab"
        v-model:rateLimit="rateLimit"
        :user="data.user"
        :is-loading="isLoading"
      />
    </template>

    <template v-else>
      <Empty />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100vh;
  max-width: 1024px;
  padding-bottom: .9375rem
}
</style>