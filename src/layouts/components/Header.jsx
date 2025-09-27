import React from 'react';
import { Layout, Avatar, Dropdown, Button, Badge } from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const Header = ({ collapsed, onToggle }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <AntHeader className="bg-white shadow-sm px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          className="text-lg"
        />
        <div className="ml-4">
          <span className="text-gray-500">Welcome back,</span>
          <span className="ml-2 font-semibold text-gray-800">
            {user?.name || user?.email}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Badge count={5} size="small">
          <Button
            type="text"
            icon={<BellOutlined />}
            className="text-lg"
          />
        </Badge>

        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <div className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
            <Avatar 
              size="small" 
              icon={<UserOutlined />} 
              className="bg-blue-500"
            />
            <div className="ml-2 text-sm">
              <div className="font-medium">{user?.name || user?.email}</div>
              <div className="text-gray-500 text-xs">
                {getRoleDisplayName(user?.role)}
              </div>
            </div>
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;