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

    return (
        <div style={{ width: "100%" }}>
            <Form layout="horizontal" labelCol={{ span: 4 }} style={{ maxWidth: 500, margin: '10px 0' }} onFinish={onSubmit}>
                <Form.Item name="name" label="Name">
                    <Input />
                </Form.Item>
                <Form.Item name="price"
                    label="Price"
                    rules={[{ required: true, message: 'Please input price of provided service!' }]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name="submit" >
                    <Button Type="primary" htmlType='submit' style={{ width: "50%" }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CreateServicePage;