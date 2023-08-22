<template>
<v-container class="login">
  <v-icon  id="login-icon" icon="mdi-login"/>
  <v-form>
    <v-text-field label="Username"></v-text-field>
    <v-text-field type="password" label="Password"></v-text-field>
    <v-btn>Log In</v-btn>
  </v-form>
</v-container>
</template>

<script setup>

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
