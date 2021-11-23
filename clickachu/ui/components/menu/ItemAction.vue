<template>
  <li>
    <a @click.prevent="item.click" :title="item.tooltip">
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