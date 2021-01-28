<template>
  <v-app style="background: #E3E3E3">
    <!--    Side Navbar-->
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-toolbar color="accent" light flat>
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-3">VueShare</h1>
        </router-link>
      </v-toolbar>
      <v-divider></v-divider>
      <!--      Side Navbar Links-->
      <v-list style="cursor:pointer">
        <v-list-item
          ripple
          v-for="item in sideNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="user" @click="handleSignoutUser">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Signout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!--    Horizontal Navbar-->
    <v-app-bar qpp fixed color="primary" dark>
      <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>

      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer"
          >VueShare</router-link
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="searchTerm"
        @input="handleSearchPosts"
        flex
        prepend-icon="mdi-magnify"
        placeholder="Search Posts"
        color="accent"
        single-line
        hide-details
      ></v-text-field>

      <v-spacer></v-spacer>

      <!-- Horizontal Navbar Links -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          v-for="item in horizontalNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon class="hidden-sm-only" left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <!--        Profile Button-->
        <v-btn text to="/profile" v-if="user">
          <v-icon class="hidden-sm-only" left>mdi-account</v-icon>
          <v-badge
            right
            color="blue darken-2"
            :class="{ bounce: badgeAnimated }"
          >
            <span slot="badge" v-if="userFavorites">{{
              userFavorites.length
            }}</span>
            Profile
          </v-badge>
        </v-btn>

        <!--        Signout Button-->
        <v-btn text v-if="user" @click="handleSignoutUser">
          <v-icon class="hidden-sm-only" left>mdi-logout</v-icon>
          Signout
        </v-btn>
      </v-toolbar-items>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <main>
      <v-container class="mt-15">
        <transition name="fade">
          <router-view />
        </transition>

        <!--        Auth Snackbar-->
        <!--        <v-snackbar-->
        <!--          v-model="authSnackbar"-->
        <!--          color="success"-->
        <!--          :timeout="5000"-->
        <!--          bottom-->
        <!--          left-->
        <!--        >-->
        <!--          <v-icon class="mr-3">mdi-check-circle</v-icon>-->
        <!--          <h3>You are now signed in!</h3>-->
        <!--          <v-btn dark text @click="authSnackbar = false">close</v-btn>-->
        <!--        </v-snackbar>-->

        <v-snackbar
          v-model="authSnackbar"
          color="success"
          :timeout="snackTimeout"
        >
          <v-icon class="mr-3">mdi-check-circle</v-icon>

          {{ snackText }}

          <template v-slot:action="{ attrs }">
            <v-btn
              color="primary"
              snackText
              v-bind="attrs"
              @click="authSnackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>

        <v-snackbar
          v-if="authError"
          v-model="authErrorSnackbar"
          color="info"
          :timeout="snackTimeout"
        >
          <v-icon class="mr-3">mdi-cancel</v-icon>

          {{ authError.message }}

          <template v-slot:action="{}">
            <v-btn dark text to="/signin">
              Signin
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      searchTerm: "",
      sideNav: false,
      authSnackbar: false,
      authErrorSnackbar: false,
      snackText: "You are signed in",
      snackTimeout: 5000,
      badgeAnimated: false
    };
  },
  watch: {
    user(newValue, oldValue) {
      if (oldValue === null) {
        this.authSnackbar = true;
      }
    },
    authError(value) {
      if (value !== null) {
        this.authErrorSnackbar = true;
      }
    },
    userFavorites(value) {
      if (value) {
        this.badgeAnimated = true;
        setTimeout(() => (this.badgeAnimated = false), 1000);
      }
    }
  },
  computed: {
    ...mapGetters(["authError", "user", "userFavorites"]),
    horizontalNavItems() {
      let items = [
        { icon: "mdi-message-text", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In", link: "/signin" },
        { icon: "mdi-pencil", title: "Sign Up", link: "/signup" }
      ];
      if (this.user) {
        items = [{ icon: "mdi-message-text", title: "Posts", link: "/posts" }];
      }
      return items;
    },
    sideNavItems() {
      let items = [
        { icon: "mdi-message-text", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In", link: "/signin" },
        { icon: "mdi-pencil", title: "Sign Up", link: "/signup" }
      ];
      if (this.user) {
        items = [
          { icon: "mdi-message-text", title: "Posts", link: "/posts" },
          { icon: "mdi-star-circle", title: "Create Post", link: "/post/add" },
          { icon: "mdi-account", title: "Profile", link: "/profile" }
        ];
      }
      return items;
    }
  },
  methods: {
    handleSearchPosts() {
      this.$store.dispatch("searchPosts", {
        searchTerm: this.searchTerm
      });
    },
    handleSignoutUser() {
      this.$store.dispatch("signoutUser");
    },
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.5s;
}
.fade-enter-active {
  transition-delay: 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.bounce {
  animation: bounce 1s both;
}

@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  40%,
  43% {
    transform: translate3d(0, -20px, 0);
  }
  70% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}
</style>
