const pkg = require('./package')
const Prismic = require('prismic-javascript')
const prismicEndpoint = 'https://reckless.cdn.prismic.io/api/v2'
const PrismicConfig = require('./prismic.config')

// Below function grabs the posts and pages, then changes post' type to blog, and then maps that to a URL ready for generation.
// Post get changed to blog as that is what the slug us.
const routes = () =>
	Prismic.getApi(prismicEndpoint)
		.then(api =>
			api.query(Prismic.Predicates.any('document.type', ['post', 'page']), {
				pageSize: 100,
				orderings: '[my.layout.uid]',
      }),
    )
		.then(res => {
      for (let i = 0; i < res.results.length; i++) {
        if(res.results[i].type === 'post') {
          res.results[i].type = 'blog'
        }
      }

			if (res.total_pages > 1) {
				console.warn('we have more than 100 pages, fix it');
				process.exit(1);
			}
			return [
				'/',
				...res.results.map(page => `/${page.type}/${page.uid.replace(/_/g, '/')}/`),
				'/blog/tag/development',
				'/blog/tag/digital-marketing',
			];
		});

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' },
    ],
    script: [
      { innerHTML: '{ window.prismic = { endpoint: "' + PrismicConfig.apiEndpoint + '"} }' },
      { src: '//static.cdn.prismic.io/prismic.min.js' },
      { src: '//code.jquery.com/jquery-3.3.1.slim.min.js' },
      { src: '//cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js' },
      { src: '//stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' }
    ],
    __dangerouslyDisableSanitizers: ['script'],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/resetr.css',
    '@/assets/css/common.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/link-resolver.js',
    '~/plugins/html-serializer.js',
    '~/plugins/prismic-vue.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  generate: {
    routes
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    }
  }
}
