<template>
  <section class="blog-page">
    <!-- Vue tag to add header component -->
    <header-prismic :menuLinks="menuLinks"/>

    <div class="container">      
      <div class="blog-avatar" :style="{ backgroundImage: 'url(' + image + ')' }" ></div>
      <!-- Template for page title -->
      <h1 class="blog-title">
        {{ $prismic.richTextAsPlain(document.headline) }}
      </h1>
      <!-- Template for page description -->
      <p class="blog-description">{{ $prismic.richTextAsPlain(document.description) }}</p>

      <div class="row">
        <div class="col-12 col-md-9">
          <!-- Check blog posts exist -->
          <div v-if="posts.length !== 0" class="row blog-main">
              <section v-for="post in posts" :key="post.id" v-bind:post="post" class="blog-post col-12 col-md-4">
                <blog-widget :post="post"></blog-widget>
              </section>
          </div>
          <!-- If no blog posts return message -->
          <div v-else class="blog-main">
            <p>No Posts published at this time.</p>
          </div>
        </div>
        <div class="col-12 col-md-3 sidebar">
          <p>Filter Tags</p>
          <nuxt-link :to="'/blog/'">
            <p>All</p>
          </nuxt-link>
          <div class="tag" v-for="(item, index) in allTags" :key="'reference-item-' + index">
             <nuxt-link :to="'/blog/tag/' + item.slugs[0] + '/'">
              <p :data-id="item.id">{{ item.data.tag_name[0].text }}</p>
            </nuxt-link>
          </div>
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
import SlicesBlock from '~/components/SlicesBlock.vue'
import BlogWidget from '~/components/BlogWidget.vue'

export default {
  name: 'page',
  components: {
    HeaderPrismic,
    SlicesBlock,
    BlogWidget
  },
  head () {
    return {
      title: 'Reckless Blog',
    }
  },
  async asyncData({ params, error, req }) {
    try{
      // Fetching the API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, {req})

      // Query to get post content
      let document = {}
      const result = await api.getSingle("blog_home")
      document = result.data

      // Query to get posts content to preview
      const blogPosts = await api.query(
        Prismic.Predicates.at("document.type", "post"),
        { orderings : '[my.post.date desc]' }
      )

      // Query to get posts content to preview
      const allTags = await api.query(
        Prismic.Predicates.at("document.type", "tag"),
        { orderings : '[my.tag.date desc]' }
      )

      // Query to get the menu content
      let menuContent = {}
      const menu = await api.getSingle('menu')
      menuContent = menu.data

      // Load the edit button
      if (process.client) window.prismic.setupEditButton()
      //console.log(document)
      return {
        // Post content
        document,
        documentId: result.id,
        posts: blogPosts.results,
        image: document.image.url,
        allTags: allTags.results,

        // Set slices as variable
        slices: document.body,

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
.blog-page {
  .blog-avatar {
    height: 140px;
    width: 140px;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    margin: 1em auto;
  }
    
  .blog-description {
    font-size: 18px;
    color: #9A9A9A;
    line-height: 30px;
    margin-bottom: 3rem;
    padding-bottom: 3rem;
    font-family: 'Lato', sans-serif;
    border-bottom: 1px solid #DADADA;
  }
}

.blog-main {
  text-align: left;

  &.single img {
    width: 100%;
    height: auto;
  }
    
  &.single a {
    text-decoration: none;
    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%);
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%);
    background-repeat: repeat-x;
    background-size: 2px 2px;
    background-position: 0 23px;
  }
}

.blog-post {
  margin: 0;
  margin-bottom: 3rem;
}

.sidebar {
  background-color: #3a3a3a;
  border-radius: 10px;
  color: white;

  a {
      color: white;
  }

  p {
    margin: 10px 0px 10px 0px;
  }
}

@media (max-width: 767px) {
  .home {
    padding: 0 20px;
  }

  .blog-main {
    padding: 0;
    font-size: 18px;
  }
}
</style>