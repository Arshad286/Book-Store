import React, { useState } from 'react';
import { Form, Input, Button, Typography, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css';

const { Title } = Typography;

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // Simulate authentication
    setTimeout(() => {
      setLoading(false);
      onLogin(values.username, values.password);
    }, 1000);
  };

  return (
    <Layout style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={loading} style={{ width: '100%' }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default Login;
