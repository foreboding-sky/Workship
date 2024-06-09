import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const CreateStorageItemPage = () => {

    const [itemTypes, setItemTypes] = useState([]);
    const [deviceTypes, setDeviceTypes] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            axios.defaults.baseURL = "http://localhost:5000/";
            const itemTypes = await axios.get("api/Workshop/items/types");
            setItemTypes(itemTypes.data);
            const deviceTypes = await axios.get("api/Workshop/devices/types");
            setDeviceTypes(deviceTypes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const navigate = useNavigate();

    const onSubmit = (values) => {
        const request = {
            item: {
                title: values.product_title,
                type: values.product_type,
                device: {
                    type: values.device_type,
                    brand: values.device_brand,
                    model: values.device_model
                },
            },
            price: values.price,
            quantity: values.quantity
        }
        console.log(request);
        axios.defaults.baseURL = "http://localhost:5000/";
        axios.post("api/Workshop/stock", request).then(res => console.log({ res }));
        return navigate("/storage");
    };

    const NavBack = () => {
        return navigate("/storage");
    };

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <div style={{ width: "100%" }}>
            <Form layout="horizontal" labelCol={{ span: 4 }} style={{ width: "100%", maxWidth: 600, margin: '10px 0' }} onFinish={onSubmit}>
                <Form.Item name="device_type" label="Device type" rules={[{ required: true, message: 'Device type is required' }]}>
                    <Select showSearch placeholder="Device Type">
                        {deviceTypes.map(deviceType => {
                            return <Select.Option filterOption={filterOption} key={deviceType} value={deviceType}>{deviceType}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="device_brand" label="Brand">
                    <Input />
                </Form.Item>
                <Form.Item name="device_model" label="Model">
                    <Input />
                </Form.Item>
                <Form.Item name="product_type" label="Product Type"
                    rules={[{ required: true, message: "Please input Product Type!" }]}>
                    <Select showSearch placeholder="Product Type">
                        {itemTypes && itemTypes.map(itemType => {
                            return <Select.Option filterOption={filterOption} key={itemType} value={itemType}>{itemType}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="product_title" label="Product Name"
                    rules={[{ required: true, message: "Please input Product Name!" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Price">
                    <Input />
                </Form.Item>
                <Form.Item name="quantity" label="Quantity">
                    <Input />
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

export default CreateStorageItemPage;