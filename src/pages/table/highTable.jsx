import React, { Component } from 'react';
import axios from "./../../axios/index"
import { Card, Table } from "antd"
export class HighTable extends Component {
    state = {}
    componentWillMount() {
        this.resquest()
    }
    resquest = () => {
        axios.ajax({
            url: "/table/list",
            data: { params: { page: 1 } }
        }).then(res => {
            console.log(res.result.list);
            this.setState({ dataSource2: res.result.list })
        })
        axios.ajax({
            url: "/table/high/list",
            data: { params: { page: 1 } }
        }).then(res => {
            console.log(res.result.list);
            this.setState({ dataSource3: res.result.list })
        })
    }
    handleOnchange = (pagination, filters, sorter) => {
        this.setState({ sortOrder: sorter.order })
    }
    render() {
        const columns = [
            { title: "id", dataIndex: "id", align: "center", fixed: 'left', },
            { title: "用户名", dataIndex: "userName", align: "center", fixed: 'left', },
            { title: "年龄", dataIndex: "age", align: "center", sorter: (a, b) => { return a.age - b.age }, sortOrder: this.state.sortOrder },
            { title: "性别", dataIndex: "gender", align: "center", render(sex) { return sex === 1 ? '男' : "女" } },
            { title: "状态", dataIndex: "state", align: "center", render(state) { let config = { "1": "风华浪子", "2": "北大才子", "3": "王八犊子", "4": "缺心眼子" }; return config[state] } },
            { title: "爱好", dataIndex: "hobby", align: "center", render(hobby) { let config = { "1": "滑雪", "2": "逛街", "3": "健身", "4": "桌球", "5": "蹦极" }; return config[hobby] } },
            { title: "生日", dataIndex: "birthday", align: "center" },
            { title: "地址", dataIndex: "address", align: "center" },
            { title: "早起时间", dataIndex: "time", align: "center" }
        ]
        return (
            <div>
                <Card title="头部固定" style={{ marginBottom: 10 }}>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        bordered
                        scroll={{ y: 300 }}
                    />
                </Card>
                <Card title="左侧固定" style={{ marginBottom: 10 }}>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        bordered
                        scroll={{ x: 1200 }}
                    />
                </Card>
                <Card title="表格排序" style={{ marginBottom: 10 }}>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource3}
                        pagination={false}
                        bordered
                        onChange={this.handleOnchange}
                    />
                </Card>
            </div>
        );
    }
}

