<template>
	<Row>
		<Col span="24" class="busy-block pr10">
			<bread></bread>
			<Card class="mt15">
				<span slot="title" class="bold">
					您可以通过该功能设置不可预约的繁忙时段，以避免用户下单后无法正常提供服务，提高接单率。点击以下任意时段设置为繁忙（可分城市设置），不设置代表可以正常预约。
				</span>
				<div class="freeTime dsflex">
					<span class="mt2">休假时间：</span>
					<Date-picker type="datetime" :options="options1" placeholder="选择日期和时间" style="width: 200px" v-model="Free_starttime" confirm class="ml10 mt-3"></Date-picker>
					<span class="text-center w30 mt2">至</span>
					<Date-picker type="datetime" :options="options1" placeholder="选择日期和时间" style="width: 200px" v-model="Free_endtime" class="mt-3"></Date-picker>
					<Button type="primary" class="fl mt-3 ml25"><Icon type="calendar"></Icon>保存休假时间</Button>
				</div>
				<span class="c9ea7b4 mt10 dib fz12">休假时间指商家临时不能提供服务的时间。如店铺需临时休假，需提前3天设置休假时间，避免用户下单后无法服务</span>
				<div class="timeTable mt10"  v-show="!isLoading">
					<Table striped border :context="self" :columns="columns1" :data="tableInfo"></Table>
				</div>
				<Modal v-model="modal1" width="700">
                    <p slot="header" style="color: #39f">
                        <span>城市设置</span>
                    </p>
                    <div class="form-block">
                    	<Form ref="form" :model="formValidate" :label-width="90">
                    		<Form-item label="选择时间：">
                    			<span class="bold">{{formValidate.date}}</span>
                    			<span class="ml15 bold" v-model="formValidate.time">{{formValidate.time}}</span>
                    		</Form-item>
                    		<Form-item label="选择城市：">
                    			<Button type="ghost" v-for="(item, index) in formValidate.cityInfo" key="item" class="mr10 mt5 mb5" :class="{'busy' : item.busy}" @click="toggleBusy(item)">{{item.name}}</Button>
                    			<br>
                    			<Button type="info" class="mr10 mt5 mb5" @click="checkAll()"><Icon type="checkmark-round"></Icon>全选</Button>
                    			<Button type="error" class="mr10 mt5 mb5" @click="emptyAll()"><Icon type="android-close"></Icon>清空</Button>
                    		</Form-item>
                    	</Form>
                    </div>
                    <div slot="footer">
                        <Button type="ghost" @click="closeModal1">取消</Button>
                        <Button type="primary" @click="editModal1">保存</Button>
                    </div>
                </Modal> 
			</Card>
		</Col>
	</Row>	
</template>

<script>
import bread from '../../components/Bread/Bread';
export default {

  	name: 'busy',

  	data () {
    	return {
    		modal1: false,
    		Free_starttime: '',
    		Free_endtime: '',
    		tableInfo: [],
    		self: this,
    		formValidate: {
    			date: '',
    			time: '',
    			cityInfo: [],
    			city: ''
    		},
    		columns1: [
    			{
    				title: '日期',
    				key: 'strdate',
    				width: 150,
    				render (row, column, index) { 
    					return `<b>${row.strdate}</b>`
    				}
    			},
    			{
    				title: '可预约时间',
    				key: 'time',
    				render (row, column, index) {
    					return `<div><i-button v-for="(item, Index) in row.times" key="item" class="mr10 mt5 mb5" :class="{'busy' : item.busy}"  @click="editCoverArea(row, Index)">{{item.time}}</i-button></div>`
    				}
    			},
    			{
    				title: '操作',
    				key: 'action',
    				align: 'center',
    				width: 90,
    				render (row, column, index) {
    					// return `<i-button type="info" size="small" @click="editCoverArea(row)"><Icon type="checkmark-round"></Icon>全选</i-button>
    					// <i-button type="error" size="small" class="ml10"><Icon type="android-close"></Icon>清空</i-button>`
    					return `<i-button type="info" size="small" @click="editCoverArea(row)"><Icon type="loop"></Icon>全天</i-button>`
    				}
    			}
    		],
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

  	computed: {
        isLoading () {
            return this.$store.state.isLoading
        }
    },

  	mounted () {
  		this.$store.commit('showLoading', {isLoading: false})
  		this.appointableAjax();
  		this.getCoverAreaAjax();
  	},

  	methods: {
  		appointableAjax () {
  			this.$store.commit('showLoading', {isLoading: true});
  			this.axios.get(`http://www.daoway.com/daoway/rest/service/80999f240bac4e309a28ebf03a7fd34b/appointable_times?includeBusyFlag=true&h5=true`)
  				.then(response => response.data)
  				.then(res => {
  					if (res.status == 'ok') {
  						let tabledata = [];
  						res.data.forEach(dataList => {
  							tabledata.push({
  								strdate: dataList.strDate,
  								date: this.format(dataList.date, 'yyyy-MM-dd HH:mm'),
  								times: dataList.times
  							})
  						})
  						this.tableInfo = tabledata;
  					}
  				})
  				.then(() => {
                    this.$store.commit('showLoading', {isLoading: false})
                })
  		},
  		getCoverAreaAjax () {
  			this.axios.get(`http://www.daoway.com/daoway/rest/service/80999f240bac4e309a28ebf03a7fd34b?h5=1&userId=910da3040f444a82859cbe472aa779be`)
  				.then(response => response.data)
  				.then(res => {
  					if (res.status == 'ok') {
  						// 获取全部区域
  						this.formValidate.cityInfo = res.data.coverArea.split(' ');
  						let cityArray = [];
  						this.formValidate.cityInfo.forEach(cityList =>  {
  							cityArray.push({
  								busy: false,
  								name: cityList
  							})
  						});
  						this.formValidate.cityInfo = cityArray;
  					}
  				})
  		},
  		editModal1 () {
  			this.modal1 = false;
  		},
  		closeModal1 () {
  			this.modal1 = false;
  		},
  		// index || index == 0 => 选择了时间 else 全选进入
  		editCoverArea (item, index) {
  			this.formValidate.date = item.strdate;
  			if (index || index == 0) {
  				this.formValidate.time = item.times[index].time;
  				// 获取预约过的城市
  				this.formValidate.city = item.times[index].city;
  				if (this.formValidate.city) {
  					this.formValidate.cityInfo.forEach(cityList => {
	  					if (this.formValidate.city.indexOf(cityList.name) > -1) {
	  						cityList.busy = true;
	  					} else {
	  						cityList.busy = false;
	  					}
	  				})
  				} else {
  					this.formValidate.cityInfo.forEach(cityList => {
  						cityList.busy = false;
  					})
  				}
  			} else{
  				this.formValidate.time = '';
  			}
  			this.modal1 = true;
  		},
  		toggleBusy (item) {
  			item.busy = !item.busy;
  		},
  		checkAll () {
  			this.formValidate.cityInfo.forEach(cityList => {
  				cityList.busy = true;
  			})
  		},
  		emptyAll () {
  			this.formValidate.cityInfo.forEach(cityList => {
  				cityList.busy = false;
  			})
  		}
  	}
};
</script>

<style lang="scss">
.busy-block{
	padding-left: 10px;
	.ivu-icon{
		margin-right: 5px;
	}
}
.form-block{
	.ivu-icon{
		margin-right: 5px;
	}
}
.busy{
	background: url('../../../static/images/busy.png') right !important;
	background-repeat: no-repeat !important;
}
</style>