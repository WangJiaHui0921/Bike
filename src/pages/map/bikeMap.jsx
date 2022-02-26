import React, { Component } from 'react';
import { Card, Form } from 'antd';
import Axios from '../../axios';
import { BaseForm } from '../../components/baseForm/baseForm';
export class BikeMap extends Component {
    formList = [
        {
            type: "city",
            label: "城市",
            field: "city",
            initialValue: "1",
            list: [
                { id: "0", name: "全部" },
                { id: "1", name: "北京" },
                { id: "2", name: "上海" }
            ]
        },
        {
            type: "时间查询"
        },
        {
            type: "SELECT",
            label: "订单状态",
            field: "order_status",
            placeholder: "全部",
            initialValue: "0",
            width: 120,
            list: [
                { id: "0", name: "全部" },
                { id: "1", name: "进行中" },
                { id: "2", name: "结束订单" }
            ]
        }
    ];
    handleFilterSubmit = params => {
        this.params = params;
        console.log(params);
    }
    render() {
        return (
            <div>
                <Card style={{ marginBottom: 10 }}>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />
                </Card>
                <Card>
                    <div>共100辆</div>
                    <div className="content" style={{ height: 500 }}>
                    </div>
                </Card>
            </div>
        );
    }
}

