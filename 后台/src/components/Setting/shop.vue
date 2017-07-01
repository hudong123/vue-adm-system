<template>
	<Row>
		<Col span="24" class="shop-block pr10">
			<bread></bread>
			<Card class="mt15">
				<p slot="title">
					<Icon type="home"></Icon>店铺管理
				</p>
				<div class="form-shop" v-show="isLoading == false">
					<Form ref="shop" :model="formValidate" :rules="ruleValidate" :label-width="110">
						<Form-item label="店铺名称" prop="name">
							<Input v-model="formValidate.name" placeholder="请输入您的店铺名称（2-10）个字" class="w80p"></Input>
						</Form-item>
						<Form-item label="店铺相册" prop="photo">
							<div v-for="imgList in formValidate.photo" :key="imgList.id" class="fl mr10 por">
								<img :src="imgList.url" alt="" class="photo" width="100" height="100">
								<span class="remove" @click="removeImg($event)">
                                    <i class="fa fa-times-circle-o fz20"></i>
                                </span>
							</div>
							 <div class="uploadFile fl" style="width: 100px;height: 100px;">
								<input type="file" id="files" @change="AddFileUploader($event)" alt="">
								<div class="pd20">
									<Icon type="plus" style="font-size: 52px; color: rgb(51, 153, 255);"></Icon>
								</div>
							</div>
						</Form-item>
						<Form-item label="订购须知" prop="orderingNotice">
							<Input v-model="formValidate.orderingNotice" type="textarea" class="w80p" :autosize="true"></Input>
							<p class="w80p lh20 mt5 c9ea7b4">简要列示一下订购、退款、服务等流程相关的用户注意事项，将显示在店铺详情和服务详情下方。不要和“商家简介”重复，客服电话、服务时间、服务范围、提前预约小时数等信息请另行设置，不用写在订购须知里。</p>
						</Form-item>
						<Form-item label="商家简介" prop="description">
							<Input v-model="formValidate.description" type="textarea" class="w80p" :autosize="true"></Input>
							<p class="w80p lh20 mt5 c9ea7b4">主要写服务商的公司或团队简介，以彰显服务商实力和服务品质，将显示在店铺详情下方。不要和“订购须知”重复，客服电话、服务时间、服务范围、提前预约小时数等内容另行设置，不要写在商家简介里。</p>
						</Form-item>
						<Form-item label="客服电话" prop="phone">
							<Input v-model="formValidate.phone" placeholder="请填写您的电话" class="w60p"><Button slot="append" icon="ios-telephone"></Button></Input>
						</Form-item>
						<Form-item label="服务时间" prop="week">
							<Checkbox-group v-model="formValidate.week">
					            <Checkbox label="周一"></Checkbox>
					            <Checkbox label="周二"></Checkbox>
					            <Checkbox label="周三"></Checkbox>
					            <Checkbox label="周四"></Checkbox>
					            <Checkbox label="周五"></Checkbox>
					            <Checkbox label="周六"></Checkbox>
					            <Checkbox label="周日"></Checkbox>
					        </Checkbox-group>
						</Form-item>
						<Form-item label="服务时间段" class="serviceTime" prop="serviceTime">
							<Form-item prop="starttime">
								<Time-picker type="time" v-model="formValidate.starttime" format="HH:mm" placeholder="08:00" class="starttime w150 fl" confirm></Time-picker>
							</Form-item>
							<span class="w50 text-center fl">至</span>
							<Form-item prop="endtime">
								<Time-picker type="time" v-model="formValidate.endtime" format="HH:mm" placeholder="20:00" class="endtime w150 fl" confirm></Time-picker>
							</Form-item>
							<span class="c9ea7b4 ml20 fl">用户可预约的服务时间范围</span>
							<div class="clear"></div>
						</Form-item>
						<Form-item label="服务范围" prop="coverArea">
							<ul>
								<li v-for="city in formValidate.coverArea" class="fl">
									<Button type="ghost" class="ml10 mt5">{{city}}</Button>
								</li>
							</ul>
							<!-- <Checkbox-group v-model="formValidate.city">
						        <Checkbox v-for="(item, index) in formValidate.cityList" :label="item" :key="index">{{item}}</Checkbox>
						   </Checkbox-group> -->
						</Form-item>
						<Form-item label="最低起购金额" prop="appointmentMinBill">
							<Input v-model="formValidate.appointmentMinBill" placeholder="满足最低起购金额方可服务" class="w40p"><span slot="append">元</span></Input>
						</Form-item>
						<Form-item label="附加费" prop="fixFee">
							<Input v-model="formValidate.fixFee" placeholder="上门费或其他额外费用" class="w40p"><span slot="append">元</span></Input>
						</Form-item>
						<Form-item label="免附加费起购金额" prop="noFixFeePrice">
							<Input v-model="formValidate.noFixFeePrice" placeholder="订单满此金额则不收取附加费" class="w40p"><span slot="append">元</span></Input>
						</Form-item>
						<Form-item label="提前预约" prop="aheadHours">
							<Input v-model="formValidate.aheadHours" placeholder="用户预约时间须大于下单时间的间隔小时数，必须是0.5的整数倍" class="w40p"><span slot="append">小时</span></Input>
						</Form-item>
						<Form-item label="开启上单通知" prop="allowDirectCall">
							<i-switch size="large" v-model="formValidate.allowDirectCall">
								<span slot="open">开启</span>
								<span slot="close">关闭</span>
							</i-switch>
						</Form-item>
						<Form-item>
						    <Button type="primary" @click="handleSubmit('shop')">保存</Button>
						    <Button type="ghost" @click="handleReset('shop')" class="ml10">重置</Button>
						</Form-item>
					</Form>
				</div>
			</Card>
		</Col>
	</Row>
</template>

<script>
import bread from '../../components/Bread/Bread';
export default {

  	name: 'shop',

  	data () {
  		const validateName = (rule, value, callback) => {
		    if (value === '') {
		        callback(new Error('店铺名称不能为空'));
		    } else if (value.length < 2 || value.length > 10) {
		        callback(new Error('请输入您的店铺名称（2-10）个字'));
		    } else {
		        callback();
		    }
		};
    	return {
    		weekCheckbox: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    		formValidate: {
    			name: '',
    			orderingNotice: '',
    			description: '',
    			phone: '',
    			starttime: '',
    			endtime: '',
    			week: [],
    			appointmentMinBill: '',
    			fixFee: '',
    			noFixFeePrice: '',
    			coverArea: [],
    			city: [],
    			cityList: {},
    			allowDirectCall: false,
    			photo: []
    		},
    		ruleValidate: {
    			name: [
    				{ required: true, validator: validateName, trigger: 'blur'}
    			],
    			orderingNotice: [
    				{ }
    			],
    			description: [
    				{ required: true, message: '商家简介不能为空', trigger: 'blur'}
    			],
    			phone: [
    				{ required: true, message: '电话号码不能为空', trigger: 'blur'}
    			],
    			serviceTime: [
    				{ required: false}
    			],
    			starttime: [
    				{ required: true, type: 'date', message: '请选择服务时间', trigger: 'change'}
    			],
    			endtime: [
    				{ required: true, type: 'date', message: '请选择服务时间', trigger: 'change'}
    			],
    			week: [
    				{ required: true, type: 'array', min: 1, message: '至少选择一天', trigger: 'change'}
    			],
    			appointmentMinBill: [
    				{ required: false}
    			],
    			fixFee: [
    				{ required: false}
    			],
    			noFixFeePrice: [
    				{ required: false}
    			],
    			coverArea: [
    				{ required: false}
    			],
    			photo: [
    				{ required: false}
    			],
    			allowDirectCall: [
    				{ required: false}
    			]
    		}
    	};
  	},
  	components: {
  		bread
  	},
  	mounted () {
      this.$store.commit('showLoading', {isLoading: false});
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
  	methods: {
  		handleSubmit (name, callback) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('保存成功');
                    callback && callback();
                } else {
                    this.$Message.error('保存失败');
                }
            })
      	},
      	handleReset (name) {
            this.$refs[name].resetFields();
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

		            _this.formValidate.photo.push({
		            	url : e.target.result
		            });
		          
		        };  
		          
			    })(f);  
			          
			          
			    reader.readAsDataURL(f);  
		          
		    }  
		  
		},
		removeImg (e) {
			e.currentTarget.parentNode.remove()
		},
      	serviceAjax () {
        	this.$store.commit('showLoading', {isLoading: true});
        	this.axios.get(`http://www.daoway.com/daoway/rest/service/80999f240bac4e309a28ebf03a7fd34b?h5=1&userId=910da3040f444a82859cbe472aa779be`)
          		.then(response => response.data)
          		.then(res => {
            		this.$nextTick(() => {
              		this.formValidate.name = res.data.title;
              		this.formValidate.orderingNotice = res.data.orderingNotice;
	              	this.formValidate.description = res.data.description;
	              	this.formValidate.phone = res.data.phone;
	              	this.formValidate.starttime = res.data.startTime;
	              	this.formValidate.endtime = res.data.endTime;
	              	this.formValidate.appointmentMinBill = res.data.appointmentMinBill;
	              	this.formValidate.fixFee = res.data.fixFee;
	              	this.formValidate.noFixFeePrice = res.data.noFixFeePrice;
	              	this.formValidate.aheadHours = res.data.aheadHours;
	              	this.formValidate.allowDirectCall = res.data.allowDirectCall;
	              	this.formValidate.photo = res.data.imgs;
	              	let weekArray = [], coverAreaArray = [];
	              	for (let i = 0, ilength = res.data.availableDays.split(',').length; i < ilength; i++) {
	                	let number = parseInt(res.data.availableDays.split(',')[i]);
	                	weekArray.push(this.weekCheckbox[number])
	              	}
	              	for (let j = 0, jlength = res.data.coverArea.split(' ').length; j < jlength; j++) {
	               		coverAreaArray.push(res.data.coverArea.split(' ')[j]);
	              	}
	              	this.formValidate.cityList = res.data.coverArea.split(' ');
	              	this.formValidate.week = weekArray;
	               	this.formValidate.coverArea = coverAreaArray;
	            });
          	})
          	.then(() => {
            	this.$store.commit('showLoading', {isLoading: false})
          	})
      	}
  	}
};
</script>

<style lang="scss">
.shop-block{
	padding-left: 10px;
	.ivu-icon{
		margin-right: 5px;
	}
	.ivu-icon-ios-telephone{
		font-size: 15px;
	}
	.remove{
		position: absolute;
		top: 2px;
		right: 2px;
		cursor: pointer;
	}
	.form-shop{
	    width: 80%;
		margin:  0 auto;
		.serviceTime{
			.ivu-form-item:after, .ivu-form-item:before{
				display: none;
			}
			.ivu-form-item-error-tip{
				margin-top: 35px;
			}
		}
	}
}
</style>