<template>
  <div id="app">

    <VHeader></VHeader>
    
    <VContent></VContent>

    <VAsideMenu></VAsideMenu>
    
    <VAbout></VAbout>
  
  </div>
</template>

<script>
import VHeader from './components/Header/Header'
import VContent from './components/Content/Content'
import VAsideMenu from './components/AsideMenu/AsideMenu'
import VAbout from './components/About/About'

export default {
  name: 'app',
  components: {
    VHeader,
    VContent,
    VAsideMenu,
    VAbout
  }
}
</script>

<style lang="scss">
@import "./common/style/base.scss";

.show-enter-active {
  transition: all .3s ease;
}
.show-leave-active {
  transition: all .2s ease-in;
}
.show-enter, .show-leave-active {
  transform: translateX(200px);
  opacity: 0;
}

#app {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

}
</style>