<template>
  <QAvatar class="q-mx-auto block" size="94px">
    <img :src="userInfo.avatar_url" />
  </QAvatar>

  <h5 class="text-center q-mt-md q-mb-none text-weight-medium">
    {{ userInfo.name }}
  </h5>

  <p
    v-if="userInfo.bio"
    class="text-center text-subtitle2 text-weight-regular text-grey-7 q-mb-none"
  >
    {{ userInfo.bio }}
  </p>

  <p
    v-if="userInfo.location"
    class="text-center text-subtitle2 text-weight-regular text-grey-7 q-mb-none"
  >
    <QIcon name="place" /> {{ userInfo.location }}
  </p>

  <p
    class="text-center text-subtitle2 text-weight-regular text-grey-7 q-mb-none"
  >
    <QIcon name="calendar_month" />
    <span data-test="createdAt">Entrou em {{ userInfo.created_at }}</span>
  </p>

  <div class="row flex justify-center q-mt-md">
    <div class="col-2">
      <h5 class="text-center q-my-none text-weight-medium">
        {{ userInfo.followers }}
      </h5>
      <p
        class="text-center text-subtitle2 text-weight-regular text-grey-7 q-mb-none"
      >
        Seguidores
      </p>
    </div>

    <div class="col-2">
      <h5 class="text-center q-my-none text-weight-medium">
        {{ userInfo.following }}
      </h5>
      <p
        class="text-center text-subtitle2 text-weight-regular text-grey-7 q-mb-none"
      >
        Seguindo
      </p>
    </div>

    <div class="col-2">
      <h5 class="text-center q-my-none text-weight-medium">
        {{ userInfo.public_repos }}
      </h5>
      <p
        class="text-center text-subtitle2 text-weight-regular text-grey-7 q-mb-none"
      >
        Repositórios Públicos
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserInfo from '../entities/UserInfo';

type Props = {
    userInfo: UserInfo
}

withDefaults(defineProps<Props>(), {
    userInfo: () => new UserInfo()
})
</script>

<style scoped></style>
