<template>
  <div>
    <nuxt />
    <footer-prismic/>
  </div>
</template>

<script>
import FooterPrismic from '~/components/FooterPrismic.vue'

export default {
  components: {
    FooterPrismic
  },
  head () {
    return {
      title: 'Prismic Nuxt.js Multi Page Website',
    }
  }
}
</script>

<style lang="scss">
  body, html {
    margin: 0;
    padding: 0;
  }
</style>