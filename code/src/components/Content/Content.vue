<template>
	<div class="content">
		<div class="tab">
			<div @click="changeTab('all')" :class="{isBorder: tab==='all'}" class="all type"><router-link to="/">首页</router-link></div>
			<div @click="changeTab('good')" :class="{isBorder: tab==='good'}" class="good type"><router-link to="/">精华</router-link></div>
			<div @click="changeTab('share')" :class="{isBorder: tab==='share'}" class="share type"><router-link to="/">分享</router-link></div>
			<div @click="changeTab('ask')" :class="{isBorder: tab==='ask'}" class="ask type"><router-link to="/">问答</router-link></div>
			<div @click="changeTab('job')" :class="{isBorder: tab==='job'}" class="job type"><router-link to="/">招聘</router-link></div>
		</div>
		
		<div ref="article" class="article"  @scroll="scroll($event)">
	      	<div class="loading">
	        	<i v-show="isLoading" class="icon-loading"></i>
	      	</div>
	      	<router-view></router-view>
	    </div>

	    <transition name="slide-fade">
	      <div v-show="isShowTop" class="top">
	        <i @click.stop.prevent="toTop" class="icon-top"></i>
	      </div>
	    </transition>

	</div>
</template>

<script>

export default {
  name: 'content',
  data() {
    return {
      page: 1,
      over: false, // 是否已经没有内容加载
      isShowTop: false,
      loading: false
    }
  },

  computed: {
    tab() {
      return this.$store.state.tab;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    articleList() {
      return this.$store.state.articleList;
    }
  },

  methods: {
  	changeTab(type) {
  		this.$store.commit('changeTab', {type: type, articleList: [], isLoading: true});
  		this.axios.get(`https://cnodejs.org/api/v1/topics?page=${this.page}&tab=${type}`)
  			.then(response => response.data.data)
  			.then(articleList => this.$store.commit('changeTab', {type: type, articleList: articleList, isLoading: false}))
  	},
  	scroll(event) {
  		let $scrollTop = event.target.scrollTop, $clientHeight = event.target.clientHeight, $scrollHeight = event.target.scrollHeight;

  		// 返回顶部按钮的显隐
  		if($scrollTop >= $clientHeight) {
  			this.isShowTop = true
  		}else{
  			this.isShowTop = false
  		}

  		// 下拉加载
  		if(this.$route.path != '/'){
  			return
  		}else if(!this.over) {
  			let flag = $scrollTop + $clientHeight === $scrollHeight;
  			if(flag){
  				this.$store.commit('changeMore', true);
  				this.page++;
  				this.axios.get(`https://cnodejs.org/api/v1/topics?page=${this.page}&tab=${this.tab}`)
  					.then(response => response.data.data)
  					.then(articleList => {
  						// 加载完毕
  						if(!articleList.length){
  							this.over = true;
  							this.$store.commit('changeMore', false);
  							return;
  						}

  						// 动态修改articleList 从而渲染数据
  						this.$store.commit('changeTab', {articleList: this.articleList.concat(articleList), isLoading: false})
  					})
  					.then(() => this.$store.commit('changeMore'), false)
		  	}
  		}
    },
    toTop() {
    	if(this.$refs.article.scrollTop <= 0) {
    		return;
    	}
    	const t = 500;
    	let time = setInterval(() => {
    		if(this.$refs.article.scrollTop <= 0){
    			clearInterval(time)
    		}
    		this.$refs.article.scrollTop -= parseInt(this.$refs.article.scrollTop)/t*100;
    	},10)
    },

  },

}
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    position: relative;

    .tab {
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: white;
      background-color: #2196F3;
      font-size: 110%;
      letter-spacing: 2px;
      a {
        color: white;
        text-decoration: none
      }
      a::after {
        bottom: -1px;
        background-color: white;
      }

      .type {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        position: relative;
        z-index: 1;
      }
      .isBorder {
        border-bottom: 2px solid #ff4081;
        font-weight: bold;
        font-size: 120%;
      }

    }

    .article {
      flex: 1;
      position: relative;
      width: 100%;
      overflow: auto;
      transition: 1s linear;
      .loading {
        display: flex;
        justify-content: center;
        .icon-loading {
          display: inline-block;
          position: absolute;
          text-align: center;
          width: 40px;
          height: 40px;

          background: url('../../common/icons/icon-loading.svg') no-repeat;
          animation: loading .4s linear infinite;
          background-size: contain;
          z-index: 3;
        }
      }

    }

    .top {
      position: fixed;
      z-index: 1;
      bottom: 40px;
      right: 15px;
      width: 45px;
      height: 45px;
      .icon-top {
        display: inline-block;
        width: 100%;
        height: 100%;
        background: url('../../common/icons/icon-top.svg') no-repeat;
        background-size: contain;
      }
    }

    @media screen and (min-width: 760px) {
      .top {
        bottom: 10px;
        right: 60px;
        width: 55px;
        height: 55px;
      }
    }
  }

</style>
