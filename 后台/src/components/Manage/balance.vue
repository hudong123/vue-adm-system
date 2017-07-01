<template>
	<Row>
		<Col span="24" class="balance-block pr10 demo-tabs-style1">
			<bread></bread>
			<Tabs type="card" class="mt15"  :animated="false" @on-click="loadTab" >
				<!-- 首单优惠 -->
			    <Tab-pane label="首单立减">
			    	<span class="mt5 dib">特别提示：创建首单优惠能够提高新用户下单率，用户获得的优惠金额不可结算，相关费用需店主自行承担。</span>
			    	<Button type="primary" shape="circle" class="btn1" @click="SetUp1"><Icon type="plus"></Icon>创建首单优惠</Button>
			    	<div class="ivu-table-wrapper mt10 fl" v-show="isLoading == false">
					    <div class="ivu-table ivu-table-border ivu-table-stripe">
					        <table cellspacing="0" cellpadding="0" border="0" width="100%">
					           <thead>
					                <tr>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">优惠类型</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">优惠项目</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">优惠条件</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">创建时间</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">生效时间</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">截至时间</div></th>
					                	<th class="ivu-table-column w100"><div class="ivu-table-cell">开始 / 暂停</div></th>
					                	<th class="ivu-table-column-center w100"><div class="ivu-table-cell">操作</div></th>
					                </tr>
					           </thead>
					           <tbody v-for="(item, index) in info">
					                <tr>
					                	<td class="ivu-table-column"><div class="ivu-table-cell">{{type[item.type]}}</div></td>
										<td class="ivu-table-column"><div class="ivu-table-cell">{{item.priceName || '全部项目'}}</div></td>
										<td class="ivu-table-column"><div class="ivu-table-cell">满 <span class="cred">{{item.total}}</span> 减 <span class="cffb400">{{item.reduce}}</span></div></td>
										<td class="ivu-table-column"><div class="ivu-table-cell">{{format(item.createtime, 'yyyy-MM-dd HH:mm')}}</div></td>
										<td class="ivu-table-column"><div class="ivu-table-cell">{{format(item.startTime, 'yyyy-MM-dd HH:mm')}}</div></td>
										<td class="ivu-table-column"><div class="ivu-table-cell">{{format(item.endTime, 'yyyy-MM-dd HH:mm')}}</div></td>
										<td class="ivu-table-column">
											<div class="ivu-table-cell">
												<i-switch size="large" v-model="item.enable"  @on-change="changeSwitch2(item.id)">
											        <span slot="open">开始</span>
											        <span slot="close">暂停</span>
											    </i-switch>	
											</div>
										</td>
										<td class="ivu-table-column-center"><div class="ivu-table-cell"><i-button type="info" size="small" @click="modal1show(item)"><Icon type="wand"></Icon>修改</i-button></div></td>
					                </tr>
					            </tbody>
					        </table>
					    </div>
					</div>
					<Modal v-model="modal1" width="600">
						<p slot="header" style="color: #39f">
				            <span v-if="okText">添加首单优惠</span>
				            <span v-else="okText == false">修改首单优惠</span>
				        </p>
				        <div class="balanceModalLoading" v-show="modalSelectLoading">
							<img src="../../../static/images/loading.gif">
						</div>
				        <div class="form1-block" v-show="!modalSelectLoading">
				        	<Form ref="form1" :model="formValidate1" :rules="ruleValidate1" :label-width="110">
				        		<Form-item label="优惠类型" v-if="okText == true">
				        			<p><b>{{type['FIRST_REDUCE']}}</b></p>
				        		</Form-item>
				        		<Form-item label="服务项目" prop="serviceName">
				        			<Select v-model="formValidate1.selectOption" filterable not-found-text="无">
				        				<Option value="0" key="0">全部项目</Option>
						                <Option v-for="(item, index) in selectList" :value="item.id" :key="item">{{item.name}}</Option>
						            </Select>
				        		</Form-item>
				        		<Form-item label="首单优惠说明">
				        			<span class="error">用户首次下单时立减，该优惠不与满减优惠同享。</span>
				        		</Form-item>
								<Form-item label="最低消费" prop="total">
									<Input v-model="formValidate1.total" placeholder="最低消费金额（单位：元）"></Input>
								</Form-item>
								<Form-item label="立减金额" prop="reduce">
									<Input v-model="formValidate1.reduce" placeholder="优惠金额（单位：元）"></Input>
								</Form-item>
								<Form-item label="优惠时间" class="balanceTime" prop="time">
									<Form-item prop="starttime">
										<Date-picker type="datetime" :options="options1" placeholder="选择日期和时间" style="width: 200px" v-model="formValidate1.starttime" class="fl" confirm></Date-picker>
									</Form-item>
									<span class="text-center w30 fl">至</span>
									<Form-item prop="endtime">
										<Date-picker type="datetime" :options="options1" placeholder="选择日期和时间" style="width: 200px" v-model="formValidate1.endtime" class="fl"></Date-picker>
									</Form-item>
								</Form-item>
				        	</Form>	
				        </div>
				        <div slot="footer">
				            <Button type="ghost" @click="closeModal1">取消</Button>
				            <Button type="primary" @click="addModal1" v-if="okText == true">添加</Button>
				            <Button type="primary" @click="reviseModal1" v-if="okText == false">修改</Button>
				        </div>
					</Modal>
			    </Tab-pane>
			    <!-- 订单满减优惠 -->
			    <Tab-pane label="订单满减">
			    	<span class="mt5 dib">特别提示：创建满减优惠能够大幅提高客单价。用户获得的优惠金额不可结算，相关费用需店主自行承担。</span>
			    	<Button type="primary" shape="circle" class="btn2" @click="SetUp2"><Icon type="plus"></Icon>创建满减优惠</Button>
			    	<div class="ivu-table-wrapper mt10 fl" v-show="isLoading == false">
					    <div class="ivu-table ivu-table-border ivu-table-stripe">
					        <table cellspacing="0" cellpadding="0" border="0" width="100%">
					           <thead>
					                <tr>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">优惠类型</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">优惠项目</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">优惠条件</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">创建时间</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">生效时间</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">截至时间</div></th>
					                	<th class="ivu-table-column w100"><div class="ivu-table-cell">开始 / 暂停</div></th>
					                	<th class="ivu-table-column-center w100"><div class="ivu-table-cell">操作</div></th>
					                </tr>
					           </thead>
					           <tbody v-for="(item, index) in info">
					                <tr>
					                	<td class="ivu-table-column"><div class="ivu-table-cell">{{type[item.type]}}</div></td>
										<td class="ivu-table-column"><div class="ivu-table-cell">{{item.priceName || '全部项目'}}</div></td>
										<td class="ivu-table-column"><div class="ivu-table-cell">满 <span class="cred">{{item.total}}</span> 减 <span class="cffb400">{{item.reduce}}</span></div></td>
										<td class="ivu-table-column"><div class="ivu-table-cell">{{format(item.createtime, 'yyyy-MM-dd HH:mm')}}</div></td>
										<td class="ivu-table-column"><div class="ivu-table-cell">{{format(item.startTime, 'yyyy-MM-dd HH:mm')}}</div></td>
										<td class="ivu-table-column"><div class="ivu-table-cell">{{format(item.endTime, 'yyyy-MM-dd HH:mm')}}</div></td>
										<td class="ivu-table-column">
											<div class="ivu-table-cell">
												<i-switch size="large" v-model="item.enable"  @on-change="changeSwitch(item.id)">
											        <span slot="open">开始</span>
											        <span slot="close">暂停</span>
											    </i-switch>	
											</div>
										</td>
										<td class="ivu-table-column-center"><div class="ivu-table-cell"><i-button type="info" size="small" @click="modal2show(item)"><Icon type="wand"></Icon>修改</i-button></div></td>
					                </tr>
					            </tbody>
					        </table>
					    </div>
					</div>
					<Modal v-model="modal2" width="600">
						<p slot="header" style="color: #39f">
				            <span v-if="okText">添加满减优惠</span>
				            <span v-else="okText == false">修改满减优惠</span>
				        </p>
				        <div class="balanceModalLoading" v-show="modalSelectLoading">
							<img src="../../../static/images/loading.gif">
						</div>
				        <div class="form2-block" v-show="!modalSelectLoading">
				        	<Form ref="form2" :model="formValidate2" :rules="ruleValidate2" :label-width="110">
				        		<Form-item label="优惠类型" v-if="okText">
				        			<p><b>{{type['TOTAL_REDUCE']}}</b></p>
				        		</Form-item>
				        		<Form-item label="服务项目" prop="serviceName">
				        			<Select v-model="formValidate2.selectOption" filterable not-found-text="无">
				        				<Option value="0" key="0">全部项目</Option>
						                <Option v-for="(item, index) in selectList" :value="item.id" :key="item">{{item.name}}</Option>
						            </Select>
				        		</Form-item>
				        		<Form-item label="首单优惠说明">
				        			<span class="error">用户满足下单条件时立减，该优惠不与首单优惠同享。</span>
				        		</Form-item>
								<Form-item label="最低消费" prop="total">
									<Input v-model="formValidate2.total" placeholder="最低消费金额（单位：元）"></Input>
								</Form-item>
								<Form-item label="立减金额" prop="reduce">
									<Input v-model="formValidate2.reduce" placeholder="优惠金额（单位：元）"></Input>
								</Form-item>
								<Form-item label="优惠时间" class="balanceTime" prop="time">
									<Form-item prop="starttime">
										<Date-picker type="datetime" :options="options1" placeholder="选择日期和时间" style="width: 200px" v-model="formValidate2.starttime" class="fl" confirm></Date-picker>
									</Form-item>
									<span class="text-center w30 fl">至</span>
									<Form-item prop="endtime">
										<Date-picker type="datetime" :options="options1" placeholder="选择日期和时间" style="width: 200px" v-model="formValidate2.endtime" class="fl"></Date-picker>
									</Form-item>
								</Form-item>
				        	</Form>	
				        </div>
				        <div slot="footer">
				            <Button type="ghost" @click="closeModal2">取消</Button>
				            <Button type="primary" @click="addModal2" v-if="okText == true">添加</Button>
				            <Button type="primary" @click="reviseModal2" v-if="okText == false">修改</Button>
				        </div>
				    </Modal>    
			    </Tab-pane>
			    <!-- 代金券管理 -->
			    <Tab-pane label="领券中心">
			    	<span class="mt5 dib">特别提示：发放代金券可大幅促进新用户下单和老用户复购。用户使用代金券金的金额不可结算，相关费用需由店主自行承担。</span>
			    	<Button type="primary" shape="circle" class="btn3" @click="SetUp3"><Icon type="plus"></Icon>创建代金券</Button>
			    	<div class="ivu-table-wrapper mt10 fl" v-show="isLoading == false">
					    <div class="ivu-table ivu-table-border ivu-table-stripe">
					        <table cellspacing="0" cellpadding="0" border="0" width="100%">
					           <thead>
					                <tr>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">代金券类型</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">代金券金额</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">创建时间</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">使用数量</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">有效期</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">领取数量</div></th>
					                	<th class="ivu-table-column w100"><div class="ivu-table-cell">开始 / 暂停</div></th>
					                	<th class="ivu-table-column-center w100"><div class="ivu-table-cell">操作</div></th>
					                </tr>
					           </thead>
					           <tbody v-for="(item, index) in info">
					                <tr>
					                	<td class="ivu-table-column"><div class="ivu-table-cell">{{type[item.triggerType]}}</div></td>
					                	<td class="ivu-table-column"><div class="ivu-table-cell">满 <span class="cred">{{item.minBill}}</span> 元减 <span class="cffb400">{{item.bill}}</span> 元</div></td>
										<td class="ivu-table-column"><div class="ivu-table-cell">{{format(item.createtime, 'yyyy-MM-dd HH:mm')}}</div></td>
										<td class="ivu-table-column"><div class="ivu-table-cell">{{item.usedNum}}张</div></td>
										<td class="ivu-table-column"><div class="ivu-table-cell">{{item.validDays}}天</div></td>
										<td class="ivu-table-column"><div class="ivu-table-cell">{{item.receiveNum}}张</div></td>
										<td class="ivu-table-column">
											<div class="ivu-table-cell">
												<i-switch size="large" v-model="switch3[item.status]"  @on-change="changeSwitch3(item.id)">
											        <span slot="open">开始</span>
											        <span slot="close">暂停</span>
											    </i-switch>	
											</div>
										</td>
										<td class="ivu-table-column-center"><div class="ivu-table-cell"><i-button type="info" size="small" @click="modal3show(item)"><Icon type="wand"></Icon>修改</i-button></div></td>
					                </tr>
					            </tbody>
					        </table>
					    </div>
					</div>
					<Modal v-model="modal3" width="600">
						<p slot="header" style="color: #39f">
							<span v-if="okText">创建代金券</span>
				            <span v-else="okText == false">修改代金券</span>
				        </p>
				        <div class="form3-block">
				        	<Form ref="form3" :model="formValidate3" :rules="ruleValidate3" :label-width="110">
				        		<Form-item label="代金券类型" prop="voucher">
				        			<Select v-model="formValidate3.selectOption">
						                <Option v-for="(item, index) in selectModal3" :value="item.value" :key="item">{{item.label}}</Option>
						            </Select>
				        		</Form-item>
				        		<Form-item label="代金券领取说明">
				        			<span class="error">只要满足条件，用户可同时领取多张开启的代金券</span>
				        		</Form-item>
				        		<Form-item label="代金券金额" prop="voucherMoney" v-if="Money3 == true">
				        			<div v-if="formValidate3.voucherShow">
				        				<Radio-group v-model="formValidate3.Radio3">
									        <Radio label="10">10元减2元</Radio>
									        <Radio label="20">20元减5元</Radio>
									        <Radio label="30">30元减10元</Radio>
									    </Radio-group>		
				        				<Button type="primary" class="ml10" @click="toggleCustom">自定义金额<i class="fa fa-angle-down"></i></Button>	
				        			</div>
				        			<div v-else="formValidate3.voucherShow == false">
				        				<Radio-group v-model="formValidate3.Radio3">
									        <Radio disabled label="10">10元减2元</Radio>
									        <Radio disabled label="20">20元减5元</Radio>
									        <Radio disabled label="30">30元减10元</Radio>
									    </Radio-group>	
				        				<Button type="info" class="ml10" @click="toggleCustom">关闭自定义金额<i class="fa fa-angle-up"></i></Button>	
				        			</div>
				        		</Form-item>
				        		<Form-item label="自定义金额" prop="Custom" v-if="Custom3 == true">
						            <span>满</span><Input v-model="formValidate3.Custom1" class="w60 ml10"></Input><span class="ml10">元减</span>
						            <Input v-model="formValidate3.Custom2" class="w60 ml10"></Input><span class="ml10">元</span>
				        		</Form-item>
				        		<Form-item label="代金券有效期" prop="validDays">
				        			<Input v-model="formValidate3.validDays" placeholder="有效天数"><span slot="append">天</span></Input>
				        		</Form-item>
				        		<Form-item label="数量限制" prop="distributeLimitNum">
				        			<Input v-model="formValidate3.distributeLimitNum" placeholder="发放数量限制"></Input>
				        		</Form-item>
				        	</Form>	
				        </div>
				        <div slot="footer">
				            <Button type="ghost" @click="closeModal3">取消</Button>
				            <Button type="primary" @click="addModal3" v-if="okText">添加</Button>
				            <Button type="primary" @click="reviseModal3" v-if="okText == false">修改</Button>
				        </div>
				    </Modal>    
			    </Tab-pane>
			</Tabs>
		</Col>
	</Row>
</template>

<script>
import bread from '../../components/Bread/Bread';

export default {

  	name: 'balance',

  	data () {
  		const validateCustom = (rule, value, callback) => {
		    callback()
		};
    	return {
    		self: this,
    		total: null,
    		modal1: false,
    		modal2: false,
    		modal3: false,
    		modalSelectLoading: true,
    		switch3: {
    			"1" : false,
    			"0" : true,
    			"-1" : true
    		},
    		selectModal3: [
    			{
    				value: 0,
                    label: '首次下单奖励券（新用户首单奖励，促进新客复购）'
    			},
    			{
    				value: 1,
    				label: '日常促销满减券（在领券中心领取，日常促销拉单）'
    			},
    			{
    				value: 2,
    				label: '订单完成奖励券（订单完成后发放，促进老客复购）'
    			}
    		],
    		Custom3: true,
    		Money3: false,
    		modal1loading: true,
    		okText: true,
    		selectList: {},
    		type: {
    			'FIRST_REDUCE': '首单优惠',
    			'TOTAL_REDUCE': '满减优惠',
    			'order_first_new': '首次下单奖励券'
    		},
    		info: {},
    		formValidate1: {
    			selectOption: '',
    			total: '',
    			reduce: '',
    			starttime: '',
    			endtime: ''
    		},
    		formValidate2: {
    			selectOption: '',
    			total: '',
    			reduce: '',
    			starttime: '',
    			endtime: ''
    		},
    		formValidate3: {
    			selectOption: '',
    			distributeLimitNum: '',
    			validDays: '',
    			voucherMoney: 30,
    			Radio3: '',
    			voucherShow: false,
    			Custom1: '',
    			Custom2: ''
    		},
    		ruleValidate1: {
    			time: [
    				{ required: true}
    			],
    			total: [
    				{required: true, message: '请输入金额'}
    			],
    			reduce: [
    				{required: true, message: '请输入金额'}
    			],
    			starttime: [
    				{ required: true, type: 'date', message: '请选择时间', trigger: 'change' }
    			],
    			endtime: [
    				{ required: true, type: 'date', message: '请选择时间', trigger: 'change' }
    			],
    			serviceName: [
    				{ required: true, message: '请选择至少一个项目', trigger: 'blur' }
    			]	
    		},
    		ruleValidate2: {
    			time: [
    				{ required: true}
    			],
    			total: [
    				{required: true, message: '请输入金额'}
    			],
    			reduce: [
    				{required: true, message: '请输入金额'}
    			],
    			starttime: [
    				{ required: true, type: 'date', message: '请选择时间', trigger: 'change' }
    			],
    			endtime: [
    				{ required: true, type: 'date', message: '请选择时间', trigger: 'change' }
    			],
    			serviceName: [
    				{ required: true, message: '请选择至少一个项目', trigger: 'blur' }
    			]	
    		},
    		ruleValidate3: {
    			validDays: [
    				{ required: true, message: '请填写有效天数'}
    			],
    			voucher: [
    				{ required: true, message: '请选择至少一个项目', trigger: 'blur' }
    			],
    			Custom: [
    				{ required: true, validator: validateCustom}
    			]
    		},
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
    	};
  	},

  	components: {
  		bread
  	},

  	methods: {
  		changeSwitch (item) {
  			
  		},
  		changeSwitch2 (item) {
  			
  		},
  		changeSwitch3 (item) {
  			
  		},
  		modal1show (item) {
  			this.okText = false;
  			this.formValidate1.total = item.total;
			this.formValidate1.reduce = item.reduce;
			this.formValidate1.starttime = this.format(item.startTime, 'yyyy-MM-dd HH:mm');
			this.formValidate1.endtime = this.format(item.endTime, 'yyyy-MM-dd HH:mm');
			this.formValidate1.selectOption = `${item.priceId || 0}`;
			this.modal1 = true;

			this.hook();
  		},
  		modal2show (item) {
  			this.okText = false;
  			this.formValidate2.total = item.total;
			this.formValidate2.reduce = item.reduce;
			this.formValidate2.starttime = this.format(item.startTime, 'yyyy-MM-dd HH:mm');
			this.formValidate2.endtime = this.format(item.endTime, 'yyyy-MM-dd HH:mm');
			this.formValidate2.selectOption = `${item.priceId || 0}`;
			this.modal2 = true;

			this.hook();
  		},
  		modal3show (item) {
  			this.okText = false;
			this.formValidate3.distributeLimitNum = item.distributeLimitNum;
			this.formValidate3.voucherMoney = item.minBill;
			this.formValidate3.selectOption = 0;
			this.formValidate3.validDays = item.validDays;
			this.Money3 = true;
			if (item.minBill > 30) {
				this.formValidate3.voucherShow = false;
				this.Custom3 = true;
				this.formValidate3.Radio3 = '';
				this.formValidate3.Custom1 = item.minBill;
  				this.formValidate3.Custom2 = item.bill;
			} else {
				this.formValidate3.voucherShow = true;
				this.Custom3 = false;
				this.formValidate3.Radio3 = item.minBill;
				this.formValidate3.Custom1 = '';
  				this.formValidate3.Custom2 = '';
			}
			this.modal3 = true;
  		},
  		closeModal1 () {
  			this.modal1 = false;
  		},
  		reviseModal1 () {
  			this.modal1 = false
  		},
  		showModal1 () {
  			this.modal1 = true
  		},
  		addModal1 () {
  			this.modal1 = false;
  		},
  		closeModal2 () {
  			this.modal2 = false;
  		},
  		reviseModal2 () {
  			this.modal2 = false
  		},
  		showModal2 () {
  			this.modal2 = true
  		},
  		addModal2 () {
  			this.modal2 = false;
  		},
  		closeModal3 () {
  			this.modal3 = false;
  		},
  		reviseModal3 () {
  			this.modal3 = false;

  		},
  		showModal3 () {
  			this.modal3 = true
  		},
  		addModal3 () {
  			this.modal3 = false;
  		},
  		SetUp1 () {
  			this.okText = true;
  			this.$refs['form1'].resetFields();
  			this.formValidate1.selectOption = "0";
  			this.modal1 = true;
  			this.hook();
  		},
  		SetUp2 () {
  			this.okText = true;
  			this.$refs['form2'].resetFields();
  			this.formValidate2.selectOption = "0";
  			this.modal2 = true;
  			this.hook();
  		},
  		SetUp3 () {
  			this.okText = true;
  			this.$refs['form3'].resetFields();
  			this.formValidate3.selectOption = 0;
  			this.formValidate3.Custom1 = '';
  			this.formValidate3.Custom2 = '';
  			this.Money3 = false;
  			this.modal3 = true;
  		},
  		toggleCustom () {
  			this.formValidate3.voucherShow = !this.formValidate3.voucherShow;
  			this.Custom3 = !this.Custom3;
  			// this.formValidate3.Radio3 = '';
  		},
  		hook () {
  			// 获取服务类目 iview filter bug! 非得强制渲染
  			this.modalSelectLoading = true;
  			this.$nextTick(() => {
  				this.axios.get(`http://www.daoway.com/daoway/rest/service/80999f240bac4e309a28ebf03a7fd34b?userId=910da3040f444a82859cbe472aa779be&h5=1`)
  				.then(response => response.data)
  				.then(res => {
  					if (res.status == 'ok') {
  						this.selectList = res.data.prices;
  					}
  				})
  				.then(() => {
  					this.modalSelectLoading = false;
  				})
  				.catch(error => {
  					console.log(111)
  				});
  			})
  		},
  		loadTab (name) {
  			if (name == 0) {
  				this.loadTabAjax1(); 				
  			} else if (name == 1) {				
  				this.loadTabAjax2();
  			} else if (name == 2) {
  				this.loadTabAjax3();
  			}
  		},
  		// 首单优惠
  		loadTabAjax1 () {
  			this.$store.commit('showLoading', {isLoading: true});
  			this.axios.get(`http://www.daoway.com/daoway/rest/promotion/80999f240bac4e309a28ebf03a7fd34b?type=FIRST_REDUCE&start=0&size=999`)
	  			.then(response => response.data)
	  			.then(res => {
	  				if (res.status == 'ok') {
	  					this.info = res.data.list;
			  			this.total = res.total;
	  				}
	  			})
	  			.then(() => {
	  				this.$store.commit('showLoading', {isLoading: false})
	  			})
  		},
  		// 订单满减优惠
  		loadTabAjax2 () {
  			this.$store.commit('showLoading', {isLoading: true});
  			this.axios.get(`http://www.daoway.com/daoway/rest/promotion/80999f240bac4e309a28ebf03a7fd34b?type=TOTAL_REDUCE&start=0&size=999`)
  				.then(response => response.data)
  				.then(res => {
  					if (res.status == 'ok') {
		  				this.info = res.data.list;
				  		this.total = res.total;
		  			}
  				})
  				.then(() => {
	  				this.$store.commit('showLoading', {isLoading: false})
	  			})
  		},
  		// 代金券管理
  		loadTabAjax3 () {
  			this.$store.commit('showLoading', {isLoading: true});
  			this.axios.get(`http://www.daoway.com/daoway/rest/coupon/910da3040f444a82859cbe472aa779be/created_coupons?serviceId=80999f240bac4e309a28ebf03a7fd34b`)
  				.then(response => response.data)
  				.then(res => {
  					if (res.status == 'ok') {
		  				this.info = res.data;
				  		this.total = res.total;
		  			}
  				})
  				.then(() => {
	  				this.$store.commit('showLoading', {isLoading: false})
	  			})
  		}
  	},

  	mounted () {
  		this.loadTabAjax1();
  	},

  	computed: {
  		isLoading () {
	  		return this.$store.state.isLoading
	  	}
  	}
};
</script>

<style lang="scss">
.balance-block{
	padding-left: 10px;
	.ivu-icon{
		margin-right: 5px;
	}
	.btn1, .btn2, .btn3{
		float: right;
	}
}
.form3-block{
	.fa{
		margin-left: 5px;
	}
}
.balanceTime{
	.ivu-form-item:after, .ivu-form-item:before{
		display: none;
	}
	.ivu-form-item-error-tip{
		margin-top: 35px;
	}
}
.ivu-modal .ivu-select-dropdown{
	position: absolute !important;
	top: 30px !important;
}
.balanceModalLoading{
	position: relative;
	left: 50%;
}
</style>