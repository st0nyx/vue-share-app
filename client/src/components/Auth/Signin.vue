<template>
  <v-card color="secondary" dark width="500" class="mx-auto mt-15">
    <v-card-title>
      <h1 class="display-1">Sign In</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Username"
          v-model="username"
          counter="20"
          prepend-icon="mdi-account-circle"
        />
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          v-model="password"
          counter
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="handleSigninUser" block color="primary">Sign In</v-btn>
      <!--      <v-spacer></v-spacer>-->
      <!--      <v-btn color="info">Login</v-btn>-->
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Signin",
  data() {
    return {
      username: "",
      password: "",
      showPassword: false
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  watch: {
    user(value) {
      // if user value changes redirect to home
      if (value) {
        this.$router.push("/");
      }
    }
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
