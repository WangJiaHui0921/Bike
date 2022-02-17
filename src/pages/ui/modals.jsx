import React, { Component } from 'react'
import { Card, Modal, Button } from "antd"
import styles from "./ui.module.less"
export class Modals extends Component {
    state = {
        Open: false,
        Footer: false,
        Top: false,
        Center: false
    }
    handleModal = (type) => {
        this.setState({ [type]: true })
    }
    handlePrompt = (type) => {
        Modal[type]({
            title: "确认?",
            content: "你确定掌握了爱豆后台管理系统吗?"
        })
    }
    render() {
        return (
            <div>
                {/* 基础模态框 */}
                <Card title="基础模态框" className={styles.cardWrap}>
                    <Button type="primary" onClick={() => { this.handleModal("Open") }}>Open</Button>
                    <Button type="primary" onClick={() => { this.handleModal("Footer") }}>自定义页脚</Button>
                    <Button type="primary" onClick={() => { this.handleModal("Top") }}>顶部20px弹框</Button>
                    <Button type="primary" onClick={() => { this.handleModal("Center") }}>水平垂直居中</Button>
                </Card>
                {/* 信息确认框 */}
                <Card title="信息确认框" className={styles.cardWrap}>
                    <Button type="primary" onClick={() => { this.handlePrompt("confirm") }}>confirm</Button>
                    <Button type="primary" onClick={() => { this.handlePrompt("info") }}>info</Button>
                    <Button type="primary" onClick={() => { this.handlePrompt("success") }}>success</Button>
                    <Button type="primary" onClick={() => { this.handlePrompt("warning") }}>warning</Button>
                    <Button type="primary" onClick={() => { this.handlePrompt("error") }}>error</Button>
                </Card>
                <Modal
                    title="爱豆"
                    visible={this.state.Open}
                    onCancel={() => { this.setState({ Open: false }) }}
                    onOk={() => { this.setState({ Open: false }) }}
                >
                    欢迎登录爱豆后台管理系统
                </Modal>
                <Modal
                    title="爱豆"
                    visible={this.state.Footer}
                    onCancel={() => { this.setState({ Footer: false }) }}
                    onOk={() => { this.setState({ Footer: false }) }}
                    cancelText="算了"
                    okText="好的"
                >
                    欢迎登录爱豆后台管理系统
                </Modal>
                <Modal
                    title="爱豆"
                    visible={this.state.Top}
                    onCancel={() => { this.setState({ Top: false }) }}
                    onOk={() => { this.setState({ Top: false }) }}
                    style={{ top: 20 }}
                >
                    欢迎登录爱豆后台管理系统
                </Modal>
                <Modal
                    title="爱豆"
                    visible={this.state.Center}
                    onCancel={() => { this.setState({ Center: false }) }}
                    onOk={() => { this.setState({ Center: false }) }}
                    centered
                >
                    欢迎登录爱豆后台管理系统
                </Modal>

            </div>
        )
    }
}
