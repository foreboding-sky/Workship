import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Form, Input, DatePicker } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const CreateServicePage = () => {

    const onSubmit = (values) => {
        console.log({ values });
    }

    return (
        <div>
            <Form layout="horizontal" labelCol={{ span: 8 }} style={{ maxWidth: 500, margin: '10px 0' }} onFinish={onSubmit}>
                <Form.Item name="name" label="Name">
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Price">
                    <Input />
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

export default CreateServicePage;