<template>
	<Row>
		<Col span="24">
			<bread></bread>
			<Card class="mt30 skill-block">
				<Button type="primary" shape="circle" @click="addItem"><Icon type="plus"></Icon>添加技能品类</Button>
				<Button type="primary" shape="circle" class="ml15" @click="itemManage"><Icon type="folder"></Icon>一级类目管理</Button>
				<Input placeholder="请输入类目名称" style="width: 150px" class="ml15"></Input>
				<Button type="primary" class="ml5"><Icon type="search"></Icon>查询</Button>
				<div class="mt15">
					<Table striped border :context="self" :columns="columns1" :data="data1"></Table>
				</div>
				<!-- 添加技能品类 -->
				<Modal v-model="modal1">
					<p slot="header">
				        <span>添加技能品类</span>
				    </p>
				    <div class="skill-form1-block">
				    	<Form ref="form1" :model="formValidate1" :rules="ruleValidate1" :label-width="80">
				    		<Form-item label="类目名称" prop="name">
				        		<Input v-model="formValidate1.name" placeholder="请填写类目名称"></Input>
				        	</Form-item>
				        	<Form-item label="所属分类" prop="parent">
				    			<Select v-model="formValidate1.parent">
				    				<Option value="顶级分类" key="顶级分类">顶级分类</Option>
						            <Option v-for="(item, index) in parentList" :value="item.value" :key="item">{{item.label}}</Option>
						       </Select>
				        	</Form-item>
				    	</Form>
				    </div>
				    <div slot="footer">
				        <Button type="ghost" @click="closeModal1">取消</Button>
				        <Button type="primary" @click="editModal1">保存</Button>
				    </div>
				</Modal>
				<!-- 编辑类目 -->
				<Modal v-model="modal2" width="700" class-name="t20">
					<p slot="header">
				        <span>编辑类目</span>
				    </p>
				    <div class="skill-form2-block">
				    	<Form ref="form2" :model="formValidate2" :rules="ruleValidate2" :label-width="80">
				    		<Form-item label="技能品类" prop="itemName">
				        		<!-- <Input v-model="formValidate2.itemName" placeholder="请填写技能品类名称"></Input> -->
				        		<b>{{formValidate2.itemName}}</b>
				        	</Form-item>
				    		<!-- <Form-item label="所属分类" prop="parent">
				    			<Select v-model="formValidate2.parent">
						            <Option v-for="(item, index) in parentList" :value="item.value" :key="item.value">{{item.label}}</Option>
						       </Select>
				        	</Form-item> -->
				        	<Form-item label="添加分类" prop="addCategory">
				        		<Input v-model="formValidate2.addCategoryInput" placeholder="请填写品类分类名称" class="w40p"></Input>
				        		<Radio-group v-model="formValidate2.addCategoryRadio" class="ml10">
							        <Radio label="more">
							            <span>多选</span>
							        </Radio>
							        <Radio label="one">
							            <span>单选</span>
							        </Radio>
							    </Radio-group>
				        		<Button type="primary" shape="circle" class="ml15" size="small" @click="addCategoryItem"><Icon type="plus" class="mr5"></Icon>添加</Button>
				        	</Form-item>
				        	<Form-item label="已有分类" prop="categoryItem">
				        		<span v-if="formValidate2.categoryItem.length < 1">无</span>
				        		<div v-for="(info, index) in formValidate2.categoryItem" :key="index" class="mb10">
				        			<Input v-model="info.itemName" placeholder="请填写品类分类名称" class="w40p"></Input>
				        			<Radio-group v-model="info.choose" class="ml10 mb10">
								        <Radio label="more">
								            <span>多选</span>
								        </Radio>
								        <Radio label="one">
								            <span>单选</span>
								        </Radio>
								    </Radio-group>
								    <Button type="error" shape="circle" class="ml15" size="small" @click="deleteCategoryItem(index)"><Icon type="close-round" class="mr5"></Icon>删除</Button>
								    <div v-for="(tagName, index) in info.item" :key="tagName">
								    	<Input v-model="tagName.name" class="w40p fl mr10 mb10 h33" icon="ios-close-empty" placeholder="输入分类名称" @on-click="deleteTagName(info.item, index)"></Input>
								    </div>
								    <div>
								    	<Input class="w40p fl mr10 mb10 h33" icon="ios-plus-empty" placeholder="添加分类" @on-click="addTagName(info.item, index, $event)"></Input>
								    </div>
								    <div class="clear"></div>
				        		</div>
				        	</Form-item>
				        	<Form-item label="服务方式" prop="way">
				        		Ta来找我：<i-switch v-model="formValidate2.way1" class="ml10"><Icon type="android-done" slot="open"></Icon><Icon type="android-close" slot="close"></Icon></i-switch>
				        		<Input v-model="formValidate2.way1input" v-if="formValidate2.way1" class="w40p ml5" placeholder="所报均价"></Input>
				        		<Select v-model="formValidate2.Select" v-if="formValidate2.way1" style="width: 80px">
				        			<Option value="time">元/次</Option>
				        			<Option value="day">元/天</Option>
							        <Option value="hour">元/小时</Option>
							        <Option value="minute">元/分钟</Option>
							    </Select>
							    <br>
							    我去找Ta：<i-switch v-model="formValidate2.way2" class="ml10"><Icon type="android-done" slot="open"></Icon><Icon type="android-close" slot="close"></Icon></i-switch>
				        		<Input v-model="formValidate2.way1input" v-if="formValidate2.way2" class="w40p ml5" placeholder="所报均价"></Input>
				        		<Select v-model="formValidate2.Select" v-if="formValidate2.way2" style="width: 80px">
				        			<Option value="time">元/次</Option>
				        			<Option value="day">元/天</Option>
							        <Option value="hour">元/小时</Option>
							        <Option value="minute">元/分钟</Option>    
							    </Select>
							    <br>
							    电话咨询：<i-switch v-model="formValidate2.way3" class="ml10"><Icon type="android-done" slot="open"></Icon><Icon type="android-close" slot="close"></Icon></i-switch>
				        		<Input v-model="formValidate2.way3input" v-if="formValidate2.way3" class="w40p ml5" placeholder="所报均价"></Input>&nbsp;&nbsp;&nbsp;&nbsp;<span v-if="formValidate2.way3">元/分钟</span>
				        		<br>
				        		视频咨询：<i-switch v-model="formValidate2.way4" class="ml10"><Icon type="android-done" slot="open"></Icon><Icon type="android-close" slot="close"></Icon></i-switch>
				        		<Input v-model="formValidate2.way4input" v-if="formValidate2.way4" class="w40p ml5" placeholder="所报均价"></Input>&nbsp;&nbsp;&nbsp;&nbsp;<span v-if="formValidate2.way4">元/分钟</span>
				        		<br>
				        		远程服务：<i-switch v-model="formValidate2.way5" class="ml10"><Icon type="android-done" slot="open"></Icon><Icon type="android-close" slot="close"></Icon></i-switch>
				        		<Input v-model="formValidate2.way5input" v-if="formValidate2.way5" class="w40p ml5" placeholder="所报均价"></Input>
				        		<Select v-model="formValidate2.Select5" v-if="formValidate2.way5" style="width: 80px">
				        			<Option value="number">元/局</Option>
				        			<Option value="day">元/天</Option>
							        <Option value="hour">元/小时</Option>
							        <Option value="minute">元/分钟</Option>    
							    </Select>
				        	</Form-item> 
				        	<Form-item label="服务介绍" prop="serviceDescription">
								<Input v-model="formValidate2.serviceDescription" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
							</Form-item>
							<Form-item label="服务时间" prop="serviceTime">
								<i-switch v-model="formValidate2.serviceTime"><Icon type="android-done" slot="open"></Icon><Icon type="android-close" slot="close"></Icon></i-switch>
							</Form-item>
							<Form-item label="语音介绍" prop="yuyin">
								<i-switch v-model="formValidate2.yuyin"><Icon type="android-done" slot="open"></Icon><Icon type="android-close" slot="close"></Icon></i-switch>
							</Form-item>
							<Form-item label="接受派单" prop="Acceptance">
								<i-switch v-model="formValidate2.Acceptance"><Icon type="android-done" slot="open"></Icon><Icon type="android-close" slot="close"></Icon></i-switch>
							</Form-item>
							<Form-item label="描述" prop="describe">
								<i-switch v-model="formValidate2.describe"><Icon type="android-done" slot="open"></Icon><Icon type="android-close" slot="close"></Icon></i-switch>
							</Form-item>
							<Form-item label="报价" prop="offer">
								<i-switch v-model="formValidate2.offer"><Icon type="android-done" slot="open"></Icon><Icon type="android-close" slot="close"></Icon></i-switch>
								<Input v-model="formValidate2.offerinput" v-if="formValidate2.offer" class="w40p ml5" placeholder="请输入报价"></Input>
				        		<Select v-model="formValidate2.offerSelect" v-if="formValidate2.offer" style="width: 80px">
				        			<Option value="month">元/月</Option>
				        			<Option value="day">元/天</Option>
							        <Option value="hour">元/小时</Option>
							        <Option value="people">元/人</Option>    
							    </Select>
							</Form-item>
							<Form-item label="定位" prop="Rental">
								<i-switch v-model="formValidate2.Rental"><Icon type="android-done" slot="open"></Icon><Icon type="android-close" slot="close"></Icon></i-switch>
							</Form-item>
				    	</Form>
				    </div>
				    <div slot="footer">
				        <Button type="ghost" @click="closeModal2">取消</Button>
				        <Button type="primary" @click="editModal2">保存</Button>
				    </div>
				</Modal>
				<!-- 一级类目管理 -->
				<Modal v-model="modal3">
					<p slot="header">
				        <span>一级类目管理</span>
				    </p>
				    <div class="skill-form3-block">
				    	<Form ref="form3" :model="formValidate3" :rules="ruleValidate3" :label-width="80">
				    		<Form-item label="添加类目：" prop="add">
				    			<Input v-model="formValidate3.addInput" placeholder="请填写品类分类名称" class="w40p"></Input>
				        		<Button type="primary" shape="circle" class="ml15" @click="addParentList"><Icon type="plus" class="mr5"></Icon>添加</Button>
				    		</Form-item>
				    		<Form-item label="类目管理：" prop="Manage">
				    			<span v-if="formValidate3.parentList.length < 1">无</span>
				    			<div v-for="(item, index) in formValidate3.parentList" :key="index">
				    				<Input v-model="item.label" placeholder="请填写一级类目名称" class="w40p fl mr10 mb10 h33" icon="ios-close-empty" @on-click="deleteParentList(index)"></Input>
				    			</div>
				    		</Form-item>
				    	</Form>
				    </div>	
				    <div slot="footer">
				        <Button type="ghost" @click="closeModal3">取消</Button>
				        <Button type="primary" @click="editModal3">保存</Button>
				    </div>
				</Modal>
			</Card>
		</Col>
	</Row>		
</template>

<script>
import bread from '../../components/Bread/Bread';
export default {

  	name: 'skill',

  	data () {
    	return {
    		self: this,
    		columns1: [
    			{
    				title: '一级类目',
    				key: 'first_item'
    			},
    			{
    				title: '技能品类',
    				key: 'second_item'
    			},
    			{
    				title: '状态',
    				key: 'status',
    				render (row, column, index) {
    					if (row.status == 1) {
    						return `<i-switch :value="true" @on-change="changeSwitch"><Icon type="android-done" slot="open"></Icon><Icon type="android-close" slot="close"></Icon></i-switch>`
    					} else {
    						return `<i-switch :value="false" @on-change="changeSwitch"><Icon type="android-done" slot="open"></Icon><Icon type="android-close" slot="close"></Icon></i-switch>`
    					}
    					
    				}
    			},
    			{
    				title: '操作',
    				align: 'center',
    				width: 170,
    				render (row, column, index) {
    					return `<i-button type="info" size="small" @click="editItem(row)"><Icon type="wand"></Icon>编辑</i-button><i-button type="error" size="small" class="ml10"><Icon type="scissors"></Icon>删除</i-button>`;
    				}
    			}
    		],
    		data1: [
    			{
    				'first_item' : '休闲娱乐',
    				'second_item' : '王者荣耀',
    				'status' : 1
    			},
    			{
    				'first_item' : '休闲娱乐',
    				'second_item' : '享美食',
    				'status' : 1
    			},
    			{
    				'first_item' : '运动健康',
    				'second_item' : '测试',
    				'status' : 0
    			},
    			{
    				'first_item' : '运动健康',
    				'second_item' : '游泳',
    				'status' : 1
    			},
    			{
    				'first_item' : '丽人时尚',
    				'second_item' : '美容',
    				'status' : 1
    			}
    		],
    		parentList:  [
    			{
    				value : '休闲娱乐',
    				label : '休闲娱乐'
    			},
    			{
    				value : '运动健康',
    				label : '运动健康'
    			},
    			{
    				value : '丽人时尚',
    				label : '丽人时尚'
    			}
    		],
    		modal1: false,
    		formValidate1: {
    			name: '',
    			parent: '顶级分类'
    		},
    		ruleValidate1: {
    			name: [
    				{ required: true, message: '类目名称不能为空', trigger: 'blur' }
    			]
    		},
    		modal2: false,
    		formValidate2: {
    			parent: '',
    			itemName: '',
    			serviceDescription: '',
    			serviceTime: true,
    			yuyin: true,
    			describe: true,
    			Acceptance: true,
    			Select: 'time',
    			Select5: 'number',
    			way1: true,
    			way1input: '',
    			way2: true,
    			way3: true,
    			way3input: '',
    			way4: true,
    			way4input: '',
    			way5: true,
    			way5input: '',
    			addCategoryInput: '',
    			addCategoryRadio: 'more',
    			categoryItem: [
    				{
    					itemName: '最高段位',
    				    choose: 'one',
    				    item: [
    				    	{
    				    		name : '王者'
    				    	},
    				    	{
    				    		name : '青铜'
    				    	},
    				    	{
    				    		name : '白金'
    				    	},
    				    	{
    				    		name : '黄金'
    				    	},
    				    	{
    				    		name : '钻石'
    				    	},
    				    	{
    				    		name : '大师'
    				    	}
    				    ]
    				},
    				{
    					itemName: '擅长位置',
    				    choose: 'more',
    				    item: [
    				    	{
    				    		name : '射手'
    				    	},
    				    	{
    				    		name : '辅助'
    				    	},
    				    	{
    				    		name : '坦克'
    				    	}
    				    ]
    				}
    			],
    			Rental: false,
    			offer: false,
    			offerinput: '',
    			offerSelect: 'month'
    		},
    		ruleValidate2: {
    			itemName: [
    				{ required: true, message: '技能品类名称不能为空', trigger: 'blur' }
    			],
    			serviceDescription: [
    				{ required: true, message: '服务介绍不能为空', trigger: 'blur'}
    			]
    		},
    		modal3: false,
    		formValidate3: {
    			addInput: '',
    			parentList: []
    		},
    		ruleValidate3: {}
    	};
  	},

  	components: {
  		bread
  	},

  	methods: {
  		changeSwitch (status) {
  			this.$Message.info('开关状态：' + status);
  		},
  		editModal1 () {
  			this.modal1 = false;
  		},
  		closeModal1 () {
  			this.modal1 = false;
  		},
  		addItem () {
  			this.$refs['form1'].resetFields();
  			this.modal1 = true;
  		},
  		editModal2 () {
  			this.modal2 = false;
  		},
  		closeModal2 () {
  			this.modal2 = false;
  		},
  		editItem (item) {
  			this.$refs['form2'].resetFields();
  			this.formValidate2.addCategoryInput = ''
  			this.modal2 = true;
  			this.formValidate2.parent = item.first_item;
  			this.formValidate2.itemName = item.second_item;
  		},
  		addCategoryItem () {
  			if (this.formValidate2.addCategoryInput) {
  				this.formValidate2.categoryItem.push({
	  				itemName: this.formValidate2.addCategoryInput,
	  				choose: this.formValidate2.addCategoryRadio,
	  				item: []
	  			});
	  			this.formValidate2.addCategoryInput = ''
  			}
  		},
  		deleteCategoryItem (index) {
  			this.formValidate2.categoryItem.splice(index, 1)
  		},
  		deleteTagName (TagName, index) {
  			TagName.splice(index, 1)
  		},
  		addTagName (TagName, index, e) {
  			let val = e.currentTarget.parentNode.querySelector('input').value;
  			if (val) {
  				TagName.push({
	  				name: e.currentTarget.parentNode.querySelector('input').value
	  			});
	  			e.currentTarget.parentNode.querySelector('input').value = ''
  			}
  		},
  		itemManage () {
  			this.modal3 = true;
  			//this.formValidate3.parentList = this.parentList;
  		},
  		editModal3 () {
  			this.modal3 = false;
  		},
  		closeModal3 () {
  			this.modal3 = false;
  		},
  		addParentList () {
  			this.formValidate3.parentList.push({
  				value : this.formValidate3.addInput,
  				label : this.formValidate3.addInput
  			})
  		},
  		deleteParentList (index) {
  			this.formValidate3.parentList.splice(index, 1);
  			console.log(this.parentList)
  		}
  	},

  	mounted () {
  		// let pa = [
    // 			{
    // 				value : '休闲娱乐',
    // 				label : '休闲娱乐'
    // 			},
    // 			{
    // 				value : '运动健康',
    // 				label : '运动健康'
    // 			},
    // 			{
    // 				value : '丽人时尚',
    // 				label : '丽人时尚'
    // 			}
    // 		];
    // 	this.$nextTick(() => {
    // 		this.parentList = pa;
    // 		this.formValidate3 = pa;
    // 	})
  	}

};
</script>

<style lang="scss">
.skill-block{
	.ivu-icon{
        margin-right: 5px;
    }
}
.skill-form2-block, .skill-form3-block{
	.ivu-icon-ios-close-empty, .ivu-icon-ios-plus-empty{
		cursor: pointer;
	}
}
</style>