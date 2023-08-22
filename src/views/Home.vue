<template>
  <v-parallax
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <list-of-accounts id="reg-form"/>
  </v-parallax>
</template>

<script setup>
import {inject, onMounted, ref} from 'vue';

import ListOfAccounts from "@/components/ListOfAccunts"
const axios = inject('axios')
const data = ref([]);
function getData() {
  axios.get('api/accounts')
    .then(response => data.value = response.data)
}
onMounted(getData)
</script>

<style>
td {
  text-align: center;
}
</style>
