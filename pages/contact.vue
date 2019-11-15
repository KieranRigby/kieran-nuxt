<template>
  <section class="contact-page">
    <!-- Vue tag to add header component -->
    <header-prismic :menuLinks="menuLinks"/>

    <!-- Slices block component -->
    <slices-block :slices="slices"/>

    <div class="container">
        <div class="row">
            <div class="col-12">
                <form name="contact" method="POST" data-netlify="true">
                    <div class="form-group">
                        <label for="name">Your Name: </label>
                        <input type="text" name="name" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="email">Your Name: </label>
                        <input type="email" name="email" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="role">Your Role: </label>
                        <select name="role[]" class="form-control" multiple>
                            <option value="leader">Leader</option>
                            <option value="follower">Follower</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="message">Your Message: </label>
                        <textarea name="message" class="form-control"></textarea>
                    </div>
                    <p>
                        <button type="submit">Send</button>
                    </p>
                </form>
            </div>
        </div>
    </div>
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
  name: 'Home',
  components: {
    HeaderPrismic,
    HomepageBanner,
    SlicesBlock,
  },
  head () {
    return {
      title: 'Contact',
    }
  },
  async asyncData({context, error, req}) {
    try{
      // Fetching the API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, {req})

      // Query to get the home page content
      let document = {}
      //const result = await api.getSingle('homepage')
      //document = result.data

      // Query to get the menu content
      let menuContent = {}
      const menu = await api.getSingle('menu')
      menuContent = menu.data

      console.log(document.page_content)
      // Load the edit button
      if (process.client) window.prismic.setupEditButton()

      return {
        // Page content
        //document,
        //documentId: result.id,

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

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 250ms;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
