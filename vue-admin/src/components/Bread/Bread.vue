<template>
	<Breadcrumb class="pl10">
		当前位置：
        <Breadcrumb-item>{{$route.matched[0].name}}</Breadcrumb-item>
        <Breadcrumb-item>{{$route.name}}</Breadcrumb-item>
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

<style lang="css" scoped>
</style>