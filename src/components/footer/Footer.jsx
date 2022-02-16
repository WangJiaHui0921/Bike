import React, { Component } from 'react';
import styles from './Footer.module.css'
export class Footer extends Component {
    render() {
        return (
            <div className={styles.footer}>
                版权所有：慕课网&爱豆(推荐使用谷歌浏览器，可以获得更佳操作页面体验) 技术支持：爱豆
            </div>
        );
    }
}
