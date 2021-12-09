<template>
  <ul class="uk-list uk-list-collapse">
    <li v-for="(value, key) of items">
      <label>
        <input type="checkbox"
               v-model="items[key]"
               :value="key"
               @change="$emit('update:items', items)" /> {{ key }}
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: { default: {}, },
  },
}
</script>
