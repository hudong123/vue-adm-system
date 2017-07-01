<template>
    <Row>
        <Col span="24" class="order-block">
            <bread></bread>
            <Card class="mt15">
                <div slot="title">
                    <span class="bolder">
                    	<span>总订单数:{{titleInfo.totalOrderCount}}</span><span class="ml25">成功接单:{{titleInfo.orderTakingCount}}</span><span class="ml25">近期接单率: {{titleInfo.orderTakingRate}}</span><span class="ml25">好评率:{{titleInfo.positiveCommentRate}}</span><span class="ml25">复购率:{{titleInfo.repeatPurchaseRate}}</span><span class="ml25">退款率:{{titleInfo.returnedRate}}</span><span class="ml25">转化率:{{titleInfo.conversionRate}}</span>
                    </span>
                    <Tooltip placement="bottom-end">
                        <Icon type="help-circled"></Icon>
                        <div slot="content">
                            <span>
                                              1. 转化率=订单总数/每日访问用户总数<br>
                                              2. 接单率=(订单总数-取消订单总数)<br>&nbsp; &nbsp;&nbsp;/(订单总数-用户15分钟内主动取消的订单数)<br>
                                              3. 退款率=退款总金额/订单总金额<br>
                                              4. 好评率=好评数/评论总数<br>
                                              5. 复购率=用户复购订单数/订单总数<br>
                            </span>
                        </div>
                    </Tooltip>
                    <!-- <i class="fa fa-clipboard"></i>订单管理 -->
                    <div class="mt15">
                        <Radio-group v-model="Radio1" type="button">
                            <Radio label="全部订单"></Radio>
                            <Radio label="未处理"></Radio>
                            <Radio label="进行中"></Radio>
                            <Radio label="已取消"></Radio>
                            <Radio label="待付款"></Radio>
                            <Radio label="已完成"></Radio>
                        </Radio-group>
                        <div class="fr right-block">
                            <Button type="primary" class="fr ml10">导出</Button>
                            <Button type="primary" class="fr ml10">查询</Button>
                            <Date-picker type="date" placeholder="选择日期" class="fr w120" v-model="enddate" :clearable="false"></Date-picker>
                            <div class="between fr text-center">--</div>
                            <Date-picker type="date" placeholder="选择日期" class="fr ml10 w120" v-model="startdate" :clearable="false"></Date-picker>
                            <Input class="fr w230 ml10 mt-1" placeholder="电话号、昵称（全称）搜索订单"><span slot="append" class="curp">搜索</span></Input>
                        </div>
                    </div>
                </div>
                <!-- main -->
                <div class="order-table" v-show="!isLoading">
    				<div class="ivu-table-wrapper">
					    <div class="ivu-table ivu-table-border ivu-table-stripe">
					        <table cellspacing="0" cellpadding="0" border="0" width="100%">
					            <thead>
					                <tr>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">联系人</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">用户电话</div></th>
					                	<th class="ivu-table-column" width="16%"><div class="ivu-table-cell">服务地址</div></th>
					                	<!-- <th class="ivu-table-column"><div class="ivu-table-cell">下单时间</div></th> -->
					                	<th class="ivu-table-column"><div class="ivu-table-cell">预约时间</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">数量</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">订单金额</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">订单号</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">订单状态</div></th>
					                	<th class="ivu-table-column"><div class="ivu-table-cell">支付状态</div></th>
					                </tr>
					            </thead>
					            <tbody v-for="(item, index) in orderInfo" ref="collapse">
					                <tr>
					                	<td class="ivu-table-column"><div class="ivu-table-cell curp" @click="show(index)">{{item.contactPerson}}</div></td>
					                	<td class="ivu-table-column"><div class="ivu-table-cell"><b>{{item.buyer.phone}}</b></div></td>
					                	<td class="ivu-table-column"><div class="ivu-table-cell">{{item.address}}</div></td>
					                	<!-- <td class="ivu-table-column"><div class="ivu-table-cell">{{format(item.createTime, 'yyyy-MM-dd HH:mm')}}</div></td> -->
					                	<td class="ivu-table-column"><div class="ivu-table-cell">{{format(item.appointTime, 'yyyy-MM-dd HH:mm')}}</div></td>
					                	<td class="ivu-table-column"><div class="ivu-table-cell">{{item.inAccount}}</div></td>
					                	<td class="ivu-table-column"><div class="ivu-table-cell">{{item.money.toFixed(2)}}元</div></td>
					                	<td class="ivu-table-column"><div class="ivu-table-cell">{{item.orderId}}</div></td>
					                	<td class="ivu-table-column"><div class="ivu-table-cell" :class="{primary : item.statusDesc === '商家已确认' || item.statusDesc === '新订单', success :  item.statusDesc === '用户已评价' || item.statusDesc === '商家确认完成' || item.statusDesc === '交易成功', error: item.statusDesc === '用户取消' || item.statusDesc === '商家已取消' || item.statusDesc === '用户申请退款'}">{{item.statusDesc}}</div></td>
					                	<td class="ivu-table-column"><div class="ivu-table-cell" :class="item.paid == 1 ? 'success' : 'error' ">{{item.paid == 1 ? '已支付' : '已退款'}}
					                	</div></td>
					                	<!-- <td class="ivu-table-column"><div class="ivu-table-cell"><Tag type="dot" :color="item.statusDesc === '商家已确认' || item.statusDesc === '新订单'  ? 'blue' : item.statusDesc === '用户已评价' || item.statusDesc === '商家确认完成' || item.statusDesc === '交易成功' ? 'green' : 'red'">{{item.statusDesc}}</Tag>
					                	</div></td>
					                	<td class="ivu-table-column"><div class="ivu-table-cell"><Tag type="dot" :color="item.paid == 1 ? 'green' : 'red' ">{{item.paid == 1 ? '已支付' : '已退款'}}</Tag>
					                	</div></td> -->
					                </tr>
					                <tr class="collapse" style="display: none">
					                	<td class="ivu-table-column" colspan="9">
					                		<div class="ivu-table-cell">
					                			<div class="pt5">
					                				用户备注：<span class="warning">{{item.note || '无'}}</span>
						                			<span class="ml25">
						                				<span v-if="item.money > 0">在线支付<span class="success">{{item.money.toFixed(2)}}</span>元</span> 
					                                    <span v-if="item.returnBill > 0">退款<span class="error">{{item.returnBill.toFixed(2)}}</span>元</span>
					                                    <span v-if="item.coupon > 0">+ 到位代金劵<span class="warning">{{item.coupon.toFixed(2)}}</span>元</span>
						                			</span>
					                			</div>
					                			<!-- 退款原因 -->
					                			<div class="pt5" v-if="item.refundApplyReason !== '' && item.refundApplyReason">
					                                退款原因：<span class="warning">{{item.refundApplyReason}}</span>
					                            </div>
					                            <!-- end 退款原因 -->
					                            <div class="pt5 dsflex" v-for="(itemList, index) in item.items">
					                                <img :src="itemList.picUrl" alt="" class="order-img">
					                                <div class="order-item">
					                                    <span>{{itemList.name}}</span>
					                                    <span class="order-number">数量：<span class="warning">{{itemList.quantity}}</span></span>
					                                    <span class="ml10">单价：<span class="warning">{{itemList.price.toFixed(2)}}</span>元</span>
					                                    <span class="ml10">总价：<span class="warning">{{(itemList.price * itemList.quantity).toFixed(2)}}</span>元</span>
					                                    <div class="statusTitle" v-if="index == item.items.length - 1 && item.statusTitle == 'CONFIRMED'">
					                                        <Button type="primary" size="small">完成服务</Button>
					                                        <Button size="small">退款/赔付</Button>
					                                    </div>
					                                </div>
					                            </div>
					                            <!-- 取消原因 -->
					                            <!-- <div class="pt5" v-if="item.cancelReason !== '' && item.cancelReason">
					                                取消原因：<span class="warning">{{item.cancelReason}}</span>
					                            </div> -->
					                            <!-- end 取消原因 -->
					                            <!-- 服务人员 -->
					                           <!--  <div class="pt5" v-if="item.technicianName">
					                                服务人员：<span class="c657180"><b>{{item.technicianName}}</b></span>
					                                <span class="ml20">联系方式：<span class="c657180"><b>{{item.technicianPhone}}</b></span></span>
					                                <span class="ml20 curp fr" @click="setServicerInfo(item)">编辑<i class="fa fa-pencil-square-o ml5"></i></span>
					                            </div> -->
					                            <!-- end 服务人员 -->
					                            <!-- 用户评论 -->
					                            <!-- <div class="pt5" v-if="item.comment">
					                                用户评论：<span class="warning">【{{item.comment.star}}星】 {{item.comment.comment}}</span>
					                                <Button type="primary" v-if="!item.comment.replyComment" class="replyComment" @click="replyComment(index)">回复</Button>  
					                            </div> -->
					                            <!-- end 用户评论 -->
					                            <!-- 回复内容 -->
					                            <!-- <div class="pt5 replySubmit" style="display: none">
					                                <Input class="w60p"><span slot="prepend">回复：</span></Input>
					                                <Button type="primary" class="replyCommentSubmit" @click="replySubmit(index)">提交</Button>   
					                            </div> -->
					                            <!-- end 回复内容 -->
					                		</div>
					                	</td>
					                </tr>
					            </tbody>
					        </table>
					    </div>
					</div>               
                </div>
                <!-- 分页 -->
                <div style="margin: 10px;overflow: hidden;padding-top:2px;">
                    <div style="float: right;">
                        <Page :total="totalSize" :current="currentpage" :page-size="20" :page-size-opts="pageSize" @on-change="changePage" show-elevator show-sizer placement="top" @on-page-size-change="PageSizeChange"></Page>
                    </div>
                </div>
                <!-- end 分页 -->
                <!-- 客服备注 Modal-->
                <Modal v-model="modal1" width="600">
					<p slot="header" style="color: #39f">
				        <span>客服备注</span>
				    </p>
				    <div>
				    	<Input v-model="userNote" type="textarea" :autosize="{minRows: 5, maxRows: 10}" placeholder="编辑客服备注"></Input>
				    </div>
				    <div slot="footer">
				        <Button type="ghost" @click="closeModal1">取消</Button>
				        <Button type="primary" @click="editModal1">保存</Button>
				    </div>
				</Modal>  
                <!-- end 客服备注 Modal -->
                <!-- 接单人员信息 Modal-->
                <Modal v-model="modal2" width="600">
					<p slot="header" style="color: #39f">
				        <span>编辑接单人员信息</span>
				    </p>
				    <p>
				    	提示：确定接单后不可再单方面拒绝订单，建议接单前先确定服务人员，便于用户在开始服务之前联系服务人员、核实上门人员的身份。指定服务人员信息（可选填），可大大减少用户投诉、提高用户复购率。
				    </p>
				    <div class="mt15">
				    	<Form ref="form" :model="formValidate" :rules="ruleValidate" :label-width="110">
				    		<Form-item label="服务人员姓名：">
								<Select v-model="formValidate.name">
							        <Option v-for="(item, index) in formValidate.technicianSelect" :value="item.name" :key="item.name">{{item.name}}</Option>
							    </Select>
							</Form-item>
							<Form-item label="服务人员手机：">
								<Input v-model="formValidate.servicePhone" placeholder="服务人员联系方式"></Input>
							</Form-item>
					    </Form>
				    </div>
				    <div slot="footer">
				        <Button type="ghost" @click="closeModal2">取消</Button>
				        <Button type="primary" @click="editModal2">确认</Button>
				    </div>
				</Modal>
                <!-- end 接单人员信息 Modal-->
            </Card>
        </Col>
    </Row>  
</template>

<script>
import bread from '../../components/Bread/Bread';
export default {

    name: 'order',

    data () {
        return {
            titleInfo: {},
            orderInfo: {},
            totalSize: null,
            currentpage: parseInt(this.$route.query.p) || 1,
            pageSize: [5, 10, 20, 30],
            size: 20,
            Radio1: '全部订单',
            startdate: '',
            enddate: '',
            modal1: false,
            modal2: false,
            showOther: false,
            userNote: '',
            formValidate: {
            	servicePhone: '',
            	technicianSelect: {},
            	name: ''
            },
            ruleValidate: {

            }
        };
    },

    methods: {
        serviceAjax (bool) {
            this.axios.get(`http://www.daoway.com/daoway/rest/service/80999f240bac4e309a28ebf03a7fd34b?userId=910da3040f444a82859cbe472aa779be&h5=1`)
                .then(response => response.data)
                .then(res => {
                    if (res.status == 'ok') {
                        // bool true => 渲染title部分 订单数等
                        if (bool) {
                            this.titleInfo = res.data;
                        }
                    }
                })
        },

        orderAjax (page, size) {
        	let Page = page || 1, Size = this.size || 20;
        	this.$store.commit('showLoading', {isLoading: true});
            this.axios.get(`http://www.daoway.com/daoway/rest/orders/v2/sold_by/910da3040f444a82859cbe472aa779be?start=${(Page - 1)*Size}&size=${Size}&status=&h5=1`)
                .then(response => response.data)
                .then(res => {
                    if (res.status == 'ok') {
                        this.orderInfo = res.data;
                        this.totalSize = res.total;
                    }
                })
                .then(() => {
	  				this.$store.commit('showLoading', {isLoading: false})
	  			})
        },

        technicianAjax () {
        	this.axios.get(`http://www.daoway.com/daoway/rest/order/170519014750423/technician?userId=910da3040f444a82859cbe472aa779be`)
        		.then(response => response.data)
        		.then(res => {
        			if (res.status == 'ok') {
        				this.formValidate.technicianSelect = res.data;
        			}
        		})
        },

        quantity (item) {
        	let quantity = 0;
    		item.forEach(itemList => {
    			quantity += itemList.quantity
    		})
    		return quantity;
    	},

    	replyComment (index) {
    		this.$refs.order[index].querySelector('.replySubmit').style.display = 'block';
    	},

    	replySubmit (index) {
    		//console.log(this.$refs.order[index].querySelector('.replySubmit').querySelector('input').value); // => 提交的内容
    		this.$refs.order[index].querySelector('.replySubmit').style.display = 'none';
    	},

    	addOrderNote () {
    		this.userNote = '';
    		this.modal1 = true;
    	},
    	closeModal1 () {
    		this.modal1 = false;
    	},
    	editModal1 () {
    		this.modal1 = false;
    	},

    	setServicerInfo (item) {
    		this.technicianAjax();
    		this.formValidate.servicePhone = item.technicianPhone;
    		this.formValidate.name = item.technicianName;
    		this.modal2 = true;
    	},
    	closeModal2 () {
    		this.modal2 = false;
    	},
    	editModal2 () {
    		this.modal2 = false;
    	},
    	changePage (page) {
  			this.$router.push({ path: '/manage/order', query: { p: page }});
  			this.orderAjax(page);
  		},
  		PageSizeChange (size) {
  			this.size = size;
  			this.orderAjax(this.currentpage, size);
  		},
  		show (index) {
  			this.$refs.collapse[index].querySelector('.collapse').style.display == 'table-row' ? this.$refs.collapse[index].querySelector('.collapse').style.display = 'none' : this.$refs.collapse[index].querySelector('.collapse').style.display = 'table-row'
  		}
    },

    mounted () {
        this.serviceAjax(true);
        this.orderAjax(this.currentpage);
    },

    computed: {
  		isLoading () {
	  		return this.$store.state.isLoading
	  	}
  	},

    components: {
        bread
    }
};
</script>

<style lang="scss">
.order-block{
    padding-left: 10px;
    .order-table{
    	margin-top: 10px;
    }
    .bolder{
    	span{
    		font-weight: bold;
    	}
    }
    .right-block{
        min-width: 656px;
    }
    .ivu-icon{
        margin-right: 5px;
    }
    .ivu-icon-help-circled{
        margin-top: 3px;
    }
    .ivu-card-head{
        .fa-clipboard{
            margin-right: 5px
        }
    }
    .ivu-card-head p, .ivu-card-head-inner{
        overflow: inherit;
        white-space: inherit;
        text-overflow: inherit;
        display: block;
    }
    .ivu-tooltip-inner{
        white-space: nowrap;
        max-width: 260px;
    }
    .ivu-tooltip {
        display: inline-block;
        position: absolute;
        margin-top: -5px;
        margin-left: 8px;
    }
    .between{
        width: 30px;
        margin-top: 8px;
    }
    .order-img{
        width: 30px;
        height: 30px;
        border-radius: 3px;
    }
    .order-item{
        margin-left: 15px;
        margin-top: 5px;
        .order-number{
        	margin-left: 50px;
        }
    }
    .statusTitle{
    	float: right;
	    position: absolute;
	    right: 0%;
	    margin-top: -27px;
	    margin-right: 15px;
    }
    .replyComment{
    	margin-top: -5px;
    	float: right;
    }
    .replyCommentSubmit{
    	float: right;
    	margin-top: -30px;
    }
    .primaryCard{
    	border: 1px solid #09c;
		.ivu-card-head, .ivu-card-extra{
			background-color: #09c;
			p{
				color: #fff;
				font-weight: normal;
			}
		}
    }
    .primaryCard:hover{
    	border: 1px solid #09c;
    }
    .successCard{
    	border: 1px solid #5cb85c;
		.ivu-card-head, .ivu-card-extra{
			background-color: #5cb85c;
			p{
				color: #fff;
				font-weight: normal;
			}
		}
    }
    .successCard:hover{
		border: 1px solid #5cb85c;
    }
    .errorCard{
		border: 1px solid #d9534f;
		.ivu-card-head, .ivu-card-extra{
			background-color: #d9534f;
			p{
				color: #fff;
				font-weight: normal;
			}
		}
    }
    .errorCard:hover{
		border: 1px solid #d9534f;
    }
}
.collapse{
	td{
		background: #eee !important
	}
}
</style>