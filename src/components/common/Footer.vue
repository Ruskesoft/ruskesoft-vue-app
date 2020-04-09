<template>
  <div class="footer">
      <div class="copyright-title">
        {{'AppCopyrightTitle'|localize}}
      </div>
      <div class="copyright-description">
        {{'AppCopyrightDescription'|localize}}
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .footer {
    text-align: center;
    background-color:  #444;
    padding: 10px 0 80px 0;
  }
  .copyright-title {
    font-size: 12px;
    color: #fff;
    padding: 2px;
  }
  .copyright-description {
    font-size: 11px;
    color: #fff;
    padding: 2px;
  }
</style>