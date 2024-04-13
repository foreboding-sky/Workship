import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Space, Table, Button, Tag } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;

const StoragePage = () => {

    const [array, setArray] = useState([]);

    let navigate = useNavigate();
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
                <Button type="primary" style={{ margin: '10px 0' }}>
                    <Link to='/storage/create'>Add new product</Link>
                </Button>
            </div>
            <Table dataSource={array}>
                <Column title="Title" dataIndex="title" key="title" />
                <Column title="Product type" dataIndex="type" key="type" />
                <Column title="Device brand" dataIndex="brand" key="brand" />
                <Column title="Device model" dataIndex="model" key="model" />
                <Column title="Price" dataIndex="price" key="price" />
                <Column title="Quantity" dataIndex="quantity" key="quantity" />
            </Table >
        </div>
    );
}

export default StoragePage;