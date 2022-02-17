import React, { Component } from 'react';
import { Card, message, Button } from "antd"
import styles from "./ui.module.less"
export class Messages extends Component {
    handleMessage = (type) => {
        message[type]("欢迎来到爱豆后台管理系统")
    }
    render() {
        return (
            <div>
                <Card title="全局Message" className={styles.cardWrap}>
                    <Button type="primary" onClick={() => { this.handleMessage("success") }}>Success</Button>
                    <Button type="primary" onClick={() => { this.handleMessage("info") }}>Info</Button>
                    <Button type="primary" onClick={() => { this.handleMessage("loading") }}>Loading</Button>
                    <Button type="primary" onClick={() => { this.handleMessage("error") }}>Error</Button>
                    <Button type="primary" onClick={() => { this.handleMessage("warning") }}>Warning</Button>
                </Card>
            </div>
        );
    }
}
