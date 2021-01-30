<template>
  <v-container class="text-xs-center">
    <!-- User Details Card -->
    <v-flex sm6 offset-sm3>
      <v-card class="white--text" color="secondary">
        <v-layout>
          <v-flex xs5>
            <v-img
              class="mt-3"
              height="125px"
              contain
              :src="user.avatar"
            ></v-img>
          </v-flex>
          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ user.username }}</div>
                <small
                  >Joined:
                  {{ format(new Date(user.joinDate), "dd. MMM. yyyy") }}</small
                >
                <div class="hidden-xs-only font-weight-thin">
                  {{ user.favorites.length }} Favorites
                </div>
                <div class="hidden-xs-only font-weight-thin">
                  {{ userPosts.length }} Posts Added
                </div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>

    <!-- Posts Favorited by User -->
    <v-container v-if="!userFavorites.length">
      <v-layout row wrap>
        <v-flex xs12>
          <h2>You have no favorites currently. Go and add some!</h2>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container class="mt-3" v-else>
      <v-flex xs12>
        <h2 class="font-weight-light">
          Favorited
          <span class="font-weight-regular">{{ userFavorites.length }}</span>
        </h2>
      </v-flex>
      <v-layout row wrap>
        <v-flex xs12 sm6 v-for="favorite in userFavorites" :key="favorite._id">
          <v-card class="mt-3 ml-1 mr-2" hover>
            <v-img height="30vh" :src="favorite.imageUrl"></v-img>
            <v-card-text>{{ favorite.title }}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- Posts Created By user -->
    <v-container v-if="!userPosts.length">
      <v-layout row wrap>
        <v-flex xs12>
          <h2>You have no posts currently. Go and add some!</h2>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container class="mt-3" v-else>
      <v-flex xs12>
        <h2 class="font-weight-light">
          Your Posts
          <span class="font-weight-regular">({{ userPosts.length }})</span>
        </h2>
      </v-flex>
      <v-layout row wrap>
        <v-flex xs12 sm6 v-for="post in userPosts" :key="post._id">
          <v-card class="mt-3 ml-1 mr-2" hover>
            <v-btn color="info" floating class="mt-1 mb-1 ml-4" fab small dark>
              <v-icon> mdi-pencil</v-icon>
            </v-btn>
            <v-btn color="error" class="mt-1 mb-1 ml-2" floating fab small dark>
              <v-icon>mdi-delete</v-icon>
            </v-btn>

            <v-img height="30vh" :src="post.imageUrl"></v-img>
            <v-card-text>{{ post.title }}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { format } from "date-fns";

export default {
  name: "Profile",
  data() {
    return {
      format
    };
  },
  computed: {
    ...mapGetters(["user", "userFavorites", "userPosts"])
  },
  created() {
    this.handleGetUserPosts();
  },
  methods: {
    handleGetUserPosts() {
      this.$store.dispatch("getUserPosts", {
        userId: this.user._id
      });
    }
  }
};
</script>
