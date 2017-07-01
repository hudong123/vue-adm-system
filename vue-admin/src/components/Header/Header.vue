<template>
	<div class="topbar">
		<Row>
	        <Col span="24">
	        	<Col span="12">
	        		<a class="topbar-home" href="javascript:void(0)"></a>
	        		<a class="topbar-home-link" href="javascript:void(0)">商家管理后台</a>
	        	</Col>
	        	<Col span="12">
	        		<div class="topbar-info">
	        			<Dropdown trigger="click">
					        <a href="javascript:void(0)" class="user-name"><Icon type="person"></Icon>{{username}}<Icon type="arrow-down-b"></Icon></a>
					        <Dropdown-menu slot="list">
					            <Dropdown-item @click.native="tabSelect('1')">个人信息</Dropdown-item>
					            <Dropdown-item @click.native="tabSelect('2')">修改密码</Dropdown-item>
					            <Dropdown-item @click.native="tabSelect('3')">收入提现</Dropdown-item>
					            <Dropdown-item @click.native="tabSelect('4')">设置提现账户</Dropdown-item>
					            <Dropdown-item divided  @click.native="logOut">退出</Dropdown-item>
					        </Dropdown-menu>
					    </Dropdown>
	        		</div>
	        	</Col>
	        </Col>
	    </Row>
	</div>
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
    background: #09c;
    color: #fff;
    font-size: 14px;
    line-height: 50px;
    .topbar-home{
    	position: relative;
	    display: block;
	    width: 50px;
	    background: #0087b4;
	    font-size: 28px;
	    color: #fff;
	    text-align: center;
	    height: 50px;
	    line-height: 50px;
	    overflow: hidden;
	    float: left;
    }
    .topbar-home:before{
    	content: "";
	    position: absolute;
	    width: 28px;
	    height: 28px;
	    left: 11px;
	    top: 11px;
	    display: inline-block;
	    background: url('../../assets/images/logo_01.png') no-repeat 50%;
    }
    .topbar-home-link{
    	display: inline-block;
	    height: 50px;
	    box-sizing: border-box;
	    padding: 0 20px;
	    color: #fff;
	    font-size: 14px;
	    line-height: 50px;
	    border-right: 1px solid #008fbf;
    }
    .topbar-info{
    	float: right;
	    line-height: 50px;
	    padding: 0 10px;
	    height: 50px;
	    display: block;
	    z-index: 2;
	    background: #09c;
	    color: #fff;
	    font-size: 14px;
	    border-left: 1px solid #008fbf;
	    border-right: 1px solid #008fbf;
	    margin-right: 40px;
	    text-align: center;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    overflow: hidden;
	    .user-name{
	    	display: block;
    		width: 100%;
    		color: #fff;
    		font-size: 14px;
    		.ivu-icon{
    			margin-right: 6px;
    			margin-left: 6px;
    		}
	    }
    }
}
</style>