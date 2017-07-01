<template>
	<div class="form-block">
		<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="70">
			<Form-item label="姓名" prop="name">
				<Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
			</Form-item>
			<Form-item label="邮箱" prop="email">
				<Input v-model="formValidate.email" placeholder="请输入邮箱"></Input>
			</Form-item>
			<Form-item label="区域选择" prop="area">
				<Cascader :data="area" v-model="formValidate.area" trigger="hover" label="区域选择" placeholder="请选择区域"></Cascader>
			</Form-item>
			<Form-item label="出生日期" prop="date">
				<Row>
	                <Col span="12">
			            <Date-picker type="date" placeholder="请选择出生年月" v-model="formValidate.date"></Date-picker>
			        </Col>
	            </Row>
			</Form-item>
			<Form-item label="性别" prop="sex">
	            <Radio-group v-model="formValidate.sex">
	                <Radio label="male">男</Radio>
	                <Radio label="female">女</Radio>
	            </Radio-group>
	        </Form-item>
	        <Form-item label="爱好" prop="hobby">
	        	<Checkbox-group v-model="formValidate.hobby">
	        		<Checkbox label="篮球"></Checkbox>
	        		<Checkbox label="足球"></Checkbox>
	        		<Checkbox label="网球"></Checkbox>
	        		<Checkbox label="乒乓球"></Checkbox>
	        		<Checkbox label="羽毛球"></Checkbox>
	        	</Checkbox-group>
	        </Form-item>
	        <Form-item label="介绍" prop="introduce">
	        	<Input v-model="formValidate.introduce" type="textarea" :autosize="{minRow: 2, maxRows: 5}" placeholder="请输入..."></Input>
	        </Form-item>
	        <Form-item label="其他信息" prop="other">
	        	<i-switch v-model="switch1">
	        		<Icon type="android-done" slot="open"></Icon>
        			<Icon type="android-close" slot="close"></Icon>
	        	</i-switch>
	        </Form-item>
	        <transition name="slide-other">
	        	<div class="other-form-block" v-show="this.switch1">
	        		<Form-item label="个人证书" prop="certificate" class="switchBorder">
			        	<Upload
					        multiple
					        type="drag"
					        action="//jsonplaceholder.typicode.com/posts/">
					        <div style="padding: 20px 0">
					            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
					            <p>点击或将文件拖拽到这里上传</p>
					        </div>
					    </Upload>
			        </Form-item>
			        <Form-item label="个人技能" prop="skill">
			        	<Transfer
					        :data="formValidate.skill"
					        :target-keys="formValidate.targetKeys"
					        :render-format="render1"
					        :titles="titles"
					        @on-change="handleChange1">
					    </Transfer>
			        </Form-item>
			        <Form-item label="自我评分" prop="rate">
			        	<Row>
			        		<i-col span="12">
					            <Rate show-text allow-half v-model="formValidate.rate"></Rate>
					        </i-col>
			        	</Row>
			        </Form-item>
	        	</div>
	        </transition>
	        <Form-item>
	        	<Button type="primary" @click="submit">提交</Button>
	        	<Button type="ghost" @click.stop.prevent="$router.go(-1)">取消</Button>
	        </Form-item>
		</Form>
	</div>
</template>

<script>
export default {

  name: 'Register',

  data () {
    return {
    	titles: ['全部技能', '拥有技能'],
    	switch1: false,
    	formValidate: {
    		name: '',
    		email: '',
    		date: '',
    		sex: '',
    		hobby: [],
    		introduce: '',
    		certificate: [{

    		}],
    		skill: this.getMockData(),
    		targetKeys: this.getTargetKeys(),
    		rate: 3
    	},
    	postData: {

    	},
    	ruleValidate: {
    		name: [
                { required: true, message: '姓名不能为空', trigger: 'blur' }
            ],
            email: [
            	{ required: true, message: '邮箱不能为空', trigger: 'blur' }
            ],
            area: [
            	{ required: true, message: '区域不能为空'}
            ],
            date: [
            	{ required: true, type: 'date', message: '请选择出生日期'}
            ],
            sex: [
            	{ required: true, message: '性别不能为空'}
            ],
            hobby: [
            	{ required: true, message: '至少选择一项爱好', type: 'array'}
            ],
            introduce: [
            	{ required: true, message: '请输入个人介绍', trigger: 'blur'}
            ]
    	},
    	areaValue: [],
    	area:[{
    		value: 'jiangxi',
    		label: '景德镇',
    		children: [
    			{
    				value: 'changjiangqu',
    				label: '昌江区'
    			},
    			{
    				value: 'zhushanqu',
    				label: '珠山区'
    			}
    		]
    	},{
    		value: 'shanghai',
    		label: '上海',
    		children: [
    			{
    				value: 'minxingqu',
    				label: '闵行区'
    			},
    			{
    				value: 'qingpuqu',
    				label: '青浦区'
    			},
    			{
    				value: 'datieguan',
    				label: '打铁关'
    			}
    		]
    	},{
    		value: 'beijing',
    		label: '北京',
    		children: [
    			{
    				value: 'zhaoyangqu',
    				label: '朝阳区'
    			},
    			{
    				value: 'wuhuanlu',
    				label: '五环路'
    			}
    		]
    	},{
    		value: 'guangzhou',
    		label: '广州',
    		children: [
    			{
    				value: 'baiyunqu',
    				label: '白云区'
    			},
    			{
    				value: 'tianhequ',
    				label: '天河区'
    			}
    		]
    	},{
    		value: 'hangzhou',
    		label: '杭州',
    		children: [
    			{
    				value: 'binjiangqu',
    				label: '滨江区'
    			},
    			{
    				value: 'yuhangqu',
    				label: '余杭区'
    			},
    			{
    				value: 'xihuqu',
    				label: '西湖区'
    			},
    			{
    				value: 'gongshuqu',
    				label: '拱墅区'
    			}
    		]
    	}]
    };
  },

  computed: {
  	isLoading() {
  		return this.$store.state.isLoading;
  	}
  },

  created() {
  	this.$store.commit('showAsideMenu', false);
  	this.$store.commit('changeTab', {type: 'all', articleList: []});
  	if(localStorage.getItem('data')){
  		let getData = JSON.parse(localStorage.getItem('data'));
  		this.formValidate.name = getData.name;
    	this.formValidate.email = getData.email;
    	this.formValidate.date = getData.date;
    	this.formValidate.area = getData.area;
    	this.formValidate.sex = getData.sex;
    	this.formValidate.hobby = getData.hobby;
    	this.formValidate.introduce = getData.introduce;
    	this.$store.state.ownSkill = getData.targetKeys;
    	this.formValidate.certificate = getData.certificate;
    	this.formValidate.rate = getData.rate;
  	}
  },

  methods: {
  	getMockData() {
  		let mockData = [];
  		for(let i = 0, ilength = this.$store.state.mockArray.length; i < ilength; i++){
  			mockData.push({
  				key: i.toString(),
  				label: this.$store.state.mockArray[i]
  			})
  		}
  		return mockData
  	},
  	getTargetKeys () {
  		console.log(this.$store.state.ownSkill)
    },
    render1 (item) {
        return item.label;
    },
    handleChange1 (newTargetKeys, direction, moveKeys) {
        this.formValidate.targetKeys = newTargetKeys;
    },
    submit () {
    	this.postData.name = this.formValidate.name;
    	this.postData.email = this.formValidate.email;
    	this.postData.date = this.formValidate.date;
    	this.postData.area = this.formValidate.area;
    	this.postData.sex = this.formValidate.sex;
    	this.postData.hobby = this.formValidate.hobby;
    	this.postData.introduce = this.formValidate.introduce;
    	this.postData.certificate = this.formValidate.certificate;
    	this.postData.targetKeys = this.formValidate.targetKeys;
    	console.log( this.formValidate.targetKeys);
    	this.postData.rate = this.formValidate.rate;
    	localStorage.setItem("data", JSON.stringify(this.postData));
    }
  }


};
</script>

<style lang="scss">
.form-block{
	width: 90%;
	margin: 20px auto 0 auto;
	.switchBorder{
		border-top: 1px dashed #999;
		padding-top: 20px;
	}
}
.slide-other-enter-active {
  transition: all .6s ease;
}
.slide-other-enter, .slide-other-leave-active {
  opacity: 0;
}
</style>