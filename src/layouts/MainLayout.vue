<template>
  <div>
    <div class="header">
      <Header/>
    </div>
    <div class="navbar">
      <Navbar/>
    </div>
    <div class="body">
      <div class="sidebar">
        <Sidebar/>
      </div>
      <div class="page">
        <!-- <div class="page-title">
          <h2>{{pageTitle}}</h2>
        </div> -->
        <div class="page-content">
          <router-view/>
        </div>
      </div>
    </div>
    <div class="footer">
      <Footer/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header'
import Navbar from '@/components/common/Navbar'
import Sidebar from '@/components/common/Sidebar'
import Footer from '@/components/common/Footer'

export default {
    name: 'main-layout',
    components: {
        Header, Navbar, Sidebar, Footer
    },
    computed: {
        pageTitle() {
          return this.$route.meta.title
        }
    }
}
</script>

<style scoped>
    .header {
    }
    .navbar {
    }
    .body {
      display: flex;
      min-height: 500px;
    }
    .page {
      width: 100%;
      padding: 4px;
    }
    .page-title {
      text-align: center;
    }
    h2 {
      margin: 2px;
      padding: 5px;
      font-size: 18px;
      letter-spacing: 3px;
      word-spacing: 8px;
    }
</style>