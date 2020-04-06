<template>
  <div id="app">
    <Tasks/>
    <Posts v-if="0"/>
  </div>
</template>

<script>

import ruMessages from "devextreme/localization/messages/ru.json";
import { locale, loadMessages } from "devextreme/localization";

import Posts from './components/Posts.vue'
import Tasks from './components/Tasks.vue'

export default {
  name: 'App',
  components: {
      Posts, Tasks
  },
  created() {
        loadMessages(ruMessages);
        locale(navigator.language);
    }
}
</script>

<style>

</style>
