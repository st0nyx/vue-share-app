<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap v-if="infiniteScrollPosts">
      <v-flex
        xs12
        sm6
        v-for="post in infiniteScrollPosts.posts"
        :key="post._id"
      >
        <v-card hover>
          <v-img :src="post.imageUrl" height="30vh" lazy />

          <v-card-actions>
            <v-card-title primary>
              <div>
                <div class="headline">
                  {{ post.title }}
                </div>
                <small class="grey--text"
                  >{{ post.likes }} likes -
                  {{ post.messages.length }} comments</small
                >
              </div>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn @click="showPostCreator = !showPostCreator" icon>
              <v-icon>{{
                `mdi-chevron-${showPostCreator ? "up" : "down"}`
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text v-show="showPostCreator" class="grey lighten-4">
              <v-list-item>
                <v-avatar>
                  <v-list-item-avatar>
                    <img :src="post.createdBy.avatar" />
                  </v-list-item-avatar>
                </v-avatar>

                <v-list-item-content>
                  <v-list-item-title class="text--primary">{{
                    post.createdBy.username
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="font-weight-thin">
                    Added {{ post.createdDate }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">mdi-information</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- Fetch More Button -->
    <v-layout v-if="showMoreEnabled" column>
      <v-flex xs12>
        <v-layout justify-center row>
          <v-btn color="info" @click="showMorePosts">Fetch More</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { INFINITE_SCROLL_POSTS } from "@/queries";

const pageSize = 2;

export default {
  name: "Posts",
  data() {
    return {
      pageNum: 1,
      showMoreEnabled: true,
      showPostCreator: false
    };
  },
  apollo: {
    infiniteScrollPosts: {
      query: INFINITE_SCROLL_POSTS,
      variables: {
        pageNum: 1,
        pageSize
      }
    }
  },
  methods: {
    showMorePosts() {
      this.pageNum += 1;
      this.$apollo.queries.infiniteScrollPosts.fetchMore({
        variables: {
          pageNum: this.pageNum,
          pageSize
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          const newPosts = fetchMoreResult.infiniteScrollPosts.posts;
          const hasMore = fetchMoreResult.infiniteScrollPosts.hasMore;
          this.showMoreEnabled = hasMore;

          return {
            infiniteScrollPosts: {
              __typename: prevResult.infiniteScrollPosts.__typename,
              posts: [...prevResult.infiniteScrollPosts.posts, ...newPosts],
              hasMore
            }
          };
        }
      });
    }
  }
};
</script>

<style scoped></style>
