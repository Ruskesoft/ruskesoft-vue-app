<template>
  <div class="header">
    <div class="header-app-menu">
      <DxMenu
        :data-source="dataSource"
        :hide-submenu-on-mouse-leave="true"
        orientation="horizontal"
        display-expr="meta.title"
        @item-click="itemClick"
      />
    </div>
    <div class="header-title">
      <h1>{{pageTitle}} - {{'AppTitle'|localize}}</h1>
    </div>
    <div class="header-user-menu">
      
    </div>
  </div>
</template>

<script>
import { DxMenu } from 'devextreme-vue';

export default {
    components: {
      DxMenu
    },
    computed: {
        pageTitle() {
          return this.$route.meta.title;
        }
    },
    data() {
      return {
        dataSource: [{
          icon: "menu",
          // meta: { title: this.$route.meta.title},
          items: this.$router.options.routes.filter(r => r.meta.showInMenu)
        }]
      }
    },
    methods: {
      itemClick(e) {
        if(e.itemData.path && e.itemData.path != this.$route.path) {
          // e.component.option("dataSource")[0].meta.title = e.itemData.meta.title;
          this.$router.push(e.itemData.path);
        }
      }
    }
  }
</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 3px 0;
  }
.header-app-menu {
  width: 10%;
  padding-left: 8px;
}
.header-title {
  text-align: center;
  width: 80%;
}
.header-user-menu {
  text-align: right;
  padding-right: 8px;
  width: 10%;
}
h1 {
  margin: 0;
  padding: 2px 0;
  font-size: 20px;
  letter-spacing: 3px;
  word-spacing: 6px;
  display: inline-block;
  color: #444;
}
</style>