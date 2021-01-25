<template>
  <v-form ref="form" v-model="isFormValid" lazy-validation>
    <v-card color="secondary" dark width="500" class="mx-auto mt-15">
      <v-card-title>
        <h1 class="display-1">Sign In</h1>
      </v-card-title>

      <!--    Error Alert-->
      <v-layout v-if="error" row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <form-alert :message="error.message"></form-alert>
        </v-flex>
      </v-layout>

      <v-card-text>
        <!--        <v-form>-->
        <v-text-field
          :rules="usernameRules"
          label="Username"
          v-model="username"
          counter="20"
          prepend-icon="mdi-account-circle"
          required
        />
        <v-text-field
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          v-model="password"
          counter
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          required
        />
        <!--        </v-form>-->
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          :disabled="!isFormValid"
          :loading="loading"
          @click="handleSigninUser"
          block
          color="primary"
        >
          <span slot="loader" class="custom-loader">
            <v-icon light>mdi-cloud-upload</v-icon>
          </span>

          Sign In</v-btn
        >
        <!--      <v-spacer></v-spacer>-->
        <!--      <v-btn color="info">Login</v-btn>-->
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Signin",
  data() {
    return {
      isFormValid: true,
      username: "",
      password: "",
      showPassword: false,
      usernameRules: [
        // Check if username in input
        username => !!username || "Username is required",
        // Make sure not less than 5 chars
        username =>
          username.length <= 10 || "Username must be at least 10 Chars"
      ],
      passwordRules: [
        password => !!password || "Password is required",
        password => password.length >= 7 || "Password must be at least 7 Chars"
      ]
    };
  },
  computed: {
    ...mapGetters(["loading", "user", "error"])
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
      if (this.$refs.form.validate())
        this.$store.dispatch("signinUser", {
          username: this.username,
          password: this.password
        });
    }
  }
};
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
