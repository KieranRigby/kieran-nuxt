<template>
    <section class="homepage-banner">
      <!-- Template for page title. -->
      <div class="banner-content container">
        <h2 class="banner-title">
          {{ $prismic.richTextAsPlain(banner.title) }}
        </h2>
        <!-- Template for page tagline. -->
        <p class="banner-description">{{ $prismic.richTextAsPlain(banner.tagline) }}</p>

        <prismic-link class="banner-button" :field="banner.button_link">
          {{ $prismic.richTextAsPlain(banner.button_label) }}
        </prismic-link>

        <prismic-link class="banner-button" :field="banner.second_button_link">
          {{ $prismic.richTextAsPlain(banner.second_button_label) }}
        </prismic-link>

        <div class="case-study-feature">
          <img class="lion case-study-feature-img" src="../assets/img/lion.png" alt="">

          <div class="case-study-feature-text">
            <div class="tags">Website | SEO | PPC</div>
            <h5>Knowsley Safari</h5>
            <p>A truly wild experience for Knowsley Safari</p>
          </div>
        </div>

      </div>
    </section>
</template>

<script>
export default {
  props: ['banner'],
  name: 'homepage-banner',
}
</script>

<style lang="scss" scoped>
.homepage-banner {
  height: 100vh;
  width: 100%;
  margin: -70px 0 80px;
  padding: 10em 0 8em;
  background-position: center center;
  background-size: cover;
  color: #333;
  line-height: 1.75;
  overflow: hidden;
}

.banner-content {
  height: 100%;
}

.banner-title, .banner-description {
  width: 90%;
  max-width: 490px;
}

.banner-title {
  color: #333;
  font-size: 70px;
  font-weight: 900;
  line-height: 70px;
}

.banner-button {
  background: #333;
  border-radius: 7px;
  color: #484D52;
  font-size: 14px;
  font-weight: 700;
  padding: 15px 40px;
  
  &:hover {
    background: #c8c9cb;
  }
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
