<template>
  <div class="posts">
        <form @submit.prevent="submitCreatePost">
          <input type="text" :placeholder="'YourName'|localize" v-model="newPostAuthor"/>
          <input type="textArea" :placeholder="'MessageText'|localize" v-model="newPostText"/>
          <button type="submit">{{'SendMessage'|localize}}</button>
        </form>
        <hr/>
        <div class="post" v-for="(post) in getPosts" :key="post.id">
            <h3>{{post.author}}</h3>
            <p>{{post.text}}</p>
            <hr/>
        </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex"

export default {
  name: 'Posts',
  computed: {
    ...mapGetters(["getPosts"]),
  },
  data() {
      return {
          newPostAuthor: "",
          newPostText: "",
      }
  },
  methods: {
    ...mapActions(["loadPosts", "createPost"]),
    submitCreatePost(){
      this.createPost({ 
        author: this.newPostAuthor, 
        text: this.newPostText
      });
      this.newPostAuthor = "";
      this.newPostText = "";
    },
  },
  mounted() {
    this.loadPosts();
  }
}
</script>

<style scoped>

</style>