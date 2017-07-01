<template>
    <Row>
	    <Col span="24" class="setting-bar pl10 pr10 demo-tabs-style1">
	    	<bread></bread>
	        <div>
				<Tabs :value="tabValue" type="card" class="mt15">
				    <Tab-pane label="个人信息" icon="information-circled" name="1">
				    	<div class="account-information-inner">
				    		<Form ref="info" :model="formValidate" :rules="ruleValidate" :label-width="70">
				    			<Form-item prop="avatar">
				    				<div class="text-center">
				    					<div class="user-icon">
				    						<img :src="formValidate.url" v-if="formValidate.url" alt="" ref="upload" id="previewImage">
				    						<img src="../../../static/images/defaultIcon.png" v-else="!formValidate.url" alt="" ref="upload" id="previewImage">
				    					</div>
				    					<div class="user-icon-btn">
				    						<div class="uploadFileSmall">
												<input type="file" id="file" @change="FileUploader($event, false)" alt=""><i class="ivu-icon ivu-icon-ios-cloud-upload"></i>上传图片
											</div>
				    					</div>
				    				</div>
				    			</Form-item>
								<Form-item label="昵称" prop="name">
									<Input v-model="formValidate.name" placeholder="昵称不能为空"></Input>
								</Form-item>
								<Form-item label="认证手机" prop="phone">
									<Input v-model="formValidate.phone" placeholder="手机号码不能为空"></Input>
								</Form-item>
								<Form-item>
						            <Button type="primary" @click="handleSubmit('info')">保存</Button>
						            <Button type="ghost" @click.stop.prevent="$router.go(-1)" style="margin-left: 8px">取消</Button>
						        </Form-item>
							</Form>
				    	</div>
				    </Tab-pane>
			        <Tab-pane label="修改密码" icon="compose" name="2">
			        	<div class="account-password-inner">
			        		<Form ref="password" :model="formValidate_Password" :rules="ruleValidate_Password" :label-width="70">
								<Form-item label="原密码" prop="password">
									<Input type="password" v-model="formValidate_Password.password" placeholder="请输入原密码"></Input>
								</Form-item>
								<Form-item label="新密码" prop="new_password">
									<Input type="password" v-model="formValidate_Password.new_password" placeholder="密码长度为6-20位"></Input>
								</Form-item>
								<Form-item label="密码确认" prop="check_password">
									<Input type="password" v-model="formValidate_Password.check_password" placeholder="再次输入密码"></Input>
								</Form-item>
								<Form-item>
						            <Button type="primary" @click="handleSubmit('password')">保存</Button>
						            <Button type="ghost" @click.stop.prevent="$router.go(-1)" style="margin-left: 8px">取消</Button>
						        </Form-item>
							</Form>
			        	</div>
			        </Tab-pane>
			        <Tab-pane label="收入提现" icon="ios-box" name="3">
			        	<div class="account-cash-inner">
			        		<Card>
						        <p slot="title">
						            <Icon type="clipboard"></Icon>
						            收入情况
						        </p>
						        <ul>
						        	<li>
						        		<Tag type="dot">待确认金额</Tag>
						        		<span class="count-number">￥1231.23</span>
						        	</li>
						        	<li>
						        		<Tag type="dot" color="blue">可提现金额</Tag>
						        		<span class="count-number">￥1127.69</span>
						        	</li>
						        	<li>
						        		<Tag type="dot" color="green">已提现金额</Tag>
						        		<span class="count-number">￥2425.15</span>
						        	</li>
						        </ul>
						    </Card>
						    <Card class="mt40">
						        <p slot="title">
						            <Icon type="document-text"></Icon>
						            提现信息
						        </p>
						       	<Form ref="account" :model="formValidate_Account" :rules="ruleValidate_Account" :label-width="85">
									<Form-item label="提现金额：" prop="money">
										<Input type="text" v-model="formValidate_Account.money" placeholder="单笔提现金额最少为100元"></Input>
									</Form-item>
									<Form-item label="提现账户：" pror="account">
										<Radio-group v-model="formValidate_Account.account">
									        <Radio label="支付宝账户"></Radio>
									        <Radio label="银行卡"></Radio>
									    </Radio-group>
									</Form-item>
									<Form-item label="支付宝账户：" prop="alipayAccount" v-if="formValidate_Account.account === '支付宝账户'">
										<Input type="text" v-model="formValidate_Account.alipayAccount" placeholder="请输入支付宝账户名称"></Input>
									</Form-item>
									<Form-item label="银行账号：" prop="bankAccount" v-else="formValidate_Account.account === '银行卡'">
										<Input type="text" v-model="formValidate_Account.bankAccount" placeholder="请输入银行账户名称"></Input>
									</Form-item>
									<Form-item>
										<Button type="primary" @click="handleSubmit('account', submitAccount)" long>提交</Button>
							        </Form-item>
								</Form>
						    </Card>
			        	</div>
			        </Tab-pane>
			        <Tab-pane label="设置提现账户" icon="card" name="4">
			        	<div class="setAccount-inner">
							<Card>
						        <p slot="title">
						            银行账户
						        </p>
						        <Form ref="setAccount_bank" :model="formValidate_bank" :rules="ruleValidate_bank" :label-width="95">
									<Form-item label="开户行省份：" prop="province">
										<Input type="text" v-model="formValidate_bank.province" placeholder="请输入开户行省份"></Input>
									</Form-item>
									<Form-item label="开户行城市：" prop="city">
										<Input type="text" v-model="formValidate_bank.city" placeholder="请输入开户行城市"></Input>
									</Form-item>
									<Form-item label="开户行银行：" prop="bank">
										<Input type="text" v-model="formValidate_bank.bank" placeholder="请输入开户行银行"></Input>
									</Form-item>
									<Form-item label="开户行支行：" prop="branch">
										<Input type="text" v-model="formValidate_bank.branch" placeholder="请输入开户行支行"></Input>
									</Form-item>
									<Form-item label="银行卡号：" prop="card">
										<Input type="text" v-model="formValidate_bank.card" placeholder="请输入银行卡号"></Input>
									</Form-item>
									<Form-item label="账户名称：" prop="name">
										<Input type="text" v-model="formValidate_bank.name" placeholder="请输入账户名称"></Input>
									</Form-item>
								</Form>
						    </Card>
						    <Card class="mt10">
						        <p slot="title">
						            支付宝账户
						        </p>
						       	<Form ref="setAccount_alipay" :model="formValidate_alipay" :rules="ruleValidate_alipay" :label-width="95">
									<Form-item label="支付宝姓名：" prop="name">
										<Input type="text" v-model="formValidate_alipay.name" placeholder="请输入支付宝姓名"></Input>
									</Form-item>
									<Form-item label="支付宝账号：" prop="account">
										<Input type="text" v-model="formValidate_alipay.account" placeholder="请输入支付宝账号"></Input>
									</Form-item>
									<Form-item>
										<Button type="primary" @click="handleSubmitDouble('setAccount_bank', 'setAccount_alipay')" long>保存</Button>
							        </Form-item>	
								</Form>
						    </Card>
			        	</div>
			        </Tab-pane>
			        <h4 slot="extra">认证手机：18058150306</h4>
				</Tabs>
			</div>
	    </Col>
	</Row>
</template>

<script>
	import bread from '../../components/Bread/Bread';

    export default {

    	name: 'account',

        data () {

        	const validatePhoneCheck = (rule, value, callback) => {
	            if (value === '') {
	                callback(new Error('电话号码不能为空'));
	            } else if (this.checkMobile(value) == false) {
	                callback(new Error('请输入正确的电话号码'));
	            } else {
	                callback();
	            }
	        };

	        // 密码验证
	        const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('新密码不能为空'));
                }else if (value.length < 6 || value.length > 20) {
                	callback(new Error('密码长度为6-20位，请重新输入'));
                }else {
                    if (this.formValidate_Password.new_password !== '') {
                        // 对第二个密码框单独验证
                        if(this.hook !== 1){
                        	this.$refs.password.validateField('check_password');
                        }
                        this.hook = 2;
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formValidate_Password.new_password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            const validateMoney = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入提现金额'));
                } else if (isNaN(value)) {
                    callback(new Error('包含非法字符'));
                } else if (parseInt(value) < 100) {
                	callback(new Error('提现金额不能小于100'));
                }else {
                    callback();
                }
            };
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('账户名称不能为空'));
                } else {
                    callback();
                }
            };

            return {
            	tab: this.$store.state.tab,
                formValidate: {
                	name: JSON.parse(localStorage.getItem('user')),
                	url: '',
                	phone: '18058150306'
                },
                formValidate_Password: {
                	password: '',
                	new_password: '',
                	check_password: ''
                },
                formValidate_Account: {
                	money: '',
                	account: '支付宝账户',
                	alipayAccount: '',
                	bankAccount: ''
                },
                formValidate_bank: {
                	province: '',
                	city: '',
                	bank: '',
                	branch: '',
                	card: '',
                	name: ''
                },
                formValidate_alipay: {
                	account: '',
                	name: ''
                },
                ruleValidate: {
		    		name: [
		                { required: true, message: '姓名不能为空', trigger: 'blur' }
		            ],  
		            phone: [
		                { required: true, trigger: 'blur', validator: validatePhoneCheck}
		            ]          
		    	},
		    	ruleValidate_Password: {
		    		password: [
		                { required: true, message: '密码不能为空', trigger: 'blur'}
		            ],
		            new_password: [
		                { required: true, trigger: 'blur', validator: validatePass}
		            ],
		            check_password: [
		                { required: true, trigger: 'blur', validator: validatePassCheck}
		            ]  
		    	},
		    	ruleValidate_Account: {
		    		money: [
		    			{ trigger: 'blur', validator: validateMoney}
		    		],
		    		alipayAccount: [
		    			{ trigger: 'blur', validator: validateName}
		    		],
		    		bankAccount: [
		    			{ trigger: 'blur', validator: validateName}
		    		]
		    	},
		    	ruleValidate_bank: {
		    		province: [
		    			{ required: true, message: '开户行省份不能为空', trigger: 'blur'}
		    		],
		    		city: [
		    			{ required: true, message: '开户行城市不能为空', trigger: 'blur'}
		    		],
		    		bank: [
		    			{ required: true, message: '开户行银行不能为空', trigger: 'blur'}
		    		],
		    		branch: [
		    			{ required: true, message: '开户行支行不能为空', trigger: 'blur'}
		    		],
		    		card: [
		    			{ required: true, message: '银行卡号不能为空', trigger: 'blur'}
		    		],
		    		name: [
		    			{ required: true, message: '账户名称不能为空', trigger: 'blur'}
		    		]
		    	},
		    	ruleValidate_alipay: {
		    		account: [
		    			{ required: true, message: '支付宝账号不能为空', trigger: 'blur'}
		    		],
		    		name: [
		    			{ required: true, message: '支付宝姓名不能为空', trigger: 'blur'}
		    		]
		    	},
		    	hook: 1
            }
        },
        methods: {
        	// 验证手机号
        	checkMobile(str) {
				let re = /^1\d{10}$/;
				if (re.test(str)) {
					return true
				} else {
					return false
				}
			},
			handleSubmit (name, callback) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功');
                        callback && callback();
                    } else {
                        this.$Message.error('提交失败');
                    }
                })
            },
            handleSubmitDouble(name1, name2, callback) {
             	let val = 0;
             	this.$refs[name1].validate((valid) => {
                    if (valid) {
                        val++;
                    }
                })
                this.$refs[name2].validate((valid) => {
                    if (valid) {
                        val++;
                    }
                })
                if (val === 2) {
                	this.$Message.success('提交成功');
                	callback && callback();
                } else {
                	this.$Message.error('提交失败');
                }
            },
            submitAccount() {
            	let accountData = {};
            	accountData.money = this.formValidate_Account.money;
            	accountData.account = this.formValidate_Account.account;
            	if(this.formValidate_Account.account == '支付宝账户') {
            		accountData.alipayAccount = this.formValidate_Account.alipayAccount
            	} else if (this.formValidate_Account.account == '银行卡') {
            		accountData.bankAccount = this.formValidate_Account.bankAccount
            	}
            }
        },
        computed: {
        	tabValue() {
        		return this.$store.state.tab
        	}
        },
        components: {
        	bread
        },
        mounted () {
        	this.$store.commit('showLoading', {isLoading: false})
        }
    }
</script>

<style lang="scss">
.setting-bar{
	.ivu-tabs-nav .ivu-tabs-tab .ivu-icon{
		margin-right: 2px;
		margin-left: -4px;
	}
	.ivu-tabs-nav-right{
		margin-top: 7px;
	}
	.ivu-icon{
		margin-left: 1px;
	}
	.account-information-inner {
	    width: 450px;
	    margin: auto;
	    padding-top: 65px;
	    .user-icon{
	    	width: 100px;
		    height: 100px;
		    margin: auto;
	    	img{
				border-radius: 50%;
				width: 100%;
				height: 100%;
	    	}
	    }
	    .user-icon-btn{
	    	margin-top: 15px;
	    }
	}
	.account-password-inner{
		width: 450px;
	    margin: auto;
	    padding-top: 65px;
	},
	.setAccount-inner{
		width: 500px;
	    margin: auto;
	    margin-top: 65px;
	},
	.account-cash-inner{
		width: 500px;
	    margin: auto;
	    li{
	    	margin-top: 10px;
	    }
	   	.count-number{
	   		display: inline-block;
		    position: relative;
		    margin-left: 20px;
		    font-weight: bold;
	   	}
	}
	.account-cash-inner{
		.ivu-card{
			position: static;
			margin-top: 65px;
		}
	}
}
</style>