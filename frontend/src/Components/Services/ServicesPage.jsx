import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Space, Table, Button, Tag } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;

const ServicesPage = () => {

    const [array, setArray] = useState([]);


    const DeleteService = (record) => {
        //delete
    };

    let navigate = useNavigate();
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
                <Button type="primary" style={{ margin: '10px 0' }}>
                    <Link to='/services/create'>Add new service</Link>
                </Button>
            </div>
            <Table dataSource={array}>
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Price" dataIndex="price" key="price" />
                <Column
                    title="Delete"
                    key="action"
                    width={"200px"}
                    render={(_, record) => {
                        console.log(record.product);
                        return (<Button type="primary" block onClick={() => DeleteService(record)}>
                            Delete
                        </Button>)
                    }} />
            </Table >
        </div>
    );
}

export default ServicesPage;