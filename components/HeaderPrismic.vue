<template>
  <header class="site-header">
    <div class="container">
      <nuxt-link to="/">
        <img class="logo" width="200" src="../assets/img/logo.png" alt="Reckless Agency">
      </nuxt-link>
      <nav>
        <ul>
          <li v-for="menuLink in menuLinks" :key="menuLink.id">
            <nuxt-link :to="'/' + menuLink.link.type + '/' + menuLink.link.uid + '/'">{{ $prismic.richTextAsPlain(menuLink.label) }}</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/services/">Services</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/blog/">Blog</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/contact/">Contact</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  props: ['menuLinks'],
  name: 'header-prismic',
}
</script>

<style lang="scss">
.site-header {
  height: 30px;
  padding: 20px 0;
  color: #484d52;
  font-weight: 700;

  .logo {
    padding: 10px;
  }
  
  a {
    color: #484d52;
    font-weight: 700;
  }
  nav a:hover {
    color: #72767B;
  }
}

.homepage .site-header {
  color: #333;

  a {
    color: #333;
  }

  nav a:hover {
    color: #c8c9cb;
  }
}

.site-header {
  .logo {
    display: inline-block;
    font-size: 22px;
    font-weight: 900;
  }

  nav {
    float: right;

    ul {
      margin: 0;
      padding-left: 0;
      
      li {
        display: inline-block;
        margin-left: 40px;
      }
    }
  }
}

@media (max-width: 1060px) {
  .site-header {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media (max-width: 767px) {
  .site-header {
    height: auto;
  }

  .homepage .site-header {
    position: absolute;
    left: 0;
    right: 0;
  }

  .site-header {
    .logo {
      display: block;
      text-align: center;
    }

    nav {
      float: none;
      text-align: center;
      
      li {
        display: inline-block;
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
}
</style>


