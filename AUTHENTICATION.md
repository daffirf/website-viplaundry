# 🔐 Authentication System - VIP Laundry

Dokumentasi lengkap sistem authentication dengan role-based access control (RBAC) untuk membedakan admin dan user.

## 📋 Overview

Sistem authentication menggunakan **Zustand** untuk state management dengan **localStorage persistence** untuk menjaga user tetap login setelah refresh page.

## 👥 User Roles

### 1. Admin
- **Akses penuh** ke admin panel
- **Manage orders**: Update status pesanan
- **View customers**: Lihat data pelanggan
- **Dashboard access**: Statistik lengkap

### 2. User (Regular Customer)
- **Booking**: Buat pesanan laundry
- **Tracking**: Lacak pesanan sendiri
- **Profile**: Lihat informasi akun

## 🚀 Features

### ✅ Authentication
- ✅ **Register** - Daftar akun baru (role: user)
- ✅ **Login** - Login dengan email & password
- ✅ **Logout** - Logout dari sistem
- ✅ **Protected Routes** - Admin panel hanya untuk admin
- ✅ **Persistent Session** - Tetap login setelah refresh

### ✅ Security
- ✅ **Email validation**
- ✅ **Phone number validation** (format Indonesia)
- ✅ **Password minimum length** (6 characters)
- ✅ **Duplicate check** (email & phone)
- ✅ **Role-based access control**

## 📁 File Structure

```
src/
├── lib/
│   └── auth-store.ts           # Zustand auth store
├── app/
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── register/
│   │   └── page.tsx            # Register page
│   └── admin/
│       └── page.tsx            # Protected admin page
└── components/
    └── Navbar.tsx              # Auth-aware navigation
```

## 🔑 Default Admin Account

```
Email: admin@viplaundry.com
Password: admin123
Role: admin
```

**Note**: Admin account otomatis dibuat saat pertama kali aplikasi dijalankan.

## 📖 Usage Guide

### For Users

#### 1. Register (Daftar)

1. Buka `/register`
2. Isi form:
   - Nama lengkap
   - Email (unique)
   - Nomor telepon (unique, format Indonesia)
   - **Jenis Akun** (pilih User atau Admin) ⭐ NEW
   - Password (min 6 karakter)
   - Konfirmasi password
3. Klik "Daftar"
4. Redirect ke `/login`

**Pilihan Jenis Akun**:
- **User (Pelanggan)**: Untuk booking dan tracking pesanan
- **Admin (Pengelola)**: Untuk mengelola sistem, full akses admin panel

⚠️ **Note**: Setiap orang bisa mendaftar sebagai admin. Untuk production, tambahkan admin approval atau kode registrasi khusus.

#### 2. Login

1. Buka `/login`
2. Masukkan email & password
3. Klik "Login"
4. Redirect ke:
   - `/admin` jika role = admin
   - `/` (home) jika role = user

#### 3. Logout

- Klik tombol "Logout" di Navbar
- Atau klik "Logout" di Admin Panel (untuk admin)

### For Developers

#### Check Authentication Status

```typescript
import { useAuthStore } from '@/lib/auth-store';

function MyComponent() {
  const { user, isAuthenticated, isAdmin } = useAuthStore();
  
  if (isAuthenticated()) {
    console.log('User logged in:', user);
  }
  
  if (isAdmin()) {
    console.log('User is admin');
  }
}
```

#### Register New User

```typescript
const { register } = useAuthStore();

const result = register({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '081234567890',
  password: 'password123',
  role: 'user' // optional, default is 'user'
});

if (result.success) {
  console.log('Registration successful');
} else {
  console.error(result.message);
}
```

#### Login

```typescript
const { login } = useAuthStore();

const result = login('admin@viplaundry.com', 'admin123');

if (result.success) {
  console.log('Login successful', result.user);
} else {
  console.error(result.message);
}
```

#### Logout

```typescript
const { logout } = useAuthStore();

logout();
// User will be null, session cleared
```

#### Protected Routes

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';

export default function ProtectedPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and has admin role
    if (!isAuthenticated() || !isAdmin()) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Protected Content</div>;
}
```

## 🔒 Security Implementation

### Password Storage

⚠️ **Current**: Passwords disimpan plain text di localStorage
⚠️ **Production**: Harus menggunakan hashing (bcrypt) dan backend server

### Example Production Implementation:

```typescript
// Backend (Node.js + Express)
import bcrypt from 'bcrypt';

// Register
const hashedPassword = await bcrypt.hash(password, 10);
await db.users.create({
  ...userData,
  password: hashedPassword
});

// Login
const user = await db.users.findOne({ email });
const isValid = await bcrypt.compare(password, user.password);
```

## 📊 Auth Store Schema

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  createdAt: string;
}

interface AuthState {
  user: User | null;
  users: Array<User & { password: string }>;
  
  // Methods
  register(data): { success: boolean; message: string };
  login(email, password): { success: boolean; message: string; user?: User };
  logout(): void;
  isAuthenticated(): boolean;
  isAdmin(): boolean;
  initializeDefaultAdmin(): void;
}
```

## 🧪 Testing Authentication

### Test Scenario 1: Register New User

```bash
1. Buka http://localhost:3000/register
2. Isi form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 081234567890
   - Jenis Akun: User (Pelanggan)
   - Password: test123
   - Confirm: test123
3. Submit
4. Expected: Redirect ke /login dengan success message
```

### Test Scenario 1b: Register New Admin

```bash
1. Buka http://localhost:3000/register
2. Isi form:
   - Name: Admin Baru
   - Email: admin2@viplaundry.com
   - Phone: 081234567891
   - Jenis Akun: Admin (Pengelola)  ⭐ SELECT THIS
   - Password: admin123
   - Confirm: admin123
3. Submit
4. Login dengan akun baru
5. Expected: Redirect ke /admin (admin panel)
```

### Test Scenario 2: Login as Admin

```bash
1. Buka http://localhost:3000/login
2. Input:
   - Email: admin@viplaundry.com
   - Password: admin123
3. Submit
4. Expected: Redirect ke /admin (admin panel)
```

### Test Scenario 3: Login as User

```bash
1. Register user baru (atau gunakan test@example.com)
2. Login dengan credentials user
3. Expected: Redirect ke / (homepage)
4. Navbar shows: User name + Logout button
5. No "Admin" link in navbar
```

### Test Scenario 4: Protected Route

```bash
1. Logout (jika sudah login)
2. Buka http://localhost:3000/admin directly
3. Expected: Redirect ke /login
4. Login as user (bukan admin)
5. Coba akses /admin
6. Expected: Redirect ke /login
7. Login as admin
8. Expected: Berhasil akses /admin
```

### Test Scenario 5: Persistent Session

```bash
1. Login as admin
2. Refresh page (F5)
3. Expected: Tetap login, tidak redirect ke /login
4. Close tab
5. Buka http://localhost:3000/admin di tab baru
6. Expected: Tetap login
```

## 🔄 Flow Diagram

```
┌─────────────┐
│   Landing   │
│    Page     │
└──────┬──────┘
       │
       ├─────► Login ──────────┐
       │                       │
       └─────► Register ───────┤
                               │
                        ┌──────▼──────┐
                        │ Credentials │
                        │   Check     │
                        └──────┬──────┘
                               │
                      ┌────────┴─────────┐
                      │                  │
                ┌─────▼─────┐     ┌────▼────┐
                │   Admin   │     │  User   │
                │   Role    │     │  Role   │
                └─────┬─────┘     └────┬────┘
                      │                │
              ┌───────▼───────┐   ┌───▼──────┐
              │ Admin Panel   │   │   Home   │
              │ • Dashboard   │   │ • Booking│
              │ • Orders      │   │ • Tracking│
              │ • Customers   │   └──────────┘
              └───────────────┘
```

## ⚙️ Configuration

### Initialize Default Admin

```typescript
import { useAuthStore } from '@/lib/auth-store';

// In your app initialization (e.g., layout.tsx or main page)
useEffect(() => {
  useAuthStore.getState().initializeDefaultAdmin();
}, []);
```

### Customize Default Admin

Edit `src/lib/auth-store.ts`:

```typescript
const defaultAdmin = {
  id: 'admin-' + Date.now(),
  name: 'Your Admin Name',
  email: 'your-admin@email.com',
  phone: '081234567890',
  password: 'your-password',
  role: 'admin' as UserRole,
  createdAt: new Date().toISOString()
};
```

## ⚠️ Security Note: Admin Registration

**Current Implementation**: Siapa saja bisa register sebagai admin dari halaman register.

**Untuk Production**, implementasikan salah satu dari:

### Option 1: Admin Approval
```typescript
// Require admin approval for new admin accounts
register({
  ...userData,
  role: 'admin',
  status: 'pending_approval' // Needs approval from super admin
});
```

### Option 2: Registration Code
```typescript
// Require special code for admin registration
const ADMIN_CODE = 'SECRET_ADMIN_CODE_2025';

if (role === 'admin' && registrationCode !== ADMIN_CODE) {
  return { success: false, message: 'Invalid admin code' };
}
```

### Option 3: Invite System
```typescript
// Only existing admins can invite new admins
// Send invitation link with token
```

## 🚀 Production Recommendations

### Phase 1: Backend Integration
- [ ] Setup Node.js + Express backend
- [ ] Implement JWT tokens
- [ ] Hash passwords with bcrypt
- [ ] Setup PostgreSQL/MySQL database
- [ ] Create auth API endpoints
- [ ] **Add admin registration protection** ⭐ IMPORTANT

### Phase 2: Enhanced Security
- [ ] Implement refresh tokens
- [ ] Add email verification
- [ ] Password reset functionality
- [ ] Two-factor authentication (2FA)
- [ ] Rate limiting on login attempts
- [ ] Admin approval workflow

### Phase 3: Advanced Features
- [ ] OAuth login (Google, Facebook)
- [ ] Session management
- [ ] Activity logging
- [ ] Account lockout after failed attempts
- [ ] Password strength requirements
- [ ] Role-based permissions (super admin, admin, moderator, user)

## 🐛 Common Issues

### Issue: User stuck on login after registration

**Solution**: Make sure you're using correct email and password. Check browser console for errors.

### Issue: Admin panel shows "Loading..." forever

**Solution**: Clear localStorage and refresh:
```javascript
localStorage.clear();
location.reload();
```

### Issue: Can't access admin panel

**Solution**: Make sure you're logged in as admin. Check role:
```javascript
console.log(useAuthStore.getState().user);
```

## 📚 API Reference

### Auth Store Methods

```typescript
// Initialize
initializeDefaultAdmin(): void

// Register
register(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: 'admin' | 'user';
}): { success: boolean; message: string }

// Login
login(
  email: string,
  password: string
): { success: boolean; message: string; user?: User }

// Logout
logout(): void

// Checks
isAuthenticated(): boolean
isAdmin(): boolean
```

## 📞 Support

Jika ada pertanyaan:
1. Check documentation ini
2. Check browser console untuk errors
3. Clear localStorage jika ada masalah
4. Re-login

---

**Authentication system ready to use!** 🎉

Sekarang website VIP Laundry memiliki sistem login/register dengan role-based access control yang lengkap!

