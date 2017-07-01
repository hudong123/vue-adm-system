<template>
    <div class="login-block">
    	<i-form ref="formLogin" :model="formLogin" :rules="formLoginRules"  class="card-box">
		    <Form-item class="formLogin-title">
		        <h3>系统登录</h3>
		    </Form-item>
	     
	        <Form-item prop="username">
	            <i-input size="large" type="text" v-model="formLogin.username" placeholder="用户名">
	                <Icon type="ios-person-outline" slot="prepend"></Icon>
	            </i-input>
	        </Form-item>
	        <Form-item prop="password">
	            <i-input size="large" type="password" v-model="formLogin.password" placeholder="密码">
	                <Icon type="ios-locked-outline" slot="prepend"></Icon>
	            </i-input>
	        </Form-item>
	        <Form-item class="login-no-bottom">
	            <Checkbox-group v-model="formLogin.remember">
	                <Checkbox label="记住密码" name="remember"></Checkbox>
	            </Checkbox-group>
	        </Form-item>
	        <Form-item class="login-no-bottom">
	            <Row >
	                 <i-button type="primary" @click="handleSubmit('formLogin')" long>登录</i-button>
	                <!-- <i-col :xs="{ span: 4, offset: 6 }">
	                    <i-button  type="primary" @click="formLoginReset('formLogin')">重置</i-button>
	                </i-col> -->
	            </Row>
	        </Form-item>
	    </i-form>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formLogin: {
                    username: '',
                    password: '',
                    remember: []
                },
                formLoginRules: {
                    username: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    localStorage.setItem('user', JSON.stringify(this.formLogin.username));
                    if (valid) {
                        //this.$Message.success('提交成功!');
                        this.$router.push({ path: '/setting/account' });
                    } else {
                        this.$Message.error('用户名或者密码错误!');
                    }
                     if(this.formLogin.remember[0] == "记住密码"){
                        localStorage.setItem('username', JSON.stringify(this.formLogin.username));
                        localStorage.setItem('password', JSON.stringify(this.formLogin.password));
                        localStorage.setItem('remember', "true");
                    }else{
                        localStorage.removeItem('username');
                        localStorage.removeItem('password');
                        localStorage.removeItem('remember', "true");
                    }
                })
            },
            formLoginReset(name){
                this.$refs[name].resetFields();
            }
        },
        mounted() {
            if(localStorage.getItem('username')){
                this.formLogin.username = JSON.parse(localStorage.getItem('username'));
            }
            if(localStorage.getItem('password')){
                this.formLogin.password = JSON.parse(localStorage.getItem('password'));
            }
            if(localStorage.getItem('remember')){
                this.formLogin.remember = ["记住密码"];
            }
        }
    }
</script>


<style lang="scss">
  .login-block {
  	background: url('../../../static/images/bg.c4fc6ab.jpg');
    width: 100%;
    height: 100%;
    position: absolute;
    -webkit-font-smoothing: antialiased;
    background-attachment: fixed;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='assets/bg.jpg', sizingMethod='scale');
    -ms-filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='assets/bg.jpg', sizingMethod='scale');
    background-size: cover;
    -moz-background-size: cover;
    -webkit-background-size: cover;
  }
  .card-box {
    padding: 20px;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 180px auto;
    width: 400px;
   /* border: 2px solid #8492A6;*/
  }
  
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .formLogin-title {
      text-align: center;
      font-seze: 28px;
  }
  .formLogin-title h3{
      font-size: 18px;
  }
  .login-no-bottom {
      margin-bottom: 10px;
  }
 
</style>