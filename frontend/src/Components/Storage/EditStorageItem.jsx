import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';

const EditStorageItemPage = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm(); // Define form instance
    let { storageItemId } = useParams();

    const [itemTypes, setItemTypes] = useState([]);
    const [deviceTypes, setDeviceTypes] = useState([]);

    useEffect(() => {
        if (storageItemId)
            fetchData();
    }, [storageItemId])

    const [storageItem, setStorageItem] = useState({});

    const fetchData = async () => {
        try {
            axios.defaults.baseURL = "http://localhost:5000/";
            const itemTypes = await axios.get("api/Workshop/items/types");
            setItemTypes(itemTypes.data);
            const deviceTypes = await axios.get("api/Workshop/devices/types");
            setDeviceTypes(deviceTypes.data);
            const itemDB = await axios.get("api/Workshop/stock/" + storageItemId);
            setStorageItem(itemDB.data);
            form.setFieldsValue({
                product_title: itemDB.data.item.title,
                product_type: itemDB.data.item.type,
                device_type: itemDB.data.item.device.type,
                device_brand: itemDB.data.item.device.brand,
                device_model: itemDB.data.item.device.model,
                price: itemDB.data.price,
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const onSubmit = (values) => {
        const request = {
            id: storageItemId,
            item: {
                id: storageItem.item.id,
                title: values.product_title,
                type: values.product_type,
                device: {
                    id: storageItem.item.device.id,
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
        axios.post("api/Workshop/stock/" + storageItemId, request).then(res => console.log({ res }));
        return navigate("/storage");
    };

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const NavBack = () => {
        return navigate("/storage");
    };

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Form form={form} layout="horizontal" labelCol={{ span: 4 }} style={{ width: "100%", maxWidth: 600, margin: '10px 0' }} onFinish={onSubmit}>
                <Form.Item name="device_type" label="Device type" rules={[{ required: true, message: 'Device type is required' }]}>
                    <Select showSearch placeholder="Device Type" style={{ textAlign: 'left' }}>
                        {deviceTypes.map(deviceType => {
                            return <Select.Option filterOption={filterOption} key={deviceType} value={deviceType}>{deviceType}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="device_brand" label="Brand">
                    <Input placeholder={'Device brand'} />
                </Form.Item>
                <Form.Item name="device_model" label="Model">
                    <Input placeholder={'Device model'} />
                </Form.Item>
                <Form.Item name="product_type" label="Product Type"
                    rules={[{ required: true, message: "Please input Product Type!" }]}>
                    <Select showSearch placeholder="Product Type" style={{ textAlign: 'left' }}>
                        {itemTypes && itemTypes.map(itemType => {
                            return <Select.Option filterOption={filterOption} key={itemType} value={itemType}>{itemType}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="product_title" label="Name"
                    rules={[{ required: true, message: "Please input Product Name!" }]}>
                    <Input placeholder={'Product name'} />
                </Form.Item>
                <Form.Item name="price" label="Price">
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

export default EditStorageItemPage;