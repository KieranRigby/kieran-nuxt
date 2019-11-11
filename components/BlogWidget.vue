<template>
  <nuxt-link :to="link">
    <div class="blog-post">
      <h2>{{ $prismic.richTextAsPlain(post.data.title) }}</h2>
      <p class="blog-post-meta"><span class="created-at">{{ formattedDate }}</span></p>
      <p>{{getFirstParagraph(post)}}</p>
      <div class="tags">
        Tags:<br>
        <div class="tag" v-for="(item, index) in post.data.tags_on_post" :key="'reference-item-' + index">
          {{ item.tag.slug }}
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import Prismic from "prismic-javascript"
import PrismicConfig from "~/prismic.config.js"
import LinkResolver from "~/plugins/link-resolver.js"

export default {
  props: ['post'],
  data: function() {  
    return {
      link: '',
      formattedDate: '',
    }
  },
  name: 'blog-widget',
  methods: {
    // Function to get the first paragraph of text in a blog post and limit the displayed text at 300 characters
    getFirstParagraph (post) {
      const textLimit = 300;
      const slices = post.data.body;
      let firstParagraph = '';
      let haveFirstParagraph = false;
      
      slices.map(function(slice) {
        if (!haveFirstParagraph && slice.slice_type == "text") {
          slice.primary.text.forEach(function(block){
            if (block.type == "paragraph" && !haveFirstParagraph) {
              firstParagraph += block.text;
              haveFirstParagraph = true;
            }
          });
        }
      });
      
      const limitedText = firstParagraph.substr(0, textLimit)

      if (firstParagraph.length > textLimit) {
        return limitedText.substr(0, limitedText.lastIndexOf(' ')) + '...';
      }
      else {
        return firstParagraph;
      }
    },
  },
  created () {
    this.link = LinkResolver(this.post),
    this.formattedDate = Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(this.post.data.date))
  },
}
</script>

<style lang="scss" scoped>
.blog-post {
  color: #353535;
}

h2 {
  margin: 0;
}

.tags {
  .tag {
    display: inline-block;
    margin-right: 10px;
    background-color: red;
    border-radius: 10px;
    color: white;
    padding: 0px 10px;
  }
}
</style>