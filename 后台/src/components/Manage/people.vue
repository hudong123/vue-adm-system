<template>
	<Row>
		<Col span="24" class="technician-block pr10">
			<bread></bread>
			<Card class="mt15">
				<p slot="title">
					<Icon type="person"></Icon>人员列表
				</p>
				<div slot="extra">
					<Button type="primary" shape="circle" @click="addNewTechnician"><Icon type="plus"></Icon>添加服务人员</Button>
					<Input class="fr w200 ml10" placeholder="请输入名称或手机号"><span slot="append" class="curp">搜索</span></Input>
				</div>
				<Table stripe border :context="self" :columns="columns1" :data="info" @on-selection-change="select" v-show="!isLoading"></Table>
				<Modal v-model="modal1" width="700" class-name="modal1">
					<p slot="header" style="color: #39f">
				        <span v-if="okText">添加服务人员</span>
				        <span v-else="okText == false">修改服务人员</span>
				    </p>
				    <div class="form-block">
				        <Form ref="form1" :model="formValidate1" :rules="ruleValidate1" :label-width="90">
				        	<Form-item label="姓名：" prop="name">
				        		<Input v-model="formValidate1.name" placeholder="请输入姓名"></Input>
				        	</Form-item>
				        	<Form-item label="身份证号：" prop="idcard">
				        		<Input v-model="formValidate1.idcard" placeholder="请输入身份证号码"></Input>
				        	</Form-item>
				        	<Form-item label="工装照片" prop="workPhoto">
				        		<div class="uploadFile w120" id="uploadFile">
									<input type="file" id="file" @change="FileUploader($event, true, fileCallback)" alt="">
									<div :class="{'pd20' : !isShowImg}">
										<Icon type="plus" style="font-size: 52px; color: rgb(51, 153, 255);" v-show="!isShowImg"></Icon>
										<img :src="formValidate1.workPhoto" id="previewImage" class="uploadFileImg" v-show="isShowImg">
									</div>
								</div>
				        	</Form-item>
				        	<Form-item label="接单电话：" prop="phone">
				        		<Input v-model="formValidate1.phone" placeholder="请输入电话号码"></Input>
				        	</Form-item>
				        	<Form-item label="个人简介：">
								<Input v-model="formValidate1.description" type="textarea" :autosize="true"></Input>
							</Form-item>
							<Form-item label="服务项目：">
								<Input v-model="formValidate1.serviceItem" class="w80p" type="textarea" readonly :autosize="{minRows: 1,maxRows: 3}"></Input>
								<Button type="primary" class="fr" @click="editServiceItem">设置服务项目</Button>	
							</Form-item>
							<Form-item label="服务区域：">
								<Input v-model="formValidate1.serviceArea" disabled class="w80p"></Input>
								<Button type="primary" class="fr">设置服务区域</Button>	
							</Form-item>
							<Form-item label="服务城市：">
								<Input v-model="formValidate1.serviceCity" disabled class="w80p"></Input>
							</Form-item>
							<Form-item label="服务时间：">
								<Time-picker type="time" v-model="formValidate1.starttime" format="HH:mm" placeholder="08:00" class="w150 fl" confirm></Time-picker>
								<span class="w50 text-center fl">至</span>
								<Time-picker type="time" v-model="formValidate1.endtime" format="HH:mm" placeholder="20:00" class="w150 fl" confirm></Time-picker>
								<Button type="primary" class="fl ml20">设置忙时时段</Button>	
							</Form-item>
							<Form-item label="服务日期：">
								<Checkbox-group v-model="formValidate1.serviceWeek">
						            <Checkbox label="周一"></Checkbox>
						            <Checkbox label="周二"></Checkbox>
						            <Checkbox label="周三"></Checkbox>
						            <Checkbox label="周四"></Checkbox>
						            <Checkbox label="周五"></Checkbox>
						            <Checkbox label="周六"></Checkbox>
						            <Checkbox label="周日"></Checkbox>
						        </Checkbox-group>
							</Form-item>
							<Form-item label="星级：">
								<Rate allow-half show-text v-model="formValidate1.rate"></Rate>
							</Form-item>
							<Form-item label="状态：">
								<i-switch v-model="formValidate1.switch1" size="large">
							        <span slot="open">上线</span>
							        <span slot="close">离线</span>
							    </i-switch>
							</Form-item>
				        </Form>
				    </div>
				    <div slot="footer">
				        <Button type="ghost" @click="closeModal">取消</Button>
				        <Button type="primary" @click="addModal" v-if="okText == true">添加</Button>
				        <Button type="primary" @click="editModal" v-if="okText == false">修改</Button>
				    </div>
				</Modal>
				<Modal v-model="modal2" width="600">
					<p slot="header" style="color: #39f">
				        <span>设置服务项目</span>
				    </p>
				    <div class="serviceItemLoading" v-show="serviceItemLoading">
						<img src="../../../static/images/loading.gif">
					</div>
				    <Table stripe border :context="self" :columns="columns2" :data="serviceInfo" @on-selection-change="selectItem" height="700" v-show="!serviceItemLoading"></Table>
				    <div slot="footer">
				        <Button type="ghost" @click="closeModal2">取消</Button>
				        <Button type="primary" @click="editModal2">确定</Button>
				    </div>
				</Modal>  
			</Card>
		</Col>
	</Row>		
</template>

<script>
import bread from '../../components/Bread/Bread';
export default {

  	name: 'people',

  	data () {
    	return {
    		info: [],
    		serviceInfo: [],
    		self: this,
    		hasSelection: [],
    		selection: {},
    		okText: true,
    		modal1: false,
    		modal2: false,
    		serviceItemLoading: true,
    		itemListName: [],
    		itemListId: [],
    		formValidate1: {
    			name: '',
    			idcard: '',
    			phone: '',
    			description: '',
    			serviceArea: '暂无服务区域',
    			serviceCity: '暂无数据',
    			rate: 0,
    			switch1: true,
    			starttime: '',
    			endtime: '',
    			serviceWeek: [],
    			serviceItem: '',
    			serviceItemId: '',
    			workPhoto: ''
    		},
    		ruleValidate1: {
    			name: [
    				{ required: true, message: '姓名不能为空', trigger: 'blur' }
    			],
    			idcard: [
    				{ required: true, message: '身份证号码不能为空', trigger: 'blur' }
    			],
    			workPhoto: [
    				{ required: true, message: '请上传工装照片', trigger: 'blur'}
    			],
    			phone: [
    				{ required: true, message: '电话不能为空', trigger: 'blur' }
    			]
    		},
    		columns1: [
    			{
    				title: '编号',
    				key: 'id'
    			},
    			{
    				title: '姓名',
    				key: 'name',
    				render (row, column, index) { 
    					return `<b>${row.name}</b>`
    				}
    			},
    			{
    				title: '工装照片',
    				key: 'workPhoto',
    				render (row, column, index) { 
    					if (row.workPhoto) {
    						return `${row.workPhoto}`
    					}
    					return '无';
    				}
    			},
    			{
    				title: '接单电话',
    				key: 'phone',
    				width: 115
    			},
    			{
    				title: '个人简介',
    				key: 'description'
    			},
    			{
    				title: '接单数量',
    				key: 'orderNum'
    			},
    			{
    				title: '星级',
    				key: 'level'
    			},
    			{
    				title: '状态',
    				key: 'status',
    				render (row, column, index) {
    					if (row.status == 1) {
    						return '上线'
    					} 
    					return '离线'
    				}
    			},
	          	{
	            	title: '绑定上单',
	            	key: 'openId',
	            	width: 85,
	            	render (row, column, index) {
	              		if (row.openId) {
	                		return '<i-button type="success" size="small" class="curd">已绑定</i-button>'
	              		} 
	              		return '<i-button type="warning" size="small" class="curd">未绑定</i-button>'
	            	}
	          	},
    			{
    				title: '操作',
    				key: 'action',
    				width: 170,
    				align: 'center',
    				render (row, column, index) {
               			return `<i-button type="info" size="small" @click="editingTechnician(row)"><Icon type="wand"></Icon>修改</i-button><i-button type="error" size="small" class="ml10" @click="deleteTechnician(row)"><Icon type="scissors"></Icon>删除</i-button>`;
            		}
    			}
    		],
    		columns2: [
    			{
            		type: 'selection',
             		width: 60
          		},
          		{
    				title: '图片',
    				key: 'pic_url',
    				render (row, column, index) {
    					return `<img src="${row.pic_url}" alt="${row.name}" width="80" height="80"/>`
    				}
    			},
    			{
    				title: '服务名称',
    				key: 'name'
    			},
    			{
    				title: '价格/单位',
    				key: 'price',
    				render (row, column, index) {
    					return `${row.price}${row.price_unit}`
    				}
    			},
    			{
    				title: '城市',
    				key: 'coverArea'
    			}
    		]
    	};
  	},

  	methods: {
  		technicianAjax () {
  			this.$store.commit('showLoading', {isLoading: true});
  			this.axios.get('http://www.daoway.com/daoway/rest/technician/80999f240bac4e309a28ebf03a7fd34b/technicians?userId=910da3040f444a82859cbe472aa779be')
  				.then(response => response.data)
  				.then(res => {
  					if (res.status == 'ok') {
  						let tableData = [];
		  				// this.totalCount = res.totalSize;
		  				this.$nextTick(() => {
		  					for (let i = 0, ilength = res.data.length; i < ilength; i++) {
		  						tableData.push({
		  							id: res.data[i].dwid,
			  						name: res.data[i].name,
			  						workPhoto: res.data[i].workPhoto,
			  						phone: res.data[i].phone,
			  						description: res.data[i].description || '无',
			  						orderNum: res.data[i].orderNum || '无',
			  						level: res.data[i].level || '无',
			  						status: res.data[i].status,
                    				openId: res.data[i].openId
		  						})
		  					}
		  					this.info = tableData;
		  				})
  					}
  				})
  				.then(() => {
	  				this.$store.commit('showLoading', {isLoading: false})
	  			})
  		},
  		serviceAjax () {
  			this.serviceItemLoading = true;
  			this.axios.get(`http://www.daoway.com/daoway/rest/service/80999f240bac4e309a28ebf03a7fd34b?userId=910da3040f444a82859cbe472aa779be`)
  				.then(response => response.data)
  				.then(res => {
  					if (res.status == 'ok') {
  						let tableData = [];
		  				// this.totalCount = res.totalSize;
		  				this.$nextTick(() => {
		  					for (let i = 0, ilength = res.data.prices.length; i < ilength; i++) {
		  						tableData.push({
		  							id: res.data.prices[i].id,
		  							pic_url: res.data.prices[i].pic_url,
			  						name: res.data.prices[i].name,
			  						price: res.data.prices[i].price,
			  						price_unit: res.data.prices[i].price_unit,
			  						coverArea: res.data.prices[i].coverArea || '全部',
			  						_checked: false
		  						})
		  						// 勾选项
		  						if(this.formValidate1.serviceItem.indexOf(res.data.prices[i].name) !== -1) {
		  							tableData[i]['_checked'] = true
		  						}
		  					}
		  					this.serviceInfo = tableData;
		  				})
  					}
  				})
  				.then(() => {
  					this.serviceItemLoading = false
  				})
  		},

  		select (selection) {
  			this.hasSelection = selection; // 已选项数据
  		},
  		addNewTechnician () {
  			this.$store.commit('showImg', false);
  			this.defaultModal1();
  			this.okText = true;
  			this.modal1 = true;
  		},
  		editingTechnician (item) {
  			this.defaultModal1();
  			this.okText = false;
  			this.formValidate1.phone = item.phone;
  			this.formValidate1.name = item.name;
  			this.formValidate1.workPhoto = item.workPhoto;
  			console.log(this.formValidate1.workPhoto);
  			if (this.formValidate1.workPhoto) {
  				this.$store.commit('showImg', true);
  			} else {
  				this.$store.commit('showImg', false);
  			}
  			if (item.status == 1) {
  				this.formValidate1.switch1 = true;
  			} else {
  				this.formValidate1.switch1 = false;
  			}
  			this.modal1 = true;
  		},
  		deleteTechnician () {

  		},
  		editModal () {
  			this.modal1 = false;
  		},
  		closeModal () {
  			this.modal1 = false;
  		},
  		addModal () {
  			this.modal1 = false;
  		},
  		editModal2 () {
  			this.formValidate1.serviceItem = this.itemListName;
  			this.formValidate1.serviceItemId = this.itemListId;
  			this.modal2 = false;
  		},
  		closeModal2 () {
  			this.modal2 = false;
  		},
  		editServiceItem () {
  			this.modal2 = true;
  			this.serviceAjax();
  		},
  		selectItem (selection) {
  			let itemList = [], itemListId = [];
  			selection.forEach((item) => {
  				itemList.push(item.name);
  				itemListId.push(item.id);
  			})
  			this.itemListName = itemList.join(' ');
  			this.itemListId = itemListId.join(' ');
  		},
  		defaultModal1 () {
  			this.$refs['form1'].resetFields();
  			this.formValidate1.serviceWeek = [];
  			this.formValidate1.description = '';
  			this.formValidate1.rate = 0;
  			this.formValidate1.switch1 = false;
  			this.formValidate1.starttime = '';
  			this.formValidate1.endtime = '';
  			this.formValidate1.serviceItem = '';
  			//this.formValidate1.workPhoto = '';
  		},
  		fileCallback (e) {
  			this.formValidate1.workPhoto = e;
  		}

  	},

  	components: {
  		bread
  	},

  	mounted () {
  		this.$store.commit('showLoading', {isLoading: false});
  		this.$store.commit('showImg', false);
  		this.technicianAjax();
  	},

  	computed: {
  		isLoading () {
	  		return this.$store.state.isLoading
	  	},
	  	isShowImg () {
	  		return this.$store.state.isShowImg
	  	}
  	}

};
</script>

<style lang="scss">
.technician-block{
	padding-left: 10px;
	.ivu-icon{
		margin-right: 5px;
	}
	.ivu-card-extra{
		top: 10px;
	}
}
.ivu-rate-star-content:before, .ivu-rate-star:before{
	color: #c3cbd6 !important;
}
.ivu-rate-star-full:before, .ivu-rate-star-half .ivu-rate-star-content:before{
	color: #f5a623 !important;
}
.ivu-rate-star-content:before{
	color: transparent !important;
}
.modal1 .ivu-modal{
     top: 20px;
}
.uploadFileImg{
	width: 100%;
	height: 100%;
	display: block;
}
.serviceItemLoading{
	position: relative;
	left: 50%;
}
</style>