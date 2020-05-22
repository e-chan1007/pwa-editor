module.exports = {
  mode: "spa",

  head: {
    title: "PWAエディタ" || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "PWA用Manifest・Service Workerエディタ"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: "https://kit.fontawesome.com/3864301cff.js",
        crossorigin: "anonymous"
      }
    ]
  },

  loading: { color: "#00bcd4" },

  css: [{ src: "~/assets/scss/main.scss", lang: "scss" }],

  buildModules: ["@nuxt/typescript-build", "@nuxt/components"],

  modules: ["@nuxtjs/pwa", "@nuxtjs/style-resources"],

  styleResources: {
    scss: ["~/assets/scss/variable/_index.scss", "~/assets/scss/mixin/_index.scss"]
  },

  workbox: {
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: "https://kit.fontawesome.com/*",
        handler: "cacheFirst",
        method: "GET"
      }
    ]
  },
  icon: {
    purpose: "maskable"
  },
  manifest: {
    title: "PWAエディタ",
    name: "PWAエディタ",
    short_name: "PWAエディタ",
    description: "PWA用Manifest・Service Workerエディタ",
    lang: "ja",
    theme_color: "#00bcd4",
    background_color: "#FFFFFF"
  }
};
