<template>
  <Menu :menu="menu" id="main-menu" />
</template>

<script>

import * as _ from 'lodash'
import Menu, {MenuTypes} from '../components/menu/Menu.vue'
import {app, settings, record} from '../platform'

const pathToFilename = (path) => path.replace(/^.*[\\\/]/, "")

export default {
  data() {
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
            click: async () => {
              const path = await record.open()
              if (!path) return

              record.play(path)
              await settings.addRecent(path)
              await this.updateRecent()
            },
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
            id: 'menu-item-configuration',
            title: 'Configure',
            icon: 'cog',
            path: {name: 'configuration'},
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

    return {menu}
  },
  async created() {
    await this.updateRecent()
  },
  methods: {
    async updateRecent() {
      const recent = await settings.recent()
      const recentMenuPath = '0.items.2.menu.0.items'
      _.set(this.menu, recentMenuPath, recent.map(item => ({
        title: pathToFilename(item),
        icon: 'play-circle',
        tooltip: item,
        type: MenuTypes.action,
        click: async () => {
          record.play(item)
          await settings.addRecent(item)
          await this.updateRecent()
        }
      })))
    }
  },
  components: { Menu },
}
</script>