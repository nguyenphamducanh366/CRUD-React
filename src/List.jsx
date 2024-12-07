import React from 'react'
import { message,Image, Table, Space,Button,Popconfirm } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
const List = () => {
    const queryClient=useQueryClient()
    const [text,noti]=message.useMessage()
    const{data,isLoading}=useQuery({
        queryKey:['key'],
        queryFn:async()=>{
            const {data}=await axios.get(`http://localhost:3000/products`)
            return data.map((item)=>({
                key:item.id,
                ...item
            }))
        }
    })
    const {mutate}=useMutation({
        mutationFn:async(id)=>{
            await axios.delete(`http://localhost:3000/products/${id}`)
        },
        onSuccess(){
            message.success('Deleted');
            queryClient.invalidateQueries({
                queryKey:['key']
            })
        }
    });
    const columns=[
        {
            title:'imageUrl',
            dataIndex:'imageUrl',
            key:'imageUrl',
            render(imageUrl){
                return(<Image src ={imageUrl} width={50} height={50}></Image> )
            }
        },
        {
            title:'name',
            dataIndex:'name',
            key:'name',
        },
        {
            title:'price',
            dataIndex:'price',
            key:'price',
        },
        {
            title:'quantity',
            dataIndex:'quantity',
            key:'quantity',
        },
        {
            title:'description',
            dataIndex:'description',
            key:'description',
        },
        {
            title:'inStock',
            dataIndex:'inStock',
            key:'inStock',
            render(inStock){
                return( <span> {inStock ?'Con Hang' :'Het Hang'}</span>)
            }
        },
        {
            title:'category',
            dataIndex:'category',
            key:'category',
        },
        {
            key:'action',
            render:(_,data)=>{
                return(<>
                <Space size='middle'>
                <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={()=>mutate(data.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                <Link to={`/products/${data.id}/edit`}><Button >Update</Button>   </Link>
                </Space>    
               </> )
            }
        }
    ]
  return (
    <div>
        {noti}
        <Skeleton loading={isLoading}>
        <Link to={`/products/add`}><Button >Add</Button>   </Link>
            <Table dataSource={data} columns={columns}></Table>
        </Skeleton>
    </div>
  )
}

export default List