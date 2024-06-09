import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Space, Table, Button, Tag } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;

const ServicesPage = () => {
    let navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [])

    const [array, setArray] = useState([]);

    const fetchData = async () => {
        try {
            axios.defaults.baseURL = "http://localhost:5000/";
            const services = await axios.get("api/Workshop/services");
            setArray(services.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const DeleteService = async (record) => {
        try {
            axios.defaults.baseURL = "http://localhost:5000/";
            console.log(record);
            await axios.delete("api/Workshop/services/" + record.id);
            const newArray = array.filter(item => item.id !== record.id);
            console.log(newArray);
            setArray(newArray);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const EditService = async (record) => {
        return navigate(`/services/edit/${record.id}`);
    };


    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: name => name
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: price => price
        },
        {
            title: "Edit",
            dataIndex: "edit",
            key: "edit",
            render: (_, record) => {
                return (<Button type="primary" block onClick={() => EditService(record)}>
                    Edit
                </Button>)
            }
        },
        {
            title: "Delete",
            dataIndex: "delete",
            key: "delete",
            render: (_, record) => {
                return (<Button type="primary" block onClick={() => DeleteService(record)}>
                    Delete
                </Button>)
            }
        }
    ]
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
                <Button type="primary" style={{ margin: '10px 0' }}>
                    <Link to='/services/create'>Add new service</Link>
                </Button>
            </div>
            <Table dataSource={array} columns={columns} rowKey="id" />
        </div>
    );
}

export default ServicesPage;