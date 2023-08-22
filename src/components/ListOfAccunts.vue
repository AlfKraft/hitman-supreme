<template>
  <v-container>
    <v-table>
      <thead>
      <th>ID</th>
      <th>Username</th>
      <th>First name</th>
      <th>Last name</th>
      <th>Birthdate</th>
      <th>Locked</th>
      </thead>
      <tbody>
      <tr v-for="account in data" :key="account.id">
        <td>{{account.id}}</td>
        <td>{{account.username}}</td>
        <td>{{account.firstName}}</td>
        <td>{{account.lastName}}</td>
        <td>{{account.birthdate}}</td>
        <td>{{account.locked}}</td>
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import {inject, onMounted, ref} from 'vue';
const axios = inject('axios')
const data = ref([]);
function getData() {
  axios.get('api/accounts')
    .then(response => data.value = response.data)
}
onMounted(getData)
</script>

<style scoped>
td {
  text-align: center;
  border-left: 1px solid #c9c9c9;
  border-right: 1px solid #c9c9c9;
}
tr {
  margin: 1rem;
}

</style>
