import React, { Component } from 'react';
import { Card, Form, Button, Table, Modal, DatePicker, Select, message } from "antd"
import axios from "./../../axios/index"
export class Order extends Component {
    state = {
        isShowModal: false,
        orderInfo: {},
    }
    componentWillMount() {
        this.request()
    }
    params = { page: 1 }
    // 获取数据
    request = () => {
        axios.ajax({
            url: "/oeder/list",
            data: { params: { page: this.params.page } }
        }).then(res => {
            this.setState({ dataSource: res.result.item_list.map((item, index) => { item.key = index; return item }) })
        })
    }
    // 点击行选中
    onRowClick = (record, index) => {
        let selectedRowKeys = [index]
        let selectedItem = record
        this.setState({ selectedRowKeys, selectedItem })
    }
    // 结束订单
    handleCloseOrder = () => {
        let item = this.state.selectedItem
        if (!item) {
            Modal.info({
                title: "提示",
                content: "请选择一条订单"
            })
            return
        }
        this.setState({ isShowModal: true })
        axios.ajax({
            url: "/order/ebike_info",
            data: { params: { orderId: item.id } }
        }).then(res => {
            this.setState({ orderInfo: res.result })
        })
    }
    // 确认结束订单
    handleFinishOrder = () => {
        let item = this.state.selectedItem
        axios.ajax({
            url: "/order/finish_order",
            data: { params: { orderId: item.id } }
        }).then(res => {
            message.success(`${res.result}`);
            this.setState({ isShowModal: false, selectedRowKeys: [], selectedItem: null });
            this.request();
        })
    }
    // 打开订单详情页
    handleOpenDetail = () => {
        let item = this.state.selectedItem
        if (!item) {
            Modal.info({
                title: "提示",
                content: "请选择一条订单"
            })
            return
        }
        window.open(`/common/order/detail/${item.id}`)
    }
    render() {
        // columns
        const columns = [
            {
                title: "订单编号",
                dataIndex: "order_sn",
                align: "center"
            },
            {
                title: "车辆编号",
                dataIndex: "bike_sn",
                align: "center"
            },
            {
                title: "用户名",
                dataIndex: "user_name",
                align: "center"
            },
            {
                title: "手机号",
                dataIndex: "mobile",
                align: "center"
            },
            {
                title: "里程",
                dataIndex: "distance",
                align: "center",
                render: distance => distance / 1000 + "KM"
            },
            {
                title: "行驶时长",
                dataIndex: "total_time",
                align: "center"
            },
            {
                title: "状态",
                dataIndex: "status",
                align: "center"
            },
            {
                title: "开始时间",
                dataIndex: "start_time",
                align: "center"
            },
            {
                title: "结束时间",
                dataIndex: "end_time",
                align: "center"
            },
            {
                title: "订单金额",
                dataIndex: "total_fee",
                align: "center"
            },
            {
                title: "实付金额",
                dataIndex: "user_pay",
                align: "center"
            }
        ]
        const { selectedRowKeys } = this.state
        const formItemLayout = {
            labelCol: {
                span: 5
            }
        }
        return (
            <div>
                <Card style={{ marginBottom: 10 }}>
                    <FilterForm />
                </Card>
                <Card style={{ marginBottom: 10 }}>
                    <Button
                        type="primary"
                        style={{ marginRight: 10 }}
                        onClick={this.handleOpenDetail}
                    >订单详情</Button>
                    <Button type="primary" onClick={this.handleCloseOrder}>订单结束</Button>
                </Card>
                <Card>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                        rowSelection={{ type: "radio", selectedRowKeys }}
                        onRow={
                            (record, index) => ({ onClick: () => this.onRowClick(record, index) })
                        }
                    />
                </Card>
                <Modal
                    title="结束订单"
                    visible={this.state.isShowModal}
                    onCancel={() => this.setState({ isShowModal: false })}
                    onOk={this.handleFinishOrder}
                >
                    <Form {...formItemLayout}>
                        <Form.Item label="车辆编号">
                            {this.state.orderInfo.id}
                        </Form.Item>
                        <Form.Item label="剩余电量">
                            {this.state.orderInfo.battery}
                        </Form.Item>
                        <Form.Item label="行程开始时间">
                            {this.state.orderInfo.start_time}
                        </Form.Item>
                        <Form.Item label="当前位置">
                            {this.state.orderInfo.location}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

class FilterForm extends Component {
    render() {
        return (
            <Form layout="inline">
                <Form.Item name="city" label="城市" initialValue="1">
                    <Select style={{ width: 100 }} >
                        <Select.Option value="0">全部</Select.Option>
                        <Select.Option value="1">北京</Select.Option>
                        <Select.Option value="2">天津</Select.Option>
                        <Select.Option value="3">上海</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="订单时间">
                    <DatePicker placeholder='请选择开始时间' />&emsp;
                    <DatePicker placeholder='请选择结束时间' />
                </Form.Item>
                <Form.Item label="订单状态" name="state" initialValue="1">
                    <Select style={{ width: 100 }} >
                        <Select.Option value="0">全部</Select.Option>
                        <Select.Option value="1">进行中</Select.Option>
                        <Select.Option value="2">结束行程</Select.Option>
                    </Select>
                </Form.Item>
                <Button type="primary" style={{ margin: "0px 20px" }}>查询</Button>
                <Button>重置</Button>
            </Form>
        )
    }
}
