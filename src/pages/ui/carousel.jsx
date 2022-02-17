import React, { Component } from 'react';
import { Card, Carousel } from "antd"
import styles from "./ui.module.less"
export class Carousels extends Component {

    render() {
        const contentStyle = {
            height: '160px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',
        };

        return (
            <div>
                <Card title="文字轮播" className={styles.cardWrap}>
                    <Carousel autoplay>
                        <div>
                            <h3 style={contentStyle}>1</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>2</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>3</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>4</h3>
                        </div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className={styles.cardWrap}>
                    <Carousel autoplay>
                        <div>
                            <img src="/carousel-img/carousel-1.jpg" alt="" />
                        </div>
                        <div >
                            <img src="/carousel-img/carousel-2.jpg" alt="" />
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-3.jpg" alt="" />
                        </div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}

