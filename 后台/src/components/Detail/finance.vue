<template>
	<Row>
		<Col span="24" class="finance-block pr10">
			<bread></bread>
			<Card class="mt15">
				<div slot="title">
					<Radio-group v-model="radioButton" type="button">
				        <Radio label="全部"></Radio>
				        <Radio label="收入"></Radio>
				        <Radio label="支出"></Radio>
				    </Radio-group>
				    <Icon type="help-circled" class="curp"></Icon>
				    <div class="title-right">
				    	<div class="date-block">
				    		<Button type="ghost" class="fr ml10" @click="exportData"><Icon type="ios-cloud-download-outline"></Icon>导出Excel</Button>
							<Button type="primary" class="fr ml10" @click="search"><Icon type="ios-search"></Icon>查询</Button>
							<Date-picker type="date" placeholder="选择日期" class="date fr enddate" v-model="enddate" :clearable="false"></Date-picker>
							<div class="between fr text-center">--</div>
							<Date-picker type="date" placeholder="选择日期" class="date fr startdate" v-model="startdate" :clearable="false"></Date-picker>
				    	</div>
						<div class="select-block">
							<Select v-model="Select1" class="w120 mr10">
							    <Option v-for="item in select1" :value="item.value" :key="item">{{ item.label }}</Option>
							</Select>
							<Select v-model="Select2" class="w60 mr10">
							    <Option v-for="item in select2" :value="item.value" :key="item">{{ item.label }}</Option>
							</Select>
						</div>
					</div>
				</div>
				<div class="table-block" v-show="!isLoading">
                    <span class="mr50" v-if="radioButton != '支出'"><span class="info bold">收入</span>：<span class="bold">134,408.19</span>元 <span class="bold">1279</span>笔</span>
                    <span class="mr50" v-if="radioButton != '收入'"><span class="warning bold">支出</span>：<span class="bold">-4,408.19</span>元 <span class="bold">19</span>笔</span>
                    <span><span class="success">可提现金额</span>：<span class="bold">134,48.19</span>元</span>
                    <Button type="primary" class="ml25" size="small" @click="tab3"><Icon type="loop"></Icon>提现</Button>
					<Table :context="self" stripe border :columns="title" :data="info" class="mt15" ref="table"></Table>
					<div style="margin: 10px;overflow: hidden">
					    <div style="float: right;">
					        <Page :total="totalCount" :current="currentpage" @on-change="changePage" show-elevator :page-size="20"></Page>
					    </div>
					</div>
					<Modal v-model="modal1" cancel-text="" width="900">
						<p slot="header" style="color: #39f">
				            <Icon type="information-circled"></Icon>
				            <span>订单详情</span>
				        </p>
				        <Table :context="self" border stripe :columns="detailcolumns1" :data="detaildata1" ref="detail1"></Table>
				        <Table :context="self" border stripe :columns="detailcolumns2" :data="detaildata2" ref="detail2" class="mt15"></Table>
				        <div class="bottomp">
				        	<p>订单号：&nbsp; <b>170417150859897</b></p>
					        <p>用户备注：&nbsp;<span class="cffb400">无备注</span></p>
					        <p>支付状态：&nbsp;<span class="color-gre">已支付</span>&nbsp;<span class="ml10">在线支付<b>100.00</b>元</span></p>
					        <p>普通电视机维修<span class="ml10">数量：<span class="cffb400">1</span> <span class="ml10">单价</span>：<b>120.00</b>元 <span class="ml10">总价：</span><b>120.00</b>元</span></p>
				        </div>
				    </Modal>
				</div>
			</Card>
		</Col>
	</Row>
</template>

<script>
import bread from '../../components/Bread/Bread';
export default {

  	name: 'finance',

  	data () {
  		return {
      			totalCount: null,
      			modal1: false,
      			currentpage: parseInt(this.$route.query.p) || 1,
      			radioButton: '全部',
      			self: this,
      			select1: [
	                {
	                    value: '全部',
	                    label: '全部'
	                },
	                {
	                    value: '按入账时间查询',
	                    label: '按入账时间查询'
	                },
	                {
	                    value: '按下单时间查询',
	                    label: '按下单时间查询'
	                }
	            ],
	            Select1: '按入账时间查询',
	            select2: [
	                {
	                    value: '全部',
	                    label: '全部'
	                },
	                {
	                    value: '提现',
	                    label: '提现'
	                },
	                {
	                    value: '奖励',
	                    label: '奖励'
	                },
	                {
	                    value: '分成',
	                    label: '分成'
	                },
	                {
	                    value: '销售',
	                    label: '销售'
	                }
	            ],
	            Select2: '全部',
	            title: [
	                {
	                    title: '入账时间',
	                    key: 'balancetime',
	                    width: 135,
	                    render (row, column, index) {
	                        return `<b>${row.balancetime}</b>`;
	                    }
	                },
	                {
	                    title: '订单金额（元）',
	                    key: 'orderPrice'
	                },
	                {
	                    title: '下单时间',
	                    key: 'createtime',
	                    width: 135,
	                    render (row, column, index) {
	                        return `<b>${row.createtime}</b>`;
	                    }
	                },
	                {
	                    title: '财务类型',
	                    key: 'type'
	                },
	                {
	                    title: '收支金额',
	                    key: 'bill'
	                },
	                {
	                    title: '说明',
	                    key: 'note'
	                },
	                {
	                    title: '账户余额（元）',
	                    key: 'balance'
	                },
	                {
	                    title: '操作',
	                    key: 'action',
	                    align: 'center',
	                    width: 87,
	                    render (row, column, index) {
	                        return `<i-button type="info" size="small" @click="showModal()"><Icon type="android-list"></Icon>详情</i-button>`;
	                    }
	                }
	            ],
	            info: [

	            ],
	            detailcolumns1: [
	            	{
	                    title: '来源商家',
	                    key: 'serviceTitle'
	                },
	                {
	                    title: '订单金额',
	                    key: 'price'
	                },
	                {
	                    title: '商家优惠',
	                    key: 'bill'
	                },
	                {
	                    title: '商家实收',
	                    key: 'receipts'
	                },
	                {
	                    title: '服务费',
	                    key: 'fee'
	                },
	                {
	                    title: '订单退款金额',
	                    key: 'refund'
	                },
	                {
	                    title: '我的实收金额',
	                    key: 'totalPrice'
	                }
	            ],
	            detaildata1: [
	            	{
	            		serviceTitle: 'e修鸽',
	            		price: '￥90.00',
	            		bill: '￥0.00',
	            		receipts: '￥90.00',
	            		fee: '￥-5.85',
	            		refund: '无',
	            		totalPrice: '￥84.15'
	            	}
	            ],
	            detailcolumns2: [
	            	{
	                    title: '联系人',
	                    key: 'contactPerson'
	                },
	                {
	                    title: '用户电话',
	                    key: 'buyerPhone',
	                    width: 110
	                },
	                {
	                    title: '服务地址',
	                    key: 'address',
	                    width: 130
	                },
	                {
	                    title: '预约时间',
	                    key: 'appointTime',
	                    width: 135,
	                    render (row, column, index) { 
	    					return `<b>${row.appointTime}</b>`
	    				}
	                },
	                {
	                	title: '下单时间',
	                	key: 'createtime',
	                	width: 135,
	                	render (row, column, index) { 
	    					return `<b>${row.createtime}</b>`
	    				}
	                },
	                {
	                    title: '数量',
	                    key: 'count'
	                },
	                {
	                    title: '订单金额',
	                    key: 'ordermoney'
	                },
	                {
	                    title: '订单状态',
	                    key: 'statusDesc',
	                    render (row, column, index) {
	                        return `<div :class="{primary : row.statusDesc === '商家已确认' || row.statusDesc === '新订单', success :  row.statusDesc === '用户已评价' || row.statusDesc === '商家确认完成' || row.statusDesc === '交易成功', error: row.statusDesc === '用户取消' || row.statusDesc === '商家已取消' || row.statusDesc === '用户申请退款'}"><b>{{row.statusDesc}}</b></div>`;
	                    }
	                }
	            ],
	            detaildata2: [
	            	{
	            		contactPerson: '张先生',
	            		buyerPhone: 1361351815,
	            		address: '北京 昌平区紫金新干线家园 一区17号楼1单元701',
	            		createtime: '2017-04-17 15:09',
	            		appointTime: '2017-04-14 14:30',
	            		count: 1,
	            		ordermoney: '120.00元',
	            		statusDesc: '交易成功'
	            	}
	            ],
	            startdate: this.GetDateStr(-30),
	            enddate: this.GetDateStr(0),
	            options1: {
	                shortcuts: [
	                    {
	                        text: '今天',
	                        value () {
	                            return new Date();
	                        }
	                    },
	                    {
	                        text: '昨天',
	                        value () {
	                            const date = new Date();
	                            date.setTime(date.getTime() - 3600 * 1000 * 24);
	                            return date;
	                        }
	                    },
	                    {
	                        text: '一周前',
	                        value () {
	                            const date = new Date();
	                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
	                            return date;
	                        }
	                    }
	                ]
	            }
  		}
  	},
  	methods: {
  		tab3 () {
  			this.$store.commit('changeTab', '3');
         	this.$router.push({ path: '/setting/account' });
  		},
  		search () {
  			let data = {};
  			let newDate = new Date();  
  			data.type1 = this.Select1;
  			data.type2 = this.Select2;
  			data.startdate = this.format(this.startdate, 'yyyy-MM-dd');
  			data.enddate = this.format(this.enddate, 'yyyy-MM-dd');
  		},
  		showModal () {
  			this.modal1 = true;
  		},
  		exportData () {
  		 	this.$refs.table.exportCsv({
	            filename: 'accountBalanceExcel',
	            columns: this.title.filter((col, index) => index < 7),
	            data: this.info.filter((data, index) => index < 30)
	        });
  		},
  		Ajax_bought_customers (page) {
  			this.$store.commit('showLoading', {isLoading: true});
  			this.axios.get(`http://www.daoway.com/daoway/rest/service/80999f240bac4e309a28ebf03a7fd34b/bought_customers?page=${page}`)
  			.then(response => response.data)
  			.then(infoList => {
  				this.$nextTick(() => {
  					let tableData = [];
  					this.totalCount = infoList.totalSize;
		            for(let i = 0, ilength = infoList.data.length; i < ilength; i++){
	  					    tableData.push({
    	  						balancetime: this.format(infoList.data[i].last_order_time, 'yyyy-MM-dd HH:mm'),
    	  						orderPrice: infoList.data[i].total_price,
    	  						createtime: this.format(infoList.data[i].order_time, 'yyyy-MM-dd HH:mm'),
    	  						type: '销售',
    	  						bill: infoList.data[i].order_count,
    	  						note: i,
    	  						balance: infoList.data[i].real_consume
	  					  })
	  				}
	  				this.info = tableData;
		       });
  				
  			})
  			.then(() => this.$store.commit('showLoading', {isLoading: false}))
  		},
  		changePage (page) {
  			this.$router.push({ path: '/detail/finance', query: { p: page }});
  			this.Ajax_bought_customers(page);
  		}
  	},
  	mounted () {
  		this.Ajax_bought_customers(1);
  	},
  	computed: {
	  	isLoading () {
	  		return this.$store.state.isLoading
	  	}
	},
  	components: {
  		bread
  	}
 
};
</script>

<style lang="scss">
.finance-block{
    .ivu-chart-circle{
        width: 40px !important;
        height: 40px !important;
    }
	padding-left: 10px;
	.ivu-icon-help-circled{
		font-size: 18px;
		margin-left: 5px;
		vertical-align: middle;
		margin-top: 5px;
		color: #39f;
	}
	.date{
		width: 120px;
	}
    .ivu-icon{
        margin-right: 5px;
    }
    .title-right{
    	float: right;
    	.select-block{
    		display: inline-block;
    		float: left;
    	}
    	.date-block{
    		height: 32px;
    		display: inline-block;
    	}
    }
    @media (min-width:992px) and (max-width: 1200px) {
    	.title-right {
    		float: none;
    		margin-top: 10px;
    	}
    }
    @media screen and (max-width: 992px) {
    	.title-right {
    		float: none;
    		margin-top: 10px;
    		display: inline-block;
    		.select-block{
    			margin-top: 10px;
    		}
    	}
    }
	.between{
		width: 30px;
		margin-top: 8px;
	}
	.table-block{
		.number{
			display: inline-block;
			position: relative;
			font-weight: bold;
		}
		.ivu-row{
			width: 100%;
		}
	}
}
.bottomp{
	p{
		margin-top: 15px ;
	}
}
</style>