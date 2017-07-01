<template>
	<div class="sidemenu" id="sidemenu">
		<div class="sidebar-fold">
			<p class="menu-label">
		    	General
		  	</p>
		</div>
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
	        theme2: 'light',
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
   }
};
</script>

<style lang="scss">
.min{
	span{
		display: none;
	}
	.ivu-menu-vertical{
		width: 70px !important;
	}
	.ivu-menu-submenu{
		.ivu-menu{
			border-left: none !important;
			padding-left: 0px !important;
			margin-left: 0px !important;
			margin-right: 0px !important;
		}
	}
	.ivu-menu-submenu-title{
		padding: 14px 16px !important;
	}
	.ivu-tooltip-popper{
		position: fixed !important;
	}
	.ivu-tooltip{
		width: 100% !important;
	}
	.ivu-tooltip-rel{
		width: 100% !important;
	}
	.ivu-menu-item > i{
		margin-left: 5px;
	}
	.home{
		.submenu-item{
			margin-left: -9px !important;
		}
	}
}
#sidemenu{
    overflow-x: hidden;
    overflow-y: auto;
    float: left;
    height: 100%;
    border-right: 1px solid #dbdbdb;
    //box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
    .sidebar-fold{
    	.menu-label {
		    color: #7a7a7a;
		    font-size: 0.8em;
		    letter-spacing: 0.1em;
		    text-transform: uppercase;
		    padding-left: 5px;
		    margin-bottom: 1em;
		    margin-top: 20px;
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
    .ivu-menu-vertical.ivu-menu-light:after{
    	display: none;
    }
    .ivu-menu-submenu-title-icon{
    	top: 2px;
    }
	ul.ivu-menu{
		font-size: 12px;	
		li.ivu-menu-item{
			padding: 11px 24px 11px 20px;
			font-size: 12px;
			color: #4a4a4a;
		}
		.submenu-item{
			margin-left: 4px;
			.ivu-icon{
				margin-right: 11px !important;
			}
		}
		.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title{
			padding: 14px 24px 14px 20px;
		    position: relative;
		    cursor: pointer;
		    z-index: 1;
		    -webkit-transition: all .2s ease-in-out;
		    transition: all .2s ease-in-out;
		}
		.ivu-menu-submenu{
			.ivu-menu{
				margin: 0 10px 0 27px;
				border-left: 1px solid #dbdbdb;
    			padding-left: 0.75em;
    			.ivu-menu-item:not(.ivu-menu-item-active):hover{
					color: #00d1b2
    			}
			}
		}
		.ivu-menu-submenu-title:hover{
			color: #00d1b2;
		}
		.ivu-menu-vertical .ivu-menu-submenu-title-icon{
			float: right;
    		position: relative;
    		top: 2px;
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
				.ivu-icon{
					margin-right: 6px;
				}
			}
		}
		.ivu-menu-item-active:not(.ivu-menu-submenu){
			border-right: none;
			background-color: #00d1b2;
    		color: #fff;
		}
		.router-link-active{
			.ivu-menu-item-active{
				
			}
		}
	}
}
</style>