<template>
  <v-container text-xs-center mt-5 pt-5>
    <!-- Signin Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Welcome Back!</h1>
      </v-flex>
    </v-layout>

    <!-- Signin Form -->
    <v-form @submit.prevent="handleSigninUser">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              prepend-icon="mdi-account"
              v-model="username"
              :counter="10"
              label="Username"
              required
            ></v-text-field>
          </v-col>

          <!--          <v-col cols="12" md="4">-->
          <!--            <v-text-field-->
          <!--              v-model="lastname"-->
          <!--              :rules="nameRules"-->
          <!--              :counter="10"-->
          <!--              label="Last name"-->
          <!--              required-->
          <!--            ></v-text-field>-->
          <!--          </v-col>-->

          <v-col cols="12" md="6">
            <v-text-field
              prepend-icon="mdi-lock-open"
              type="password"
              v-model="password"
              counter="12"
              label="Password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn color="accent" type="submit">Sign In</v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    handleSigninUser() {
      this.$store.dispatch("signinUser", {
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

<style scoped></style>
