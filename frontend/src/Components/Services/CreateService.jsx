import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, InputNumber } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const CreateServicePage = () => {

    const navigate = useNavigate();

    const onSubmit = (values) => {
        const request = {
            Name: values.name,
            price: values.price
        }
        console.log(request);
        axios.defaults.baseURL = "http://localhost:5000/";
        axios.post("api/Workshop/services", request).then(res => console.log({ res }));
        return navigate("/services");
    };

    const NavBack = () => {
        return navigate("/services");
    };

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Form layout="horizontal" labelCol={{ span: 4 }} style={{ width: "100%", maxWidth: 500, margin: '10px 0' }} onFinish={onSubmit}>
                <Form.Item name="name" label="Name"
                    rules={[{ required: true, message: 'Please input service name!' }]}>
                    <Input placeholder={'Service name'} />
                </Form.Item>
                <Form.Item name="price" label="Price"
                    rules={[{ required: true, message: 'Please input service price!' }]}
                >
                    <InputNumber placeholder={'Price'} style={{ width: "100%" }} />
                </Form.Item>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '10px' }}>
                    <Form.Item>
                        <Button type="primary" htmlType='submit' style={{ width: "100%" }}>
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" block style={{ width: "100%", backgroundColor: '#d9534f', color: 'white' }} onClick={() => NavBack()}>
                            Cancel
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
}

export default CreateServicePage;