<template>
  <v-container>
    <v-form v-if="!registered">
      <v-text-field v-model="regData.firstName" :error-messages="errorFirstName()" @input="firstNameChange" label="First name"></v-text-field>
      <v-text-field v-model="regData.lastName" :error-messages="errorLastName()" @input="lastNameChange" label="Last Name"></v-text-field>
      <v-text-field v-model="regData.email" :error-messages="errorEmail()" append-inner-icon="mdi-email" type="email" @input="emailChange" label="Email"></v-text-field>
      <v-text-field v-model="regData.birthdate" :error-messages="errorBirthdate()" type="date" pattern="dd-mm-yyyy" @input="dateChange" label="Birth date"></v-text-field>
      <v-text-field v-model="regData.username" :error-messages="errorUsername()" append-inner-icon="mdi-account" @input="usernameChange" type="username" label="Username"></v-text-field>
      <v-text-field v-model="regData.password" :error-messages="errorPassword()" append-inner-icon="mdi-lock-outline" @input="passwordChange" type="password" label="Password"/>
      <v-text-field v-model="regData.repeatedPassword" :error-messages="errorConfirmPassword()" append-inner-icon="mdi-lock-alert-outline" @input="confirmPasswordChange" type="password" label="Repeat Password"/>
      <v-btn @click="register">Register</v-btn>
    </v-form>
    <v-card v-else>
      <v-card-text>Registered</v-card-text>
    <v-btn to="/login">Log in</v-btn>
    </v-card>
  </v-container>
</template>
<script setup>

import {inject, computed, reactive, ref} from 'vue';
import {useVuelidate} from '@vuelidate/core'
import {required, email, minLength, sameAs, helpers} from '@vuelidate/validators'

const axios = inject('axios');
const registered = ref(false);
const token = ref('');

const passwordValidation = (value) => {
  let number = false;
  for (let i = 1; i < 10; i++) {
    if (value.includes(i)){
      number = true
      break
    }
  }
  return (value.includes("!") || value.includes("?") || value.includes("#") || value.includes("+")) && number
}
const rules = computed(()=> {
  return {
    firstName: {required, minlength: minLength(3)},
    lastName:{required, minlength: minLength(3)},
    email:{required, email},
    birthdate: {required},
    username:{required, minlength: minLength(6)},
    password:{required,minlength: minLength(3), passwordValidation: helpers.withMessage("Must contain ! or ? or # or + and a number!", passwordValidation)},
    repeatedPassword:{required, minlength: minLength(3), sameAs: sameAs(regData.password)},
  }
});

const regData = reactive({
  firstName: '',
  lastName:'',
  email:'',
  birthdate: '',
  username:'',
  password:'',
  repeatedPassword:'',
});

const $v = useVuelidate(rules, regData)
async function register(){
  const valid = await $v.value.$validate()
  if (valid){
    registered.value = true
    axios.post("/home/register", regData)
      .then(response => {
        token.value = response.data.token
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.value;
        localStorage.setItem("token", token.value);
    })
  }

}
function emailChange(){
  $v.value.email.$touch()
}
function firstNameChange(){
  $v.value.firstName.$touch()
}
function lastNameChange(){
  $v.value.lastName.$touch()
}
function dateChange(){
  $v.value.birthdate.$touch()
}
function usernameChange(){
  $v.value.username.$touch()
}
function passwordChange(){
  $v.value.password.$touch()
}
function confirmPasswordChange(){
  $v.value.repeatedPassword.$touch()
}

function errorEmail() {
  if ($v.value.email.$dirty) {
  $v.value.email.$validate()
  if ($v.value.email.$errors.length > 0) {
    return [$v.value.email.$errors[0].$message]
  }
}
  return []
}

function errorFirstName() {
  if ($v.value.firstName.$dirty) {
    $v.value.firstName.$validate()
    if ($v.value.firstName.$errors.length > 0) {
      return [$v.value.firstName.$errors[0].$message]
    }
  }
  return []
}

function errorLastName() {
  if ($v.value.lastName.$dirty) {
    $v.value.lastName.$validate()
    if ($v.value.lastName.$errors.length > 0) {
      return [$v.value.lastName.$errors[0].$message]
    }
  }
  return []
}

function errorBirthdate() {
  if ($v.value.birthdate.$dirty) {
    $v.value.birthdate.$validate()
    if ($v.value.birthdate.$errors.length > 0) {
      return [$v.value.birthdate.$errors[0].$message]
    }
  }
  return []
}

function errorUsername() {
  if ($v.value.username.$dirty) {
    $v.value.username.$validate()
    if ($v.value.username.$errors.length > 0) {
      return [$v.value.username.$errors[0].$message]
    }
  }
  return []
}
function errorPassword() {
  if ($v.value.password.$dirty) {
    $v.value.password.$validate()
    if ($v.value.password.$errors.length > 0) {
      return [$v.value.password.$errors[0].$message]
    }
  }
  return []
}
function errorConfirmPassword() {
  if ($v.value.repeatedPassword.$dirty) {
    $v.value.repeatedPassword.$validate()
    if ($v.value.repeatedPassword.$errors.length > 0) {
      return [$v.value.repeatedPassword.$errors[0].$message]
    }
  }
  return []
}




</script>

<style scoped>

</style>
