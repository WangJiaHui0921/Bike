import React from 'react'
import { Row } from 'antd'
import { Header } from "./components"
import styles from "./style/common.module.less"
export class Common extends React.Component {
    render() {
        return (
            <div>
                <Row className={styles.simplePage}>
                    <Header menuType="second" />
                </Row>
                <Row>
                    {this.props.children}
                </Row>
            </div>
        )
    }
}