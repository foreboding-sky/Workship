import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Space, Table, Button, Tag } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;

const OrdersPage = () => {

    useEffect(() => {
        console.log("useEffect on OrdersPage");
        axios.get("api/Workshop/orders").then(res => {
            setArray(res.data);
            console.log(res.data);
        })
    }, [])
    const [array, setArray] = useState([]);

    const ChangeStatus = (record) => {
        //change order status
    };

    const DeleteOrder = async (record) => {
        try {
            axios.defaults.baseURL = "http://localhost:5000/";
            console.log(record);
            await axios.delete("api/Workshop/orders/" + record.id);
            const newArray = array.filter(item => item.id !== record.id);
            console.log(newArray);
            setArray(newArray);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const columns = [
        {
            title: "User",
            dataIndex: "user",
            key: "user",
            render: user => user
        },
        {
            title: "Market",
            dataIndex: "market",
            key: "market",
            render: market => market
        },
        {
            title: "Device",
            dataIndex: ["device", "brand"],
            key: "specialist",
            render: (text, record) => <p>{text} {record.device.model}</p>
        },
        {
            title: "Client",
            dataIndex: ["client", "fullName"],
            key: "client",
            render: client => client
        },
        {
            title: "Product", //TODO HERE
            dataIndex: "product",
            key: "product",
            render: product => product
        },
        {
            title: "Comment",
            dataIndex: "comment",
            key: "comment",
            render: comment => comment
        },
        {
            title: "Est. Date", //TODO HERE
            dataIndex: "date",
            key: "date",
            render: date => date
        },
        {
            title: "Change status", //TODO HERE
            dataIndex: "status",
            key: "status",
            render: (_, record) => {
                return (<Button type="primary" block onClick={() => ChangeStatus(record)}>
                    Edit
                </Button>)
            }
        },
        {
            title: "Delete", //TODO HERE
            dataIndex: "delete",
            key: "delete",
            render: (_, record) => {
                return (<Button type="primary" block onClick={() => DeleteOrder(record)}>
                    Delete
                </Button>)
            }
        },
    ]

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
                <Button type="primary" style={{ margin: '10px 0' }}>
                    <Link to='/orders/create'>Add new order</Link>
                </Button>
            </div>
            <Table dataSource={array} columns={columns} rowKey="id" />
        </div>
    );
}

export default OrdersPage;