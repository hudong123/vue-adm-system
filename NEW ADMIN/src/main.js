// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex';
import echarts from 'echarts' // echarts图表
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 导入 iview组件CSS
import '../my-theme/index.less';
import moment from 'moment'

Vue.use(VueAxios, axios);
Vue.use(iView);

Vue.use(Vuex);

Vue.prototype.moment = moment;
Vue.prototype.changeTime = time => moment(time).startOf('minute').fromNow().replace(/hours?/, '小时').replace('ago', '前').replace(/days?/, '天').replace(/minutes?/, '分钟').replace(/\ban?/, '1').replace(/months?/, '个月').replace(/\byears?/, '年').replace(/\s/g, '').replace('fewseconds','分钟');

// 标准时间转yyyy-MM-dd
Vue.prototype.format = function (time, format) {
    format = format || 'yyyy-MM-dd';
    var t = new Date(time);
    var tf = function(i) {
        return (i < 10 ? '0': '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
        switch (a) {
        case 'yyyy':
            return tf(t.getFullYear());
            break;
        case 'MM':
            return tf(t.getMonth() + 1);
            break;
        case 'mm':
            return tf(t.getMinutes());
            break;
        case 'dd':
            return tf(t.getDate());
            break;
        case 'HH':
            return tf(t.getHours());
            break;
        case 'ss':
            return tf(t.getSeconds());
            break;
        }
    });
}

// 获取几天前的时间
Vue.prototype.GetDateStr = function (AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();
    // 增0操作
    if(m>=10){
        if(d>=10){
            return y+"-"+m+"-"+d;
        }
        else{
            return y+"-"+m+"-0"+d;
        }
    }
    else{
        if(d>=10){
            return y+"-0"+m+"-"+d;
        }
        else{
            return y+"-0"+m+"-0"+d;
        }
    }
}

// 上传文件 预览图片指向ID为previewImage的元素 t => true时 自行回调
Vue.prototype.FileUploader = function (evt, t, callback) {

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
          
            if (!t) {
                
                document.getElementById('previewImage').src = e.target.result;

            } else {

                callback(e.target.result)

            }
          
        };  
          
    })(f);  
          
          
    reader.readAsDataURL(f);  
          
    }  
  
}

Vue.prototype.$echarts = echarts;

const store = new Vuex.Store({
  state: {
    tab: '1',
    data1: [],
    data2: [],
    data3: [],
    isLoading: false,
    isShowImg: false,
  },

  mutations: {
    showImg(state, flag) {
      	state.isShowImg = flag;
    },
    changeTab(state, flag) {
        state.tab = flag;
    },
    showLoading(state, payload) {
    	state.isLoading = payload.hasOwnProperty('isLoading') ? payload.isLoading : state.isLoading; // 加载动画
    },
    statisticsData(state, arg) {
    	state.data1 = arg.data1;
    	state.data2 = arg.data2;
    	state.data3 = arg.data3;
    }
  },


})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// 路由限制 未登录返回登录页面
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!localStorage.getItem('user')) {
            next({
                path: '/'
            })
        } else {
            next()
        }
    } else {
        next() 
    }
})
