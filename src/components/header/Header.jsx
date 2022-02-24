import React, { Component } from 'react';
import { Row, Col } from "antd"
import axios from "axios"
import moment from "moment"
import styles from "./Header.module.less"

export class Header extends Component {
    state = {}
    componentWillMount() {
        this.setState({ userName: "爱豆" })
        setInterval(() => {
            let sysTime = moment().format('YYYY-MM-DD HH:mm:ss')
            this.setState({ sysTime })
        }, 1000);
        let weatherApi = "https://devapi.qweather.com/v7/weather/now?location=101010100&key=62b40aa8f04f48f2bd1a227ece7af879"
        axios.get(weatherApi).then((response) => {
            this.setState({
                weather: response.data.now.text,
                weaterWindDir: response.data.now.windDir
            })
        })
    }

    render() {
        const menuType = this.props.menuType;
        return (
            <div className={styles.header}>
                <Row className={styles.headerTop} style={{ background: menuType ? "#1890ff" : "", color: menuType ? "#fff" : "" }}>
                    {
                        menuType ?
                            <Col span={6} className={styles.logo}>
                                <img src="/assets/logo-ant.svg" alt="" />
                                <span>爱豆通用管理系统</span>
                            </Col> : ""
                    }
                    <Col span={menuType ? 18 : 24}>
                        <span>欢迎 &lt;{this.state.userName}&gt; 登录后台管理系统</span>
                        <a href="###">退出</a>
                    </Col>
                </Row>
                {
                    menuType ? "" : <Row className={styles.breadcrumb}>
                        <Col span={4} className={styles.breadcrumbTitle}>
                            首页
                        </Col>
                        <Col span={20} className={styles.weater}>
                            <span className={styles.date}>{this.state.sysTime}</span>
                            <span className={styles.weaterDetail}>{this.state.weather} {this.state.weaterWindDir}</span>
                        </Col>
                    </Row>
                }
            </div>
        )
    }
}

