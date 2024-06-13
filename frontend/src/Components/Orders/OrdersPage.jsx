import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Space, Table, Button, Tag } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

const { Column, ColumnGroup } = Table;

const OrdersPage = () => {

    const [array, setArray] = useState([]);

    useEffect(() => {
        console.log("useEffect on OrdersPage");
        axios.get("api/Workshop/orders").then(res => {
            setArray(res.data);
            console.log(res.data);
        })
    }, [])


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
        // {
        //     title: "Market",
        //     dataIndex: "market",
        //     key: "market",
        //     render: market => market
        // },
        {
            title: "Device",
            dataIndex: ["product"],
            key: "specialist",
            render: (record) => <p>{record.device.brand} {record.device.model}</p> //Display brand as "text" and model
        },
        // {
        //     title: "Client",
        //     dataIndex: ["client", "fullName"],
        //     key: "client",
        //     render: client => client //Display client's fullname
        // },
        {
            title: "Product", //TODO HERE
            dataIndex: ["product", "title"],
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
            title: "Est. Date",
            dataIndex: "dateEstimated",
            key: "date",
            render: date => dayjs(date).format('YYYY-MM-DD')

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