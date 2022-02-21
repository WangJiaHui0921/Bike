import React, { Component } from 'react';
import axios from 'axios';
import { Card, Table } from 'antd';
export class BasicTable extends Component {
    componentWillMount() {
        const dataSource = [
            {
                id: 1,
                userName: "Jack",
                gender: "男",
                state: "北大才子",
                hobby: "滑雪",
                birthday: "2022-02-14",
                address: "河北省秦皇岛市海港区",
                time: "08:00:00"
            },
            {
                id: 2,
                userName: "Susan",
                gender: "女",
                state: "北大才子",
                hobby: "逛街",
                birthday: "2021-05-20",
                address: "河北省秦皇岛市海港区",
                time: "08:00:00"
            },
            {
                id: 3,
                userName: "Join",
                gender: "男",
                state: "缺心眼子",
                hobby: "滑雪",
                birthday: "1999-09-21",
                address: "河北省秦皇岛市海港区",
                time: "08:00:00"
            },
        ]
        this.setState({ dataSource })
        this.resquest()
    }
    // 获取数据
    resquest = () => {
        let baseUrl = "https://www.fastmock.site/mock/9d7d6d767defb94d6acdcdde09f48550/mockapi";
        axios.get(baseUrl + "/table/list").then(res => {
            console.log(res);
        })
    }

    render() {
        // 表格数据
        const columns = [
            { title: "id", dataIndex: "id", align: "center" },
            { title: "用户名", dataIndex: "userName", align: "center" },
            { title: "性别", dataIndex: "gender", align: "center" },
            { title: "状态", dataIndex: "state", align: "center" },
            { title: "爱好", dataIndex: "hobby", align: "center" },
            { title: "生日", dataIndex: "birthday", align: "center" },
            { title: "地址", dataIndex: "address", align: "center" },
            { title: "早起时间", dataIndex: "time", align: "center" }
        ]
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        bordered
                    />
                </Card>
                <Card title="动态渲染表格">
                    <Table />
                </Card>

            </div>
        );
    }
}
