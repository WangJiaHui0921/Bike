import React from 'react'
import { Row, Col } from 'antd'
import { Header, Footer, NavLeft } from "./components"
import styles from "./style/common.module.less"
export class Admin extends React.Component {
    render() {
        return (
            <Row className={styles.container}>
                <Col span={4} className={styles.navLeft}>
                    <NavLeft />
                </Col>
                <Col span={20} className={styles.main}>
                    <Header />
                    <Row className={styles.content}>
                        content
                    </Row>
                    <Footer />
                </Col>
            </Row>
        )
    }
}