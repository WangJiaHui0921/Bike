import React, { Component } from 'react';
import { Input, Select, Form, Button, Checkbox, DatePicker } from 'antd'
import Utils from './../../utils/utils'
export class BaseForm extends Component {
    // 查询
    handleFilterSubmit = () => {
        let fieldsVaule = this.myForm.getFieldValue();
        this.props.filterSubmit(fieldsVaule)
    }
    // 重置
    reset = () => {
        this.myForm.resetFields()
    }
    initFormList = () => {
        const formList = this.props.formList;
        const formItemList = [];
        if (formList.length > 0 && formList !== []) {
            formList.forEach((item, index) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue;
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type === "时间查询") {
                    const BEGIN_TIME = <Form.Item name="begin_time" label={"订单时间"} key="1">
                        <DatePicker placeholder='请选择开始时间' />
                    </Form.Item>
                    formItemList.push(BEGIN_TIME)
                    const END_TIME = <Form.Item name="end_time" label={"~"} colon={false} key="2">
                        <DatePicker placeholder='请选择结束时间' />
                    </Form.Item>
                    formItemList.push(END_TIME)
                }
                if (item.type === "city") {
                    const CITY = <Form.Item name={field} label={label} key={field} initialValue={initialValue}  >
                        <Select style={{ width: 100 }} placeholder={placeholder}>
                            {Utils.getOptionList(item.list)}
                        </Select>
                    </Form.Item>
                    formItemList.push(CITY)
                }
                if (item.type === "INPUT") {
                    const INPUT = <Form.Item name={field} label={label} key={field} initialValue={initialValue}>
                        <Input text="text" placeholder={placeholder} />
                    </Form.Item>
                    formItemList.push(INPUT)
                }
                if (item.type === "SELECT") {
                    const SELECT = <Form.Item name={field} label={label} key={field} initialValue={initialValue}>
                        <Select style={{ width: width }} placeholder={placeholder} >
                            {Utils.getOptionList(item.list)}
                        </Select>
                    </Form.Item>
                    formItemList.push(SELECT)
                }
                if (item.type === "DATEPICKER") {
                    const DATEPICKER = <Form.Item name={field} label={label} key={field} initialValue={initialValue}>
                        <DatePicker placeholder={placeholder} />
                    </Form.Item>
                    formItemList.push(DATEPICKER)
                }
                if (item.type === "CHECKBOX") {
                    const CHECKBOX =
                        <Form.Item
                            name={field}
                            label={label}
                            key={field}
                            initialValue={initialValue}
                            valuePropName="checked"
                        >
                            <Checkbox>
                                {label}
                            </Checkbox>
                        </Form.Item>
                    formItemList.push(CHECKBOX)
                }
            })
        }
        return formItemList
    }
    render() {
        return (
            <Form ref={c => this.myForm = c} layout="inline">
                {this.initFormList()}
                <Button
                    type="primary"
                    style={{ margin: "0px 20px" }}
                    onClick={this.handleFilterSubmit}
                >查询</Button>
                <Button onClick={this.reset}>重置</Button>
            </Form>
        );
    }
}
