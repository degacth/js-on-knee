<template>
  <Menu :menu="menu" id="main-menu" />
</template>

<script>

import * as _ from 'lodash'
import Menu, {MenuTypes} from '../components/menu/Menu.vue'
import {app, settings} from '../platform'

const menu = [
  {
    header: 'Record',
    items: [
      {
        id: 'menu-item-record-new',
        title: 'New',
        icon: 'file-text',
        path: {name: 'new-record'},
      },
      {
        type: MenuTypes.action,
        title: 'Open',
        icon: 'push',
        click: () => null,
      },
      {
        id: 'menu-item-recent-list',
        type: MenuTypes.subMenu,
        title: 'Recent',
        icon: 'history',
        menu: [{ items: [] }],
      },
    ],
  },
  {
    header: 'Application',
    items: [
      {
        title: 'Configure',
        icon: 'cog',
      },
      {
        title: 'About',
        icon: 'info',
      },
      {
        type: MenuTypes.separator,
      },
      {
        type: MenuTypes.action,
        title: 'Quit',
        icon: 'close',
        click: () => app.quit(),
      },
    ],
  },
]

const pathToFilename = (path) => path.replace(/^.*[\\\/]/, "")

export default {
  data() {
    return {menu}
  },
  async created() {
    const recent = await settings.recent()
    const recentMenuPath = '0.items.2.menu.0.items'
    _.set(this.menu, recentMenuPath, recent.map(item => ({
      title: pathToFilename(item), icon: 'play-circle'
    })))
  },
  components: { Menu },
}
</script>