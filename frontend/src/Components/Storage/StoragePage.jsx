import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Space, Table, Button, Tag } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;

const StoragePage = () => {
    useEffect(() => {
        console.log("useEffect on StoragePage");
        axios.get("api/Workshop/stock").then(res => {
            setArray(res.data);
            console.log(res.data);
        })
    }, [])

    const [array, setArray] = useState([]);

    const columns = [
        {
            title: "Type",
            dataIndex: ["item", "type"],
            key: "type",
            render: type => type
        },
        {
            title: "Device brand",
            dataIndex: ["item", "device", "brand"],
            key: "brand",
            render: brand => brand
        },
        {
            title: "Device model",
            dataIndex: ["item", "device", "model"],
            key: "model",
            render: model => model
        },
        {
            title: "Title",
            dataIndex: ["item", "title"],
            key: "title",
            render: title => title
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: price => price
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            render: quantity => quantity
        }
    ]
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
                <Button type="primary" style={{ margin: '10px 0' }}>
                    <Link to='/storage'>Add new product</Link> {/*TODO HERE */}
                </Button>
            </div>
            <Table dataSource={array} columns={columns} rowKey="id" />
        </div>
    );
}

export default StoragePage;