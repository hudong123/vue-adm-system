<template>
	<Row>
        <Col span="24" class="comment-block pr10">
            <bread></bread>
            <Card class="mt15">
            	<div slot="title">
            		<Radio-group v-model="Radio1" type="button">
                        <Radio label="全部">全部({{info.totalCount}})</Radio>
                        <Radio label="好评"><div class="eval icongood"></div>好评({{info.goodCount}})</Radio>
                        <Radio label="中评"><div class="eval iconnormal"></div>中评({{info.averageCount}})</Radio>
                        <Radio label="差评"><div class="eval iconbad"></div>差评({{info.badCount}})</Radio>
                        <Radio label="有图">有图({{info.hasImgCount}})</Radio>
                    </Radio-group>
            	</div>
            	<div class="eList" v-for="(item, index) in info.comments" v-show="!isLoading" :key="item.id">
					<ul>
						<div class="elistLeft">   
							<img :src="item.iconUrl" v-if="item.iconUrl" class="userpic" width="50" height="50">
							<img src="../../../static/images/defaultIcon.png" v-if="!item.iconUrl" class="userpic" width="50" height="50">
							<p style="color: #495060">{{item.nick}}<br></p>
						</div>
						<div class="elistRight">
							<div class="box1">订单项目：<a href="javascript:void(0)" style="cursor: text">{{item.firstPriceName}}</a><span class="ml25" v-if="item.name">服务人员：<span class="info">{{item.name}}</span></span><span class="ml25">评论时间：<span class="feng">{{format(item.createtime, 'yyyy-MM-dd HH:mm')}}</span></span> </div>
							<div class="box2">
								<p><i class="eval" :class="{icongood : item.star >= 4 , iconnormal :  item.star < 4 && item.star >= 2, iconbad: item.star <= 1 }"></i>{{item.comment}}</p>
								<div class="mt10" v-if="item.imgPath">
									<img :src="itemImg" alt="" width="48" height="48" class="curp mr15" @click="ShowImg($event)" v-for="itemImg in item.imgPath.split(',')">
									<img alt="" width="20%" height="20%" class="dn mt10 cursmall" @click="HideImg($event)">
								</div>
							</div>
							<div class="box3">
								<div class="pingfen_btn">
									{{item.city}}
									<span class="ml5">{{item.area}}</span>
									<span class="ml15">本次综合评分：</span>
									<Rate disabled v-model="item.star"></Rate>
								</div>
								<div v-show="!item.replyComment">
									<Button type="primary" class="replyComment fr" @click="replyComment($event)">回复</Button>  
									<div class="pt10 replySubmit dn">
		                                <Input class="w60p"><span slot="prepend">回复：</span></Input>
		                                <Button type="warning" class="replyCommentSubmit fr" @click="replySubmit($event)">提交</Button>   
		                            </div>
								</div>
							</div>
						</div>
					</ul>
				</div>
				<div style="margin: 10px;overflow: hidden;padding-top:2px;" v-show="!isLoading">
                    <div style="float: right;">
                        <Page :total="totalSize" :current="parseInt($route.query.p) || 1" @on-change="changePage" :page-size="20" show-elevator></Page>
                    </div>
                </div>
            </Card>
        </Col>
    </Row>        
</template>

<script>
import bread from '../../components/Bread/Bread';
export default {

  	name: 'comment',

  	data () {
    	return {
    		info: {},
    		Radio1: '全部',
    		defaultIcon: './static/images/defaultIcon.png',
    		totalSize: null,
    		currentpage: parseInt(this.$route.query.p) || 1
    	};
  	},

  	mounted () {
  		this.commentsAjax(this.currentpage);
  	},

  	methods: {
  		commentsAjax (page) {
  			let Page = page || 1;
  			this.$store.commit('showLoading', {isLoading: true});
  			this.axios.get(`http://www.daoway.com/daoway/rest/service/80999f240bac4e309a28ebf03a7fd34b/comments?start=${(Page - 1)*20}&size=20`)
  				.then(res => res.data)
  				.then(response => {
  					if (response.status == 'ok') {
  						this.info = response.data;
  						this.totalSize = response.data.totalCount;
  					}
  				})
  				.then(() => {
                    this.$store.commit('showLoading', {isLoading: false})
                })
  		},
  		ShowImg (e) {
  			e.currentTarget.parentNode.querySelector(".cursmall").src = e.currentTarget.src;
  			e.currentTarget.parentNode.querySelector(".cursmall").style.display = 'block';
  		},
  		HideImg (e) {
  			e.currentTarget.style.display = 'none';
  		},
  		replyComment (e) {
  			let replySubmitSelect = e.currentTarget.parentNode.querySelector(".replySubmit").classList;
  			if (replySubmitSelect.contains('dn')) {
  				replySubmitSelect.add('db');
  				replySubmitSelect.remove('dn');
  				e.currentTarget.querySelector("span").innerHTML = '取消';
  			} else {
  				replySubmitSelect.add('dn');
  				replySubmitSelect.remove('db');
  				e.currentTarget.querySelector("span").innerHTML = '回复';
  			}
  		},
  		replySubmit (e) {
  			let currentParent = e.currentTarget.parentNode;
  			currentParent.classList.add('dn');
  			currentParent.classList.remove('db');
  			currentParent.parentNode.querySelector(".replyComment").querySelector("span").innerHTML = '回复';
  		},
  		changePage (page) {
  			this.$router.push({ path: '/manage/comment', query: { p: page }});
            this.commentsAjax(page);
  		}

  	},

  	computed: {
        isLoading () {
            return this.$store.state.isLoading
        }
    },

  	components: {
        bread
    }
};
</script>

<style lang="scss">
.comment-block{
	padding-left: 10px;
	.eval{
		margin:0 8px 0 -3px;
		vertical-align:middle;
		background: url(../../../static/images/evaluation.png) no-repeat;
    	width: 20px;
    	height: 18px;
    	display: inline-block;
	}
	.icongood{
		background-position: 0 -101px;
	}
	.iconnormal{
		background-position: 0 -50px;
	}
	.iconbad {
		background-position: 0 -1px;
	}
	.ivu-icon{
		margin-right: 5px;
	}
	.eList{
		display: flex;
		ul {
		    width: 100%;
		    zoom: 1;
		    padding: 15px 0;
		    border-bottom: 1px dotted #dbdbdb;
		}
		.elistRight {
		    width: 80%;
		    float: right;
		    .box1 {
			    color: #bbb;
			}
			.box2 {
			    line-height: 22px;
			    color: #666;
			    font-size: 14px;
			    margin-top: 8px;
				.cursmall{
					cursor: url(../../../static/images/small.png),auto;
				}
			}
			.box3 {
			    margin-top: 8px;
			    .pingfen_btn {
			    	color: #bbb
			    }
			    .replyCommentSubmit, .replyComment{
			    	margin-top: -30px;
			    }
			}
		}
		.elistLeft {
		    text-align: center;
		    float: left;
		    display: inline;
		    zoom: 1;
		    .userpic {
			    float: left;
			    border-radius: 50%;
			}
			p {
			    float: right;
			    line-height: 25px;
			    margin: 5px;
			}
		}
	}
}
</style>