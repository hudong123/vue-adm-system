<template>
	<Row>
		<Col span="24" class="talk-block pr10">
			<Breadcrumb class="pl10">
				当前位置：
		        <Breadcrumb-item>{{$route.matched[0].name}}</Breadcrumb-item>
		        <Breadcrumb-item>{{$route.matched[0].name}}</Breadcrumb-item>
		    </Breadcrumb>
		    <Card class="mt15 webim-chat">
		    	<div class="webim-contact-wrapper">
		    		<div class="webim-contact-item">
		    			<div class="webim-avatar-icon">
		    				<img src="http://img.daoway.cn/img/2015/08/06/cf8838af-0560-4f73-beaf-eb394ff92ab9.jpg" >
		    			</div> 
		    			<div class="webim-contact-info">
		    				<span class="webim-contact-username">到位官方客服<span style="font-size: 11px; float: right; color: rgb(153, 153, 153);">昨天17:19</span></span>
		    			</div>
		    			<em>尊敬的e修鸽客服，您的提款已经汇出，预计今天到账，请您注意查收。</em> 
		    			<i class="webim-msg-prompt">1</i>
		    		</div>
		    		<div class="webim-contact-item" v-for="list in lists">
		    			<div class="webim-avatar-icon">
		    				<img src="http://img.daoway.cn/img/2015/08/06/cf8838af-0560-4f73-beaf-eb394ff92ab9.jpg" >
		    			</div> 
		    			<div class="webim-contact-info">
		    				<span class="webim-contact-username">到位官方客服<span style="font-size: 11px; float: right; color: rgb(153, 153, 153);">昨天17:19</span></span>
		    			</div>
		    			<em>尊敬的e修鸽客服，您的提款已经汇出，预计今天到账，请您注意查收。</em> 
		    			<i class="webim-msg-prompt" style="display: none;">0</i>
		    		</div>
		    	</div>
		    	<div class="webim-chatwindow">
		    		<div class="webim-chattitle">
		    			<span class="bold">何时何时</span><span style="color: #80848f">（1811518522 江苏省南京市雨花台区菊花路）</span>
		    		</div>
		    		<div class="webim-chatcustomer">
		    			<div class="webim-chatuser-icon">
		    				<!-- <img src="http://img.daoway.cn/img/2015/08/06/cf8838af-0560-4f73-beaf-eb394ff92ab9.jpg" > -->
		    			</div>
		    		</div>
		    		<div class="webim-chatkefu">
		    			
		    		</div>
		    	</div>
		    </Card>
		</Col>
	</Row>
</template>

<script>
export default {

  	name: 'Talk',

  	data () {
    	return {
    		lists: [
    			{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
    		]
    	};
  	},

  	methods: {
  		getMessage () {
  			this.axios.get(`http://wechat.daoway.cn/daoway-im/query-message.html?callback=jsonp1495677609650`)
  				.then(res => res.data)
  				.then(response => {
  					 
  				})
  		}
  	},

  	mounted () {
  		this.getMessage();
  	}
};
</script>

<style lang="scss">
.talk-block{
	padding-left: 10px;
	height: 100%;
	.ivu-card-body{
		height: 100%;
	}
	.ivu-icon{
		margin-right: 5px;
	}
	.webim-chat {
	    position: relative;
	    height: calc(100% - 45px);
	    margin: auto;
	    box-shadow: rgba(0, 0, 0, 0.298039) 0px 0px 1px 0px;
	    border: 0px none black;
	    -webkit-tap-highlight-color: transparent;
	    background-color: white;
	    border-radius: 2px;
	    overflow: hidden;
	    .webim-contact-wrapper{
		    float: left;
		    width: 300px;
		    overflow-x: hidden;
		    overflow-y: auto;
		    height: 100%;
		    border-right: 1px solid #f2f2f2;
		    -webkit-tap-highlight-color: transparent;
		    background-color: white;
		    .webim-contact-item {
			    cursor: pointer;
			    position: relative;
			    width: 100%;
			    overflow: hidden;
			    height: 60px;
			}
			.webim-contact-item .webim-avatar-icon {
			    float: left;
			    margin: 10px;
			}
			.webim-avatar-icon {
			    width: 40px;
			    height: 40px;
			    border-radius: 50%;
			    overflow: hidden;
			    -webkit-filter: contrast(1.2);
			    -webkit-tap-highlight-color: transparent;
			    img{
			    	width: 100%;
			    	height: 100%;
			    }
			}
			.webim-contact-item .webim-contact-info {
			    position: relative;
			}
			.webim-contact-item>span, .webim-contact-item .webim-contact-username {
			    color: #1a1a1a;
			    font-size: 14px;
			    margin: 10px 0;
			    display: inline-block;
			    width: calc(100% - 70px);
			    overflow: hidden;
			    white-space: nowrap;
			    text-overflow: ellipsis;
			}
			.webim-contact-item>em {
			    display: block;
			    height: 20px;
			    line-height: 20px;
			    width: calc(100% - 100px);
			    position: absolute;
			    margin: auto;
			    left: 30px;
			    top: 30px;
			    right: 10px;
			    color: #999999;
			    font-style: normal;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			    overflow: hidden;
			}
			.webim-msg-prompt {
			    position: absolute;
			    top: -4px;
			    right: 0;
			    line-height: 16px;
			    font-style: normal;
			    width: 18px;
			    height: 18px;
			    font-size: 12px;
			    text-align: center;
			    color: #fff;
			    border-radius: 50%;
			    border: 2px solid #fcfdfb;
			    -webkit-tap-highlight-color: transparent;
			    background-color: #ff3a00;
			}
			.webim-contact-item>i {
			    display: inline-block;
			    right: 2px;
			    bottom: 10px;
			    top: auto;
			}
		}
		.webim-chatwindow{
		    position: relative;
		    float: left;
		    height: 100%;
		    width: calc(100% - 300px);
		    .webim-chattitle{
		    	position: absolute;
			    top: 0;
			    width: 100%;
			    height: 40px;
			    line-height: 40px;
			    text-align: center;
			    font-size: 14px;
		    }
		    .webim-chatuser-icon{
		    	width: 40px;
			    height: 40px;
			    border-radius: 50%;
			    overflow: hidden;
			    -webkit-filter: contrast(1.2);
			    -webkit-tap-highlight-color: transparent;
			    img{
			    	width: 100%;
			    	height: 100%;
			    }
		    }
		}
	}
}
</style>