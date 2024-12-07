import React from 'react';
import { Button, Form, Input, InputNumber, message, Radio, Select, Layout, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title } = Typography;

const Add = () => {
    const navigate = useNavigate();
    const [text, noti] = message.useMessage();

    // Mutation for adding a new product
    const { mutate } = useMutation({
        mutationFn: async (data) => {
            await axios.post(`http://localhost:3000/products`, data);
        },
        onSuccess() {
            message.success('Product added successfully');
            navigate('/products');
        }
    });

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#001529', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Title level={2} style={{ color: '#fff', margin: 0 }}>Add New Product</Title>
            </Header>
            <Content style={{ padding: '20px' }}>
                {noti}
                <Form
                    name="add-product"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={(data) => mutate(data)}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the product name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Image URL"
                        name="imageUrl"
                        rules={[{ required: true, message: 'Please input the image URL!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            { required: true, message: 'Please input the price!' },
                            { type: 'number', min: 0, message: 'Price must be a positive number' }
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[
                            { required: true, message: 'Please input the quantity!' },
                            { type: 'number', min: 0, message: 'Quantity must be a positive number' }
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        label="In Stock"
                        name="inStock"
                        rules={[{ required: true, message: 'Please select the stock status!' }]}
                    >
                        <Radio.Group>
                            <Radio value={true}>In Stock</Radio>
                            <Radio value={false}>Out of Stock</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please select a category!' }]}
                    >
                        <Select placeholder="Select a category">
                            <Select.Option value="Category 1">Category 1</Select.Option>
                            <Select.Option value="Category 2">Category 2</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Link to="/CRUD-React">
                            <Button style={{ marginLeft: '10px' }}>Cancel</Button>
                        </Link>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
}

export default Add;
