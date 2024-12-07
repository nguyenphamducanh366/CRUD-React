import React from 'react';
import { message, Image, Table, Space, Button, Popconfirm, Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useStore } from './data/store.js';

const { Header, Content } = Layout;
const { Title } = Typography;

const List = () => {
    const { products, deleteProduct } = useStore();
    const [messageApi, contextHolder] = message.useMessage();

    const handleDelete = (id) => {
        deleteProduct(id);
        messageApi.success('Product deleted successfully');
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (imageUrl) => <Image src={imageUrl} width={50} height={50} />
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'In Stock',
            dataIndex: 'inStock',
            key: 'inStock',
            render: (inStock) => <span>{inStock ? 'In Stock' : 'Out of Stock'}</span>
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            key: 'action',
            render: (_, record) => (
                <Space size='middle'>
                    <Popconfirm
                        title="Delete the product"
                        description="Are you sure you want to delete this product?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                    <Link to={`/products/${record.id}/edit`}>
                        <Button type="primary">Update</Button>
                    </Link>
                </Space>
            )
        }
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {contextHolder}
            <Header style={{ background: '#001529', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Title level={2} style={{ color: '#fff', margin: 0 }}>Admin Product List</Title>
            </Header>
            <Content style={{ padding: '20px' }}>
                <Link to={`/products/add`}>
                    <Button type="primary" style={{ marginBottom: '20px' }}>Add Product</Button>
                </Link>
                <Table dataSource={products} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />
            </Content>
        </Layout>
    );
}

export default List;

