// Mock users for testing
const mockUsers = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'superadmin@dental.com',
    password: 'password123',
    role: 'super_admin'
  },
  {
    id: '2',
    name: 'Dr. John Smith',
    email: 'doctor@dental.com',
    password: 'password123',
    role: 'doctor'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@dental.com',
    password: 'password123',
    role: 'admin'
  },
  {
    id: '4',
    name: 'Branch Head',
    email: 'branchhead@dental.com',
    password: 'password123',
    role: 'branch_head'
  },
  {
    id: '5',
    name: 'Patient User',
    email: 'patient@dental.com',
    password: 'password123',
    role: 'patient'
  }
];

// Generate a simple JWT-like token (for demo purposes)
const generateToken = (user) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    userId: user.id,
    role: user.role,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  }));
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
};

export const mockLoginUser = async (credentials) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const user = mockUsers.find(u => 
    u.email === credentials.email && u.password === credentials.password
  );

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user);
  
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};