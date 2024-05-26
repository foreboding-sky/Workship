import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, InputNumber, Space, Divider, Modal, DatePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from 'axios';

const { TextArea } = Input;

const CreateRepairPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm(); // Define form instance

    const [statuses, setStatuses] = useState([]);
    const [itemTypes, setItemTypes] = useState([]);
    const [deviceTypes, setDeviceTypes] = useState([]);
    const [clients, setClients] = useState([]);
    const [stockItems, setStockItems] = useState([]);
    const [stockItemsTitles, setStockItemsTitles] = useState([]);

    //for adding new customer
    const inputRef = useRef(null);
    const [newClientName, setNewClientName] = useState('');

    //modal
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const fetchData = async () => {
        try {
            axios.defaults.baseURL = "http://localhost:5000/";
            const statuses = await axios.get("api/Workshop/repairs/statuses");
            setStatuses(statuses.data);
            const itemTypes = await axios.get("api/Workshop/items/types");
            setItemTypes(itemTypes.data);
            const deviceTypes = await axios.get("api/Workshop/devices/types");
            setDeviceTypes(deviceTypes.data);
            const clients = await axios.get("api/Workshop/clients");
            setClients(clients.data);
            const stockItems = await axios.get("api/Workshop/stock");
            setStockItems(stockItems.data);
            const stockItemsTitles = stockItems.data.map(item => item.item.title);
            setStockItemsTitles(stockItemsTitles);
            console.log(stockItemsTitles);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const onClientNameChange = (event) => {
        setNewClientName(event.target.value);
    };

    const addClient = (e) => {
        e.preventDefault();
        axios.defaults.baseURL = "http://localhost:5000/";
        axios.post("api/Workshop/clients", { FullName: newClientName })
            .then(res => setClients([...clients, res.data]));
        console.log(clients);
        setNewClientName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const onSubmit = (values) => {
        const request = {
            user: '',
            specialist: values.specialist,
            client: {
                id: values.client,
                phone: values.phone.toString()
            },
            device: {
                type: values.device_type,
                brand: values.device_brand,
                model: values.device_model
            },
            complaint: values.complaint,
            products: values.products ? values.products.map(p => {
                return {
                    item: {
                        title: p.product_title,
                        type: p.product_type,
                        device: {
                            type: values.device_type,
                            brand: values.device_brand,
                            model: values.device_model
                        },
                    },
                    price: p.product_price,
                    quantity: p.product_quantity
                }
            }) : [],
            orderedProducts: values.ordered_products ? values.ordered_products.map(p => {
                return {
                    item: {
                        title: p.ordered_product_title,
                        type: p.ordered_product_type,
                        device: {
                            type: values.device_type,
                            brand: values.device_brand,
                            model: values.device_model
                        },
                    },
                    price: p.ordered_product_price,
                    comment: p.ordered_product_comment
                }
            }) : [],
            comment: values.comment,
            discount: 0,
            totalPrice: 0,
            status: values.status
        }
        axios.post("api/Workshop/repairs", request).then(res => {
            console.log(res);
            setModalContent('Data saved succesfully'); // Set modal content to success message
            setModalVisible(true); // Show the modal
        }).catch(error => {
            console.error(error);
            setModalContent('An error occured, data was not saved'); // Set modal content to error message
            setModalVisible(true); // Show the modal
        });
    };

    const handleModalOk = () => {
        setModalVisible(false); // Close the modal
        navigate("/");
    };

    const handleClientSelect = (clientId) => {
        const selectedClient = clients.find(client => client.id === clientId);
        if (selectedClient)
            form.setFieldsValue({ phone: selectedClient.phone });
    };

    const handleItemSelect = (itemId) => {

    }

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div style={{ width: "100%" }}>
            <Modal title="Server response" open={modalVisible} onOk={handleModalOk} onCancel={() => setModalVisible(false)}>
                <p>{modalContent}</p>
            </Modal>
            <Form form={form} layout="horizontal" labelCol={{ span: 4 }} style={{ width: "100%", maxWidth: 700, margin: '10px 0' }} onFinish={onSubmit}>
                <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Status is required' }]}>
                    <Select showSearch placeholder="Select status">
                        {statuses.map(status => {
                            return <Select.Option filterOption={filterOption} key={status} value={status}>{status}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="specialist" label="Specialist">
                    <Input />
                </Form.Item>
                <Form.Item name="client" label="Client">
                    <Select placeholder="Client full name"
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider style={{ margin: '8px 0', }} />
                                <Space style={{ padding: '0 8px 4px', }}>
                                    <Input
                                        placeholder="Please enter item"
                                        ref={inputRef}
                                        value={newClientName}
                                        onChange={onClientNameChange}
                                        onKeyDown={(e) => e.stopPropagation()} />
                                    <Button type="text" icon={<PlusOutlined />} onClick={addClient}>
                                        Add item
                                    </Button>
                                </Space>
                            </>
                        )}
                        options={clients.map((client) => ({
                            label: client.fullName,
                            value: client.id,
                        }))}
                        onChange={handleClientSelect}
                    />
                </Form.Item>
                <Form.Item name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <InputNumber maxLength={12} style={{ width: "100%" }} />
                </Form.Item>
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
                                        <Form.Item {...restField} name={[name, "product_type"]} style={{ margin: "0 5px 0 0" }} rules={fields.length > 0 ? [{ required: true, message: 'Item type is required' }] : []}>
                                            <Select showSearch placeholder="Product Type">
                                                {itemTypes && itemTypes.map(itemType => {
                                                    return <Select.Option filterOption={filterOption} key={itemType} value={itemType}>{itemType}</Select.Option>
                                                })}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, "product_title"]} style={{ margin: "0 5px 0 0" }} rules={fields.length > 0 ? [{ required: true, message: 'Item title is required' }] : []}>
                                            <Select showSearch placeholder="Product Type">
                                                {stockItemsTitles && stockItemsTitles.map(itemTitle => {
                                                    return <Select.Option filterOption={filterOption} key={itemTitle} value={itemTitle}>{itemTitle}</Select.Option>
                                                })}
                                            </Select>
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
                <p>Add Ordered Products</p>
                <Form.List name="ordered_products">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key}
                                    style={{
                                        display: "flex", marginBottom: "8px", justifyContent: 'space-between',
                                        alignItems: "center", gap: "5px", height: "fit-content", width: "100%"
                                    }}>
                                    <div style={{
                                        display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
                                        gridTemplateRows: "1fr", justifyContent: 'center', height: "100%", width: "100%"
                                    }}>
                                        <Form.Item {...restField} name={[name, "ordered_product_type"]} style={{ margin: "0 5px 0 0" }} rules={fields.length > 0 ? [{ required: true, message: 'Item type is required' }] : []}>
                                            <Select showSearch placeholder="Product Type">
                                                {itemTypes && itemTypes.map(itemType => {
                                                    return <Select.Option filterOption={filterOption} key={itemType} value={itemType}>{itemType}</Select.Option>
                                                })}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, "ordered_product_title"]} style={{ margin: "0 5px 0 0" }}>
                                            <Input placeholder="Product Title" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, "ordered_product_price"]} style={{ margin: "0 5px 0 0" }}>
                                            <Input placeholder="Product Price" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, "ordered_product_comment"]} style={{ margin: "0 5px 0 0" }}>
                                            <Input placeholder="Comment" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, "ordered_product_estimated_date"]}>
                                            <DatePicker placeholder="Estimated date" />
                                        </Form.Item>
                                    </div>
                                    <MinusCircleOutlined onClick={() => remove(name)} style={{ margin: "0 10px" }} />
                                </div>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={add} block icon={<PlusOutlined />}>
                                    Add ordered item
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
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