import React, { Component } from 'react'
import moment from 'moment'
import { Card, Form, Input, Button, Select, Switch, Radio, message, Checkbox, InputNumber, DatePicker, TimePicker, Upload } from "antd"
import { PlusOutlined } from "@ant-design/icons"
export class Register extends Component {
    handleSubmit = () => {
        console.log(this.myForm);
        const userInfo = this.myForm.getFieldValue()
        console.log(JSON.stringify(userInfo));
        message.success(`注册成功！用户名：${userInfo.userName} 密码：${userInfo.password}`)
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }

        }
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    offset: 4
                }
            }
        }
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );

        return (
            <div>
                <Card title="注册表单">
                    <Form {...formItemLayout} ref={c => this.myForm = c}>
                        <Form.Item label="用户名" name="userName" rules={[{ required: true, message: "请输入用户名" }]} >
                            <Input />
                        </Form.Item>
                        <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入密码" }]} >
                            <Input type="password" />
                        </Form.Item>
                        <Form.Item label="性别" name="gender" initialValue={1}>
                            <Radio.Group >
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="年龄" name="age" initialValue={18}>
                            <InputNumber min={18} max={70} />
                        </Form.Item>
                        <Form.Item label="当前状态" name="state" initialValue={2}>
                            <Select showSearch>
                                <Select.Option value={1}>风华浪子</Select.Option>
                                <Select.Option value={2}>北大才子</Select.Option>
                                <Select.Option value={3}>王八犊子</Select.Option>
                                <Select.Option value={4}>缺心眼子</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="爱好" name="hobby" initialValue={[1, 3]}>
                            <Select mode="multiple">
                                <Select.Option value={1}>爬山</Select.Option>
                                <Select.Option value={2}>滑雪</Select.Option>
                                <Select.Option value={3}>健身</Select.Option>
                                <Select.Option value={4}>短跑</Select.Option>
                                <Select.Option value={5}>逛街</Select.Option>
                                <Select.Option value={6}>美容</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="是否已婚" name="isMarry" valuePropName="checked">
                            <Switch defaultChecked />
                        </Form.Item>
                        <Form.Item label="生日" name="birthday" initialValue={moment("2022-2-14")}>
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label="联系地址" name="address" initialValue="河北省秦皇岛市海港区">
                            <Input.TextArea autoSize={{ maxRows: 6, minRows: 3 }} />
                        </Form.Item>
                        <Form.Item label="早起时间" name="time" initialValue={moment('2022-2-14 08:00:00')}>
                            <TimePicker />
                        </Form.Item>
                        <Form.Item label="头像" name="userImg" valuePropName='fileList'>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                            >
                                {uploadButton}
                            </Upload>
                        </Form.Item>
                        <Form.Item {...offsetLayout} name="agreement" valuePropName='checked' initialValue={true}>
                            <Checkbox>我已阅读过<a href="###">爱豆协议</a></Checkbox>
                        </Form.Item>
                        <Form.Item {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div >
        )
    }
}
