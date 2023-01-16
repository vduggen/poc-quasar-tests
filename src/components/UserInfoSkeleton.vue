<template>
  <QSkeleton class="q-mx-auto block" type="QAvatar" size="94px" />

  <QSkeleton
    class="q-mt-md q-mx-auto block"
    type="text"
    width="20%"
    height="32px"
  />

  <QSkeleton class="q-mx-auto block" type="text" width="40%" />

  <div class="flex flex-center">
    <QIcon name="place" class="q-mr-sm" />
    <QSkeleton type="text" width="20%" />
  </div>

  <div class="flex flex-center">
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

    <div class="col-2 flex items-center column">
      <QSkeleton type="text" width="20%" />
      <p
        class="text-center text-subtitle2 text-weight-regular text-grey-7 q-mb-none"
      >
        Repositórios Públicos
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
