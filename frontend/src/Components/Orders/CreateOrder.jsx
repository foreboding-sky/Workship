import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Form, Input, DatePicker } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const OrdersPage = () => {

    const [array, setArray] = useState([]);

    const ChangeStatus = (record) => {
        axios.post("/api/Orders/" + record.id).then(res => {
            let newArray = array.filter(order => { return order.id !== record.id; });
            setArray(newArray);
        })
    };

    const DeleteOrder = (record) => {
        axios.delete("/api/Orders/" + record.id).then(res => {
            let newArray = array.filter(order => { return order.id !== record.id; });
            setArray(newArray);
        })
    };

    return (
        <div>
            <Form layout="horizontal" labelCol={{ span: 8 }} style={{ maxWidth: 500, margin: '10px 0' }}>
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
                <Form.Item name="date" label="Date ordered">
                    <DatePicker />
                </Form.Item>
                <Form.Item name="date" label="Estimated delivery date">
                    <DatePicker />
                </Form.Item>
            </Form>
        </div>
    );
}

export default OrdersPage;