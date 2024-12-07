import React from 'react';
import { message, Image, Table, Space, Button, Popconfirm, Skeleton, Layout, Typography } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Header, Content } = Layout;
const { Title } = Typography;

const List = () => {
    const queryClient = useQueryClient();
    const [text, noti] = message.useMessage();

    // Fetch products data
    const { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/products`);
            return data.map((item) => ({
                key: item.id,
                ...item
            }));
        }
    });

    // Delete product mutation
    const { mutate } = useMutation({
        mutationFn: async (id) => {
            await axios.delete(`http://localhost:3000/products/${id}`);
        },
        onSuccess() {
            message.success('Product deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });

    // Define table columns
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
            render: (_, data) => (
                <Space size='middle'>
                    <Popconfirm
                        title="Delete the product"
                        description="Are you sure you want to delete this product?"
                        onConfirm={() => mutate(data.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                    <Link to={`/products/${data.id}/edit`}>
                        <Button type="primary">Update</Button>
                    </Link>
                </Space>
            )
        }
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#001529', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Title level={2} style={{ color: '#fff', margin: 0 }}>Admin Product List</Title>
            </Header>
            <Content style={{ padding: '20px' }}>
                {noti}
                <Skeleton loading={isLoading}>
                    <Link to={`/products/add`}>
                        <Button type="primary" style={{ marginBottom: '20px' }}>Add Product</Button>
                    </Link>
                    <Table dataSource={data} columns={columns} pagination={{ pageSize: 10 }} />
                </Skeleton>
            </Content>
        </Layout>
    );
}

export default List;
