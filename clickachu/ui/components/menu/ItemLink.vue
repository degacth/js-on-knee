<template>
  <li>
    <router-link :to="item.path || ''">
      <slot name="before"></slot> {{item.title}}
    </router-link>
  </li>
</template>

<script>
import {menuItemBase} from './common'

export default {
  ... menuItemBase
}
</script>