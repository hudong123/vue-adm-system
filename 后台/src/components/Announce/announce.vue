<template>
	<Row>
		<Col span="24" class="announce-block pr10">
			<Breadcrumb class="pl10">
				当前位置：
		        <Breadcrumb-item>{{$route.matched[0].name}}</Breadcrumb-item>
		        <Breadcrumb-item>{{$route.matched[0].name}}</Breadcrumb-item>
		    </Breadcrumb>
		    <Card class="mt15">
		    	<p slot="title">
					<Icon type="volume-high"></Icon>公告
				</p>
				<div v-show="isLoading == false">
					<Timeline>
							<div v-for="(item, index) in info.read" class="ivu-timeline-block">
								<Timeline-item>
						            <span class="time">{{format(item.modifyTime)}}</span>
						            <a :href="item.url" target="_blank" class="ml20">{{item.title}}</a>
						            <!-- <a :href="item.url" target="_blank" style="display:block; margin-top: 15px">{{item.title}}</a> -->
						        </Timeline-item>
							</div>
				    </Timeline>
				</div>
		    </Card>
		</Col>
	</Row>
</template>

<script>
export default {

  	name: 'announce',

  	data () {
    	return {
    		info: {}
    	};
  	},

  	computed: {
  		isLoading () {
  			return this.$store.state.isLoading;
  		}
  	},

  	mounted () {
  		this.$store.commit('showLoading', {isLoading: true});
  		this.axios.get(`http://www.daoway.com/daoway/rest/service/service_notice/910da3040f444a82859cbe472aa779be`)
  			.then(response => {
  				if (response.data.status == 'ok') {
  					this.info = response.data.data;
  					this.$store.commit('showLoading', {isLoading: false});
  				}
  			})
  	}
};
</script>

<style lang="scss">
.announce-block{
	padding-left: 10px;
	.ivu-icon{
		margin-right: 5px;
	}
	.time{
        font-size: 14px;
        font-weight: bold;
    }
    .content{
        padding-left: 5px;
    }
    .ivu-timeline-item:last-child .ivu-timeline-item-tail {
	    display: block;
	}
	.ivu-timeline-block:last-child .ivu-timeline-item-tail {
	    display: none;
	}
}
</style>