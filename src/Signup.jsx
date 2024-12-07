import React from 'react'
import { Button, Form, Input, InputNumber, message, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Signup = () => {
    const navi=useNavigate();
    const [text,noti]=message.useMessage();
    const{mutate}=useMutation({
        mutationFn:async(data)=>{
            await axios.post(`http://localhost:3000/signup`,data);
        },
        onSuccess(){
            message.success('Success');
            navi('/signin');
        }
    })
  return (
    <div>
        {noti}
        <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    onFinish={(data)=>mutate(data)}
>   

    <Form.Item
        label="username"
        name="username"
        rules={[{required:true,message:'Required'}]}
    >
        <Input />
    </Form.Item>
    <Form.Item
        label="email"
        name="email"
        rules={[{required:true,message:'Required'},{type:'email',message:'Must be an Email form'}]}
    >
        <Input />
    </Form.Item>
    
    <Form.Item
        label="password"
        name="password"
        rules={[{required:true,message:'Required'}]}
    >
        <Input.Password />
    </Form.Item>
    
    <Form.Item
        label="confirmPassword"
        name="confirmPassword"
        rules={[{required:true,message:'Required'},({getFieldValue})=>({validator(_,data){
            if(getFieldValue('password')===data){
                return Promise.resolve();
            }
            return Promise.reject();
        }})]}
    >
        <Input.Password />
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
            Submit
        </Button>
    </Form.Item>
    </Form>
    </div>
  )
}

export default Signup