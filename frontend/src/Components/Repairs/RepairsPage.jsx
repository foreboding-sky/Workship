import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Space, Table, Button, Tag } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;

const RepairsPage = () => {

    useEffect(() => {
        console.log("useEffect on RepairsPage");
        axios.get("api/Workshop/repairs").then(res => {
            setArray(res.data);
            console.log(res.data);
        })
    }, [])
    const [array, setArray] = useState([]);

    const EditRepair = (record) => {
        //edit repair here and post it to api
    };

    const DeleteRepair = (record) => {
        //delete repair record here
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
                return (<Button type="primary" block onClick={() => EditRepair(record)}>
                    Edit
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
            <Table dataSource={array} columns={columns} />
        </div>
    );
}

export default RepairsPage;