<template>
	<Row>
		<Col span="24" class="customer-block pr10">
			<bread></bread>
			<Card class="mt15">
				<p slot="title">
					<!-- <Icon type="person-stalker"></Icon>客户管理 -->
					累计用户：{{info.totalSize}}
				</p>
				<Input v-model="searchInput" slot="extra" placeholder="请输入客户手机号"><span slot="append" class="curp">搜索</span></Input>
				<div class="table-block" v-show="isLoading == false">
					<Table :context="self" :columns="columns1" :data="data1" stripe border></Table>
					<div style="margin: 10px;overflow: hidden">
					    <div style="float: right;">
					        <Page :total="totalCount" :current="currentpage" @on-change="changePage" show-elevator :page-size="20"></Page>
					    </div>
					</div>
					<Modal v-model="modal1" cancel-text="" width="1000" class="customer-modal">
						<p slot="header" style="color: #39f">
				            <Icon type="information-circled"></Icon>
				            <span>订单详情</span>
				        </p>
				        <div class="bottomp">
				        	<div class="loading">
				                <img src="../../../static/images/loading.gif" v-show="showLoading">
				             </div>
							<Table :context="self" stripe border :columns="columns2" :data="data2" v-show="!showLoading"></Table>
				        	<div v-if="!showLoading" style="margin: 10px;overflow: hidden;padding-top:2px;">
								<div style="float: right;">
									<Page :total="history_info.totalSize" :current="1" :page-size="9999" show-elevator></Page>
								</div>
							</div>
				        </div>
				    </Modal>
				</div>
			</Card>
		</Col>
	</Row>
</template>

<script>
import bread from '../../components/Bread/Bread';
import expandRow  from '../../components/Expand/expand-row-customer';

export default {

  	name: 'customer',

  	data () {
    	return {
    		info: {},
    		history_info: {},
    		history_info_table: [],
    		modal1: false,
    		showLoading: true,
    		searchInput: '',
    		self: this,
    		totalCount: null,
    		error: false,
    		currentpage: parseInt(this.$route.query.p) || 1,
    		columns1: [
    			{
    				title: '客户昵称',
    				key: 'nickname',
    				render (row, column, index) { 
    					return `<b>${row.nickname}</b>`
    				}
    			},
    			{
    				title: '手机号',
    				key: 'phone'
    			},
    			{
    				title: '累计订单',
    				key: 'order_count'
    			},
    			{
    				title: '下单金额',
    				key: 'total_price'
    			},
    			{
    				title: '成交金额',
    				key: 'real_consume'
    			},
    			{
    				title: '最后下单时间',
    				key: 'last_order_time'
    			},
    			{
    				title: '操作',
    				key: 'action',
    				align: 'center',
    				width: 120,
    				render (row, column, index) {
                        return `<i-button type="info" size="small" @click="Ajax_customer_history()"><Icon type="android-list"></Icon>查看订单</i-button>`;
                    }
    			}
    		],
    		data1: [],
    		columns2: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                {
                    title: '联系人',
                    key: 'contactPerson'
                },
                {
                    title: '用户电话',
                    key: 'phone',
                    width: 115
                },
                {
                    title: '下单时间',
                    key: 'createTime',
                    width: 135,
                    render (row, column, index) {
                        return `<b>${row.createTime}</b>`;
                    }
                },
                {
                    title: '预约时间',
                    key: 'appointTime',
                    width: 135,
                    render (row, column, index) {
                        return `<b>${row.appointTime}</b>`;
                    }
                },
                {
                	title: '数量',
                	key: 'inAccount'
                },
                {
                	title: '订单金额',
                	key: 'money'
                },
                {
                	title: '服务项目',
                	key: 'serviceName'
                },
                {
                	title: '图片',
                	key: 'picUrl',
                	width: 65,
                	render (row, column, index) {
                        return `<img :src="row.picUrl" class="serviceImg" alt="">`;
                    }
                },
                {
                	title: '订单状态',
                	key: 'statusDesc',
                	width: 100,
                	render (row, column, index) {
                        return `<div :class="{primary : row.statusDesc === '商家已确认' || row.statusDesc === '新订单', success :  row.statusDesc === '用户已评价' || row.statusDesc === '商家确认完成' || row.statusDesc === '交易成功', error: row.statusDesc === '用户取消' || row.statusDesc === '商家已取消' || row.statusDesc === '用户申请退款'}"><b>{{row.statusDesc}}</b></div>`;
                    }
                }
            ],
            data2: []
    	};
  	},

  	mounted () {
  		this.$store.commit('showLoading', {isLoading: false})
  		this.Ajax_bought_customers(this.currentpage)
  	},

  	components: {
  		bread,
  		expandRow
  	},

  	computed: {
  		isLoading () {
  			return this.$store.state.isLoading;
  		}
  	},

  	methods: {
  		changePage (page) {
  			this.$router.push({ path: '/manage/customer', query: { p: page }});
  			this.Ajax_bought_customers(page);
  		},
  		Ajax_bought_customers (page) {
  			this.$store.commit('showLoading', {isLoading: true});
	  		this.axios.get(`http://www.daoway.com/daoway/rest/service/80999f240bac4e309a28ebf03a7fd34b/bought_customers?userId=910da3040f444a82859cbe472aa779be&start=0&size=20&orderField=order_count&orderValue=desc&page=${page}`)
	  			.then(response => this.info = response.data)
	  			.then(res => {
	  				if (res.status == 'ok') {
	  					let tableData = [];
		  				this.totalCount = res.totalSize;
		  				this.$nextTick(() => {
		  					for (let i = 0, ilength = res.data.length; i < ilength; i++) {
		  						tableData.push({
		  							nickname: res.data[i].nickname,
			  						phone: res.data[i].phone,
			  						order_count: res.data[i].order_count,
			  						total_price: res.data[i].total_price,
			  						real_consume: res.data[i].real_consume,
			  						last_order_time: this.format(res.data[i].last_order_time)
		  						})
		  					}
		  					this.data1 = tableData;
		  				})
	  				}
	  			})
	  			.then(() => this.$store.commit('showLoading', {isLoading: false}))
  		},
  		Ajax_customer_history () {
  			this.modal1 = true;
  			this.showLoading = true;
  			this.axios.get(`http://www.daoway.com/daoway/rest/orders/80999f240bac4e309a28ebf03a7fd34b/customer_history?userId=910da3040f444a82859cbe472aa779be&customerId=8ff88b104ea74069952f9e70f17d2489&start=0&size=20`)
  				.then(response => response.data)
  				.then(res => {
  					if (res.status == 'ok') {
	  					let tableData = [];
		  				this.$nextTick(() => {
		  					for (let i = 0, ilength = res.data.length; i < ilength; i++) {
		  						tableData.push({
		  							contactPerson: res.data[i].contactPerson,
			  						phone: res.data[i].buyer.phone,
			  						address: res.data[i].address,
			  						orderId: res.data[i].orderId,
			  						createTime: this.format(res.data[i].createTime, 'yyyy-MM-dd HH:mm'),
			  						appointTime: this.format(res.data[i].appointTime, 'yyyy-MM-dd HH:mm'),
			  						inAccount: res.data[i].inAccount,
			  						money: res.data[i].money.toFixed(2),
			  						statusDesc: res.data[i].statusDesc,
			  						note: res.data[i].note || '无备注',
			  						paid: res.data[i].paid,
			  						serviceName: res.data[i].items[0].name,
			  						picUrl: res.data[i].items[0].picUrl,
			  						quantity: res.data[i].items[0].quantity,
			  						price: parseFloat(res.data[i].items[0].price).toFixed(2)
		  						})
		  					}
		  					this.data2 = tableData;
		  				})
	  				}
  				})
  				.then(() => {
  					this.showLoading = false;
  				})
  		}
  	}

};
</script>

<style lang="scss">
.customer-block{
	padding-left: 10px;
	.ivu-icon{
		margin-right: 5px;
	}
	.ivu-card-extra{
		top: 8px;
	}
}
.order-content-list-order{
	img{
		width: 30px;
		height: 30px;
		border-radius: 3px;
	}
	span{
		margin-top: 5px;
	}
}
.customer-modal{
	.serviceImg{
		width: 30px;
		height: 30px;
		border-radius: 3px;
	}
	.loading{
	    position: relative;
	    top: 50%;
	    left: 50%;
	    z-index: 10000;
	    animation: loading .4s linear infinite;
	   background-size: contain;
	}
}
</style>