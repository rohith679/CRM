import React from 'react';
import { Card, Typography, Row, Col, Statistic } from 'antd';
import { useAuthStore } from '../../store/useAuthStore';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Dashboard = () => {
  const { user } = useAuthStore();

  const getRoleDisplayName = (role) => {
    const roleMap = {
      'super_admin': 'Super Administrator',
      'admin': 'Administrator',
      'branch_head': 'Branch Head',
      'doctor': 'Doctor',
      'patient': 'Patient',
      'user': 'User'
    };
    return roleMap[role] || role;
  };

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'super_admin':
        return [
          { title: 'Total Branches', value: 12, color: '#1890ff' },
          { title: 'Total Users', value: 248, color: '#52c41a' },
          { title: 'Monthly Revenue', value: 125000, prefix: '$', color: '#faad14' },
          { title: 'Active Patients', value: 1840, color: '#eb2f96' }
        ];
      case 'admin':
      case 'branch_head':
        return [
          { title: 'Total Staff', value: 25, color: '#1890ff' },
          { title: 'Today Appointments', value: 18, color: '#52c41a' },
          { title: 'Monthly Revenue', value: 45000, prefix: '$', color: '#faad14' },
          { title: 'Active Patients', value: 320, color: '#eb2f96' }
        ];
      case 'doctor':
        return [
          { title: 'My Patients', value: 85, color: '#1890ff' },
          { title: 'Today Appointments', value: 8, color: '#52c41a' },
          { title: 'This Week', value: 24, color: '#faad14' },
          { title: 'This Month', value: 95, color: '#eb2f96' }
        ];
      default:
        return [
          { title: 'My Appointments', value: 3, color: '#1890ff' },
          { title: 'Medical History', value: 12, color: '#52c41a' },
          { title: 'Pending Bills', value: 1, color: '#faad14' },
          { title: 'Total Visits', value: 28, color: '#eb2f96' }
        ];
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <Title level={2} className="mb-2">
            Hi {user?.name || user?.email}, Welcome back
          </Title>
          <Text type="secondary" className="text-lg">
            {getRoleDisplayName(user?.role)}
          </Text>
        </div>

        <Row gutter={[16, 16]}>
          {getStatsForRole().map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card className="text-center" style={{ borderTop: `4px solid ${stat.color}` }}>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  prefix={stat.prefix}
                  valueStyle={{ color: stat.color }}
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Card>
          <Title level={3}>Quick Actions</Title>
          <p>Welcome to your {getRoleDisplayName(user?.role)} dashboard.</p>
          <p>Use the sidebar to navigate through different sections based on your role permissions.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;