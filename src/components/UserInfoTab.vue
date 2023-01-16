<template>
  <div
    data-test="wrapperUserInfo"
    class="flex justify-center q-pb-md"
  >
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
          <UserInfoSkeleton />
        </template>

        <template v-else-if="userInfo">
          <UserInfoComponent :user-info="userInfo" />
        </template>
      </div>
    </QList>
  </div>
</template>

<script setup lang="ts">
import UserInfo from '../entities/UserInfo';
import UserInfoComponent from './UserInfo.vue';
import UserInfoSkeleton from './UserInfoSkeleton.vue';

type Props = {
    userInfo: UserInfo;
    isLoading: boolean;
}

withDefaults(defineProps<Props>(), {
    isLoading: false
})
</script>

<style scoped></style>
