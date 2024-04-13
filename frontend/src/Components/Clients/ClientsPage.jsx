import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Space, Table, Button, Tag } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;

const ClientsPage = () => {

    const [array, setArray] = useState([]);

    let navigate = useNavigate();
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
                <Button type="primary" style={{ margin: '10px 0' }}>
                    <Link to='/clients/create'>Add new customer</Link>
                </Button>
            </div>
            <Table dataSource={array}>
                <Column title="Full Name" dataIndex="fullName" key="fullName" />
                <Column title="Phone" dataIndex="phone" key="phone" />
                <Column title="Comment" dataIndex="comment" key="comment" />
            </Table >
        </div>
    );
}

export default ClientsPage;