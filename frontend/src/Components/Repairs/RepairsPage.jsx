import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Space, Table, Button, Tag } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;

const RepairsPage = () => {

    const [array, setArray] = useState([]);

    const EditRepair = (record) => {
        //edit repair here and post it to api
    };

    const DeleteRepair = (record) => {
        //delete repair record here
    };

    return (
        <div >
            <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
                <Button type="primary" style={{ margin: '10px 0' }}>
                    <Link to='/'>Add new repair</Link>
                </Button>
            </div>
            <Table dataSource={array}>
                <Column title="Specialist" dataIndex="specialist" key="specialist" />
                <Column title="Device" dataIndex="device" key="device" />
                <Column title="Client" dataIndex="client" key="client" />
                <Column title="Complaint" dataIndex="complaint" key="complaint" />
                <Column title="Status" dataIndex="status" key="status" />
                <Column title="Date" dataIndex="date" key="date" />
                <Column
                    title="Edit"
                    key="action"
                    width={"200px"}
                    render={(_, record) => {
                        console.log(record.product);
                        return (<Button type="primary" block onClick={() => EditRepair(record)}>
                            Edit
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