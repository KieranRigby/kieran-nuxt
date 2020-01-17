<template>
    <section class="banner">
      <!-- Template for page title. -->
      <div class="banner-content container">
        <img class="lion case-study-feature" src="../assets/img/lion.png" alt="">
      </div>
    </section>
</template>

<script>
export default {
  props: ['banner'],
  name: 'contact-banner',
}
</script>

<style lang="scss" scoped>
.banner {
  height: 20vh;
  margin: -70px 0 80px;
  padding: 10em 0 8em;
  background-position: center center;
  background-size: cover;
  color: #ffffff;
  line-height: 1.75;
  text-align: center;
}



.banner-content {
  text-align: center;
}

@media (max-width: 767px) {
  .homepage-banner {
    margin: 0 0 40px;
    padding: 10em 0 6em;
  }

  .banner-title {
    font-size: 50px;
    line-height: 50px;
  }
}
</style>
