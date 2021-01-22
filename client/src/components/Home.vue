<template>
  <v-container>
    <h1>Home</h1>
    <ApolloQuery :query="getPostsQuery">
      <template
        slot-scope="{ result: { error, data, networkStatus }, isLoading }"
      >
        <div v-if="isLoading" class="loading apollo">Loading...</div>
        <div v-else-if="error" class="error apollo">Error! {{ error.message }}</div>
        <div v-else-if="isLoading">Network Status: {{ networkStatus }}</div>
        <ul v-else v-for="post in data.getPosts" :key="post._id">
          <li>{{ post.title }} {{ post.imageUrl }} {{ post.likes }}</li>
        </ul>
      </template>
    </ApolloQuery>
  </v-container>
</template>

<script>
import { gql } from "apollo-boost";

export default {
  name: "home",
  data() {
    return {
      getPostsQuery: gql`
        query {
          getPosts {
            _id
            title
            imageUrl
            description
            likes
          }
        }
      `
    };
  }
};
</script>
