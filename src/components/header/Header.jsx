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
        return (
            <div className={styles.header}>
                <Row className={styles.headerTop}>
                    <Col span={24}>
                        <span>欢迎 &lt;{this.state.userName}&gt; 登录后台管理系统</span>
                        <a href="###">退出</a>
                    </Col>
                </Row>
                <Row className={styles.breadcrumb}>
                    <Col span={4} className={styles.breadcrumbTitle}>
                        首页
                    </Col>
                    <Col span={20} className={styles.weater}>
                        <span className={styles.date}>{this.state.sysTime}</span>
                        <span className={styles.weaterDetail}>{this.state.weather} {this.state.weaterWindDir}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}

