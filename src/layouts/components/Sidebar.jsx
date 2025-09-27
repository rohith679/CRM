import React from 'react';
import { Menu, Layout } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import {
  DashboardOutlined,
  BankOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  DollarOutlined,
  CustomerServiceOutlined,
  InboxOutlined,
  BarChartOutlined,
  SettingOutlined,
  FileTextOutlined,
  ScheduleOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();

  const getMenuItems = () => {
    const baseItems = [
      {
        key: '/dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
      }
    ];

    switch (user?.role) {
      case 'super_admin':
        return [
          ...baseItems,
          {
            key: '/branch-management',
            icon: <BankOutlined />,
            label: 'Branch Management',
          },
          {
            key: '/user-management',
            icon: <UserOutlined />,
            label: 'User Management',
          },
          {
            key: '/patient-records',
            icon: <TeamOutlined />,
            label: 'Patient Records',
          },
          {
            key: '/appointments',
            icon: <CalendarOutlined />,
            label: 'Appointments',
          },
          {
            key: '/billing',
            icon: <DollarOutlined />,
            label: 'Billing & Payments',
          },
          {
            key: '/customer-service',
            icon: <CustomerServiceOutlined />,
            label: 'Customer Service',
          },

          {
            key: '/inventory',
            icon: <InboxOutlined />,
            label: 'Inventory',
          },
          {
            key: '/reports',
            icon: <BarChartOutlined />,
            label: 'Reports & Analytics',
          },
          {
            key: '/settings',
            icon: <SettingOutlined />,
            label: 'Settings',
          }
        ];

      case 'admin':
        return [
          ...baseItems,
          {
            key: '/user-management',
            icon: <UserOutlined />,
            label: 'User Management',
          },
          {
            key: '/patient-records',
            icon: <TeamOutlined />,
            label: 'Patient Records',
          },
          {
            key: '/appointments',
            icon: <CalendarOutlined />,
            label: 'Appointments',
          },
          {
            key: '/billing',
            icon: <DollarOutlined />,
            label: 'Billing & Payments',
          },
          {
            key: '/inventory',
            icon: <InboxOutlined />,
            label: 'Inventory',
          },
          {
            key: '/reports',
            icon: <BarChartOutlined />,
            label: 'Reports & Analytics',
          }
        ];

      case 'branch_head':
        return [
          ...baseItems,
          {
            key: '/staff-management',
            icon: <TeamOutlined />,
            label: 'Staff Management',
          },
          {
            key: '/patient-records',
            icon: <TeamOutlined />,
            label: 'Patient Records',
          },
          {
            key: '/appointments',
            icon: <CalendarOutlined />,
            label: 'Appointments',
          },
          {
            key: '/billing',
            icon: <DollarOutlined />,
            label: 'Billing & Payments',
          },
          {
            key: '/inventory',
            icon: <InboxOutlined />,
            label: 'Inventory',
          },
          {
            key: '/branch-reports',
            icon: <BarChartOutlined />,
            label: 'Branch Reports',
          }
        ];

      case 'doctor':
        return [
          ...baseItems,
          {
            key: '/my-patients',
            icon: <TeamOutlined />,
            label: 'My Patients',
          },
          {
            key: '/appointments',
            icon: <CalendarOutlined />,
            label: 'My Appointments',
          },
          {
            key: '/medical-records',
            icon: <FileTextOutlined />,
            label: 'Medical Records',
          },
          {
            key: '/schedule',
            icon: <ScheduleOutlined />,
            label: 'My Schedule',
          }
        ];

      case 'patient':
      case 'user':
        return [
          ...baseItems,
          {
            key: '/my-appointments',
            icon: <CalendarOutlined />,
            label: 'My Appointments',
          },
          {
            key: '/medical-history',
            icon: <FileTextOutlined />,
            label: 'Medical History',
          },
          {
            key: '/billing-history',
            icon: <DollarOutlined />,
            label: 'Billing History',
          }
        ];

      default:
        return baseItems;
    }
  };

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      theme="light"
      width={250}
      className="shadow-lg"
    >
      <div className="p-4 text-center border-b">
        <h3 className={`font-bold text-blue-600 ${collapsed ? 'text-xs' : 'text-lg'}`}>
          {collapsed ? 'DC' : 'Dental CRM'}
        </h3>
      </div>
      
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={getMenuItems()}
        onClick={handleMenuClick}
        className="border-0"
      />
    </Sider>
  );
};

export default Sidebar;