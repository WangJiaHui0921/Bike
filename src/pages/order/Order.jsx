import React, { Component } from 'react';
import { Card, Form, Button, Modal, message } from "antd"
import axios from "./../../axios/index"
import { BaseForm } from "../../components/baseForm/baseForm"
import ETable from "./../../components/eTable/eTable"
import Utils from '../../utils/utils';
export class Order extends Component {
    state = {
        isShowModal: false,
        orderInfo: {},
    }
    handleFilter = (params) => {
        this.params = params;
        console.log(params);
        this.request()
    }
    formList = [{
        type: 'SELECT',
        label: '城市',
        field: 'city',
        placeholder: '全部',
        initialValue: '1',
        width: 80,
        list: [{
            id: '0', name: '全部',
        }, {
            id: '1', name: '北京',
        }, {
            id: '2', name: '上海',
        }, {
            id: '3', name: '天津',
        }]
    }, {
        type: '时间查询',
    }, {
        type: 'SELECT',
        label: '订单状态',
        field: 'order_status',
        placeholder: '全部',
        initialValue: '1',
        width: 100,
        list: [{
            id: '0', name: '全部',
        }, {
            id: '1', name: '进行中',
        }, {
            id: '2', name: '结束行程',
        }]
    }]
    componentWillMount() {
        this.request()
    }
    params = { page: 1 }
    // 获取数据
    request = () => {
        axios.requestList(this, "/oeder/list", this.params)
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
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
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
                    <ETable
                        updataSelectedItem={Utils.updataSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.dataSource}
                        selectedRowKeys={selectedRowKeys}
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


