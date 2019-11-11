<template>
  <section class="homepage">
    <!-- Vue tag to add header component -->
    <header-prismic :menuLinks="menuLinks"/>

    <!-- Slices block component -->
    <slices-block :slices="slices"/>

    <form name="contact" method="POST" data-netlify="true">
        <p>
            <label>Your Name: <input type="text" name="name" /></label>   
        </p>
        <p>
            <label>Your Email: <input type="email" name="email" /></label>
        </p>
        <p>
            <label>Your Role: <select name="role[]" multiple>
            <option value="leader">Leader</option>
            <option value="follower">Follower</option>
            </select></label>
        </p>
        <p>
            <label>Message: <textarea name="message"></textarea></label>
        </p>
        <p>
            <button type="submit">Send</button>
        </p>
    </form>
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
