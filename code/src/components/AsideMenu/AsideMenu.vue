<template>
	<transition name="slide-left">
		<div v-show="isShowAsideMenu" class="aside-menu">
			<div class="menu">
				<div class="user">
					<div class="user-avatar">
            <img src="http://omratag7g.bkt.clouddn.com/icon-unlogin.svg" alt="" @click="userLogin">
            <div class="username">点击登录</div>
          </div>
				</div>
				<div class="infos block">
					<div class="msg block"><i class="icon-msg"></i>我的消息</div>
					<div class="new block" @click="showRegister"><i class="icon-new"></i>注册账号</div>
					<div class="info block" @click="showTable"><i class="icon-info"></i>数据中心</div>
					<div class="about block" @click="showAbout"><i class="icon-about"></i>关于</div>
				</div>
			</div>
			<div @click.stop.prevent="showAsideMenu" class="mask"></div>
		</div>
	</transition>
</template>

<script>
export default {

  name: 'AsideMenu',

  data () {
    return {

    };
  },

  computed: {
  	isShowAsideMenu() {
  		return this.$store.state.isShowAsideMenu;
  	}
  },

  methods: {
  	showAsideMenu() {
  		this.$store.commit('showAsideMenu', false)
  	},
    userLogin() {
      this.$store.commit('showLogin', true)
    },
    showAbout() {
      this.$store.commit('showAbout',true)
    },
    showTable() {
      this.$router.push({ path: '/tablelist/1'})
    },
    showRegister() {
      this.$router.push({ path: '/register'})
    }
  }

};
</script>

<style lang="scss" scoped>
  .aside-menu {
    position: absolute;
    display: flex;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;

    .menu {
      display: flex;
      flex-direction: column;
      width: 220px;
      background-color: white;
      box-shadow: 0 0 12px gray;
      .user {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 200px;
        background-color: #2196F3;
        color: white;
        .user-avatar {
          img {
            width: 100px;
            height: 100px;
            border-radius: 50px;
            cursor: pointer;
          }
        }

        .username {
          font-size: 1.2rem;
        }
      }

      .infos {

        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;

        .block {
          width: 100%;
          height: 50px;
          display: flex;
          padding-left: 50px;
          align-items: center;
          cursor: pointer;
        }

        .block + .block {
          border-top: 1px solid rgba(0, 0, 0, .05);
        }
        i {
          display: inline-block;
          width: 22px;
          height: 22px;
          background-repeat: no-repeat;
          margin-right: 8px;
        }
        .icon-msg {
          background: url('../../common/icons/icon-msg-blue.svg');
          background-size: contain;
        }
        .icon-collect {
          background: url('../../common/icons/icon-collect.svg');
          background-size: contain;
        }
        .icon-msg {
          background: url('../../common/icons/icon-msg-blue.svg');
          background-size: contain;
        }
        .icon-new {
          background: url('../../common/icons/icon-new.svg');
          background-size: contain;
        }
        .icon-info {
          background: url('../../common/icons/icon-info.svg');
          background-size: contain;
        }
        .icon-about {
          background: url('../../common/icons/icon-about.svg');
          background-size: contain;
        }
        .cnode {
          margin-top: 150px;
          flex: 1;
          width: 50%;
          background-color: red;
          background: url('../../common/icons/icon-cnode.svg') no-repeat;
          background-size: contain;
          opacity: .1;
        }
      }
    }

    .mask {
      flex: 1;
    }
  }
</style>
