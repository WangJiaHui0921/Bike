import React, { Component } from 'react';
import styles from "./Home.module.less"
export class Home extends Component {
    render() {
        return (
            <div className={styles.homeWrapper}>
                欢迎学习爱豆后台管理系统课程
            </div>
        );
    }
}
