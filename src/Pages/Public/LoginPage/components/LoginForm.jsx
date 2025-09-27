import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../store/useAuthStore';
import { mockLoginUser } from '../../../../api/mockAuthApi';
import { Button, Input, Form, message } from 'antd';
import { LoadingOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

export const LoginForm = () => {
  const navigate = useNavigate();
  const loginToStore = useAuthStore((state) => state.login);
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: mockLoginUser,
    onSuccess: (data) => {
      console.log('Login success data:', data);
      loginToStore(data.user, data.token);
      message.success('Login successful!');

      console.log('User role:', data.user.role);
      
      switch (data.user.role) {
        case 'super_admin':
          console.log('Navigating to /superadmin');
          navigate('/superadmin');
          break;
        case 'admin':
        case 'branch_head':
        case 'doctor':
          console.log('Navigating to /admin');
          navigate('/admin');
          break;
        case 'patient':
        case 'user':
          console.log('Navigating to /patient-portal');
          navigate('/patient-portal');
          break;
        default:
          console.log('Default case - navigating to /login');
          navigate('/login');
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
      message.error(error.message || 'Login failed');
    }
  });

  const onFinish = (values) => {
    console.log('Form values:', values);
    mutation.mutate(values);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20"
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        size="large"
      >
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Form.Item
            label={<span className="text-gray-700 font-medium">Email</span>}
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              type="email" 
              placeholder="Enter your email" 
              prefix={<MailOutlined className="text-gray-400" />}
              className="rounded-lg border-2 border-gray-200 hover:border-purple-400 focus:border-purple-500 transition-colors"
            />
          </Form.Item>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Form.Item
            label={<span className="text-gray-700 font-medium">Password</span>}
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password 
              placeholder="Enter your password" 
              prefix={<LockOutlined className="text-gray-400" />}
              className="rounded-lg border-2 border-gray-200 hover:border-purple-400 focus:border-purple-500 transition-colors"
            />
          </Form.Item>
        </motion.div>

        {mutation.isError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-50 border-l-4 border-red-400 rounded-md"
          >
            <p className="text-red-600 text-sm font-medium">
              Invalid credentials. Please try again.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={mutation.isPending}
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {mutation.isPending ? 'Signing In...' : 'Sign In'}
            </Button>
          </Form.Item>
        </motion.div>
      </Form>
    </motion.div>
  );
};