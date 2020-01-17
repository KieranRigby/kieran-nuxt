<template>
  <section class="homepage">
    <header-prismic :menuLinks="menuLinks"/>
    <!-- Vue tag to add header component -->
    <!-- Button to edit document in dashboard -->
    <prismic-edit-button :documentId="documentId"/>
    <!-- Banner component -->
    <homepage-banner :banner="banner"/>
    <!-- Slices block component -->
    <slices-block :slices="slices"/>
  </section>
</template>

<script>
import Prismic from "prismic-javascript"
import PrismicConfig from "~/prismic.config.js"
// Imports for all components
import HeaderPrismic from '~/components/HeaderPrismic.vue'
import HomepageBanner from '~/components/HomepageBanner.vue'
import SlicesBlock from '~/components/SlicesBlock.vue'

export default {
  transition: 'page', // set our transition with nuxt.js
  name: 'Home',
  components: {
    HeaderPrismic,
    HomepageBanner,
    SlicesBlock,
  },
  head () {
    return {
      title: 'Prismic Nuxt.js Multi Page Website',
    }
  },
  async asyncData({context, error, req}) {
    try{
      // Fetching the API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, {req})

      // Query to get the home page content
      let document = {}
      const result = await api.getSingle('homepage')
      document = result.data

      // Setting the banner as a variable
      let banner = document.homepage_banner[0]

      // Query to get the menu content
      let menuContent = {}
      const menu = await api.getSingle('menu')
      menuContent = menu.data
      
      // Load the edit button
      if (process.client) window.prismic.setupEditButton()

      return {
        // Page content
        document,
        documentId: result.id,
        banner,
        // Set slices as variable
        slices: document.page_content,

        // Menu
        menuContent,
        menuLinks: menuContent.menu_links
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style lang="scss">

  .page-enter-active {
    animation: acrossIn .40s ease-out both;
  } 
  .page-leave-active {
    animation: acrossOut .60s ease-in both;
  } 
  @keyframes acrossIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes acrossOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
.container {
  position: relative;
}

.case-study-feature {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(65%, -50%);
  height: 75vh;
  height: 75vh;
  transition: all .25s;
  width: 1200px;

  img {
    object-fit: cover;
    max-height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0; 
  }

  .case-study-feature-text {
    position: absolute;
    bottom: 150px;
    left: 120px;
    text-align: left;
    z-index: 2;
    color: #fff;

    .tags {
      text-transform: uppercase;
    }

    h5 {
      font-size: 30px;
      font-weight: bold;
    }

    p {
      width: 200px;
      line-height: 1.3;
    }
  }

  &:hover {
    transform: translate(60%, -50%) scale(1.05);
  }
}


.contact-page {
  .case-study-feature {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    transform: none;
  }
}
</style>
