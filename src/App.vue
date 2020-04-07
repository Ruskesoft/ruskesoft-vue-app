<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import ruMessages from "devextreme/localization/messages/ru.json";
import { locale, loadMessages } from "devextreme/localization";

import MainLayout from "@/layouts/MainLayout"
import EmptyLayout from "@/layouts/EmptyLayout"

export default {
  name: 'App',
  computed: {
    layout() {
      return this.$route.meta.layout || "empty-layout";
    }
  },
  components: {
    MainLayout, EmptyLayout
  },
  created() {
        loadMessages(ruMessages);
        locale(navigator.language);
    }
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    border: 0;
    position: relative;
    font-family: Roboto,RobotoFallback,"Noto Kufi Arabic",Helvetica,Arial,sans-serif;
    font-size: 13px;
  }
</style>
