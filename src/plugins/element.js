import ElementPlus from 'element-plus'
// import { createI18n } from 'vue-i18n'
import 'element-plus/dist/index.css'
import { Fold, Expand, Bell, HomeFilled, Menu, Close, Search, CirclePlus, Plus } from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import messages from '../utils/i18n'

// const i18n = createI18n({
//   locale: localeZH.name,
//   fallbackLocale: localeEN.name,
//   messages,
// })
const icons = {
  Fold,
  Expand,
  Bell,
  HomeFilled,
  menus: Menu,
  Close,
  Search, 
  CirclePlus,
  Plus
}

export default (app) => {
  app.use(ElementPlus, { locale: zhCn })
  installIcon(app)
  // app.use(i18n)
}

function installIcon(app) {
  for(let key in icons) {
    app.component(key, icons[key])
  }
}
