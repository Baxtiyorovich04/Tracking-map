import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../components/LoadingScreen';
import '../scss/login.scss';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      login('dummy-token');
      message.success('Login successful!');
      navigate('/');
    } catch (error) {
      message.error('Login failed!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          message.success('Location accessed successfully');
          // You can use position.coords.latitude and position.coords.longitude
          // to send to your backend or handle as needed
        },
        (error) => {
          message.error('Unable to access location');
        }
      );
    } else {
      message.error('Geolocation is not supported by your browser');
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="login-container">
        <Card className="login-card">
          <EnvironmentOutlined className="geolocation-icon" onClick={handleGeolocation} />
          <h1>Courier Tracking System</h1>
          <Form
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Username" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                size="large"
                loading={isLoading}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Login; 