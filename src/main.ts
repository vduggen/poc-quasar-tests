import { createApp } from 'vue'
import { Quasar, Notify, useQuasar } from 'quasar'
import quasarLang from 'quasar/lang/pt-BR'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const myApp = createApp(App);
myApp.provide("quasar", useQuasar());

myApp.use(Quasar, {
  plugins: {
    Notify
  }, // import Quasar plugins and add here
  lang: quasarLang,
})

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')
