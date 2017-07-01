<template>
	<Row>
		<Col span="24" class="statistics-block pr10">
            <bread></bread>   
			<div v-show="isLoading == false">
                <Card class="mt15">
                    <div slot="title">
                        <p><Icon type="ios-pulse-strong"></Icon>整体趋势</p>
                        <div class="fr mt-27">
                            <Button type="primary" class="fr ml10" @click="search"><Icon type="ios-search"></Icon>查询</Button>
                            <Date-picker type="date" placeholder="选择日期" class="date fr enddate" v-model="enddate" :clearable="false"></Date-picker>
                            <div class="between fr text-center">--</div>
                            <Date-picker type="date" placeholder="选择日期" class="date fr startdate" v-model="startdate" :clearable="false"></Date-picker>
                        </div>
                    </div>
                    <div class="charts">
                        <div id="myChart"></div>
                    </div>
                </Card>
                <Card class="mt10">
                    <p slot="title">
                        <Icon type="calculator"></Icon>
                        合计
                    </p>
                    <Table :columns="total" :data="total_data" stripe border :context="self"></Table>
                </Card>
                <Card class="mt10">
                    <p slot="title">
                        <Icon type="android-list"></Icon>
                        数据明细
                    </p>
                    <Table :columns="info" :data="info_data" stripe border :context="self"></Table>
                </Card>         
            </div>
		</Col>
	</Row>
</template>

<script>
import bread from '../../components/Bread/Bread';
export default {

  	name: 'statistics',

  	data () {
    	return {
            self: this,
    		// 表格数据
    		total: [
                {
                    title: '合计',
                    key: 'total'
                },
                {
                    title: '访问量',
                    key: 'pageView'
                },
                {
                    title: '下单用户',
                    key: 'singleUser'
                },
                {
                    title: '付款订单量',
                    key: 'order'
                },
                {
                    title: '付款金额',
                    key: 'money'
                },
                {
                    title: '订单转化率',
                    key: 'CVR'
                },
                {
                    title: '退款订单量',
                    key: 'refund_order'
                },
                {
                    title: '退款金额',
                    key: 'refund_money'
                },
                {
                    title: '退款率',
                    key: 'refund_rate'
                },
                {
                    title: '优惠金额',
                    key: 'discount'
                },
                {
                    title: '净收入',
                    key: 'netIncome'
                }
            ],
            total_data: [
                {
                    total: '合计',
                    pageView: 496,
                    singleUser: 44,
                    order: 47,
                    money: 5386.00,
                    CVR: '8.87%',
                    refund_order: 12,
                    refund_money: 1912.00,
                    refund_rate: '36%',
                    discount: 0.00,
                    netIncome: 150
                }
            ],
            info: [
                {
                    title: '日期',
                    key: 'date'
                },
                {
                    title: '访问量',
                    key: 'pageView'
                },
                {
                    title: '下单用户',
                    key: 'singleUser'
                },
                {
                    title: '付款订单量',
                    key: 'order'
                },
                {
                    title: '付款金额',
                    key: 'money'
                },
                {
                    title: '订单转化率',
                    key: 'CVR'
                },
                {
                    title: '退款订单量',
                    key: 'refund_order'
                },
                {
                    title: '退款金额',
                    key: 'refund_money'
                },
                {
                    title: '退款率',
                    key: 'refund_rate'
                },
                {
                    title: '优惠金额',
                    key: 'discount'
                },
                {
                    title: '净收入',
                    key: 'netIncome'
                }
            ],
            info_data: [
                {
                    date: '2017-05-08',
                    pageView: 496,
                    singleUser: 44,
                    order: 47,
                    money: 5386.00,
                    CVR: '8.87%',
                    refund_order: 12,
                    refund_money: 1912.00,
                    refund_rate: '36%',
                    discount: 0.00,
                    netIncome: 150
                }
            ],

            // 图表数据
		  	options : {
				tooltip : {
				    trigger: 'axis'
				},
				calculable : true,
				legend: {
				    data:['净收入','付款订单数']
				},
				xAxis : [
				    {
				        type : 'category',
				        data : []
				    }
				],
				yAxis : [
				    {
				        type : 'value',
				        name : '净收入',
				        axisLabel : {
				            formatter: '{value} 元'
				        }
				    },
				    {
				        type : 'value',
				        name : '付款订单数',
				        axisLabel : {
				            formatter: '{value} 单'
				        }
				    }
				],
				series : [
				    {
				        name:'净收入',
				        type:'bar',
				        data: [],
				        itemStyle: {
				            normal : {
		                        color:'rgb(46, 199, 201)'
		                    }
				        }
				    },
				    {
				        name:'付款订单数',
				        type:'line',
				        yAxisIndex: 1,
				        data: [],
				        itemStyle: {
				            normal : {
		                        color:'rgb(102, 182, 240)'
		                    }
				        }
				    }
				],
				},
				startdate: this.GetDateStr(-30),
            	enddate: this.GetDateStr(0)
	    	};
	  	},
  		mounted () {
		  	let myChart = document.getElementById('myChart');
		  	let mainChart = this.$echarts.init(myChart);

		  	//options数据渲染
		  	this.$store.commit('statisticsData', {data1: [100, 200, 300, 400, 500, 600], data2: [3, 8, 12, 7, 6, 10], data3: ['2016-04-08', '2016-04-09', '2016-04-18', '2016-04-19','2016-04-28', '2016-04-29']});
		  	this.options.series[0].data = this.$store.state.data1;
		  	this.options.series[1].data = this.$store.state.data2;
		  	this.options.xAxis[0].data = this.$store.state.data3;
	  		mainChart.setOption(this.options);
	  		let that = this;
	  		window.onresize = function () {
		        that.$echarts.init(myChart).setOption(that.options);
		    };
	  	},
	  	methods: {
	  		search () {
	  			let data_1 = [200, 200, 400, 400, 500, 600];
	  			let data_2 = [1, 2, 3, 4, 5, 6];
	  			let data_3 = ['2016-04-08', '2016-04-09', '2016-04-18', '2016-04-22','2016-04-25', '2016-04-29'];
	  			this.options.series[0].data = data_1;
		  		this.options.series[1].data = data_2;
		  		this.options.xAxis[0].data = data_3;
		  		this.$store.commit('statisticsData', {data1: data_1, data2: data_2, data3: data_3});
		  		this.$echarts.init(document.getElementById('myChart')).setOption(this.options);
	  		}
	  	},
	  	components: {
            bread
	  	},
        computed: {
            isLoading () {
                return this.$store.state.isLoading
            }
        },

};
</script>

<style lang="scss">
.statistics-block{
	padding-left: 10px;
	.ivu-icon{
		margin-right: 5px;
	}
	.date{
		width: 150px;
	}
	.between{
		width: 30px;
		margin-top: 8px;
	}
	.charts{
		height: 300px;
		width: 100%;
		#myChart{
			width: 100%;
			height: 300px;
		}
	}
}
</style>