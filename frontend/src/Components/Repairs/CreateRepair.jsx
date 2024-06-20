import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, InputNumber, Space, Divider, Modal, DatePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from 'axios';

const { TextArea } = Input;

const CreateRepairPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm(); // Define form instance

    const [statuses, setStatuses] = useState([]);
    const [itemTypes, setItemTypes] = useState([]);
    const [deviceTypes, setDeviceTypes] = useState([]);
    const [clients, setClients] = useState([]);
    const [specialists, setSpecialists] = useState([]);
    const [stockItems, setStockItems] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedItemTypes, setSelectedItemTypes] = useState([]);

    //for adding new customer
    const clientNameRef = useRef(null);
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
            const specialists = await axios.get("api/Workshop/specialists");
            setSpecialists(specialists.data);
            const stockItems = await axios.get("api/Workshop/stock");
            setStockItems(stockItems.data);
            const services = await axios.get("api/Workshop/services");
            setServices(services.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const onClientNameChange = (event) => {
        setNewClientName(event.target.value);
    };

    const onItemTypeChange = (value, key) => { //for dynamic items filtering
        setSelectedItemTypes(prevDictionary => ({
            ...prevDictionary,
            [key]: form.getFieldsValue().products[key].product_type
        }));
    };

    const onItemTitleChange = (value, key) => {
        const selectedStockItem = stockItems.find(stockItem => stockItem.item.title === value);
        if (selectedStockItem) {
            const productType = selectedStockItem.item.type;
            const productPrice = selectedStockItem.price;
            const productId = selectedStockItem.id;
            const { products } = form.getFieldsValue();
            Object.assign(products[key], { product_type: productType, product_price: productPrice, product_id: productId })
            form.setFieldsValue({ products })
        }
    };

    const onServiceChange = (value, key) => {
        const selectedService = services.find(service => service.name === value);
        if (selectedService) {
            const servicePrice = selectedService.price;
            const serviceId = selectedService.id;
            const { services } = form.getFieldsValue();
            Object.assign(services[key], { service_price: servicePrice, service_id: serviceId })
            form.setFieldsValue({ services })
        }
    };

    const onSubmit = (values) => {
        const request = {
            user: '',
            specialist: {
                id: values.specialist.key,
                fullName: values.specialist.label
            },
            client: {
                id: values.client.key,
                fullName: values.client.label,
                phone: values.phone.toString()
            },
            device: {
                type: values.device_type,
                brand: values.device_brand,
                model: values.device_model
            },
            complaint: values.complaint,
            repairServices: values.services ? values.services.map(s => {
                return {
                    service: {
                        id: s.service_id,
                        name: s.service_name,
                        price: s.service_price
                    }
                }
            }) : [],
            products: values.products ? values.products.map(p => {
                return {
                    item: {
                        id: p.product_id,
                        item: {
                            title: p.product_title,
                            type: p.product_type,
                            device: {
                                type: values.device_type,
                                brand: values.device_brand,
                                model: values.device_model
                            },
                        },
                        price: p.product_price
                    }
                }
            }) : [],
            orderedProducts: values.ordered_products ? values.ordered_products.map(p => {
                return {
                    id: p.ordered_product_id,
                    product: {
                        title: p.ordered_product_title,
                        type: p.ordered_product_type,
                        device: {
                            type: values.device_type,
                            brand: values.device_brand,
                            model: values.device_model
                        },
                    },
                    price: p.ordered_product_price,
                    comment: p.ordered_product_comment,
                    dateEstimated: p.ordered_product_estimated_date ? p.ordered_product_estimated_date.format('YYYY-MM-DD') : null,
                    isProcessed: false
                }
            }) : [],
            comment: values.comment,
            discount: 0,
            totalPrice: 0,
            status: values.status
        }
        console.log(request);
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

    const addClient = (e) => {
        e.preventDefault();
        axios.defaults.baseURL = "http://localhost:5000/";
        axios.post("api/Workshop/clients", { FullName: newClientName })
            .then(res => setClients([...clients, res.data]));
        console.log(clients);
        setNewClientName('');
        setTimeout(() => {
            clientNameRef.current?.focus();
        }, 0);
    };

    const handleModalOk = () => {
        setModalVisible(false); // Close the modal
        navigate("/");
    };

    const handleClientSelect = (clientId) => {
        const selectedClient = clients.find(client => client.id === clientId);
        if (selectedClient)
            form.setFieldsValue({
                client: {
                    label: selectedClient.fullName, // Set client full name
                    key: selectedClient.id // Set client id
                },
                phone: selectedClient.phone
            });
    };

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const NavBack = () => {
        return navigate("/workshop");
    };

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Modal title="Server response" open={modalVisible} onOk={handleModalOk} onCancel={() => setModalVisible(false)}>
                <p>{modalContent}</p>
            </Modal>
            <Form form={form} layout="horizontal" labelCol={{ span: 4 }} style={{ width: "100%", maxWidth: 700, margin: '10px 0' }} onFinish={onSubmit}>
                <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Status is required' }]}>
                    <Select showSearch placeholder="Select status" style={{ textAlign: 'left' }}>
                        {statuses.map(status => {
                            return <Select.Option filterOption={filterOption} key={status} value={status}>{status}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="specialist" label="Specialist">
                    <Select showSearch placeholder="Select specialist" labelInValue style={{ textAlign: 'left' }}>
                        {specialists.map(specialist => {
                            return <Select.Option filterOption={filterOption} key={specialist.id} value={specialist.id}>{specialist.fullName}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="client" label="Client">
                    <Select placeholder="Client full name" style={{ textAlign: 'left' }}
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider style={{ margin: '8px 0', }} />
                                <Space style={{ padding: '0 8px 4px', }}>
                                    <Input
                                        placeholder="Please enter client"
                                        ref={clientNameRef}
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
                            key: client.id
                        }))}
                        onChange={handleClientSelect}
                    />
                </Form.Item>
                <Form.Item name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <InputNumber placeholder={'Phone Number'} maxLength={12} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name="device_type" label="Device type" rules={[{ required: true, message: 'Device type is required' }]}>
                    <Select showSearch placeholder="Device Type" style={{ textAlign: 'left' }}>
                        {deviceTypes.map(deviceType => {
                            return <Select.Option filterOption={filterOption} key={deviceType} value={deviceType}>{deviceType}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="device_brand" label="Brand">
                    <Input placeholder={'Brand'} />
                </Form.Item>
                <Form.Item name="device_model" label="Model">
                    <Input placeholder={'Model'} />
                </Form.Item>
                <Form.Item name="complaint" label="Complaint">
                    <Input placeholder={'Complaint'} />
                </Form.Item>
                <p>Add Services</p>
                <Form.List name="services">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key}
                                    style={{
                                        display: "flex", marginBottom: "8px", justifyContent: 'space-between',
                                        alignItems: "center", gap: "5px", height: "32px", width: "100%"
                                    }}>
                                    <MinusCircleOutlined onClick={() => remove(name)} style={{ margin: "0 10px" }} />
                                    <div style={{
                                        display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
                                        gridTemplateRows: "1fr", justifyContent: 'center', height: "100%", width: "100%"
                                    }}>
                                        <Form.Item {...restField} name={[name, "service_name"]} style={{ margin: "0 5px 0 0" }} rules={fields.length > 0 ? [{ required: true, message: 'Service name is required' }] : []}>
                                            <Select placeholder="Service name" onSelect={value => onServiceChange(value, key)} style={{ textAlign: 'left' }}>
                                                {services &&
                                                    services.map((service) => {
                                                        return <Select.Option filterOption={filterOption}
                                                            key={service.id}
                                                            value={service.name}>
                                                            {service.name}
                                                        </Select.Option>
                                                    })}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, "service_price"]}>
                                            <Input placeholder="Service Price" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'service_id']} style={{ display: 'none' }} >
                                            <Input />
                                        </Form.Item>
                                    </div>
                                </div>
                            ))}
                            <Form.Item style={{ display: "flex", justifyContent: 'end' }}>
                                <Button style={{ width: '661px' }} type="dashed" onClick={add} block icon={<PlusOutlined />}>
                                    Add service
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <p>Add Products</p>
                <Form.List name="products">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key}
                                    style={{
                                        display: "flex", marginBottom: "8px", justifyContent: 'space-between',
                                        alignItems: "center", gap: "5px", height: "32px", width: "100%"
                                    }}>
                                    <MinusCircleOutlined onClick={() => remove(name)} style={{ margin: "0 10px" }} />
                                    <div style={{
                                        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                                        gridTemplateRows: "1fr", justifyContent: 'center', height: "100%", width: "100%"
                                    }}>
                                        <Form.Item {...restField} name={[name, "product_type"]} style={{ margin: "0 5px 0 0" }} rules={fields.length > 0 ? [{ required: true, message: 'Item type is required' }] : []}>
                                            <Select showSearch placeholder="Product Type" onSelect={value => onItemTypeChange(value, key)} style={{ textAlign: 'left' }}>
                                                {itemTypes && itemTypes.map(itemType => {
                                                    return <Select.Option filterOption={filterOption}
                                                        key={itemType}
                                                        value={itemType}>
                                                        {itemType}
                                                    </Select.Option>
                                                })}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, "product_title"]} style={{ margin: "0 5px 0 0" }} rules={fields.length > 0 ? [{ required: true, message: 'Item title is required' }] : []}>
                                            <Select showSearch placeholder="Product Title" onSelect={value => onItemTitleChange(value, key)} style={{ textAlign: 'left' }}>
                                                {stockItems &&
                                                    stockItems.filter(stockItem => stockItem.item.type === selectedItemTypes[key] || selectedItemTypes[key] === undefined)
                                                        .map((stockItem) => {
                                                            return <Select.Option filterOption={filterOption}
                                                                key={stockItem.id}
                                                                value={stockItem.item.title}>
                                                                {stockItem.item.title}
                                                            </Select.Option>
                                                        })}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, "product_price"]}>
                                            <Input placeholder="Product Price" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'product_id']} style={{ display: 'none' }} >
                                            <Input />
                                        </Form.Item>
                                    </div>
                                </div>
                            ))}
                            <Form.Item style={{ display: "flex", justifyContent: 'end' }}>
                                <Button style={{ width: '661px' }} type="dashed" onClick={add} block icon={<PlusOutlined />}>
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
                                        alignItems: "center", gap: "5px", height: "32px", width: "100%"
                                    }}>
                                    <MinusCircleOutlined onClick={() => remove(name)} style={{ margin: "0 10px" }} />
                                    <div style={{
                                        display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
                                        gridTemplateRows: "1fr", justifyContent: 'center', height: "100%", width: "100%"
                                    }}>
                                        <Form.Item {...restField} name={[name, "ordered_product_type"]} style={{ margin: "0 5px 0 0" }} rules={fields.length > 0 ? [{ required: true, message: 'Item type is required' }] : []}>
                                            <Select showSearch placeholder="Product Type" style={{ textAlign: 'left' }}>
                                                {itemTypes && itemTypes.map(itemType => {
                                                    return <Select.Option filterOption={filterOption} key={itemType} value={itemType}>{itemType}</Select.Option>
                                                })}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, "ordered_product_title"]} style={{ margin: "0 5px 0 0" }}>
                                            <Input placeholder="Product Title" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, "ordered_product_price"]} style={{ margin: "0 5px 0 0" }}>
                                            <InputNumber placeholder="Product Price" style={{ width: "100%" }} />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, "ordered_product_comment"]} style={{ margin: "0 5px 0 0" }}>
                                            <Input placeholder="Comment" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, "ordered_product_estimated_date"]}>
                                            <DatePicker placeholder="Estimated date" />
                                        </Form.Item>
                                        <Form.Item {...restField} name={[name, 'ordered_product_id']} style={{ display: 'none' }} >
                                            <Input />
                                        </Form.Item>
                                    </div>
                                </div>
                            ))}
                            <Form.Item style={{ display: "flex", justifyContent: 'end' }}>
                                <Button style={{ width: '661px' }} type="dashed" onClick={add} block icon={<PlusOutlined />}>
                                    Add ordered item
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item style={{ display: "flex", justifyContent: 'end' }} name="comment" >
                    <TextArea style={{ width: 661 }} placeholder={'Comment'} rows={4} />
                </Form.Item>
                <div style={{ display: 'flex', width: '100%', justifyContent: "flex-end", gap: '10px' }}>
                    <Form.Item>
                        <Button type="primary" htmlType='submit' style={{ width: "325px" }}>
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" block style={{ width: "325px", backgroundColor: '#d9534f', color: 'white' }} onClick={() => NavBack()}>
                            Cancel
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
}

export default CreateRepairPage;
