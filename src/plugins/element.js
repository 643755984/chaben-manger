import ElementPlus from 'element-plus'
// import { createI18n } from 'vue-i18n'
import 'element-plus/dist/index.css'
import { Fold, Expand, Bell, HomeFilled, Menu, Close, Search, CirclePlus } from '@element-plus/icons-vue'
import localeZH from 'element-plus/lib/locale/lang/zh-cn'
// import localeEN from 'element-plus/lib/locale/lang/en'
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
  CirclePlus
}

export default (app) => {
  app.use(ElementPlus, { locale:localeZH })
  installIcon(app)
  // app.use(i18n)
}

function installIcon(app) {
  for(let key in icons) {
    app.component(key, icons[key])
  }
}
