<template>
  <li class="uk-parent">
    <a :id="item.id || ''">
      <slot name="before"></slot> {{item.title}}
    </a>
    <slot name="submenu"></slot>
  </li>
</template>

<script>
import {menuItemBase} from './common'

export default {
  ... menuItemBase
}
</script>