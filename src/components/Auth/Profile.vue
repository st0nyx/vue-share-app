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
            <v-btn
              class="myicon"
              @click="loadPost(post)"
              color="info"
              floating
              fab
              small
              dark
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn
              @click="handleDeleteUserPost(post)"
              color="error"
              class="mt-1 mb-1 ml-2"
              floating
              fab
              small
              dark
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>

            <v-img height="30vh" :src="post.imageUrl"></v-img>
            <v-card-text>{{ post.title }}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog xs12 sm6 offset-sm3 persistent v-model="editPostDialog">
      <v-card>
        <v-card-title class="headline grey lighten-2">Update Post</v-card-title>
        <v-form
          ref="form"
          v-model="isFormValid"
          lazy-validation
          @submit.prevent="handleUpdateUserPost"
        >
          <v-card-text>
            <!--        <v-form>-->
            <v-text-field
              :rules="titleRules"
              label="PostTitle"
              v-model="title"
              counter="20"
              prepend-icon="mdi-format-title"
              required
            />
            <v-text-field
              :rules="imageRules"
              label="Image URL"
              v-model="imageUrl"
              counter="20"
              prepend-icon="mdi-web"
              required
            />
            <!-- Image Preview -->
            <v-layout v-if="imageUrl" row>
              <v-flex xs12>
                <img :src="imageUrl" height="300px" />
              </v-flex>
            </v-layout>

            <v-select
              :rules="categoriesRules"
              v-model="categories"
              :items="[
                'Art',
                'Education',
                'Food',
                'Furniture',
                'Travel',
                'Photography',
                'Technology'
              ]"
              multiple
              label="Categories"
              prepend-icon="mdi-shape"
              required
            ></v-select>
            <v-textarea
              :rules="descRules"
              label="Description"
              v-model="description"
              counter="200"
              prepend-icon="mdi-details"
              required
            />
            <!--        </v-form>-->
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="submit" class="success--text" text>Update</v-btn>
            <v-btn class="error--text" text @click="editPostDialog = false"
              >Cancel</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { format } from "date-fns";

export default {
  name: "Profile",
  data() {
    return {
      format,
      editPostDialog: false,
      isFormValid: true,
      title: "",
      imageUrl: "",
      categories: [],
      description: "",
      titleRules: [
        title => !!title || "Title is required",
        title => title.length < 20 || "Title must have less than 20 characters"
      ],
      imageRules: [image => !!image || "Image is required"],
      categoriesRules: [
        categories =>
          categories.length >= 1 || "At least one category is required"
      ],
      descRules: [
        desc => !!desc || "Description is required",
        desc =>
          desc.length < 200 || "Description must have less than 200 characters"
      ]
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
    },
    handleUpdateUserPost() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("updateUserPost", {
          postId: this.postId,
          userId: this.user._id,
          title: this.title,
          imageUrl: this.imageUrl,
          categories: this.categories,
          description: this.description
        });
        this.editPostDialog = false;
      }
    },
    handleDeleteUserPost(post) {
      this.loadPost(post, false);
      const deletePost = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (deletePost) {
        this.$store.dispatch("deleteUserPost", {
          postId: this.postId
        });
      }
    },
    loadPost(
      { _id, title, imageUrl, categories, description },
      editPostDialog = true
    ) {
      this.editPostDialog = editPostDialog;
      this.postId = _id;
      this.title = title;
      this.imageUrl = imageUrl;
      this.categories = categories;
      this.description = description;
    }
  }
};
</script>

<style scoped>
.myicon {
  margin-left: 10px;
}
</style>
