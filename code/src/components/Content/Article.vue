<template>
	<div class="article-detail">
		<div class="body">
			<div class="article-title">
				<h1><span class="flag">{{(infos.top ? '置顶' : '') || (infos.good ? '精华' : '') || types[infos.tab]}}</span>{{infos.title}}</h1>
				<div class="desc">
					<p>发布于 {{changeTime(infos.create_at)}} 作者<router-link :to="{name: 'user', params: {ids: infos.author && infos.author.loginname}}">{{infos.author && infos.author.loginname}}</router-link> {{infos.visit_count}} 次浏览 来自 {{types[infos.tab]}}</p>
				</div>
			</div>
			<div v-html="infos.content" class="md"></div>
			<div class="reply">
				<div class="other">
					<div class="collect">
						<i :class="infos.is_collect ? 'collected' : 'collected-no'"></i>收藏文章
					</div>
					<div class="total-reply">{{infos.reply_count}} 回复</div>
				</div>
				<div class="reply-input">
					<Input type="text" placeholder="请输入回复内容" icon="at"></Input>
          <button type="button">回复</button>
				</div>
				<div class="reply-item" v-for="(reply, index) in replies">
					<div class="reply-author">
						<div class="reply-avatar">
							<img :src="reply.author && reply.author.avatar_url" alt="">
							<div class="reply-desc">
								<router-link :to="{name: 'user', params:'ids: reply.author && reply.author.loginname'}">{{reply.author && reply.author.loginname}}</router-link>
								{{infos.replies.length - index}} 楼 {{changeTime(reply.create_at)}}
								<span class="reply-at">回复</span>
								<i class="icon-reply-at" :class="reply.is_uped ? 'ups-yes' : 'ups-no'"></i>
								<span class="ups-count">{{ reply.ups.length }}</span>
							</div>
						</div>
					</div>
					<div v-html="reply.content" class="reply-content"></div>
				</div>
			</div>
		</div>
    <div class="back">
      <i class="icon-back" @click.stop.prevent="$router.go(-1)"></i>
    </div>
	</div>
</template>

<script>
export default {

  name: 'Article',

  data () {
    return {
    	infos: {},
    	types: {
    		ask: '问答',
    		job: '招聘',
    		share: '分享'
    	}
    };
  },

  mounted() {
  	 this.axios.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
  	 	.then(result => result.data.data)
  	 	.then(collectTopics => {
  	 		this.infos = collectTopics;
  	 	})
  },
  computed: {
  	replies() {
  		return this.infos.replies && this.infos.replies.reverse();
  	},
    collectTopics() {
      return this.$store.state.collectTopics
     }
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>

  .article-detail {
    position: relative;
    z-index: 1;
    height: 100%;
    padding: 8px 5px 0 5px;
    background-color: rgba(0, 0, 0, .07);
    overflow-x: hidden;
    overflow-y: auto;
    .body {
        background-color: white;
        height: 100%;
        border-radius: 4px;
        .article-title {
          width: 100%;
          padding-left: 5px;
          padding-top: 3px;
          padding-bottom: 5px;
          border-bottom: 1px solid rgba(0, 0, 0, .1);
          h1 {
            font-size: 1.2rem;
            .flag {
              background-color: #80bd01;
              padding: 2px 5px;
              font-size: 80%;
              color: white;
              border-radius: 5px;
              margin-right: 5px;
            }
          }
          .desc {
            padding-top: 3px;

            p {
              font-size: 80%;
              color: gray;
            }
          }
        }
        .md {
          width: 100%;
          overflow: hidden;
        }

        .reply {

          .other {
            margin-top: 20px;
            margin-bottom: 10px;
            // border-bottom: 1px solid rgba(0, 0, 0, .05);
            padding-left: 10px;
            display: flex;
            justify-content: space-between;
            i {
              display: inline-block;
              width: 18px;
              height: 18px;
              margin-right: 3px;
            }
            .collected {
              background: url('../../common/icons/icon-collect-yes.svg') no-repeat;
              background-size: contain;
              background-position: 0 3px;
            }
            .collected-no {
              background: url('../../common/icons/icon-collect-no.svg') no-repeat;
              background-size: contain;
              background-position: 0 3px;
            }
          }

          .reply-input {
            width: 100%;
            height: 50px;
            background-color: white;
            margin-bottom: 10px;
            padding-left: 10px;
            padding-top: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            input {
              width: 80%;
              height: 40px;
              font-size: 1.3rem;
              border-bottom: 1px solid rgba(0, 0, 0, .2);
              margin-right: 10px;
              padding-left: 5px;
              padding-right: 5px;
            }
            input:focus {
              border-bottom: 1px solid #2196f3;
            }
            button {
                  background-color: #2196f3;
                  color: white;
                  border-radius: 3px;
                  width: 50px;
                  margin-left: 10px;
                  height: 32px;
                  line-height: 32px;
            }
          }

          .total-reply {
            text-align: center;
            width: 100px;
            background-color: #B2DFDB;
            border-radius: 3px;
            // padding-left: 10px;
            margin-bottom: 6px;
          }

          .reply-item {
            .reply-author {
              background-color: white;
              border-bottom: 1px solid rgba(0, 0, 0, .1);
              border-radius: 5px;
              padding-left: 10px;
              .reply-avatar {
                display: flex;
                width: 100%;
                height: 50px;
                align-items: center;
                img {
                  width: 30px;
                  height: 30px;
                  border-radius: 3px;
                }
                .reply-desc {
                  position: relative;
                  flex: 1;
                  padding-left: 10px;
                  .reply-at {
                    position: absolute;
                    right: 60px;
                  }
                  .icon-reply-at {
                    position: absolute;
                    right: 35px;
                    top: -2px;
                    display: inline-block;
                    width: 20px;
                    height: 20px;

                  }
                  .ups-yes {
                    background: url('../../common/icons/icon-ups-yes.svg') no-repeat;
                    background-size: contain;
                  }
                  .ups-no {
                    background: url('../../common/icons/icon-ups-no.svg') no-repeat;
                    background-size: contain;
                  }
                  span.ups-count {
                    position: absolute;
                    right: 20px;
                  }
                }
              }
            }

            .reply-one {
              width: 100%;
              height: 30px;
              // background-color: red;
              margin-bottom: 20px;
              padding-top: 2px;

              input {
                width: 65%;
                height: 100%;
                background: none;
                border-bottom: 1px solid rgba(0, 0, 0, .1);
                font-size: 1.3rem;
                color: gray;
              }
              input:focus {
                border-bottom: 1px solid #00bcd4;
                color: black;
              }
              button {
                font-size: 1.2rem;
                vertical-align: bottom;
                padding: 2px 5px;
                border-radius: 2px;
              }
              button:nth-of-type(1) {
                background-color: #2196f3;
                color: white;
              }
              button:nth-of-type(2) {
                background-color: white;
                color: gray;
              }
            }
          }
        }

    }

    .back {
      position: fixed;
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
  @media screen and (min-width: 760px) {
    .article-detail {
      padding-left: 3%;
      padding-right: 3%;
      .article-title {
        text-align: center;
      }
    }
  }
</style>