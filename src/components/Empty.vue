<template>
    <div
        class="text-center flex flex-center column q-mx-auto"
        data-test="emptyState"
        style="height: calc(100% - 128px)"
    >
        <div class="q-mx-auto" style="width: 240px">
          <PeopleSearch />
        </div>
        <h4 class="q-mb-sm text-weight-bold">Busque informações do seu Github</h4>
        <p class="text-grey-7">Digite no input acima o seu username que é utilizado no Github para buscar informações</p>
    </div>
</template>

<script setup lang="ts">
import PeopleSearch from '../assets/people_search.vue';
</script>

<style scoped>

</style>