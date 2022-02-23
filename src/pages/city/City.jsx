import React, { Component } from 'react';
import { Card, Form, Button, Table, Modal, Select, message } from "antd"
import axios from "./../../axios/index"
import Utils from "./../../utils/utils"
export class City extends Component {
    state = {
        isShowModal: false
    }
    params = {
        page: 1
    }
    componentWillMount() {
        this.resquest()
    }
    // 获取数据
    resquest = () => {
        axios.ajax({
            url: "/open_city",
            data: { params: { page: 1 } }
        }).then(res => {
            this.setState({
                dataSource: res.result.item_list.map((item, index) => { item.key = index; return item }),
                pagination: Utils.pagination(res.result, current => {
                    this.params.page = current;
                    this.resquest();
                })
            })
        })
    }
    // 开通城市
    handleOpenCity = () => {
        this.setState({ isShowModal: true })
    }
    // 开通城市提交
    handleSubmit = () => {
        let userInfo = this.myForm.myForm.getFieldValue()
        console.log(userInfo);
        this.setState({ isShowModal: false })
        axios.ajax({
            url: "/city/open",
            data: { params: { page: this.params.page } }
        }).then(res => {
            message.success(`${res.result}`)
            this.resquest()
        })
    }
    render() {
        // columns
        const columns = [
            {
                title: "城市ID", dataIndex: "id", align: "center"
            },
            {
                title: "城市名称", dataIndex: "name", align: "center"
            },
            {
                title: "用车模式", dataIndex: "mode", align: "center", render: mode => mode === 1 ? "指定停车点模式" : "禁停区模式"
            },
            {
                title: "营运模式", dataIndex: "op_mode", align: "center", render: mode => mode === 1 ? "自营" : "加盟"
            },
            {
                title: "授权商加盟", dataIndex: "franchisee_name", align: "center"
            },
            {
                title: "城市管理员", dataIndex: "city_admins", align: "center", render: arr => arr.map(item => item.user_name).join(",")
            },
            {
                title: "城市开通时间", dataIndex: "open_time", align: "center"
            },
            {
                title: "操作时间", dataIndex: "update_time", align: "center"
            },
            {
                title: "操作人", dataIndex: "sys_user_name", align: "center"
            }
        ]

        return (
            <div>
                <Card style={{ marginBottom: 10 }}>
                    <FilterForm />
                </Card>
                <Card>
                    <Button
                        type="primary"
                        onClick={this.handleOpenCity}
                    >开通城市</Button>
                </Card>
                <Card>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        bordered

                    />
                </Card>
                <Modal
                    title="开通城市"
                    visible={this.state.isShowModal}
                    onCancel={() => this.setState({ isShowModal: false })}
                    onOk={this.handleSubmit}
                >
                    <OpenCityForm ref={c => this.myForm = c} />
                </Modal>
            </div >
        );
    }
}
class FilterForm extends Component {
    render() {
        return (
            <Form layout='inline'>
                <Form.Item label="城市">
                    <Select style={{ width: 120 }} defaultValue="0">
                        <Select.Option value="0">全部</Select.Option>
                        <Select.Option value="1">北京市</Select.Option>
                        <Select.Option value="2">天津市</Select.Option>
                        <Select.Option value="3">上海市</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="用车模式" >
                    <Select style={{ width: 150 }} defaultValue="0">
                        <Select.Option value="0">全部</Select.Option>
                        <Select.Option value="1">指定停车点模式</Select.Option>
                        <Select.Option value="2">禁停区模式</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="营运模式" >
                    <Select style={{ width: 100 }} defaultValue="0">
                        <Select.Option value="0">全部</Select.Option>
                        <Select.Option value="1">自营</Select.Option>
                        <Select.Option value="2">加盟</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="加盟商授权状态" >
                    <Select style={{ width: 100 }} defaultValue="0">
                        <Select.Option value="0">全部</Select.Option>
                        <Select.Option value="1">已授权</Select.Option>
                        <Select.Option value="2">未授权</Select.Option>
                    </Select>
                </Form.Item>
                <Button type="primary" style={{ margin: "0px 20px" }}>查询</Button>
                <Button>重置</Button>
            </Form>
        )
    }
}
class OpenCityForm extends Component {
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 10
            }
        }
        return (
            <Form {...formItemLayout} ref={c => this.myForm = c}>
                <Form.Item label="选择城市" name="city_id" initialValue="1">
                    <Select >
                        <Select.Option value="0">全部</Select.Option>
                        <Select.Option value="1">北京市</Select.Option>
                        <Select.Option value="2">天津市</Select.Option>
                        <Select.Option value="3">上海市</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="营运模式" name="op_mode" initialValue="1">
                    <Select >
                        <Select.Option value="0">全部</Select.Option>
                        <Select.Option value="1">自营</Select.Option>
                        <Select.Option value="2">加盟</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="用车模式" name="use_mode" initialValue="1">
                    <Select >
                        <Select.Option value="0">全部</Select.Option>
                        <Select.Option value="1">指定停车点</Select.Option>
                        <Select.Option value="2">禁停区</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        )
    }
}

