<template>
  <div class="header">
    <h1>Система контроля поручений - {{pageTitle}}</h1>
  </div>
</template>

<script>
export default {
    computed: {
        pageTitle() {
          return this.$route.meta.title
        }
    }
}
</script>

<style scoped>
.header {
    text-align: center;
    /* background-color: rgb(52, 185, 194); */
    /* border-bottom: 2px solid rgb(250, 151, 2); */
    /* color: rgb(255, 255, 255); */
    padding: 2px 0 8px 0;
    /* box-shadow: 0 0 2px #999; */
  }
  h1 {
    margin: 2px;
    padding: 2px;
    font-size: 20px;
    letter-spacing: 3px;
    word-spacing: 10px;
  }
</style>