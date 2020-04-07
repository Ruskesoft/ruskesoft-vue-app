<template>
  <div class="sidebar">
      <DxMenu
        :data-source="dataSource"
        orientation="vertical"
        display-expr="meta.title"
        @item-click="itemClick"
      />
  </div>
</template>

<script>
import { DxMenu } from 'devextreme-vue';

export default {
  components: {
    DxMenu
  },
  data() {
    return {
      dataSource: this.$router.options.routes.filter(r => r.meta.showInMenu)
    }
  },
  methods: {
    itemClick(e) {
      if(e.itemData.path && e.itemData.path != this.$route.path) {
        this.$router.push(e.itemData.path)
      }
    }
  }
}
</script>

<style scoped>
  .sidebar {
    margin-top: 0px;
    margin-right: 10px;
    padding-right: 8px;
  }
</style>