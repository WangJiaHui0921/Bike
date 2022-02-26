import React, { Component } from 'react';
import { Table } from "antd"
class ETable extends Component {
    // 点击行
    onRowClick = (record, index) => {
        let rowSelection = this.props.rowSelection
        if (rowSelection === "checked") {
            let selectedRowKeys = this.props.selectedRowKeys;
            let selectedItem = this.props.selectedItem;
            let selectedIds = this.props.selectedIds;
            if (selectedIds) {
                const id = selectedIds.indexOf(record.id);
                if (id === -1) {
                    selectedIds.push(record.id);
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                } else {
                    selectedIds.splice(id, 1);
                    selectedRowKeys.splice(id, 1);
                    selectedItem.splice(id, 1);
                }
            } else {
                let updataSelectedItem = this.props.updataSelectedItem;
                selectedIds = [record.id];
                selectedRowKeys = [index];
                selectedItem = [record]
                updataSelectedItem(selectedRowKeys, selectedItem, selectedIds);
            }
        } else {
            let updataSelectedItem = this.props.updataSelectedItem;
            let selectedRowKeys = [index];
            let selectedItem = record;
            updataSelectedItem(selectedRowKeys, selectedItem);
        }
    }
    tableInit = () => {
        let row_selection = this.props.rowSelection;
        let selectedRowKeys = this.props.selectedRowKeys;
        const rowSelection = {
            type: "radio",
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        if (row_selection === false || row_selection === null) row_selection = false
        else if (row_selection === "checked") rowSelection.type = "checkbox";
        else row_selection = true
        return <Table
            bordered
            {...this.props}
            rowSelection={row_selection ? rowSelection : null}
            onRow={(record, index) => {
                return {
                    onClick: () => this.onRowClick(record, index) // 点击行
                };
            }}
        />
    }
    render() {
        return (
            <div>
                {this.tableInit()}
            </div>
        );
    }
}

export default ETable;