import React, { Component } from 'react';
import { Card, Form, Input, Button, message, Checkbox } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
export class FormLogin extends Component {
    handleSubmit = async () => {
        console.log(this.myForm);
        const userInfo = this.myForm.getFieldValue()
        console.log(userInfo)
        try {
            const values = await this.myForm.validateFields(["userName", "password"])
            console.log(values);
            message.success(`登录成功！用户名：${values.userName} 密码：${values.password}`)
        } catch (e) {
            message.error("请输入完整表单")
        }

    }
    render() {
        return (
            <div>
                <Card title="登录行内表单">
                    <Form layout="inline">
                        <Form.Item
                            name="userName"
                        >
                            <Input placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                        >
                            <Input placeholder="请输入密码" type="password" />
                        </Form.Item>
                        <Button type="primary">登录</Button>
                    </Form>
                </Card>
                <Card title="登录水平表单">
                    <Form style={{ width: 300 }} ref={c => this.myForm = c}>
                        <Form.Item
                            name="userName"
                            rules={[
                                { required: true, message: "请输入用户名" },
                                { max: 10, min: 5, message: "用户名长度不符合范围" },
                                { pattern: /^[A-Za-z]{1}[A-Za-z0-9_-]{3,15}$/, message: "验证用户名是否合法，必须是以字母开头，只能包含字母数字下划线和减号，4到16位" }
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "请输入密码" }]}
                        >
                            <Input prefix={<LockOutlined />} placeholder="请输入密码" type="password" />
                        </Form.Item>
                        <Form.Item name="remember" valuePropName='checked' initialValue={true}>
                            <Checkbox>记住密码<a href="###" style={{ marginLeft: 155 }}>忘记密码</a></Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}
