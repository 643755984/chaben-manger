import {createApp} from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import installElementPlus from './plugins/element'
import { Fold, Expand, Bell, HomeFilled, Menu } from '@element-plus/icons-vue'
const app = createApp(App)
installElementPlus(app)
app.component('fold', Fold).component('expand', Expand).component('bell', Bell).component('HomeFilled', HomeFilled).component('menus', Menu)
.use(store).use(router)
.mount('#app')