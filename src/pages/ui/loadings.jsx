import React, { Component } from 'react'
import { Card, Spin, Space, Alert } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import styles from "./ui.module.less"
export class Loadings extends Component {
    render() {
        return (
            <div>
                {/* Spin用法 */}
                <Card title="Spin用法" className={styles.cardWrap}>
                    <Space size="middle">
                        <Spin size="small" />
                        <Spin size="default" />
                        <Spin size="large" />
                        <Spin indicator={<LoadingOutlined />} />
                    </Space>
                </Card>
                {/* 内容遮罩 */}
                <Card title="内容遮罩" className={styles.cardWrap}>
                    <Alert
                        message="爱豆"
                        description="欢迎来到爱豆后台管理系统"
                    />
                    <Spin>
                        <Alert
                            message="爱豆"
                            description="欢迎来到爱豆后台管理系统"
                        />
                    </Spin>
                    <Spin tip="Loading...">
                        <Alert
                            message="爱豆"
                            description="欢迎来到爱豆后台管理系统"
                        />
                    </Spin>
                    <Spin indicator={<LoadingOutlined />}>
                        <Alert
                            message="爱豆"
                            description="欢迎来到爱豆后台管理系统"
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}
