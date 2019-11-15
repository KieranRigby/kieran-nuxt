<template>
  <div class="blog-post" :data-wio-id= documentId>
    <header-prismic :menuLinks="menuLinks"/>

    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="back">
            <nuxt-link to="/blog">back to list</nuxt-link>
          </div>
          
          <!-- Template for page title -->
          <h1 class="blog-title">{{ $prismic.richTextAsPlain(document.title) }}</h1>
          <!-- Template for published date -->
          <p class="blog-post-meta"><span class="created-at">{{ formattedDate }}</span></p>
        </div>
      </div>
    </div>
    
    <!-- Slice Block Componenet tag -->
    <slices-block :slices="slices"/>
  </div>
</template>

<script>
import Prismic from "prismic-javascript"
import PrismicConfig from "~/prismic.config.js"
//Importing all the slices components
import HeaderPrismic from '~/components/HeaderPrismic.vue'
import SlicesBlock from '~/components/SlicesBlock.vue'

export default {
  name: 'post',
  components: {
    HeaderPrismic,
    SlicesBlock
  },
  head () {
    return {
      title: 'Prismic Nuxt.js Blog'
    }
  },
  async asyncData({ params, error, req }) {
    try{
      // Query to get API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, {req})

      // Query to get post content
      const post = await api.getByUID("post", params.uid)

      // Load the edit button
      if (process.client) window.prismic.setupEditButton()

      // Query to get the menu content
      let menuContent = {}
      const menu = await api.getSingle('menu')
      menuContent = menu.data

      // Returns data to be used in template
      return {
        document: post.data,
        documentId: post.id,
        slices: post.data.body,
        formattedDate: Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(post.data.date)),

        // Menu
        menuContent,
        menuLinks: menuContent.menu_links
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

}
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 500ms;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>