<template>
<v-container class="login">
  <v-icon  id="login-icon" icon="mdi-login"/>
  <v-form>
    <v-text-field label="Username"></v-text-field>
    <v-text-field type="password" label="Password"></v-text-field>
    <v-btn @click="login">Log In</v-btn>
  </v-form>
</v-container>
</template>

<script setup>
import {inject} from "vue";

const axios = inject('axios');

async function login(){
    axios.get("/home/login")
      .then(response => {
        console.log(response)
      })

}
</script>

<style scoped>
#login-icon {
  margin-bottom: 1rem;
  font-size: 48px;

}
.login {
  text-align: center;
}
</style>
