export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  router: {
    base: '/1922-sms-sender/'
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '1922 簡訊實聯制傳送小工具',
    title: '1922 簡訊實聯制傳送小工具',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', href: '/1922-sms-sender/icon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/qrcode'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      purpose: 'maskable',
      source: '~/static/icon.png'
    },
    meta: {
      name: '1922 小工具',
      description: '1922 簡訊實聯制傳送小工具',
      author: 'gnehs',
      theme_color: '#000',
    },
    manifest: {
      name: '1922 小工具',
      short_name: '1922 小工具',
      lang: 'zh-TW'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
