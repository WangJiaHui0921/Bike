import React, { Component } from 'react';
import { Card, Button, Modal, Form, Input, Radio, Select, DatePicker, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "./../../axios";
import Utils from '../../utils/utils';
import ETable from "./../../components/eTable/eTable"
import { BaseForm } from '../../components/baseForm/baseForm';
export class User extends Component {
    state = { isVisible: false }
    formList = [
        {
            type: "INPUT",
            label: "用户名",
            field: "user_name",
            placeholder: "请输入用户名",
        },
        {
            type: "INPUT",
            label: "手机号",
            field: "user_mobile",
            placeholder: "请输入手机号",
        },
        {
            type: "DATEPICKER",
            label: "入职日期",
            field: "user_date",
            placeholder: "请输入入职日期",
        },
    ]
    params = { page: 1 }
    componentWillMount() {
        this.requestList()
    }
    handleFilter = (params) => {
        this.params = params
        this.requestList()
    }
    requestList = () => {
        axios.requestList(this, "/user/list", this.params)
    }
    handleOperate = type => {
        let selectedItem = this.state.selectedItem
        if (type === "create") {
            this.setState({
                type,
                title: "创建员工",
                isVisible: true
            })
        } else if (type === "edit") {
            if (!selectedItem) {
                Modal.info({ title: "提示", content: "请选择一条信息" });
                return;
            }
            this.setState({
                type,
                title: "编辑员工",
                isVisible: true,
                userInfo: selectedItem
            })
        } else if (type === "detail") {
            if (!selectedItem) {
                Modal.info({ title: "提示", content: "请选择一条信息" });
                return;
            }
            this.setState({
                type,
                title: "员工详情",
                isVisible: true,
                userInfo: selectedItem
            })
        } else {
            if (!selectedItem) {
                Modal.info({ title: "提示", content: "请选择一条信息" });
                return;
            }
            Modal.confirm({
                title: "确认删除",
                content: "确定要删除当前选中的员工吗",
                onOk: this.handleDelete
            })
        }

    }
    // 删除员工
    handleDelete = () => {
        axios.ajax({
            url: "/user/delete",
            data: { params: { id: 1 } }
        }).then(res => {
            message.success(`${res.msg}`)
            this.requestList()
        })
    }
    handleSubmit = () => {
        let type = this.state.type
        let userInfo = this.myForm.myForm.getFieldValue()
        message.success(`创建员工成功 ${userInfo.user_name}`)
        this.setState({ isVisible: false })
        this.requestList()
        axios.ajax({
            url: type === "create" ? '/user/add' : '/user/edit',
            data: {
                params: userInfo
            }
        }).then(response => {
            console.log(response);
        })
    }
    render() {
        // columns
        const columns = [
            {
                title: "id",
                dataIndex: "id",
                align: "center"
            },
            {
                title: "用户名",
                dataIndex: "username",
                align: "center"
            },
            {
                title: "性别",
                dataIndex: "sex",
                align: "center",
                render(sex) {
                    return sex === 1 ? "男" : "女"
                }
            },
            {
                title: "状态",
                dataIndex: "state",
                align: "center",
                render(state) {
                    return {
                        "1": "北大才子",
                        "2": "风华浪子",
                        "3": "王八犊子",
                        "4": "缺心眼子",
                        "5": "哈哈哈哈"
                    }[state]
                }
            },
            {
                title: "爱好",
                dataIndex: "interest",
                align: "center",
                render(interest) {
                    return {
                        "1": "滑雪",
                        "2": "爬山",
                        "3": "健身",
                        "4": "音乐",
                        "5": "跑步",
                        "6": "桌球",
                        "7": "画画",
                        "8": "学习"
                    }[interest]
                }
            },
            {
                title: "生日",
                dataIndex: "birthday",
                align: "center"
            },
            {
                title: "联系地址",
                dataIndex: "address",
                align: "center"
            },
            {
                title: "早起时间",
                dataIndex: "time",
                align: "center"
            }
        ];
        let footer = {}
        if (this.state.type === "detail") footer = { footer: null }
        return (
            <div>
                <Card style={{ marginBottom: 10 }}>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        style={{ marginBottom: 10, marginRight: 10 }}
                        onClick={() => { this.handleOperate("create") }}
                    >创建员工</Button>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        style={{ marginBottom: 10, marginRight: 10 }}
                        onClick={() => { this.handleOperate("edit") }}
                    >编辑员工</Button>
                    <Button
                        type="primary"
                        style={{ marginBottom: 10, marginRight: 10 }}
                        onClick={() => { this.handleOperate("detail") }}
                    >员工详情</Button>
                    <Button
                        type="primary"
                        icon={<DeleteOutlined />}
                        style={{ marginBottom: 10, marginRight: 10 }}
                        onClick={() => { this.handleOperate("delete") }}
                    >删除员工</Button>
                    <ETable
                        updataSelectedItem={Utils.updataSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.dataSource}
                        selectedRowKeys={this.state.selectedRowKeys}
                    />
                </Card>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onCancel={() => this.setState({ isVisible: false })}
                    onOk={this.handleSubmit}
                    width={600}
                    {...footer}
                >
                    <UserForm
                        ref={c => this.myForm = c}
                        userInfo={this.state.userInfo}
                        type={this.state.type}
                    />
                </Modal>
            </div>
        );
    }
}
class UserForm extends Component {
    getState = (state) => {
        return {
            "1": "北大才子",
            "2": "风华浪子",
            "3": "王八犊子",
            "4": "缺心眼子",
            "5": "哈哈哈哈"
        }[state]
    }
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 15
            }
        }
        const { username, sex, state, birthday, address } = this.props.userInfo || ""
        const { type } = this.props
        console.log(type);
        return (
            <Form {...formItemLayout} ref={c => this.myForm = c}>
                <Form.Item name="username" label="姓名" initialValue={username} >
                    {
                        type === "detail" ? username :
                            <Input placeholder="请输入姓名" />
                    }
                </Form.Item>
                <Form.Item name="sex" label="性别" initialValue={sex} >
                    {
                        type === "detail" ? sex === 1 ? "男" : "女" :
                            <Radio.Group>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>
                    }
                </Form.Item>
                <Form.Item name="state" label="状态" initialValue={state}>
                    {
                        type === "detail" ? this.getState(state) :
                            <Select>
                                <Select.Option value={1}>咸鱼一条</Select.Option>
                                <Select.Option value={2}>风华浪子</Select.Option>
                                <Select.Option value={3}>王八犊子</Select.Option>
                                <Select.Option value={4}>缺心眼子</Select.Option>
                                <Select.Option value={5}>北大才子</Select.Option>
                            </Select>
                    }
                </Form.Item>
                <Form.Item name="birthday" label="生日" initialValue={moment(birthday)}>
                    {
                        type === "detail" ? birthday :
                            <DatePicker placeholder='请选择生日' />
                    }
                </Form.Item>
                <Form.Item name="address" label="地址" initialValue={address}>
                    {
                        type === "detail" ? address :
                            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} placeholder="请输入联系地址" />
                    }
                </Form.Item>
            </Form >
        )
    }
}
