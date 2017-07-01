<template>
	<div class="sidemenu" id="sidemenu">
		<div class="sidebar-fold"><Icon type="android-more-vertical"></Icon></div>
		<Row>
	        <Col>
	            <Menu :theme="theme2" :active-name="this.$route.path" :open-names="openName" :width="menuWidth">
	            	<Tooltip content="首页" placement="right">
	            		<router-link :to="{name: '首页'}" class="home"><Menu-item name="/home" class="submenu-item"><Icon type="home"></Icon><span>首页</span></Menu-item></router-link>
	            	</Tooltip>
	                <Submenu name="个人中心">
	                    <template slot="title">
	                        <Icon type="ionic"></Icon>
	                        <span>个人中心</span>
	                    </template>
	                    <Tooltip content="账户设置" placement="right">
	                    	<router-link :to="{name: '账户设置'}"><Menu-item name="/setting/account" @click.native="tabDefault"><Icon type="gear-a"></Icon><span>账户设置</span></Menu-item></router-link>
	                    </Tooltip>
	                </Submenu>

	                <Submenu name="用户中心">
	                    <template slot="title">
	                        <Icon type="ios-person"></Icon>
	                        <span>用户中心</span>
	                    </template>
	                    <Tooltip content="用户管理" placement="right">
	                    	<router-link :to="{name: '用户管理'}"><Menu-item name="/user/user"><i class="fa fa-user"></i><span>用户管理</span></Menu-item></router-link>
	                    </Tooltip>	
	                </Submenu>

	                <Submenu name="供需管理">
	                    <template slot="title">
	                        <i class="fa fa-street-view"></i>
	                        <span>供需管理</span>
	                    </template>
	                    <Tooltip content="技能管理" placement="right">
	                    	<router-link :to="{name: '技能管理'}"><Menu-item name="/skill/skill"><Icon type="gear-b"></Icon><span>技能管理</span></Menu-item></router-link>
	                    </Tooltip>	
	                </Submenu>

	                <Submenu name="APP管理">
	                    <template slot="title">
	                        <Icon type="iphone"></Icon>
	                        <span>APP管理</span>
	                    </template>
	                    <Tooltip content="广告页管理" placement="right">
	                    	<router-link :to="{name: '广告页管理'}"><Menu-item name="/app/ad"><Icon type="paper-airplane"></Icon><span>广告页管理</span></Menu-item></router-link>
	                    </Tooltip>
	                    <Tooltip content="banner管理" placement="right">
	                    	<router-link :to="{name: 'banner管理'}"><Menu-item name="/app/banner"><Icon type="images"></Icon><span>banner管理</span></Menu-item></router-link>
	                    </Tooltip>
	                    <Tooltip content="推送管理" placement="right">
	                    	<router-link :to="{name: '推送管理'}"><Menu-item name="/app/push"><Icon type="ios-email"></Icon><span>推送管理</span></Menu-item></router-link>
	                    </Tooltip>
	                </Submenu>

	                <Submenu name="财务管理">
	                    <template slot="title">
	                        <Icon type="ios-list"></Icon>
	                        <span>财务管理</span>
	                    </template>
	                    <Tooltip content="财务管理" placement="right">
	                    	<router-link :to="{name: '管理财务'}"><Menu-item name="/finance/finance"><Icon type="ios-list-outline"></Icon><span>管理财务</span></Menu-item></router-link>
	                    </Tooltip>
	                </Submenu>

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
    .ivu-tooltip-popper{
    	display: none !important;
    	position: fixed !important;
    }
    .ivu-tooltip-rel{
		width: 100% !important;
	}
	.ivu-tooltip{
		width: 100% !important;
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