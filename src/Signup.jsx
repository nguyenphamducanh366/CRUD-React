import React from 'react';
import { Button, Form, Input, message, Layout, Typography } from "antd";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title } = Typography;

const Signup = () => {
    const navigate = useNavigate();
    const [text, noti] = message.useMessage();

    // Mutation for signing up a new user
    const { mutate } = useMutation({
        mutationFn: async (data) => {
            await axios.post(`http://localhost:3000/signup`, data);
        },
        onSuccess() {
            message.success('Signup successful!');
            navigate('/signin');
        }
    });

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#001529', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Title level={2} style={{ color: '#fff', margin: 0 }}>Sign Up</Title>
            </Header>
            <Content style={{ padding: '20px' }}>
                {noti}
                <Form
                    name="signup"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={(data) => mutate(data)}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Must be a valid email format' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                }
                            })
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Link to="/signin">
                            <Button style={{ marginLeft: '10px' }}>Cancel</Button>
                        </Link>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
}

export default Signup;
