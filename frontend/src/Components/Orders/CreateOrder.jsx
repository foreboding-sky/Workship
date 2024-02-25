import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Form, Input, DatePicker } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const OrdersPage = () => {

    const onSubmit = (values) => {
        console.log({ values });
        // axios.post("/api/Orders", values)
        //     .then(res => res => { navigate('*') })
        //     .catch((error) => { console.log(error) });
    }

    return (
        <div>
            <Form layout="horizontal" labelCol={{ span: 8 }} style={{ maxWidth: 500, margin: '10px 0' }} onFinish={onSubmit}>
                <Form.Item name="market" label="Market">
                    <Input />
                </Form.Item>
                <Form.Item name="client" label="Client">
                    <Input />
                </Form.Item>
                <Form.Item name="device" label="Device">
                    <Input />
                </Form.Item>
                <Form.Item name="product" label="Product">
                    <Input />
                </Form.Item>
                <Form.Item name="comment" label="Comment">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item name="date_ordered" label="Date ordered">
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name="date_estimated" label="Estimated delivery date">
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name="date" >
                    <Button Type="primary" htmlType='submit' style={{ width: "50%" }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default OrdersPage;