import React from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, InputNumber } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const CreateClientPage = () => {

    const navigate = useNavigate();

    const onSubmit = (values) => {
        const request = {
            fullName: values.fullName,
            phone: values.phone.toString(),
            comment: values.comment
        }
        console.log(request);
        axios.defaults.baseURL = "http://localhost:5000/";
        axios.post("api/Workshop/clients", request).then(res => console.log({ res }));
        return navigate("/clients");
    };

    return (
        <div style={{ width: "100%" }}>
            <Form layout="horizontal" labelCol={{ span: 4 }} style={{ width: "100%", maxWidth: 500, margin: '10px 0' }} onFinish={onSubmit}>
                <Form.Item name="fullName" label="Full Name"
                    rules={[{ required: true, message: 'Please input clients full name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <InputNumber maxLength={12} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name="comment" label="Comment">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType='submit' style={{ width: "50%" }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CreateClientPage;