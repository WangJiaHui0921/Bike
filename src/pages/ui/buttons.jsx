import React, { Component } from 'react'
import { Card, Button, Radio } from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined, RightOutlined, SearchOutlined, DownloadOutlined, LeftOutlined } from "@ant-design/icons"
import styles from "./ui.module.less"
export class Buttons extends Component {
    state = {
        loading: true,
        size: "default"
    }
    handleLoading = () => {
        this.setState({ loading: !this.state.loading })
    }
    handleSize = (e) => {
        this.setState({ size: e.target.value })
    }
    render() {
        return (
            <div>
                {/* 基础按钮 */}
                <Card title="基础按钮" className={styles.cardWrap}>
                    <Button type="primary">爱豆</Button>
                    <Button>爱豆</Button>
                    <Button type="dashed">爱豆</Button>
                    <Button type="primary" danger>爱豆</Button>
                    <Button disabled>爱豆</Button>
                </Card>
                {/* 图标按钮 */}
                <Card title="图标按钮" className={styles.cardWrap}>
                    <Button><PlusOutlined />创建</Button>
                    <Button><EditOutlined />编辑</Button>
                    <Button><DeleteOutlined />删除</Button>
                    <Button shape="circle"><SearchOutlined /></Button>
                    <Button type="primary"><SearchOutlined />搜索</Button>
                    <Button type="primary"><DownloadOutlined />下载</Button>
                </Card>
                {/* Loading按钮 */}
                <Card title="Loading按钮" className={styles.cardWrap}>
                    <Button loading={this.state.loading}>确定</Button>
                    <Button loading={this.state.loading} type="primary" shape="circle"></Button>
                    <Button loading={this.state.loading} >点击加载</Button>
                    <Button loading={this.state.loading} shape="circle"></Button>
                    <Button type="primary" onClick={this.handleLoading}>Loading开关</Button>
                </Card>
                {/* 按钮组 */}
                <Card title="Loading按钮" className={styles.cardWrap}>
                    <Button.Group>
                        <Button type="primary" style={{ marginRight: 0 }}><LeftOutlined />返回</Button>
                        <Button type="primary">前进<RightOutlined /></Button>
                    </Button.Group>
                </Card>
                {/* 按钮尺寸 */}
                <Card title="按钮尺寸" className={styles.cardWrap}>
                    <Radio.Group value={this.state.size} onChange={this.handleSize}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>爱豆</Button>
                    <Button size={this.state.size}>爱豆</Button>
                    <Button dashed size={this.state.size}>爱豆</Button>
                    <Button type="primary" danger size={this.state.size}>爱豆</Button>
                </Card>

            </div>
        )
    }
}
