<template>
  <v-container v-if="getPost" class="mt-3 justify-center">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card hover>
          <v-card-title>
            <h1>{{ getPost.title }}</h1>
            <v-btn large icon v-if="user"></v-btn>
            <v-icon large color="grey">mdi-heart</v-icon>

            <h3 class="ml-3 font-weight-thin">{{ getPost.likes }} LIKES</h3>
            <v-spacer></v-spacer>
            <v-icon @click="goToPreviousPage" color="info" large
              >mdi-arrow-left</v-icon
            >
          </v-card-title>
          <v-tooltip right>
            <span>Click to enlarge Image</span>
            <template v-slot:activator="{ on }">
              <v-img
                v-on="on"
                @click="toggleImageDialog"
                :src="getPost.imageUrl"
                id="post__image"
              ></v-img>
            </template>
          </v-tooltip>
          <v-dialog v-model="dialog">
            <v-img :src="getPost.imageUrl" height="80vh"></v-img>
          </v-dialog>

          <v-card-text>
            <span v-for="(category, index) in getPost.categories" :key="index">
              <v-chip class="mb-3" color="accent" text-color="white">{{
                category
              }}</v-chip>
            </span>
            <h3>{{ getPost.description }}</h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { GET_POST } from "@/queries";
import { mapGetters } from "vuex";

export default {
  name: "Post",
  props: ["postId"],
  data() {
    return {
      dialog: false
    };
  },
  apollo: {
    getPost: {
      query: GET_POST,
      variables() {
        return {
          postId: this.postId
        };
      }
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    goToPreviousPage() {
      this.$router.go(-1);
    },
    toggleImageDialog() {
      if (window.innerWidth > 500) {
        this.dialog = !this.dialog;
      }
    }
  }
};
</script>

<style scoped>
#post__image {
  height: 400px !important;
}
</style>
