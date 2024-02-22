import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Space, Table, Button, Tag } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;

const RepairsPage = () => {
    useEffect(() => {
        console.log("orders page axios get all");
        axios.get("/api/Workshop").then(res => {
            setArray(res.data);
            console.log(res.data);
        });
    }, []);

    const [array, setArray] = useState([]);

    const ChangeStatus = (record) => {
        axios.post("/api/Workshop/" + record.id).then(res => {
            let newArray = array.filter(order => { return order.id !== record.id; });
            setArray(newArray);
        })
    };

    const DeleteRepair = (record) => {
        axios.delete("/api/Workshop/" + record.id).then(res => {
            let newArray = array.filter(order => { return order.id !== record.id; });
            setArray(newArray);
        })
    };

    return (
        <div >
            <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
                <Button type="primary" style={{ margin: '10px 0' }}>
                    <Link to='/'>Add new repair</Link>
                </Button>
            </div>
            <Table dataSource={array}>
                <Column title="User" dataIndex="user" key="user" />
                <Column title="Market" dataIndex="market" key="market" />
                <Column title="Client" dataIndex="client" key="client" />
                <Column title="Device" dataIndex="device" key="device" />
                <Column title="Product" dataIndex="product" key="product" />
                <Column title="Comment" dataIndex="comment" key="comment" />
                <Column title="Date" dataIndex="date" key="date" />
                <Column
                    title="Change status"
                    key="action"
                    width={"200px"}
                    render={(_, record) => {
                        console.log(record.product);
                        return (<Button type="primary" block onClick={() => ChangeStatus(record)}>
                            Status
                        </Button>)
                    }} />
                <Column
                    title="Delete"
                    key="action"
                    width={"200px"}
                    render={(_, record) => {
                        console.log(record.product);
                        return (<Button type="primary" block onClick={() => DeleteRepair(record)}>
                            Delete
                        </Button>)
                    }} />
            </Table >
        </div>
    );
}

export default RepairsPage;