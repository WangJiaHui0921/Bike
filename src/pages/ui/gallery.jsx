import React, { Component } from 'react';
import { Card, Row, Col, Modal } from "antd"
import styles from "./ui.module.less"
export class Gallery extends Component {
    state = { isVisible: false }
    handleOpenImage = (imgSrc) => {
        this.setState({ isVisible: true, ImageSrc: `/gallery/${imgSrc}` })
    }
    render() {
        const imgs = [
            ["1.png", "2.png", "3.png", "4.png", "5.png"],
            ["6.png", "7.png", "8.png", "9.png", "10.png"],
            ["11.png", "12.png", "13.png", "14.png", "15.png"],
            ["16.png", "17.png", "18.png", "19.png", "20.png"],
            ["21.png", "22.png", "23.png", "24.png", "25.png"]
        ];
        const imgsList = imgs.map(item => {
            return item.map(item => {
                return <Card
                    key={item}
                    cover={<img src={"/gallery/" + item} alt="" />}
                    style={{ width: 230, marginBottom: 10 }}
                    hoverable
                    onClick={() => this.handleOpenImage(item)}
                >
                    <Card.Meta title="爱豆" description="爱豆后台管理系统" />
                </Card>
            })
        })
        return (
            <div className={styles.cardWrap}>
                <Row gutter={10}>
                    <Col span={5}>{imgsList[0]}</Col>
                    <Col span={5}>{imgsList[1]}</Col>
                    <Col span={5}>{imgsList[2]}</Col>
                    <Col span={5}>{imgsList[3]}</Col>
                    <Col span={4}>{imgsList[4]}</Col>
                </Row>
                <Modal
                    visible={this.state.isVisible}
                    onCancel={() => this.setState({ isVisible: false })}
                    onOk={() => this.setState({ isVisible: false })}
                    title="爱豆图片"
                    width={300}
                    height={500}
                    footer={null}
                >
                    {<img src={this.state.ImageSrc} alt="" style={{ width: "100%", height: "100%" }} />}
                </Modal>
            </div>
        );
    }
}

