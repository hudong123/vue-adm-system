<template>
	<div class="sidemenu" id="sidemenu">
		<div class="sidebar-fold"><Icon type="android-more-vertical"></Icon></div>
		<Row>
	        <Col>
	            <Menu :theme="theme2" :active-name="this.$route.path" :open-names="openName" :width="menuWidth">
	            	<router-link :to="{name: '在线客服'}"><Menu-item name="/talk" class="submenu-item"><Icon type="ios-chatbubble"></Icon><span>在线客服</span></Menu-item></router-link>	
	                <Submenu name="商户管理">
	                    <template slot="title">
	                    <Icon type="ios-paper"></Icon>
	                        <span>商户管理</span>
	                    </template>
	                    <router-link :to="{name: '客户管理'}"><Menu-item name="/manage/customer"><Icon type="person-stalker"></Icon><span>客户管理</span></Menu-item></router-link>	
						<router-link :to="{name: '订单管理'}"><Menu-item name="/manage/order"><i class="fa fa-clipboard"></i><span>订单管理</span></Menu-item></router-link>
						<router-link :to="{name: '优惠管理'}"><Menu-item name="/manage/balance"><i class="fa fa-ticket"></i><span>优惠管理</span></Menu-item></router-link>
						<router-link :to="{name: '评论管理'}"><Menu-item name="/manage/comment"><Icon type="chatbubble-working"></Icon><span>评论管理</span></Menu-item></router-link>
	                    <router-link :to="{name: '服务管理'}"><Menu-item name="/manage/service"><i class="fa fa-street-view"></i><span>服务管理</span></Menu-item></router-link>
	                    <router-link :to="{name: '账单管理'}"><Menu-item name="/manage/invoice"><Icon type="ios-list"></Icon><span>账单管理</span></Menu-item></router-link>
	                    <router-link :to="{name: '人员管理'}"><Menu-item name="/manage/people"><i class="fa fa-user"></i><span>人员管理</span></Menu-item></router-link>
	                </Submenu>    

	                <Submenu name="商户设置">
	                    <template slot="title">
	                        <Icon type="ios-gear"></Icon>
	                        <span>商户设置</span>
	                    </template>
	                    <router-link :to="{name: '店铺设置'}"><Menu-item name="/setting/shop"><i class="fa fa-home"></i><span>店铺设置</span></Menu-item></router-link>
	                    <router-link :to="{name: '忙时设置'}"><Menu-item name="/setting/busy"><Icon type="ios-clock"></Icon><span>忙时设置</span></Menu-item></router-link>
	                     <router-link :to="{name: '账户设置'}"><Menu-item name="/setting/account" @click.native="tabDefault"><Icon type="gear-a"></Icon><span>账户设置</span></Menu-item></router-link>
	                </Submenu>

	                <Submenu name="商户明细">
	                    <template slot="title">
	                        <Icon type="stats-bars"></Icon>
	                        <span>商户明细</span>
	                    </template>
	                    <router-link :to="{name: '财务明细'}"><Menu-item name="/detail/finance"><Icon type="social-yen"></Icon><span>财务明细</span></Menu-item></router-link>
	                    <router-link :to="{name: '数据统计'}"><Menu-item name="/detail/statistics"><i class="fa fa-bar-chart"></i><span>数据统计</span></Menu-item></router-link>
	                </Submenu>
	                <router-link :to="{name: '商户公告'}"><Menu-item name="/announce" class="submenu-item"><Icon type="volume-medium"></Icon><span>商户公告</span></Menu-item></router-link> 
	                
	            </Menu>
	        </Col>
	    </Row>
	</div>
</template>

<script>
export default {

  name: 'AsideMenu',

  data () {
    return {
        theme2: 'dark',
        activeName: '',
        openName: [this.$route.matched[0].name],
        isFlex: false,
        menuWidth: '180px'
    }
   },
   methods: {
   	tabDefault() {
   		this.$store.commit('changeTab', '1');
   	}
   },
   created() {
   }
};
</script>

<style lang="scss">
#sidemenu{
    background-color: #293038;
    overflow-x: hidden;
    overflow-y: auto;
    float: left;
    height: 100%;
    .sidebar-fold{
    	height: 30px;
	    background: #394555;
	    color: #aeb9c2;
	    text-align: center;
	    cursor: default;
	    line-height: 30px!important;
	    font-size: 24px;
	    -ms-user-select: none;
	    user-select: none;
	    -webkit-user-select: none;
	    -moz-user-select: none;
	    i{
	    	font-size: 24px;
	    }
    }
	ul.ivu-menu{
		font-size: 12px;
		li.ivu-menu-item{
			padding: 11px 24px 11px 44px;
			font-size: 12px;
		}
		.submenu-item{
			margin-left: -20px;
			.ivu-icon{
				margin-right: 11px !important;
			}
		}
		.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title{
			background: #464c5b;
			color: #fff;
			padding: 14px 24px;
		    position: relative;
		    cursor: pointer;
		    z-index: 1;
		    -webkit-transition: all .2s ease-in-out;
		    transition: all .2s ease-in-out;
		}
		li.ivu-menu-item-selected{
			background: #09c !important;
		}
		li.ivu-menu-item-selected{
			a{
				color: #fff;
			}
		}
		.ivu-menu-vertical .ivu-menu-submenu-title-icon{
			float: right;
    		position: relative;
    		top: 3px;
		}
		.ivu-icon{
		    display: inline-block;
		    font-family: Ionicons;
		    font-weight: 400;
		    line-height: 1;
		    font-size: 14px;
		}
		.ivu-menu-item{
			a{
				color: #9ea7b4;
				.ivu-icon{
					margin-right: 6px;
				}
			}
		}
		.router-link-active{
			.ivu-menu-item-active{
				color: #fff;
			}
		}
	}
}
</style>