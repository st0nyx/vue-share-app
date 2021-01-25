<template>
  <v-alert type="error" :value="true" transition="scale-transition" dismissible>
    <h4>{{ message }}</h4>
  </v-alert>
</template>

<script>
export default {
  props: ["message"]
};
</script>

<style scoped></style>
