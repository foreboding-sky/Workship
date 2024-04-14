import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Space, Table, Button, Tag } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;

const ClientsPage = () => {
    useEffect(() => {
        console.log("useEffect on ClientsPage");
        axios.get("api/Workshop/clients").then(res => {
            setArray(res.data);
            console.log(res.data);
        })
    }, [])

    const [array, setArray] = useState([]);

    const columns = [
        {
            title: "Full Name",
            dataIndex: "fullName",
            key: "fullName",
            render: fullName => fullName
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            render: phone => phone
        },
        {
            title: "Comment",
            dataIndex: "comment",
            key: "comment",
            render: comment => comment
        }
    ]
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
                <Button type="primary" style={{ margin: '10px 0' }}>
                    <Link to='/clients/create'>Add new customer</Link>
                </Button>
            </div>
            <Table dataSource={array} columns={columns} />
        </div>
    );
}

export default ClientsPage;