import React from 'react';
import { Button, Form, Input, message, Layout, Typography } from "antd";
import { useNavigate } from 'react-router-dom';
import { useStore } from './data/store.js';

const { Header, Content } = Layout;
const { Title } = Typography;

const Signin = () => {
    const navigate = useNavigate();
    const { getUser } = useStore();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values) => {
        const user = getUser(values.email, values.password);
        if (user) {
            messageApi.success('Sign-in successful');
            navigate('/CRUD-React');
        } else {
            messageApi.error('Sign-in failed. Please try again.');
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {contextHolder}
            <Header style={{ background: '#001529', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Title level={2} style={{ color: '#fff', margin: 0  }}>Sign In</Title>
            </Header>
            <Content style={{ padding: '20px' }}>
                <Form
                    name="signin"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Required' }, { type: 'email', message: 'Must be an Email format' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
}

export default Signin;

