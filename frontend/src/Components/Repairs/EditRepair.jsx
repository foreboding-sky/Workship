import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Form, Input, DatePicker } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const EditRepairPage = () => {

    const onSubmit = (values) => {
        console.log({ values });
        // axios.post("/api/Orders", values)
        //     .then(res => res => { navigate('*') })
        //     .catch((error) => { console.log(error) });
    }

    return (
        <div>
            <Form layout="horizontal" labelCol={{ span: 8 }} style={{ maxWidth: 500, margin: '10px 0' }} onFinish={onSubmit}>
                <Form.Item name="status" label="Status"> {/*should be enum here */}
                    <Input />
                </Form.Item>
                <Form.Item name="specialist" label="Specialist">
                    <Input />
                </Form.Item>
                <Form.Item name="client" label="Client">
                    <Input />
                </Form.Item>
                <Form.Item name="device" label="Device">
                    <Input />
                </Form.Item>
                <Form.Item name="complaint" label="Complaint">
                    <Input />
                </Form.Item>
                {/* List of products should be here
                <Form.Item name="comment" label="Products">
                    <TextArea rows={4} />
                </Form.Item> */}
                {/* List of ordered products should be here
                <Form.Item name="comment" label="Ordered Products">
                    <TextArea rows={4} />
                </Form.Item> */}
                {/* List of  services should be here
                <Form.Item name="services" label="Services">
                    <TextArea rows={4} />
                </Form.Item> */}
                <Form.Item name="comment" label="Comment">
                    <Input />
                </Form.Item>
                <Form.Item name="discount" label="Discount">
                    <Input />
                </Form.Item>
            </Form>
        </div>
    );
}

export default EditRepairPage;