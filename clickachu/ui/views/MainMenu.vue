<template>
  <Menu :menu="menu" />
</template>

<script>

import Menu, {MenuTypes} from '../components/menu/Menu.vue'
import {app} from '../platform'

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
        type: MenuTypes.subMenu,
        title: 'Recent',
        icon: 'history',
        menu: [{ items: [
          {title: 'hello', icon: 'file-edit'},
          {title: 'world', icon: 'file-edit'},
        ] }],
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

export default {
  data() {
    return {menu}
  },
  components: { Menu },
}
</script>