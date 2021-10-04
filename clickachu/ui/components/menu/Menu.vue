<template>
  <ul :class="klass" uk-nav>
    <template v-for="items in menu">
      <li v-if="items.header" class="uk-nav-header">{{items.header}}</li>

      <template v-for="item in items.items">
        <component :is="itemComponentName(item)" :item="item">
          <template v-slot:before v-if="item.icon">
            <span class="uk-margin-small-right" :uk-icon="item.icon"></span>
          </template>
          <template v-slot:submenu v-if="item.menu">
            <component-menu :menu="item.menu" :klass="['uk-nav-sub']"></component-menu>
          </template>
        </component>
      </template>
    </template>
  </ul>
</template>

<script>

import ItemLink from './ItemLink.vue'
import ItemAction from './ItemAction.vue'
import ItemSubMenu from './ItemSubMenu.vue'

export const MenuTypes = {
  link: 'link',
  action: 'action',
  separator: 'separator',
  subMenu: 'sub-menu',
}

export default {
  props: {
    menu: {},
    klass: {
      default: ['uk-nav-default', 'uk-nav-parent-icon'],
    }
  },
  name: 'component-menu',
  methods: {
    itemComponentName(item) {
      const type = item.type || MenuTypes.link
      return 'item-' + type
    }
  },
  components: {
    ItemLink,
    ItemAction,
    ItemSubMenu,
  }
}
</script>
