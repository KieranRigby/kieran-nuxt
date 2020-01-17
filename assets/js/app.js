import Vue from 'vue';
import PrismicVue from 'prismic-vue';
import linkResolver from 'path/to/the/link-resolver';
 
Vue.use(PrismicVue, {
  endpoint: window.prismic.endpoint,
  linkResolver: linkResolver
});

export default (req, res) => {
    res.write('Hey!')
    res.end()
}