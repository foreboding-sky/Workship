import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from 'axios';

const { TextArea } = Input;

const CreateRepairPage = () => {

    useEffect(() => {
        console.log("useEffect on CreateRepairPage");
        axios.defaults.baseURL = "http://localhost:5000/"
        axios.get("api/Workshop/repairs/statuses").then(res => {
            setStatuses(res.data);
            console.log(res.data);
        });
        axios.get("api/Workshop/items/types").then(res => {
            setItemTypes(res.data);
            console.log(res.data);
        });
    }, [])


    const [statuses, setStatuses] = useState([]);
    const [itemTypes, setItemTypes] = useState([]);

    const onSubmit = (values) => {
        const request = {
            user: '',
            specialist: values.specialist,
            client: {
                fullName: values.client,
                phone: values.phone
            },
            device: {
                type: values.device_type,
                brand: values.device_brand,
                model: values.device_model
            },
            complaint: values.complaint,
            products: values.products.map(p => {
                return {
                    item: {
                        type: p.title,
                        device: {
                            type: values.device_type,
                            brand: values.device_brand,
                            model: values.device_model
                        },
                    },
                    price: p.product_price,
                    quantity: p.product_quantity
                }
            }),
            comment: values.comment,
            discount: '',
            totalPrice: 0,
            status: values.status
        }
        console.log({ values });
        console.log({ request });
    };

    return (
        <div style={{ width: "100%" }}>
            <Form layout="horizontal" labelCol={{ span: 4 }} style={{ width: "100%", maxWidth: 700, margin: '10px 0' }} onFinish={onSubmit}>
                <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Status is required' }]}>
                    <Select>
                        {statuses.map(status => {
                            return <Select.Option key={status} value={status}>{status}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="specialist" label="Specialist">
                    <Input />
                </Form.Item>
                <Form.Item name="client" label="Client">
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Phone">
                    <Input />
                </Form.Item>
                <Form.Item name="device_type" label="Device type">
                    <Input />
                </Form.Item>
                <Form.Item name="device_brand" label="Brand">
                    <Input />
                </Form.Item>
                <Form.Item name="device_model" label="Model">
                    <Input />
                </Form.Item>
                <Form.Item name="complaint" label="Complaint">
                    <Input />
                </Form.Item>
                {/* List of products should be here
                <Form.Item name="comment" label="Products">
                    <TextArea rows={4} />
                </Form.Item> */}
                <p>Add Products</p>
                <Form.List name="products">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key}
                                    style={{
                                        display: "flex", marginBottom: "8px", justifyContent: 'space-between',
                                        alignItems: "center", gap: "5px", height: "fit-content", width: "100%"
                                    }}>
                                    <div style={{
                                        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
                                        gridTemplateRows: "1fr", justifyContent: 'center', height: "100%", width: "100%"
                                    }}>
                                        <Form.Item {...restField} name={[name, "product_type"]} style={{ margin: "0 5px 0 0" }} rules={[{ required: true, message: 'Status is required' }]}>
                                            <Select placeholder="Product Type">
                                                {itemTypes.map(itemType => {
                                                    return <Select.Option key={itemType} value={itemType}>{itemType}</Select.Option>
                                                })}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, "product_title"]} style={{ margin: "0 5px 0 0" }}>
                                            <Input placeholder="Product Title" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, "product_quantity"]} style={{ margin: "0 5px 0 0" }}>
                                            <Input placeholder="Product Quantity" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, "product_price"]}>
                                            <Input placeholder="Product Price" />
                                        </Form.Item>
                                    </div>
                                    <MinusCircleOutlined onClick={() => remove(name)} style={{ margin: "0 10px" }} />
                                </div>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={add} block icon={<PlusOutlined />}>
                                    Add item
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                {/* List of ordered products should be here
                <Form.Item name="comment" label="Ordered Products">
                    <TextArea rows={4} />
                </Form.Item> */}
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

export default CreateRepairPage;