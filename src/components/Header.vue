<script setup lang="ts">
import { ref, inject } from "vue";
import UserGateway, { RateLimit } from "../gateways/UserGateway";

type Props = {
  rateLimit: RateLimit;
}

const userGateway = inject("userGateway") as UserGateway;

defineProps<Props>();
const emit = defineEmits(["handleLoading", "handleUser", "changeTab", 'update:rateLimit']);

const username = ref("");
const isLoading = ref(false);

async function fetchUser() {
  try {
    emit("handleLoading", true);
    emit("changeTab", "user");
    const response = await userGateway.findByUsername(username.value);
    emit("handleUser", response.data);
    emit("handleLoading");
    emit('update:rateLimit', response.rateLimit);
  } catch (e: any) {
    console.log(e);
    emit("handleUser", null);
    emit("handleLoading");
  }
}
</script>

<template>
  <header class="flex justify-center">
    <div class="flex column q-mb-md text-center">
      <span class="text-subtitle1">
        <span class="text-grey-7 text-weight-regular">Limite de requisições: </span>
        <span class="text-weight-bold">Utilizado {{ rateLimit.used }} de {{ rateLimit.limit }} requisições</span>
      </span>
      <span class="text-subtitle1 text-grey-7 text-weight-regular">
        Horário que vai resetar: <strong class="text-black">{{ rateLimit.time }}</strong>
      </span>
    </div>
    <div class="row q-pb-md full-width items-center">
      <div class="col-10 q-pr-md">
        <QInput
          v-model="username"
          outlined
          data-test="username"
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
          data-test="buttonFetch"
          @click="fetchUser"
          :loading="isLoading"
        >
          Buscar
        </QBtn>
      </div>
    </div>
  </header>
</template>
