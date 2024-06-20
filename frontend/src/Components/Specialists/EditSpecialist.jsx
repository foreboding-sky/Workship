import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, InputNumber } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const EditSpecialistPage = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm(); // Define form instance
    let { specialistId } = useParams();

    useEffect(() => {
        if (specialistId)
            fetchData();
    }, [specialistId])

    const [specialist, setSpecialist] = useState({}); //just in case needed in future

    const fetchData = async () => {
        try {
            axios.defaults.baseURL = "http://localhost:5000/";
            const specialistDB = await axios.get("api/Workshop/specialists/" + specialistId);
            setSpecialist(specialistDB.data);
            form.setFieldsValue({
                full_name: specialistDB.data.fullName,
                comment: specialistDB.data.comment
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const onSubmit = (values) => {
        const request = {
            id: specialistId,
            fullName: values.full_name,
            comment: values.comment
        }
        console.log(request);
        axios.defaults.baseURL = "http://localhost:5000/";
        axios.post("api/Workshop/specialists/" + specialistId, request).then(res => console.log({ res }));
        return navigate("/specialists");
    };

    const NavBack = () => {
        return navigate("/specialists");
    };

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Form form={form} layout="horizontal" labelCol={{ span: 4 }} style={{ width: "100%", maxWidth: 500, margin: '10px 0' }} onFinish={onSubmit}>
                <Form.Item name="full_name" label="Full Name"
                    rules={[{ required: true, message: "Please input specialist's full name!" }]}>
                    <Input placeholder={'Full name'} />
                </Form.Item>
                <Form.Item style={{ display: "flex", justifyContent: 'end' }} name="comment" >
                    <TextArea style={{ width: 661 }} placeholder={'Comment'} rows={4} />
                </Form.Item>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '10px' }}>
                    <Form.Item>
                        <Button type="primary" htmlType='submit' style={{ width: "100%" }}>
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" block style={{ width: "100%", backgroundColor: '#d9534f', color: 'white' }} onClick={() => NavBack()}>
                            Cancel
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
}

export default EditSpecialistPage;