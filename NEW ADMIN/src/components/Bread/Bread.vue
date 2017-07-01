<template>
	<Breadcrumb>
		<div class="bread-left fl">
			<strong>{{$route.name}}</strong>
		</div>
		<div class="bread-right fr">
        	<Breadcrumb-item>{{$route.matched[0].name}}</Breadcrumb-item>
        	<Breadcrumb-item>{{$route.name}}</Breadcrumb-item>
        	<!-- 首页 / {{$route.matched[0].name}} / {{$route.name}} -->
		</div>

    </Breadcrumb>
</template>

<script>
export default {

  	name: 'Bread',

  	data () {
    	return {

    	};
  	}
};
</script>

<style lang="scss">
.bread-left {
	color: #363636;
	width: 100px;
}
.bread-right{
	span:first-child{
		.ivu-breadcrumb-item-link{
			color: #5cadff
		}
	}
	span:last-child{
		.ivu-breadcrumb-item-separator{
			display: none;
		}
		.ivu-breadcrumb-item-link{
			color: #4a4a4a;
		}
	}

}
</style>