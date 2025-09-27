# Dental CRM Login System

## Overview
A complete JWT-based authentication system with role-based access control for the Dental CRM application.

## User Roles
- **SuperAdmin**: Full system access (`/superadmin`)
- **Admin**: Administrative access (`/admin`)
- **Branch Head**: Branch management access (`/admin`)
- **Doctor**: Clinical access (`/admin`)
- **Patient/User**: Patient portal access (`/patient-portal`)

## Test Credentials
Use these credentials to test the login system:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@dental.com | password123 |
| Doctor | doctor@dental.com | password123 |
| Admin | admin@dental.com | password123 |
| Branch Head | branchhead@dental.com | password123 |
| Patient | patient@dental.com | password123 |

## Features
- ✅ JWT token authentication
- ✅ Role-based routing
- ✅ Protected routes
- ✅ Token expiry validation
- ✅ Automatic logout on invalid tokens
- ✅ Form validation with Zod
- ✅ Loading states
- ✅ Error handling
- ✅ Persistent authentication state

## File Structure
```
src/
├── api/
│   ├── authApi.js          # Real API integration
│   └── mockAuthApi.js      # Mock API for testing
├── components/
│   └── ProtectedRoute.jsx  # Route protection component
├── Pages/Public/LoginPage/
│   ├── components/
│   │   ├── LoginForm.jsx   # Main login form
│   │   ├── LoginHeader.jsx # Login page header
│   │   └── RoleBasedRedirect.jsx # Auto-redirect component
│   └── index.jsx           # Login page assembly
├── store/
│   └── useAuthStore.js     # Zustand auth store
└── utils/
    └── jwtUtils.js         # JWT utility functions
```

## Usage
1. Navigate to `/login`
2. Enter credentials from the test table above
3. System automatically redirects based on user role
4. Access is protected by JWT tokens

## Integration with Real Backend
Replace `mockLoginUser` import in `LoginForm.jsx` with `loginUser` from `authApi.js` and update the API endpoint in `ConfigAPIURL.js`.

The backend should return:
```json
{
  "status": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@email.com",
      "role": "user_role"
    }
  }
}
```