<template>
	<div class="user">
		<div class="info">
			<transition name="slide-fade">
				<div v-show="isShowContent" class="info-content">
					<div class="info-register">
						<div class="info-img">
							<img :src="userinfos.avatar_url" alt="">
						</div>
						<div class="info-name">{{userinfos.loginname}}</div>
						<div class="info-score">积分：{{userinfos.score}}</div>
						<div class="info-score">GitHub：
							<a :href="`https://github.com/${userinfos.githubUsername}`">{{userinfos.githubUsername}}</a>
						</div>
						<div class="info-date">
							注册于：{{changeTime(userinfos.create_at)}}
						</div>
					</div>
					<div class="info-collect">
						<div class="collect-title">收藏的话题</div>
						<div class="collect-content" v-for="(topicinfo, index) in topicinfos">
							<div class="collect-item">
								<div class="img">
									<img :src="topicinfo.author.avatar_url" alt="">
								</div>
								<div class="title">
									<span>
										<router-link :to="{name: 'article', params: {id: topicinfo.id}}">{{topicinfo.title}}</router-link>
									</span>
								</div>
							</div>
						</div>
					</div>
					<div class="info-collect">
						<div class="collect-title">最近参与的话题</div>
						<div class="collect-content" v-for="(recent_reply, index) in userinfos.recent_replies">
							<div class="collect-item">
								<div class="img">
									<img :src="recent_reply.author.avatar_url" alt="">
								</div>
								<div class="title">
									<span>
										<router-link :to="{name: 'article', params: {id: recent_reply.id}}">{{recent_reply.title}}</router-link>
									</span>
								</div>
							</div>
						</div>
					</div>
					<div class="info-collect">
						<div class="collect-title">最近创建的话题</div>
						<div class="collect-content" v-for="recent_topic in userinfos.recent_topics">
							<div class="collect-item">
								<div class="img">
									<img :src="recent_topic.author.avatar_url" alt="">
								</div>
								<div class="title">
									<span>
										<router-link :to="{name: 'article', params: {id: recent_topic.id}}">{{recent_topic.title}}</router-link>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</transition>
		</div>
		<div class="back">
			<i class="icon-back" @click="$router.go(-1)"></i>
		</div>
	</div>
</template>

<script>
export default {

  name: 'User',

  data () {
    return {
    	// topicinfos: 收藏的话题  userinfos: 其他信息
    	topicinfos: {},
    	userinfos:{},
    	isShowContent: false
    };
  },

  mounted() {
  	 this.axios.get(`https://cnodejs.org/api/v1/topic_collect/${this.$route.params.ids}`)
  	 	.then(result => result.data.data)
  	 	.then(topicinfos => {
  	 		this.topicinfos = topicinfos;
  	 	})
  	 	.then(() => this.axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.ids}`))
  	 	.then(result => result.data.data)
  	 	.then(userinfos => {
  	 		this.userinfos = userinfos;
  	 	})
  	 	.then(() => {
  	 		this.isShowContent = true;
  	 	})
  }
};
</script>

<style lang="scss" scoped>
  .user {
    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-active {
      transform: translateX(160px);
      opacity: 0;
    }
      .info {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        .info-header {
          width: 100%;
          height: 50px;
          background-color: #2196f3;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.4rem;
          i.icon-back {
            position: absolute;
            left: 10px;
            display: inline-block;
            width: 38px;
            height: 38px;
            background: url('../../common/icons/icon-back.svg') no-repeat;
            background-size: contain;
          }
        }

        .info-content {
          width: 100%;
          height: 100%;
          flex: 1;
          overflow: auto;
          text-align: center;
          padding-top: 10px;
          padding-bottom: 30px;
          .info-register {
            margin-bottom: 20px;

            .info-img {
              img {
                width: 90px;
                height: 90px;
                border-radius: 45px;
              }

            }

            .info-name {
              font-size: 1.5rem;
              font-weight: bold;
            }
          }

          .info-collect {
            width: 93%;
            margin: auto;
            padding-top: 10px;
            padding-bottom: 10px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            border: 1px solid rgba(0, 0, 0, .2);
            border-radius: 4px;
            .collect-title {
              width: 100%;
              padding-bottom: 10px;
              border-bottom: 1px solid rgba(0, 0, 0, .1);
            }
            .collect-item {
              display: flex;
              padding: 5px 5px 0 5px;
              align-items: center;

              img {
                width: 37px;
                height: 37px;
                margin-right: 5px;
                border-radius: 4px;
                vertical-align: text-bottom;
              }
            }
            .collect-item + .collect-item {
              border-top: 1px solid rgba(0, 0, 0, .07);
            }
          }

          @media screen and (min-width: 760px) {
            .info-collect {
              width: 60%;

              .collect-item {
                padding: 10px 25px;
                img {
                  margin-right: 15px;
                }
              }
            }
          }

          .info-collect + .info-collect {
            margin-top: 20px;
          }
        }
      }
      .back {
        position: fixed;
        z-index: 1;
        top: 60%;
        left: -8px;
        width: 50px;
        height: 50px;

        i.icon-back {
          display: inline-block;
          width: 100%;
          height: 100%;
          background: url('../../common/icons/icon-back-blue.svg') no-repeat;
          background-size: contain;
          opacity: .5;
          cursor: pointer;
        }
      }
  }
</style>