import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, InputNumber } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const EditClientPage = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm(); // Define form instance
    let { clientId } = useParams();

    useEffect(() => {
        if (clientId)
            fetchData();
    }, [clientId])

    const [client, setClient] = useState({});

    const fetchData = async () => {
        try {
            axios.defaults.baseURL = "http://localhost:5000/";
            const clientDB = await axios.get("api/Workshop/clients/" + clientId);
            setClient(clientDB.data);
            form.setFieldsValue({
                fullName: clientDB.data.fullName,
                phone: clientDB.data.phone,
                comment: clientDB.data.comment
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const onSubmit = (values) => {
        const request = {
            id: clientId,
            fullName: values.fullName,
            phone: values.phone.toString(),
            comment: values.comment
        }
        console.log(request);
        axios.defaults.baseURL = "http://localhost:5000/";
        axios.post("api/Workshop/clients/" + clientId, request).then(res => console.log({ res }));
        return navigate("/clients");
    };

    const NavBack = () => {
        return navigate("/clients");
    };

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Form form={form} layout="horizontal" labelCol={{ span: 4 }} style={{ width: "100%", maxWidth: 500, margin: '10px 0' }} onFinish={onSubmit}>
                <Form.Item name="fullName" label="Full Name"
                    rules={[{ required: true, message: 'Please input clients full name!' }]}>
                    <Input placeholder={'Clients full name'} />
                </Form.Item>
                <Form.Item name="phone"
                    label="Phone"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <InputNumber placeholder={'Phone Number'} maxLength={12} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item style={{ display: "flex", justifyContent: 'end' }} name="comment" >
                    <TextArea style={{ width: 661 }} placeholder={'Comment'} rows={4} />
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

export default EditClientPage;