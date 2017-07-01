<template>
	<Row>
		<Col span="24" class="demo-tabs-style1">
			<bread></bread>
			<div class="mt30 account-block">
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
											<!-- <Button type="text">Text</Button> -->
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
				</Tabs>
			</div>
		</Col>
	</Row>		
</template>

<script>
import bread from '../../components/Bread/Bread';
export default {

  	name: 'people',

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
            } else if (value.length < 6 || value.length > 20) {
                callback(new Error('密码长度为6-20位，请重新输入'));
            } else {
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


    	return {
    		formValidate: {
                name: JSON.parse(localStorage.getItem('user')),
                url: '',
                phone: '18058150306'
            },
            ruleValidate: {
		    	name: [
		            { required: true, message: '姓名不能为空', trigger: 'blur' }
		        ],  
		        phone: [
		            { required: true, trigger: 'blur', validator: validatePhoneCheck}
		        ]          
		    },
		    formValidate_Password: {
                password: '',
                new_password: '',
                check_password: ''
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
		    }
    	};
  	},

  	components: {
  		bread
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
        }
  	},

  	computed: {
        tabValue() {
        	return this.$store.state.tab
        }
    }

};
</script>

<style lang="scss">
.account-block{
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
	}
}
</style>