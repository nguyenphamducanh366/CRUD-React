import React from 'react';
import { Button, Form, Input, InputNumber, message, Radio, Select, Skeleton, Layout, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStore } from './data/store.js';

const { Header, Content } = Layout;
const { Title } = Typography;

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { products, updateProduct } = useStore();
    const [messageApi, contextHolder] = message.useMessage();

    const product = products.find(p => p.id === id);

    const onFinish = (values) => {
        updateProduct(id, values);
        messageApi.success('Product updated successfully');
        navigate('/CRUD-React');
    };

    if (!product) {
        return <Skeleton />;
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {contextHolder}
            <Header style={{ background: '#001529', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Title level={2} style={{ color: '#fff', margin: 0 }}>Update Product</Title>
            </Header>
            <Content style={{ padding: '20px' }}>
                <Form
                    name="update-product"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    initialValues={product}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the product name!' }]}
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
                        label="Image URL"
                        name="imageUrl"
                        rules={[{ required: true, message: 'Please input the image URL!' }]}
                    >
                        <Input />
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
                        rules={[{ required: true, message: 'Please select stock status!' }]}
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

export default Update;

