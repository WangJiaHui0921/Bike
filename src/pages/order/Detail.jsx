import React, { Component } from 'react';
import { Card } from "antd"
import axios from "./../../axios/index"
import "./detail.less"
export class Detail extends Component {
    state = {}
    componentWillMount() {
        let orderId = this.props.match.params.orderId
        if (orderId) this.getDetailInfo(orderId)
    }
    getDetailInfo = (orderId) => {
        axios.ajax({
            url: "/order/detail",
            data: { params: { orderId: orderId } }
        }).then(res => {
            this.setState({ orderInfo: res.result })
        })
    }

    render() {
        const info = this.state.orderInfo || {}
        console.log(info);
        return (
            <div style={{ width: "100%" }}>
                <Card>
                    <div id="orderDetailMap"></div>
                    <div className="detail-items clearfix" >
                        <div className="item-title clearfix">基础信息</div>
                        <ul className="detail-form clearfix">
                            <li>
                                <div className="detail-form-left clearfix">用车模式</div>
                                <div className="detail-form-content clearfix">{info.mode === 1 ? "服务区" : "停车点"}</div>
                            </li>
                            <li>
                                <div className="detail-form-left clearfix">订单编号</div>
                                <div className="detail-form-content clearfix">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left clearfix">车辆编号</div>
                                <div className="detail-form-content clearfix">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left clearfix">用户姓名</div>
                                <div className="detail-form-content clearfix">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left clearfix">手机号</div>
                                <div className="detail-form-content clearfix">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>

                    <div className="detail-items clearfix">
                        <div className="item-title clearfix">行驶轨迹</div>
                        <ul className="detail-form clearfix">
                            <li>
                                <div className="detail-form-left clearfix">行驶起点</div>
                                <div className="detail-form-content clearfix">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left clearfix">行驶终点</div>
                                <div className="detail-form-content clearfix">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left clearfix">行驶里程</div>
                                <div className="detail-form-content clearfix">{info.distance / 1000 + "KM"}</div>
                            </li>
                        </ul>
                    </div>

                </Card>
            </div>
        );
    }
}
