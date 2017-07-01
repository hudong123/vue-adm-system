<template>
	<div>
		<VHeader></VHeader>
  
	    <div class="bottombar">
	      <VAsideMenu></VAsideMenu>

	      <div class="main">

           <div class="content">
              <div class="loading">
                <img src="../../static/images/loading.gif" v-show="isLoading">
                <!-- <Spin v-show="isLoading"></Spin>   -->
              </div>
              <router-view></router-view>
          </div> 
        </div>
	    </div>
	</div>
</template>

<script>
import VHeader from '../components/Header/Header'
import VAsideMenu from '../components/AsideMenu/AsideMenu'

export default {
  name: 'app',
  components: {
    VHeader,
    VAsideMenu
  },
  data () {
    return {
      
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style lang="scss">
.bottombar{
  position: absolute;
  top: 50px;
  bottom: 0;
  width: 100%;
  .main{
    overflow-y: auto;
    height: 100%;
    width: calc(100% - 200px);
    float: left;
    .content{
      height: 100%;
      padding-top: 20px;
      padding-left: 20px;
      padding-right: 30px;
      width: 100%;
      margin: 0 auto;
      .ivu-row{
        height: 100%;
      }
      .loading{
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 10000;
          animation: loading .4s linear infinite;
          background-size: contain;
      }
    }
  }
}
</style>