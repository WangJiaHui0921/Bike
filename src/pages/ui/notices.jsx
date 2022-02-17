import React, { Component } from 'react'
import { Card, Button, notification } from "antd"
import styles from "./ui.module.less"
export class Notices extends Component {
    handleNotice = (type, direction) => {
        notification[type]({
            message: "爱豆",
            description: "欢迎来到爱豆后台管理系统",
            placement: direction
        })
        if (direction) {
            notification.config({
                placement: direction
            });
        }
    }
    render() {
        return (
            <div>
                <Card title="通知提醒框" className={styles.cardWrap}>
                    <Button type="primary" onClick={() => { this.handleNotice("success") }}>Success</Button>
                    <Button type="primary" onClick={() => { this.handleNotice("info") }}>Info</Button>
                    <Button type="primary" onClick={() => { this.handleNotice("warning") }}>Warning</Button>
                    <Button type="primary" onClick={() => { this.handleNotice("error") }}>Error</Button>
                </Card>
                <Card title="通知提醒框" className={styles.cardWrap}>
                    <Button type="primary" onClick={() => { this.handleNotice("success", "topLeft") }}>Success-topLeft</Button>
                    <Button type="primary" onClick={() => { this.handleNotice("info", "topRight") }}>Info-topRight</Button>
                    <Button type="primary" onClick={() => { this.handleNotice("warning", "bottomLeft") }}>Warning-bottomLeft</Button>
                    <Button type="primary" onClick={() => { this.handleNotice("error", "bottomRight") }}>Error-bottomRight</Button>
                </Card>
            </div>
        )
    }
}
