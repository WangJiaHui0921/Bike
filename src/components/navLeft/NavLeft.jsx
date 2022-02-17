import React, { Component } from 'react';
import { Menu } from "antd"
import { NavLink } from "react-router-dom"
import styles from "./NavLeft.module.less"
import menuConfig from "../../config/menuConfig"
export class NavLeft extends Component {
    state = {}
    componentWillMount() {
        const menuTreeNode = this.renderMenu(menuConfig)
        this.setState({ menuTreeNode })
    }

    renderMenu = (data) => {
        return data.map(item => {
            if (item.children) {
                return (
                    <Menu.SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </Menu.SubMenu>
                )
            } else {
                return <Menu.Item key={item.key} >
                    <NavLink to={item.key}> {item.title}</NavLink>
                </Menu.Item >
            }
        })
    }
    render() {
        return (
            <div>
                <div className={styles.logo}>
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>爱豆 Ms</h1>
                </div>
                <Menu theme={"dark"}>
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        );
    }
}
