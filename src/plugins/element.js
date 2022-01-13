import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { Fold, Expand, Bell, HomeFilled, Menu, Close, Search, CirclePlus, Plus, School, Document, CaretBottom } from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const icons = {
  Fold,
  Expand,
  Bell,
  HomeFilled,
  menus: Menu,
  Close,
  Search,
  CirclePlus,
  Plus,
  School,
  Document,
  CaretBottom
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
