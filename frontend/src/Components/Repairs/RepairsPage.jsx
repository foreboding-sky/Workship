import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Space, Table, Button, Tag } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;

const RepairsPage = () => {

    const [array, setArray] = useState([]);

    const fetchData = async () => {
        try {
            axios.defaults.baseURL = "http://localhost:5000/";
            const repairs = await axios.get("api/Workshop/repairs");
            setArray(repairs.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const EditRepair = (record) => {
        //edit repair here and post it to api
    };

    const DeleteRepair = async (record) => {
        try {
            axios.defaults.baseURL = "http://localhost:5000/";
            console.log(record);
            await axios.delete("api/Workshop/repairs/" + record.id);
            const newArray = array.filter(item => item.id !== record.id);
            console.log(newArray);
            setArray(newArray);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const columns = [
        // {
        //     title: "Date",
        //     dataIndex: "date",
        //     key: "date",
        //     render: date => date
        // },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: status => status
        },
        {
            title: "Specialist",
            dataIndex: "specialist",
            key: "specialist",
            render: specialist => specialist
        },
        {
            title: "Device",
            dataIndex: ["device", "brand"],
            key: "device",
            render: (text, record) => <p>{text} {record.device.model}</p>
        },
        {
            title: "Client",
            dataIndex: ["client", "fullName"],
            key: "client",
            render: client => client
        },
        {
            title: "Complaint",
            dataIndex: "complaint",
            key: "complaint",
            render: complaint => complaint
        },

        {
            title: "Edit",
            dataIndex: "edit",
            key: "edit",
            render: (_, record) => {
                return (<Button type="primary" block>
                    <Link to='/workshop/edit'>Edit</Link>
                </Button>)
            }
        },
        {
            title: "Delete",
            dataIndex: "delete",
            key: "delete",
            render: (_, record) => {
                return (<Button type="primary" block onClick={() => DeleteRepair(record)}>
                    Delete
                </Button>)
            }
        },
    ]

    return (
        <div >
            <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
                <Button type="primary" style={{ margin: '10px 0' }}>
                    <Link to='/workshop/create'>Add new repair</Link>
                </Button>
            </div>
            <Table dataSource={array} columns={columns} rowKey="id" />
        </div>
    );
}

export default RepairsPage;