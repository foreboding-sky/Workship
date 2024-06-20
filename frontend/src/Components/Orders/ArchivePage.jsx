import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Space, Table, Button, Tag } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

const { Column, ColumnGroup } = Table;

const ArchivePage = () => {

    const [array, setArray] = useState([]);

    useEffect(() => {
        console.log("useEffect on OrdersPage");
        axios.get("api/Workshop/orders/processed").then(res => {
            setArray(res.data);
            console.log(res.data);
        })
    }, [])

    const columns = [
        {
            title: "Device",
            dataIndex: ["product"],
            key: "specialist",
            render: (record) => <p>{record.device.brand} {record.device.model}</p> //Display brand as "text" and model
        },
        {
            title: "Product",
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
        }
    ]

    return (
        <div style={{ margin: 10 }}>
            <Table dataSource={array} columns={columns} rowKey="id" style={{ minWidth: '900px' }} />
        </div>
    );
}

export default ArchivePage;