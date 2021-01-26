<template>
  <v-card color="secondary" dark width="500" class="mx-auto mt-15">
    <v-card-title>
      <h1 class="display-1">Add Post</h1>
    </v-card-title>

    <!--    Error Alert-->
    <!--    <v-layout v-if="error" row wrap>-->
    <!--      <v-flex xs12 sm6 offset-sm3>-->
    <!--        <form-alert :message="error.message"></form-alert>-->
    <!--      </v-flex>-->
    <!--    </v-layout>-->
    <v-form
      ref="form"
      v-model="isFormValid"
      lazy-validation
      @submit.prevent="handleAddPost"
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
          :items="['Art', 'Education', 'Travel', 'Photography', 'Technology']"
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
        <v-btn
          :loading="loading"
          :disabled="!isFormValid || loading"
          color="primary"
          block
          type="submit"
        >
          <span slot="loader" class="custom-loader">
            <v-icon light>mdi-cached</v-icon>
          </span>
          Submit</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AddPost",
  data() {
    return {
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
    ...mapGetters(["loading", "user"])
  },
  methods: {
    handleAddPost() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("addPost", {
          title: this.title,
          imageUrl: this.imageUrl,
          categories: this.categories,
          description: this.description,
          creatorId: this.user._id
        });
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped></style>
