<template>
  <div>
    <LoadPanel v-if="loading"/>
    <div v-else>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    }
  },
  async mounted() {
    this.loading = false;
  }
}
</script>

<style>

</style>