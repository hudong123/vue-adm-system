<template>
	<div class="article-list">
		<transition-group name="slide-top">
			<div v-for="article in articleList" :key="article" class="item">
				<div class="avatar">
          <router-link :to="{name: 'user', params: {ids: article.author.loginname}}">
            <img :src="article.author.avatar_url" alt="">
          </router-link> 
				</div>
				<div class="title">
					<p>
						<span class="flag" :class="{special : article.top || article.good}">{{(article.top ? '置顶' : '') || (article.good ? '精华' : '') || types[article.tab]}} </span>
						<router-link :to="{name: 'article', params: {id: article.id}}">{{article.title}}</router-link>
					</p>
					<p class="view">
			            <span class="viewed">{{article.reply_count}}</span>/{{article.visit_count}}
			            <span class="date">{{changeTime(article.last_reply_at)}}</span>
			         </p>
				</div>
			</div>
		</transition-group>
		
		<div class="more">
			<i v-show="isMore" class="icon-more"></i>
		</div>

	</div>
</template>

<script>
import moment from 'moment';

export default {

  name: 'Article',

  data () {
    return {
    	types: {
    		share: '分享',
    		ask: '问答',
    		job: '招聘'
    	}
    };
  },

  computed: {
  	articleList() {
      	return this.$store.state.articleList;
    },
    isMore() {
    	return this.$store.state.isMore;
    }
  },

  created() {
  	this.$store.commit('changeTab', {isLoading: true});
  	this.axios.get('https://cnodejs.org/api/v1/topics')
  		.then(response => response.data.data)
  		.then(articleList => {this.$store.commit('changeTab', {articleList: articleList, isLoading: false})})
  }
};
</script>

<style lang="scss" scoped>

  .article-list {
    position: relative;
    z-index: 1;

    .item {
      width: 100%;
      height: 70px;
      display: flex;
      // padding-top: 5px;
      // padding-left: 5px;
      padding-right: 5px;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      .avatar {
        width: 52px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 45px;
          height: 45px;
          border-radius: 5px;
        }
      }

      .title {
        width: 100%;

        flex: 4;
        background-color: white;
        padding-top: 15px;
        padding-left: 5px;
        font-size: 13px;
        overflow: hidden;
        a {
        	text-decoration: none;
        }
        p {
          width: 98%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .flag {
          background-color: #e5e5e5;
          padding: 2px 5px;
          font-size: 80%;
          color: #9c9c9c;
          border-radius: 5px;
          margin-right: 3px;
        }
        .special {
          background-color: #80bd01;
          color: white;
        }
        .view {
          position: relative;
          padding-top: 10px;
          font-size: 70%;
          color: gray;
          padding-left: 45px;
          span.viewed {
            color: #9e83cc;
          }
          span.date {
            position: absolute;
            right: 15px;
          }
        }

      }

      .title:hover {
        background-color: #F5F5F5;
      }

      @media screen and (min-width: 760px) {
        .title {
          padding-left: 3%;
          .flag {
            margin-right: 15px;
          }
          .view {
            padding-left: 55px;
          }
        }
      }
    }

    @media screen and (min-width: 760px) {
      .item {
        margin: auto;
        width: 70%;
      }
    }
    .more {
      text-align: center;
      .icon-more {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url('../../common/icons/icon-loading.svg') no-repeat;
        background-size: contain;
        animation: loading .4s linear infinite;
      }
    }
  }

</style>