import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  users: Array<User & { password: string }>;
  
  // Actions
  register: (data: { name: string; email: string; phone: string; password: string; role?: UserRole }) => { success: boolean; message: string };
  login: (email: string, password: string) => { success: boolean; message: string; user?: User };
  logout: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  initializeDefaultAdmin: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],

      initializeDefaultAdmin: () => {
        const { users } = get();
        // Create default admin if not exists
        const adminExists = users.some(u => u.email === 'admin@viplaundry.com');
        
        if (!adminExists) {
          const defaultAdmin = {
            id: 'admin-' + Date.now(),
            name: 'Admin VIP Laundry',
            email: 'admin@viplaundry.com',
            phone: '081234567890',
            password: 'admin123', // In production, this should be hashed
            role: 'admin' as UserRole,
            createdAt: new Date().toISOString()
          };

          set({ users: [...users, defaultAdmin] });
        }
      },

      register: (data) => {
        const { users } = get();
        
        // Validate email
        if (!data.email || !data.email.includes('@')) {
          return { success: false, message: 'Email tidak valid' };
        }

        // Check if email already exists
        const emailExists = users.some(u => u.email.toLowerCase() === data.email.toLowerCase());
        if (emailExists) {
          return { success: false, message: 'Email sudah terdaftar' };
        }

        // Check if phone already exists
        const phoneExists = users.some(u => u.phone === data.phone);
        if (phoneExists) {
          return { success: false, message: 'Nomor telepon sudah terdaftar' };
        }

        // Validate password
        if (!data.password || data.password.length < 6) {
          return { success: false, message: 'Password minimal 6 karakter' };
        }

        // Create new user
        const newUser = {
          id: 'user-' + Date.now(),
          name: data.name,
          email: data.email.toLowerCase(),
          phone: data.phone,
          password: data.password, // In production, hash this
          role: (data.role || 'user') as UserRole,
          createdAt: new Date().toISOString()
        };

        set({ users: [...users, newUser] });

        return { success: true, message: 'Registrasi berhasil! Silakan login.' };
      },

      login: (email, password) => {
        const { users } = get();
        
        // Find user
        const user = users.find(
          u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (!user) {
          return { success: false, message: 'Email atau password salah' };
        }

        // Set current user (without password)
        const { password: _, ...userWithoutPassword } = user;
        set({ user: userWithoutPassword });

        return { 
          success: true, 
          message: 'Login berhasil!',
          user: userWithoutPassword 
        };
      },

      logout: () => {
        set({ user: null });
      },

      isAuthenticated: () => {
        return get().user !== null;
      },

      isAdmin: () => {
        const { user } = get();
        return user?.role === 'admin';
      }
    }),
    {
      name: 'viplaundry-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

