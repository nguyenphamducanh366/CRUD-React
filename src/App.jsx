import { useState } from "react";
import { Navigate, Route, Routes, Link } from "react-router-dom";
import { Layout, Breadcrumb, Button, Menu } from 'antd';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import List from "./List";
import Signin from "./Signin";
import Signup from "./Signup";
import Update from "./Update";
import Add from "./Add";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: '1',
    icon: <PieChartOutlined />,
    label: <Link to="/CRUD-React">Products</Link>,
  },
  {
    key: '2',
    icon: <DesktopOutlined />,
    label: <Link to="/products/add">Add Product</Link>,
  },
  {
    key: '3',
    icon: <ContainerOutlined />,
    label: <Link to="/signin">Sign In</Link>,
  },
  {
    key: '4',
    icon: <MailOutlined />,
    label: <Link to="/signup">Sign Up</Link>,
  },
];

const App = () => {
  const [user, setUser] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh',minWidth:'100vw', margin:'-8px'  }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        <div style={{ height: '32px', margin: '16px' }} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#001529', color: '#fff' }}>
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{
              marginBottom: 16,
              marginLeft: 16,
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Header>
        <Content style={{ padding: '10px', borderRadius: '8px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Products</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280, borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <Routes>
              <Route path="/CRUD-React" element={<List />} />
              <Route path="/products/add" element={<Add />} />
              <Route path="/products/:id/edit" element={<Update />} />
              <Route path="/signin" element={<Signin setUser={setUser} />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', margin: 0 }}>Ant Design Dashboard ©2024</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
