import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Space, Table, Button, Tag } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;

const StoragePage = () => {
    const [array, setArray] = useState([]);

    let navigate = useNavigate();

    const fetchData = async () => {
        try {
            axios.defaults.baseURL = "http://localhost:5000/";
            const storage = await axios.get("api/Workshop/stock");
            setArray(storage.data);
            console.log(storage.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const DeleteItem = async (record) => {
        try {
            axios.defaults.baseURL = "http://localhost:5000/";
            console.log(record);
            await axios.delete("api/Workshop/storage/" + record.id);
            const newArray = array.filter(item => item.id !== record.id);
            console.log(newArray);
            setArray(newArray);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const EditItem = async (record) => {
        return navigate(`/storage/edit/${record.id}`);
    };

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
        },
        {
            title: "Edit",
            dataIndex: "edit",
            key: "edit",
            render: (_, record) => {
                return (<Button type="primary" block onClick={() => EditItem(record)}>
                    Edit
                </Button>)
            }
        },
        {
            title: "Delete",
            dataIndex: "delete",
            key: "delete",
            render: (_, record) => {
                return (<Button type="primary" block onClick={() => DeleteItem(record)}>
                    Delete
                </Button>)
            }
        }
    ]
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
                <Button type="primary" style={{ margin: '10px 0' }}>
                    <Link to='/storage/create'>Add new product</Link>
                </Button>
            </div>
            <Table dataSource={array} columns={columns} rowKey="id" />
        </div>
    );
}

export default StoragePage;