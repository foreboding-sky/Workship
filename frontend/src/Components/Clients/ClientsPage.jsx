import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Table, Button } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;

const ClientsPage = () => {
    useEffect(() => {
        fetchData();
    }, [])

    const [array, setArray] = useState([]);

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            axios.defaults.baseURL = "http://localhost:5000/";
            const clients = await axios.get("api/Workshop/clients");
            setArray(clients.data);
            console.log(clients.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const DeleteClient = async (record) => {
        try {
            axios.defaults.baseURL = "http://localhost:5000/";
            console.log(record);
            await axios.delete("api/Workshop/clients/" + record.id);
            const newArray = array.filter(item => item.id !== record.id);
            console.log(newArray);
            setArray(newArray);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const EditClient = async (record) => {
        return navigate(`/clients/edit/${record.id}`);
    };

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
        },
        {
            title: "Edit",
            dataIndex: "edit",
            key: "edit",
            render: (_, record) => {
                return (<Button type="primary" block onClick={() => EditClient(record)}>
                    Edit
                </Button>)
            }
        },
        {
            title: "Delete",
            dataIndex: "delete",
            key: "delete",
            render: (_, record) => {
                return (<Button type="primary" block onClick={() => DeleteClient(record)}>
                    Delete
                </Button>)
            }
        }
    ]
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
                <Button type="primary" style={{ margin: '10px 0' }}>
                    <Link to='/clients/create'>Add new client</Link>
                </Button>
            </div>
            <Table dataSource={array} columns={columns} rowKey="id" />
        </div>
    );
}

export default ClientsPage;