<template>
    <div>
        <Row class="expand-row">
            <Col span="12">
                <span class="expand-key">订单号：</span>
                <span class="expand-value bold">{{ row.orderId }}</span>
            </Col>
            <Col span="12">
                <span class="expand-key">服务地址：</span>
                <span class="expand-value bold">{{ row.address }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="12">
                <span class="expand-key">用户备注：</span>
                <span class="expand-value warning">{{ row.note }}</span>
            </Col>
            <Col span="12">
                <span class="expand-key">支付状态：</span>
                <span class="expand-value">
                    <span :class="{success : row.paid === 1, error: row.paid === -1}">{{row.paid === 1 ? '已支付' : '已退款'}}</span>
                    <span class="ml10">在线支付<b>{{parseFloat(row.money * row.inAccount).toFixed(2)}}</b>元</span>
                </span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>
<style lang="scss">
    .expand-row{
        margin-bottom: 16px;
    }
</style>