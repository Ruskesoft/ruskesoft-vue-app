<template>
  <div>
    <div class="header">
      <Header/>
    </div>
    <div class="content">
      <router-view/>
    </div>
    <div class="footer">
      <Footer/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export default {
    name: 'main-layout',
    components: {
        Header, Footer
    },
}
</script>

<style scoped>
    .header {
      background-color: rgba(255, 255, 255, 0.6);
      /* box-shadow: 0 0 4px #555; */
      position: fixed;
      z-index: 100;
      top:0;
      left:0;
      width: 100%;
    }
    .content {
      margin-top: 40px;
      display: flex;
      min-height: 450px;
      padding: 4px 6px 12px 6px;
    }
</style>