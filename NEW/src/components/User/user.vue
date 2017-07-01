<template>
	<Row>
		<Col span="24">
			<bread></bread>
			<Card class="mt30 user-block">
				<div class="mt15">
					<Table striped border :context="self" :columns="columns1" :data="data1"></Table>
				</div>
			</Card>
		</Col>
	</Row>		
</template>

<script>
import bread from '../../components/Bread/Bread';
export default {

  	name: 'user',

	data () {
    	return {
    		self: this,
    		columns1: [
    			{
    				title: '头像',
    				key: 'avatar',
    				width: 97,
    				className: 'p5',
    				render (row, column, index) {
    					return `<img src="${row.avatar}" alt="${row.nickname}" width="80" height="80"/>`
    				}
    			},
    			{
    				title: '昵称',
    				key: 'nickname'
    			},
    			{
    				title: '年龄',
    				key: 'age'
    			},
    			{
    				title: '性别',
    				key: 'sex'
    			},
    			{
    				title: '微信号',
    				key: 'wx'
    			},
    			{
    				title: '公司单位',
    				key: 'company'
    			},
    			{
    				title: '简介',
    				key: 'description'
    			},
    			{
    				title: '是否展示微博',
    				key: 'showWeibo'
    			}
    		],
    		data1: [
    			{
    				'avatar' : 'http://img.daoway.cn/img/2016/11/22/8f7106bb-4dae-4e65-a5a0-7f8add4d119b.jpg',
    				'nickname' : '测试',
    				'age' : 0,
    				'sex' : '男',
    				'wx' : 794314659,
    				'company' : 'e修鸽',
    				'description' : '无',
    				'showWeibo' : '是'
    			}
    		]
    	};
  	},

  	components: {
  		bread
  	}

};
</script>

<style lang="scss">
.user-block{
	.p5{
		.ivu-table-cell{
			padding: 5px;
		}
	}
}
</style>