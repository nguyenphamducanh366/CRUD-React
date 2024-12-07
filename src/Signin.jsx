import React from 'react';
import { Button, Form, Input, message, Layout, Typography } from "antd";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const { Header, Content } = Layout;
const { Title } = Typography;

const Signin = () => {
    const [text, noti] = message.useMessage();
    
    // Mutation for signing in
    const { mutate } = useMutation({
        mutationFn: async (data) => {
            const res = await axios.post(`http://localhost:3000/signin`, data);
            return res.data;
        },
        onSuccess(data) {
            message.success('Sign-in successful');
        },
        onError() {
            message.error('Sign-in failed. Please try again.');
        }
    });

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#001529', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Title level={2} style={{ color: '#fff', margin: 0  }}>Sign In</Title>
            </Header>
            <Content style={{ padding: '20px' }}>
                {noti}
                <Form
                    name="signin"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={(data) => mutate(data)}
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
