import { createApp } from 'vue';

import { Quasar, Notify, date, useQuasar } from 'quasar';
import quasarLang from 'quasar/lang/pt-BR';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

import App from './App.vue';
import UserHttpGateway from './gateways/UserHttpGateway';
import NotificationAdapter from './infra/NotificationAdapter';

const myApp = createApp(App);

const notification = new NotificationAdapter();

myApp.provide("Date", date);
myApp.provide("notification", notification);
myApp.provide("userGateway", new UserHttpGateway(notification));

myApp.use(Quasar, {
  plugins: {
    Notify
  },
  lang: quasarLang,
})

myApp.mount('#app')
