<template>
	<section class="topbar">
		<Row>
			<Col span="24">
				<div class="nav-center">
					<div class="nav-item">
						<img src="../../assets/images/logo.svg" class="logo">
						<strong class="admin">Admin</strong>
					</div>
				</div>
				<div class="nav-right">
	        		<Dropdown trigger="click">
					    <a href="javascript:void(0)" class="user-name">{{username}}<Icon type="arrow-down-b"></Icon></a>
					    <Dropdown-menu slot="list">
					    	<Dropdown-item @click.native="tabSelect('1')">个人信息</Dropdown-item>
					    	<Dropdown-item @click.native="tabSelect('2')">修改密码</Dropdown-item>
					        <Dropdown-item divided  @click.native="logOut">退出</Dropdown-item>
					    </Dropdown-menu>
					</Dropdown>
	        	</div>
			</Col>
		</Row>
	</section>
</template>

<script>
export default {

  	name: 'Header',

  	data () {
    	return {
    		username: ''
    	};
  	},
  	methods: {
  		tabSelect (value) {
  			this.$store.commit('changeTab', value);
        	this.$router.push({ path: '/setting/account', params:{name: '账户设置', page: 1}});
    	},
    	logOut () {
    		this.$router.push({ path: '/'});
    	}
  	},
  	mounted () {
  		this.username = JSON.parse(localStorage.getItem('user'));
  	}
};
</script>

<style lang="scss">
.topbar{
    clear: both;
    height: 50px;
    width: 100%;
    font-size: 14px;
    line-height: 50px;
    box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
    .ivu-col{
    	height: 50px;
    }
    .nav-center{
    	width: 160px;
    	margin: 0 auto;
    	.nav-item{
	    	-ms-flex-align: center;
		    align-items: center;
		    display: -ms-flexbox;
		    display: flex;
		    -ms-flex-positive: 0;
		    flex-grow: 0;
		    -ms-flex-negative: 0;
		    flex-shrink: 0;
		    font-size: 1rem;
		    -ms-flex-pack: center;
		    justify-content: center;
			.logo{
		    	width: 24px;
		    	height: 25px;
		    }
		    .admin{
		    	color: #28374B;
		    	margin-left: 10px;
		    	font-size: 1rem;
		    }
	    }
    }
    .nav-right{
    	position: absolute; 
    	right: 50px;
    	top: 0px;
    	.user-name{
    		color: #7a7a7a
    	}
    	.ivu-icon{
    		margin-left: 5px;
    	}
    }
}
</style>