import Vue from 'vue';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)
import App from './components/App.vue';
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.darken4,
    secondary: colors.amber.lighten2
  }
})
new Vue({
    render: h => h(App)
}).$mount('#app');

