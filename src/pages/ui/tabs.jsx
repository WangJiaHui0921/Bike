import React, { Component } from 'react'
import { Card, Tabs as Tab, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import styles from "./ui.module.less"
export class Tabs extends Component {
    newTabIndex = 0;
    componentWillMount() {
        const panes = [
            { title: "Tab 1", content: "Tab 1", key: "1" },
            { title: "Tab 2", content: "Tab 2", key: "2" },
            { title: "Tab 3", content: "Tab 3", key: "3" }
        ]
        this.setState({ panes, activeKey: panes[0].key })
    }
    handleOnChange = key => {
        message.success(`你选中了标签${key}`)
    };
    onChange = activeKey => {
        this.setState({ activeKey })
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey)
    }
    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        const newPanes = [...panes];
        newPanes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({
            panes: newPanes,
            activeKey,
        });
    };

    remove = targetKey => {
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        this.setState({
            panes: newPanes,
            activeKey: newActiveKey,
        });
    }
    render() {
        return (
            <div>
                {/* Tab页签 */}
                <Card title="Tab页签" className={styles.cardWrap}>
                    <Tab defaultActiveKey="1" onChange={this.handleOnChange}>
                        <Tab.TabPane tab="Tab1" key="1">
                            I love China One
                        </Tab.TabPane>
                        <Tab.TabPane tab="Tab2" key="2">
                            I love China Two
                        </Tab.TabPane>
                        <Tab.TabPane tab="Tab3" key="3">
                            I love China Three
                        </Tab.TabPane>
                    </Tab>
                </Card>
                {/* 带图的Tab页签 */}
                <Card title="带图的Tab页签" className={styles.cardWrap}>
                    <Tab defaultActiveKey="1" onChange={this.handleOnChange} >
                        <Tab.TabPane tab={<span><PlusOutlined />Tab1</span>} key="1">
                            I love China One
                        </Tab.TabPane>
                        <Tab.TabPane tab={<span><EditOutlined />Tab2</span>} key="2">
                            I love China Two
                        </Tab.TabPane>
                        <Tab.TabPane tab={<span><DeleteOutlined />Tab3</span>} key="3">
                            I love China Three
                        </Tab.TabPane>
                    </Tab>
                </Card>
                {/* 可编辑的Tab页签 */}
                <Card title="可编辑的Tab页签" className={styles.cardWrap}>
                    <Tab
                        type="editable-card"
                        onChange={this.onChange}
                        onEdit={this.onEdit}
                        activeKey={this.state.activeKey}
                    >
                        {
                            this.state.panes.map(item => {
                                return <Tab.TabPane tab={item.title} key={item.key}>{item.content}</Tab.TabPane>
                            })
                        }
                    </Tab>
                </Card>
            </div >
        )
    }
}
