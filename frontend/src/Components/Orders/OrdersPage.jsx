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
        axios.get("api/Workshop/orders/unprocessed").then(res => {
            setArray(res.data);
            console.log(res.data);
        })
    }, [])


    const ChangeStatus = async (record) => {
        try {
            axios.defaults.baseURL = "http://localhost:5000/";
            console.log(record);
            let result = await axios.post("api/Workshop/orders/process/" + record.id);
            const newArray = array.filter(item => item.id !== result.id);
            console.log(newArray);
            setArray(newArray);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
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
            title: "Device",
            dataIndex: ["product"],
            key: "specialist",
            render: (record) => <p>{record.device.brand} {record.device.model}</p> //Display brand as "text" and model
        },
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
            width: 150,
            render: (_, record) => {
                return (<Button type="primary" block onClick={() => ChangeStatus(record)}>
                    Done
                </Button>)
            }
        },
        //{
        //     title: "Delete",
        //     dataIndex: "delete",
        //     key: "delete",
        //     width: 150,
        //     render: (_, record) => {
        //         return (<Button type="primary" block onClick={() => DeleteOrder(record)}>
        //             Delete
        //         </Button>)
        //     }
        //},
    ]

    return (
        <div style={{ margin: 10 }}>
            <Table dataSource={array} columns={columns} rowKey="id" style={{ minWidth: '900px' }} />
        </div>
    );
}

export default OrdersPage;