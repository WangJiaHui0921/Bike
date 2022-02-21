import React, { Component } from 'react';
import axios from './../../axios/index';
import { Card, Table } from 'antd';
export class BasicTable extends Component {
    componentWillMount() {
        const dataSource = [
            {
                id: 1,
                userName: "Jack",
                gender: "1",
                state: "2",
                hobby: "1",
                birthday: "2022-02-14",
                address: "河北省秦皇岛市海港区",
                time: "08:00:00",
                key: "Jack"
            },
            {
                id: 2,
                userName: "Susan",
                gender: "2",
                state: "3",
                hobby: "2",
                birthday: "2021-05-20",
                address: "河北省秦皇岛市海港区",
                time: "08:00:00",
                key: "Susan"
            },
            {
                id: 3,
                userName: "Join",
                gender: "1",
                state: "1",
                hobby: "3",
                birthday: "1999-09-21",
                address: "河北省秦皇岛市海港区",
                time: "08:00:00",
                key: "Join"
            },
        ]
        this.setState({ dataSource })
        this.resquest()
    }
    // 获取数据
    resquest = () => {
        axios.ajax({
            url: "/table/list",
            data: { params: { page: 1 } }
        }).then(res => {
            this.setState({ dataSource2: res })
        })
    }

    render() {
        // 表格数据
        const columns = [
            { title: "id", dataIndex: "id", align: "center" },
            { title: "用户名", dataIndex: "userName", align: "center" },
            { title: "性别", dataIndex: "gender", align: "center", render(sex) { return sex === 1 ? '男' : "女" } },
            { title: "状态", dataIndex: "state", align: "center", render(state) { let config = { "1": "风华浪子", "2": "北大才子", "3": "王八犊子", "4": "缺心眼子" }; return config[state] } },
            { title: "爱好", dataIndex: "hobby", align: "center", render(hobby) { let config = { "1": "滑雪", "2": "逛街", "3": "健身", "4": "桌球", "5": "蹦极" }; return config[hobby] } },
            { title: "生日", dataIndex: "birthday", align: "center" },
            { title: "地址", dataIndex: "address", align: "center" },
            { title: "早起时间", dataIndex: "time", align: "center" }
        ]
        return (
            <div>
                <Card title="基础表格" style={{ marginBottom: 10 }}>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        bordered
                    />
                </Card>
                <Card title="动态渲染表格">
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        bordered
                    />
                </Card>

            </div>
        );
    }
}
