<template>
	<Row>
		<Col span="24" class="service-block pr10">
			<bread></bread>
			<Card class="mt15">
				<p slot="title">
					<i class="fa fa-street-view"></i>服务分类及项目管理
				</p>
				<div slot="extra">
					<Button type="primary" shape="circle" @click="addServiceItemList"><Icon type="plus"></Icon>添加 / 管理服务分类</Button>
					<Button type="primary" shape="circle" class="ml5" @click="serviceItemModalAjax(true)"><Icon type="plus"></Icon>添加服务项目</Button>
					<Input class="fr w200 ml10" placeholder="请填写定向城市"><span slot="append" class="curp">搜索</span></Input>
				</div>
				<Table striped border :context="self" :columns="columns1" :data="data1" v-show="!isLoading"></Table>
				<!-- 添加服务分类 -->
				<Modal v-model="modal1">
					<p slot="header" style="color: #39f">
				        <span>添加服务分类</span>
				    </p>
				    <div class="form1-block">
				    	<Form ref="form1" :model="formValidate1" :rules="ruleValidate1" :label-width="90">
							<Form-item label="分类名称" prop="name">
				        		<Input v-model="formValidate1.name" placeholder="请填写分类名称（2-6个字）"><span slot="append" class="curp">添加</span></Input>
				        	</Form-item>
				        	<Form-item label="已有分类">
				        		<div class="hasItem" v-show="modalLoading == false">
				        			<div v-for="item in formValidate1.info" class="mt5">
				        				<Input :value="item.label"><span slot="append" class="curp">删除</span></Input>
				        			</div>
				        		</div>
				        		<div class="loading" v-show="modalLoading">
						            <img src="../../../static/images/loading.gif">
						        </div>
				        	</Form-item>
				    	</Form>
				    </div>
				    <div slot="footer">
				        <Button type="ghost" @click="closeModal1">取消</Button>
				        <Button type="primary" @click="editModal1">确定</Button>
				    </div>
				</Modal>
				<!-- 添加服务项目 -->
				<Modal v-model="modal2" width="700" class-name="t20">
					<p slot="header" style="color: #39f">
				        <span v-if="okText">添加服务项目</span>
				        <span v-else="okText == false">修改服务项目</span>
				    </p>
				    <div class="form2-block">
				    	<Form ref="form2" :model="formValidate2" :rules="ruleValidate2" :label-width="90">
				    		<Form-item label="所属分类">
				    			<Select v-model="formValidate2.selectOption">
						            <Option v-for="(item, index) in formValidate2.selectList" :value="item.name" :key="item">{{item.name}}</Option>
						       </Select>
				    		</Form-item>
				    		<Form-item label="服务图片">
				    			<!-- <div class="uploadFile w120 fl mr5">
									<img src="../../assets/images/avatar.jpg" alt="" class="uploadFileImg">
								</div> -->
				        		<div class="uploadFile w120">
									<div class="file-block" id="file-block">
										<input type="file" id="file" @change="FileUploader($event, true, changeImg)" alt="">
									</div>
									<div :class="{'pd20' : !isShowImg}">
										<Icon type="plus" style="font-size: 52px; color: rgb(51, 153, 255);" v-show="!isShowImg"></Icon>
										<img :src="formValidate2.pic_url" id="previewImage" class="uploadFileImg" v-show="isShowImg">
									</div>
								</div>
				        	</Form-item>
				        	<Form-item label="服务名称" prop="serviceName">
				        		<Input v-model="formValidate2.serviceName" placeholder="服务名称2-15个字（必填）"></Input>
				        	</Form-item>
				        	<Form-item label="服务描述" prop="description">
				        		<Input v-model="formValidate2.description" type="textarea" :rows="5" placeholder="服务内容：

服务流程：

服务保障："></Input>
				        	</Form-item>
				        	<Form-item label="服务价格" prop="price">
				        		<Input v-model="formValidate2.price">
				        			<Select v-model="formValidate2.price_unit" slot="append" style="width: 80px">
							            <Option v-for="(item, index) in formValidate2.price_unitList" :value="index" :key="item">{{item}}</Option>
							        </Select>
				        		</Input>
				        	</Form-item>
				        	<Form-item label="服务ID" prop="serviceID">
				        		<Input v-model="formValidate2.serviceID" class="w40p" placeholder="选填，可留空"></Input>
				        		<Input v-model="formValidate2.originalPrice" class="w40p fr"><span slot="append">元</span></Input>
				        		<span class="mr15 fr">服务原价</span>
				        	</Form-item>
				        	<Form-item label="起购数量" prop="minBuyNum">
				        		<Input v-model="formValidate2.minBuyNum" class="w40p"></Input>
				        		<Input v-model="formValidate2.time" class="w40p fr"><span slot="append">分钟</span></Input>
				        		<span class="mr15 fr">服务时长</span>
				        	</Form-item>
				        	<Form-item label="定向城市" prop="city" class="cityFormList">
				        		<Tooltip placement="bottom-end">
							        <Icon type="help-circled"></Icon>
							        <div slot="content">
							            <p>定向城市指该服务项目的适用城市，若该服务项目只适用于部分城市的情况才需要设置。默认不填代表适用于本店铺覆盖的所有城市。</p>
							            <a href="http://www.daoway.cn:2368/ding-xiang-cheng-shi-she-zhi/" class="curp define" target="_blank">(点击查看详细说明)</a>
							        </div>
							    </Tooltip>
				        		<Checkbox-group v-model="formValidate2.city">
						            <Checkbox v-for="(item, index) in formValidate2.cityList" :label="item" :key="index">{{item}}</Checkbox>
						        </Checkbox-group>
                    <Button type="info" class="mr10 mt5 mb5" @click="checkAll()" size="small"><Icon type="checkmark-round"></Icon>全选</Button><Button type="error" class="mr10 mt5 mb5" @click="emptyAll()" size="small"><Icon type="android-close"></Icon>清空</Button>`
				        	</Form-item>
				        	<Form-item label="是否上架" prop="status">
				        		<i-switch v-model="formValidate2.switchToggle" size="large">
							        <span slot="open">是</span>
							        <span slot="close">否</span>
							    </i-switch>
				        	</Form-item>
				    	</Form>
				    </div>
				    <div slot="footer">
				        <Button type="ghost" @click="closeModal2">取消</Button>
				        <Button type="primary" v-if="okText" @click="addModal2">添加</Button>
				        <Button type="primary" v-else="okText == false" @click="editModal2">修改</Button>
				    </div>
				</Modal>
				<!-- 添加图文详情 -->
				<Modal v-model="modal3" width="700" class-name="t20">
					<p slot="header" style="color: #39f">
				        <span>添加图文详情</span>
				    </p>
				    <div v-for="(item, index) in imgList" :key="item.id">
				    	<img :src="item.img" alt="" width="646">
				    	<Icon type="close-circled" class="closeImg curp" @click.native="removeImg(index)"></Icon>
				    </div>
				    <div class="uploadFile mt5">
						<input type="file" id="files" @change="AddFileUploader($event)" alt="">
						<div class="pd20">
							<Icon type="plus" style="font-size: 52px; color: rgb(51, 153, 255);"></Icon>
						</div>
					</div>
				    <div slot="footer">
				        <Button type="ghost" @click="closeModal3">取消</Button>
				        <Button type="primary" @click="editModal3">确定</Button>
				    </div>
				</Modal>  
			</Card>	
		</Col>
	</Row>	
</template>

<script>
import bread from '../../components/Bread/Bread';
export default {

  	name: 'service',

  	data () {
  		const validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('分类名称不能为空'));
            }else if (value.length < 2 || value.length > 6) {
                callback(new Error('名称长度为2-6位，请重新输入'));
            }else {
                callback();
            }
        };
        const validateServiceName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('服务名称不能为空'));
            }else if (value.length < 2 || value.length > 15) {
                callback(new Error('服务名称长度为2-15位，请重新输入'));
            }else {
                callback();
            }
        };
    	return {
    		modal1: false,
    		modal2: false,
    		modal3: false,
    		modalLoading: true,
    		okText: true,
    		imgList: {},
    		file: '<input type="file" id="file" @change="FileUploader($event, true, changeImg)" alt="">',
    		self: this,
    		formValidate1: {
    			name: '',
    			info: {}
    		},
    		ruleValidate1: {
    			name: [
    				{ required: true, trigger: 'blur', validator: validateName}
    			]
    		},
    		formValidate2: {
    			selectOption: '',
    			selectList: {},
    			serviceName: '',
    			serviceID: '',
    			description: '',
    			originalPrice: '',
    			minBuyNum: '',
    			time: '',
    			price: '',
    			price_unit: '',
    			price_unitList: {},
    			city: [],
    			cityList: {},
    			switchToggle: true,
    			pic_url: ''
    		},
    		ruleValidate2: {
    			serviceName: [
    				{ required: true, trigger: 'blur', validator: validateServiceName}
    			],
    			description: [
    				{ required: true, message: '服务描述不能为空', trigger: 'blur'}
    			],
    			price: [
    				{ required: false, message: '服务价格不能为空'}
    			],
    			serviceID: [
    				{ required: false}
    			],
    			minBuyNum: [
    				{ required: false}
    			],
    			city: [
    				{ required: false}
    			],
    			status: [
    				{ required: false}
    			]
    		},
    		columns1: [
    			{
    				title: '图片',
    				key: 'pic_url',
    				width: 97,
    				render (row, column, index) {
    					return `<img src="${row.pic_url}" alt="${row.name}" width="80" height="80" :class="{'img-gray' : row.status != 1}"/>`
    				}
    			},
    			{
    				title: '服务名称',
    				key: 'name',
    				render (row, column, index) { 
    					return `<b>${row.name}</b>`
    				}
    			},
    			{
    				title: '服务描述',
    				key: 'description',
    				className: 'oveflow'
    			},
    			{
    				title: '分类',
    				key: 'categoryName',
    				filters: [
                        
            ],
            //filterMultiple: false,
            filterMethod (value, row) {
                return row.categoryName.indexOf(value) > -1;
            }
    			},
    			{
    				title: '筛选标签',
    				key: 'tags',
    				render (row, column, index) {
    					return `<p>${row.tags}</p><p>${row.secondaryTags}</p>`
    				}
    			},
    			{
    				title: '城市',
    				key: 'coverArea'
    			},
    			{
    				title: '起购量',
    				key: 'minBuyNum',
    				width: '5%'
    			},
    			{
    				title: '状态',
    				key: 'status',
    				width: '5%',
    				render (row, column, index) {
    					if (row.status == "1") {
    						return '上架'
    					}
    					return `<span class="cred">下架</span>`
    				}
    			},
    			{
    				title: '价格/单位',
    				key: 'price_unit',
    				render (row, column, index) {
    					return `<span class="cred">${row.price}</span>${row.price_unit}<p class="lineThrough" v-if="row.originalPrice !== row.price">￥${row.originalPrice}</p>`
    				}
    			},
    			{
    				title: '销量',
    				key: 'salesNum'
    			},
    			{
    				title: '操作',
    				key: 'action',
    				align: 'center',
            		className: 'action-table',
    				render (row, column, index) {
    					return `<i-button type="info" size="small" @click="serviceImg(row)" class="mr10"><Icon type="images"></Icon>图文</i-button><i-button type="warning" size="small" class="mr10" @click="serviceItemModalAjax(false, row)"><Icon type="wand"></Icon>修改</i-button><i-button type="error" size="small" class="last-action-btn"><Icon type="scissors"></Icon>删除</i-button>`;
    				}
    			}
    		],
    		data1: []
    	};
  	},

  	methods: {
  		serviceAjax () {
  			this.$store.commit('showLoading', {isLoading: true});
  			this.axios.get(`http://www.daoway.com/daoway/rest/service/80999f240bac4e309a28ebf03a7fd34b?h5=1&userId=910da3040f444a82859cbe472aa779be`)
  				.then(response => response.data)
  				.then(res => {
  					if (res.status == 'ok') {
  						let tableData = [];
		  				// this.totalCount = res.totalSize;
		  				this.$nextTick(() => {
		  					for (let i = 0, ilength = res.data.prices.length; i < ilength; i++) {
		  						tableData.push({
		  							id: res.data.prices[i].id,
		  							pic_url: res.data.prices[i].oriPic_url,
			  						name: res.data.prices[i].name,
			  						description: res.data.prices[i].description,
			  						price: res.data.prices[i].price,
			  						price_unit: res.data.prices[i].price_unit,
			  						originalPrice: res.data.prices[i].originalPrice,
			  						coverArea: res.data.prices[i].coverArea || '全部',
			  						categoryName: res.data.prices[i].categoryName,
			  						tags: res.data.prices[i].tags,
			  						secondaryTags: res.data.prices[i].secondaryTags,
			  						minBuyNum: res.data.prices[i].minBuyNum,
			  						status: res.data.prices[i].inService,
			  						salesNum: res.data.prices[i].salesNum
		  						})
		  					}
		  					this.data1 = tableData;
		  				})
  					}
  				})
  				.then(() => {
	  				this.$store.commit('showLoading', {isLoading: false})
	  			})
  		},
  		// 服务分类
  		serviceItemAjax (callback) {
  			this.modalLoading = true;
  			this.axios.get(`http://www.daoway.com/daoway/rest/sub_categories/findSubCategoryListByServiceId/80999f240bac4e309a28ebf03a7fd34b`)
  				.then(response => response.data)
  				.then(res => {
  					if (res.status == 'ok') {
  						let serviceItem = [];
		  				this.$nextTick(() => {
		  					for (let i = 0, ilength = res.data.length; i < ilength; i++) {
		  						serviceItem.push({
			  						value: res.data[i].catName,
			  						label: res.data[i].catName
		  						})
		  					}
		  					// callback 传参表示加载表格 modal框加载时切勿传参
		  					if(callback) {
		  						this.columns1[3].filters = serviceItem;
		  					}
		  					this.formValidate1.info = serviceItem;
		  				})
  					}
  				})
  				.then(() => {
  					this.modalLoading = false
  				})
  		},
  		// 服务项目
  		serviceItemModalAjax (bool, item) {
  			this.okText = bool;
        	this.$refs['form2'].resetFields();
        	this.formValidate2.time = '';
        	//document.getElementById('file-block').innerHTML = ''; 
        	//document.getElementById('file-block').innerHTML = '<input type="file" id="file" @change="FileUploader($event, true, changeImg)" alt="">'; 
  			this.$nextTick(() => {
  				this.axios.get(`http://www.daoway.com/daoway/rest/sub_categories?userId=910da3040f444a82859cbe472aa779be&serviceId=80999f240bac4e309a28ebf03a7fd34b`)
	  				.then(response => response.data)
	  				.then(res => {
	  					if (res.status == 'ok') {
	  						this.formValidate2.selectList = res.data;
	  						!bool ? this.formValidate2.selectOption = item.categoryName : this.formValidate2.selectOption = res.data[0].name
	  					}
	  				})
	  				.then(() => {
	  					if(!bool) {
	  						this.formValidate2.selectOption = item.categoryName;
	  					}
	  				})
	  			this.axios.get(`http://www.daoway.com/daoway/rest/category/36/units`)
	  				.then(response => response.data)
	  				.then(res => {
	  					if (res.status == 'ok') {
	  						this.formValidate2.price_unit = 0;
	  						this.formValidate2.price_unitList = res.data;
	  					}
	  				})
	  			this.axios.get(`http://www.daoway.com/daoway/rest/service/80999f240bac4e309a28ebf03a7fd34b?userId=910da3040f444a82859cbe472aa779be&h5=1&userId=910da3040f444a82859cbe472aa779be`)
	  				.then(response => response.data)
	  				.then(res => {
	  					if (res.status == 'ok') {
	  						this.formValidate2.cityList = res.data.coverArea.split(' ');
	  					}
	  				})		
  			})

  			// bool: true => 添加服务项目  false => 修改服务项目
  			if (!bool) {
  				this.formValidate2.serviceName = item.name;
  				this.formValidate2.description = item.description;
  				this.formValidate2.price = item.price;
  				this.formValidate2.originalPrice = item.originalPrice;
  				this.formValidate2.minBuyNum = item.minBuyNum;
  				this.formValidate2.switchToggle = item.status == "1" ? true : false;
  				if (item.pic_url) {
  					this.formValidate2.pic_url = item.pic_url;
  					this.$store.commit('showImg', true);
  				} else {
  					this.$store.commit('showImg', false);
  				}
  			} else {
  				this.$store.commit('showImg', false);
  				this.$refs['form2'].resetFields();
  				this.formValidate2.originalPrice = '';
  				this.formValidate2.time = '';
  			}

  			this.modal2 = true;
  		},
  		// 服务 图文详情
  		serviceImgAjax (item) {
  			this.axios.get(`http://www.daoway.com/daoway/rest/servicePrice/imgs/${item.id}`)
  				.then(response => response.data)
  				.then(res => {
  					if (res.status == 'ok') {
  						this.imgList = res.data;
  					}
  				})
  		},

  		changeImg (imgSrc) {
  			this.formValidate2.pic_url = imgSrc;
  		},

  		// 添加图片
  		AddFileUploader (evt) {

		    if (!window.FileReader) return;  
		  
		    let files = evt.target.files;  

		    let _this = this;
		  
		    for (let i = 0, f; f = files[i]; i++) {  
		          
		        if (!f.type.match('image.*')) {  
		          
		            continue;  
		          
		        }  
		          
		          
		        let reader = new FileReader();  
		          
		        reader.onload = (function(theFile) {  
		          
		           return function(e) {  
		          
		            // img 元素  

		            _this.$store.commit('showImg', true);

		            _this.imgList.push({

		            	img: e.target.result
                  
		            });
		          
		        };  
		          
		    })(f);  
		          
		          
		    reader.readAsDataURL(f);  
		          
		    }  
		  
		},

  		addServiceItemList () {
  			this.$refs['form1'].resetFields();
  			this.serviceItemAjax();
  			this.modal1 = true;
  		},
  		editModal1 () {
  			this.modal1 = false;
  		},
  		closeModal1 () {
  			this.modal1 = false;
  		},
  		editModal2 () {
  			this.modal2 = false;
  		},
  		closeModal2 () {
  			this.modal2 = false;
  		},
  		addModal2 () {
  			this.modal2 = false;
  		},
  		closeModal3 () {
  			this.modal3 = false;
  		},
  		editModal3 () {
  			this.modal3 = false
  		},
  		serviceImg (item) {
  			this.serviceImgAjax(item);
			this.modal3 = true;
  		},
  		removeImg (index) {
  			//e.currentTarget.parentNode.parentNode.removeChild(e.currentTarget.parentNode);
  			this.imgList.splice(index, 1)
  		},
      checkAll () {
        this.formValidate2.city = this.formValidate2.cityList
      },
      emptyAll () {
        this.formValidate2.city = []
      }

  	},

  	mounted () {
  		this.$store.commit('showLoading', {isLoading: false})
  		this.serviceItemAjax('table');
  		this.serviceAjax();
  	},

  	computed: {
  		isLoading () {
	  		return this.$store.state.isLoading
	  	},
	  	isShowImg () {
	  		return this.$store.state.isShowImg
	  	}
  	},


  	components: {
  		bread
  	}
};
</script>

<style lang="scss">
.service-block{
	padding-left: 10px;
	.ivu-icon, .fa{
		margin-right: 5px;
	}
	.ivu-card-extra{
		top: 10px;
	}
  	.action-table{
	    width: 200px;
	}
	@media screen and (max-width: 1200px) {
		.action-table {
			width: 90px;
			.last-action-btn{
				margin-right: 10px;
			}
			button{
				margin-top: 5px;
				margin-bottom: 5px;
				margin-left: 10px;
			}
		}
	}
	table{
		.ivu-table-cell{
			padding:  5px
		}
		.ivu-table-filter-list-item .ivu-checkbox-wrapper+.ivu-checkbox-wrapper{
			margin-top: 3px;
		}
		.oveflow{
			.ivu-table-cell{
				white-space: nowrap;
			}
		}
	}
}
.hasItem{
	.ivu-input-group-append, .ivu-input-group>.ivu-input:last-child{
		background-color: #d9534f;
	}
	span{
		color: white;
	}
}
.t20 .ivu-modal{
	top: 20px !important;
}
.form2-block{
  	.ivu-icon{
    	margin-right: 5px;
  	}
}
.closeImg{
	float: right;
    font-size: 18px;
    position: absolute;
    margin-top: -6px;
    right: 13px;
}
.ivu-icon-help-circled {
    font-size: 18px;
    margin-left: 5px;
    vertical-align: middle;
    margin-top: 5px;
    color: #39f;
}
.cityFormList{
	.ivu-tooltip{
		float: right;
    	margin-top: -3px;
	}
	.ivu-tooltip-inner{
		white-space: inherit;
	}
	.define{
		color: white
	}
}
.uploadFileImg{
	width: 100%;
	height: 118px;
	display: block;
}
</style>