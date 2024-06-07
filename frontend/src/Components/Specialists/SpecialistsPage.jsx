import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;

const SpecialistsPage = () => {
    useEffect(() => {
        fetchData();
    }, [])

    const [array, setArray] = useState([]);

    const fetchData = async () => {
        try {
            axios.defaults.baseURL = "http://localhost:5000/";
            const specialists = await axios.get("api/Workshop/specialists");
            setArray(specialists.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const DeleteSpecialist = async (record) => {
        try {
            axios.defaults.baseURL = "http://localhost:5000/";
            console.log(record);
            await axios.delete("api/Workshop/specialists/" + record.id);
            const newArray = array.filter(item => item.id !== record.id);
            console.log(newArray);
            setArray(newArray);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const columns = [
        {
            title: "Full Name",
            dataIndex: "fullName",
            key: "fullName",
            render: fullName => fullName
        },
        {
            title: "Comment",
            dataIndex: "comment",
            key: "comment",
            render: comment => comment
        },
        {
            title: "Delete",
            dataIndex: "delete",
            key: "delete",
            render: (_, record) => {
                return (<Button type="primary" block onClick={() => DeleteSpecialist(record)}>
                    Delete
                </Button>)
            }
        }
    ]
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
                <Button type="primary" style={{ margin: '10px 0' }}>
                    <Link to='/specialists/create'>Add new specialist</Link>
                </Button>
            </div>
            <Table dataSource={array} columns={columns} rowKey="id" />
        </div>
    );
}

export default SpecialistsPage;