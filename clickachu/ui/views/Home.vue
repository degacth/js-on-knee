<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    {{dir}}
    <HelloWorld :msg="msg"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data() {
    return {
      msg: 'Hello ' + window.require('os').userInfo().username + '!',
      dir: ''
    }
  },
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
