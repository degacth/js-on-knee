<template>
  <li>
    <a @click.prevent="item.click">
      <slot name="before"></slot> {{ item.title }}
    </a>
  </li>
</template>

<script>
import {menuItemBase} from './common'

export default {
  ... menuItemBase
}
</script>