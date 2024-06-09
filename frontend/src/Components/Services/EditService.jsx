import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, InputNumber } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const EditSpecialistPage = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm(); // Define form instance
    let { serviceId } = useParams();

    useEffect(() => {
        if (serviceId)
            fetchData();
    }, [serviceId])

    const [service, setService] = useState({}); //just in case needed in future

    const fetchData = async () => {
        try {
            axios.defaults.baseURL = "http://localhost:5000/";
            const serviceDB = await axios.get("api/Workshop/services/" + serviceId);
            setService(serviceDB.data);
            form.setFieldsValue({
                name: serviceDB.data.name,
                price: serviceDB.data.price
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const onSubmit = (values) => {
        const request = {
            id: serviceId,
            name: values.name,
            price: values.price.toString()
        }
        console.log(request);
        axios.defaults.baseURL = "http://localhost:5000/";
        axios.post("api/Workshop/services/" + serviceId, request).then(res => console.log({ res }));
        return navigate("/services");
    };

    const NavBack = () => {
        return navigate("/services");
    };

    return (
        <div style={{ width: "100%" }}>
            <Form form={form} layout="horizontal" labelCol={{ span: 4 }} style={{ maxWidth: 500, margin: '10px 0' }} onFinish={onSubmit}>
                <Form.Item name="name" label="Name">
                    <Input />
                </Form.Item>
                <Form.Item name="price"
                    label="Price"
                    rules={[{ required: true, message: 'Please input price of provided service!' }]}
                >
                    <InputNumber style={{ width: "100%" }} />
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

export default EditSpecialistPage;