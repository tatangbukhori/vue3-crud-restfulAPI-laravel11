// import createApp from Vue
import { createApp } from 'vue'
// import './style.css'

// import component app
import App from './App.vue'

// import config router
import router from './router'

// create app Vue
const app = createApp(App);

// use "router" in Vue with plugin "use"
app.use(router);

app.mount('#app')
