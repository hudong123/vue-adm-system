<template>
	<Row>
		<Col span="24" class="invoice-block pr10 demo-tabs-style1">
			<bread></bread>
			<Tabs type="card" class="mt15 overflowInherit"  :animated="false" v-show="!isLoading">
				<!-- 核对账单 -->
			    <Tab-pane label="核对账单">
			    	<div style="height: 32px">
				    	<div class="fl">
					    	<Button type="primary" class="fr ml10"><Icon type="closed-captioning"></Icon>申请发票</Button>
							<Button type="primary" class="fr ml10"><Icon type="ios-search"></Icon>搜索</Button>
							<Date-picker type="month" placeholder="选择日期" class="date fr enddate" v-model="enddate" :clearable="false"></Date-picker>
							<div class="between fr text-center">--</div>
							<Date-picker type="month" placeholder="选择日期" class="date fr startdate" v-model="startdate" :clearable="false"></Date-picker>
						</div>
						<div class="fr"></div>	
			    	</div>
					<Table stripe border :context="self" :columns="columns1" :data="invoiceInfo" class="mt20"></Table>
					<Modal v-model="modal1" width="900" class="invoiceModal" cancel-text="">
						<p slot="header" style="color: #39f">
				            <Icon type="information-circled"></Icon>
				            <span>核对账单详情</span>
				        </p>
				        <div class="invoiceModalLoading" v-show="invoiceModalLoading">
							<img src="../../../static/images/loading.gif">
						</div>
				        <Table stripe border :context="self" :columns="columns2" :data="modalInfo" height="600" v-show="!invoiceModalLoading"></Table>
					</Modal>
			    </Tab-pane>

			    <!-- 发票记录 -->
			    <Tab-pane label="发票记录">
			    	<div style="height: 32px">
				    	<div class="fl">
					    	<Button type="primary" class="fr ml10"><Icon type="ios-search"></Icon>搜索</Button>
					    	<Select v-model="Select1" class="w120">
							    <Option v-for="item in selectType" :value="item.value" :key="item">{{ item.label }}</Option>
							</Select>
						</div>
						<div class="fr"></div>	
			    	</div>
			    	<Table stripe border :context="self" :columns="columns3" :data="invoiceInfo2" class="mt20"></Table>
			    </Tab-pane>
			</Tabs>
		</Col>
	</Row>
</template>

<script>
import bread from '../../components/Bread/Bread';

export default {

  	name: 'invoice',

  	data () {
    	return {
    		startdate: this.GetDateStr(-30),
            enddate: this.GetDateStr(0),
            modal1: false,
            invoiceInfo: [],
            modalInfo: [],
            invoiceModalLoading: true,
            self: this,
            columns1: [
            	{
    				title: '月份',
    				key: 'startDate'
    			},
    			{
    				title: '订单量',
    				key: 'orderNum'
    			},
    			{
    				title: '订单金额',
    				key: 'income'
    			},
    			{
    				title: '到位佣金',
    				key: 'serviceIncome'
    			},
    			{
    				title: '发票状态',
    				key: 'invoiceState',
    				width: 85,
    				render (row, column, index) {
	              		if (row.invoiceState == 'DONE') {
	                		return '<i-button type="success" size="small" class="curd">已开票</i-button>'
	              		} 
	              		return '<i-button type="error" size="small" class="curd">未开票</i-button>'
	            	}
    			},
    			{
    				title: '开票日期',
    				key: 'invoiceDate'
    			},
    			{
    				title: '发票编号',
    				key: 'invoiceNum'
    			},
    			{
    				title: '操作',
    				align: 'center',
    				width: 170,
    				render (row, column, index) {
    					return `<i-button type="info" size="small" @click="showDetail(row)"><Icon type="navicon-round"></Icon>详情</i-button><i-button type="warning" size="small" class="ml10"><Icon type="ios-cloud-download"></Icon>导出</i-button>`;
    				}
    			}
            ],
            columns2: [
            	{
            		title: '入账时间',
            		key: 'modifyTime'
            	},
            	{
            		title: '订单项目',
            		key: 'priceName',
            		render (row, column, index) {
    					return `<b>${row.priceName || ''}</b>`;
    				}
            	},
            	{
            		title: '入账金额',
            		key: 'bill'
            	},
            	{
            		title: '到位佣金',
            		key: 'fee'
            	},
            	{
            		title: '用户电话',
            		key: 'userPhone'
            	}
            ],
            Select1: '全部',
            selectType: [
            	{
            		value: '全部',
            		label: '全部'
            	},
            	{
            		value: '已开票',
            		label: '已开票'
            	},
            	{
            		value: '未开票',
            		label: '未开票'
            	}
            ],
            invoiceInfo2: [],
            columns3: [
            	{
            		title: '申请日期'
            	},
            	{
            		title: '申请月份'
            	},
            	{
            		title: '申请金额'
            	},
            	{
            		title: '发票类型'
            	},
            	{
            		title: '收件人信息'
            	},
            	{
            		title: '发票状态'
            	},
            	{
            		title: '开票日期'
            	},
            	{
            		title: '快递单号'
            	}
            ]
    	}
  	},

  	components: {
  		bread
  	},

  	methods: {
  		invoiceAjax () {
  			this.$store.commit('showLoading', {isLoading: true});
  			this.axios.get(`http://www.daoway.com/daoway/rest/invoice/getRecords?serviceId=80999f240bac4e309a28ebf03a7fd34b&startMonth=&endMonth=`)
  				.then(response => response.data)
  				.then(res => {
  					if (res.status == 'ok') {
  						let tableData = [];
		  				// this.totalCount = res.totalSize;
		  				this.$nextTick(() => {
		  					for (let i = 0, ilength = res.data.length; i < ilength; i++) {
		  						tableData.push({
		  							startDate: this.format(res.data[i].startDate, 'yyyy-MM'),
		  							orderNum: res.data[i].orderNum,
		  							income: res.data[i].income,
		  							serviceIncome: res.data[i].serviceIncome,
		  							invoiceState: res.data[i].invoiceState,
		  							invoiceDate: res.data[i].invoiceDate ? this.format(res.data[i].invoiceDate, 'yyyy-MM-dd') : '无',
		  							invoiceNum: res.data[i].invoiceNum,
		  							userId: res.data[i].userId
		  						})
		  					}
		  					this.invoiceInfo = tableData;
		  				})
  					}
  				})
  				.then(() => {
	  				this.$store.commit('showLoading', {isLoading: false})
	  			})
  		},
  		// 详情 接口
  		showDetail (row) {
  			this.modal1 = true;
  			this.invoiceModalLoading = true;
  			let date = row.startDate.split('-').join('');
  			this.axios.get(`http://www.daoway.com/daoway/rest/invoice/detail?userId=${row.userId}&month=${date}`)
  				.then(response => response.data)
  				.then(res => {
  					if (res.status == 'ok') {
  						let modalTableData = [];
	  					this.$nextTick(() => {
	  						for (let i = 0, ilength = res.data.length; i < ilength; i++) {
	  							modalTableData.push({
	  								modifyTime: this.format(res.data[i].modifyTime, 'yyyy-MM-dd HH:mm'),
	  								priceName: res.data[i].priceName,
	  								bill: res.data[i].bill,
	  								fee: res.data[i].fee,
	  								userPhone: res.data[i].userPhone
	  							})
	  						}
	  						this.modalInfo = modalTableData;
	  					})
  					}
  				})
  				.then(() => {
  					this.invoiceModalLoading = false;
  				})
  		}
  	},

  	mounted () {
  		this.invoiceAjax();
  	},

  	computed: {
  		isLoading () {
	  		return this.$store.state.isLoading
	  	}
  	}
};
</script>

<style lang="scss">
.invoice-block{
	padding-left: 10px;
	.date{
		width: 120px;
	}
    .ivu-icon{
        margin-right: 5px;
    }
	.between{
		width: 30px;
		margin-top: 8px;
	}
}
.invoiceModal{
	.invoiceModalLoading{
		position: relative;
		left: 50%;
	}
}
</style>