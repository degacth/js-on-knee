<template>
  <div class="uk-container uk-container-small main">
    <router-view class="uk-animation-slide-left-small uk-animation-fast" />
  </div>
</template>

<style src="uikit/dist/css/uikit.min.css"></style>

<style lang="stylus">
.main
  height 100vh

::-webkit-scrollbar
  width 8px

::-webkit-scrollbar-track
  -webkit-box-shadow inset 0 0 2px rgba(0,0,0,0.3)
  border-radius 4px

::-webkit-scrollbar-thumb
  border-radius 4px
  -webkit-box-shadow inset 0 0 2px rgba(0,0,0,0.5)
</style>
