import React from 'react'
import { Button, Form, Input, InputNumber, message, Radio, Select,Skeleton } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
const Update = () => {
    const navi=useNavigate();
    const{id}=useParams();
    const [text,noti]=message.useMessage();
    const{data,isLoading}=useQuery({
        queryKey:['key',id],
        queryFn:async()=>{
            const {data}=await axios.get(`http://localhost:3000/products/${id}`)
            return data;
        }
    })
    const{mutate}=useMutation({
        mutationFn:async(data)=>{
            await axios.put(`http://localhost:3000/products/${id}`,data);
        },
        onSuccess(){
            message.success('Updated');
            navi('/products');
        }
    })
  return (
    <div>
        {noti}
        <Skeleton loading={isLoading}>
        <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    onFinish={(data)=>mutate(data)}
    initialValues={data}
>   

    <Form.Item
        label="name"
        name="name"
        rules={[{required:true,message:'Required'}]}
    >
        <Input />
    </Form.Item>
    <Form.Item
        label="imageUrl"
        name="imageUrl"
        rules={[{required:true,message:'Required'}]}
    >
        <Input />
    </Form.Item>
    <Form.Item
        label="price"
        name="price"
        rules={[{required:true,message:'Required'},{type:'number',min:0, message:'Must be a positive number'}]}
    >
        <InputNumber />
    </Form.Item>
    <Form.Item
        label="quantity"
        name="quantity"
        rules={[{required:true,message:'Required'},{type:'number',min:0, message:'Must be a positive number'}]}
    >
        <InputNumber />
    </Form.Item>
    <Form.Item label="description" name="description" rules={[{required:true,message:'Required'}]}>
        <TextArea />
    </Form.Item>
    <Form.Item
        label="inStock "
        name="inStock"
        rules={[{required:true,message:'Required'}]}
    >
        <Radio.Group>
            <Radio value={true}>Con Hang </Radio>
            <Radio value={false}>Het Hang </Radio>
        </Radio.Group>
    </Form.Item>
    <Form.Item label="category" name="category" rules={[{required:true,message:'Required'}]}>
        <Select>
            <Select.Option value="Category 1 ">Category 1 </Select.Option>
            <Select.Option value="Category 2 ">Category 2 </Select.Option>
            
        </Select>
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
            Submit
        </Button>
    </Form.Item>
    </Form>
    </Skeleton>
    </div>
  )
}

export default Update