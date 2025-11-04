'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/auth-store';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, initializeDefaultAdmin } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize default admin & redirect if already logged in
  useEffect(() => {
    initializeDefaultAdmin();
    if (isAuthenticated()) {
      router.push('/');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (!formData.email || !formData.password) {
        setError('Email dan password harus diisi');
        setIsSubmitting(false);
        return;
      }

      const result = login(formData.email, formData.password);

      if (result.success) {
        // Redirect based on role
        if (result.user?.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <div className="text-5xl text-blue-600">
              <i className="fas fa-tshirt"></i>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
          <p className="text-gray-600">Masuk ke akun VIP Laundry Anda</p>
        </div>

        {/* Login Card */}
        <div className="card">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn btn-primary mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Memproses...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Login
                </>
              )}
            </button>

            <div className="text-center text-gray-600">
              Belum punya akun?{' '}
              <Link href="/register" className="text-blue-600 font-semibold hover:text-blue-700">
                Daftar di sini
              </Link>
            </div>
          </form>
        </div>

        {/* Demo Accounts Info */}
        <div className="mt-6 card bg-blue-50 border-2 border-blue-200">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <i className="fas fa-info-circle text-blue-600"></i>
            Akun Demo & Info Login
          </h3>
          <div className="space-y-3 text-sm">
            <div className="bg-white p-3 rounded-lg border-l-4 border-blue-600">
              <div className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <i className="fas fa-user-shield text-blue-600"></i>
                Akun Admin (Default)
              </div>
              <div className="text-gray-600">Email: <strong>admin@viplaundry.com</strong></div>
              <div className="text-gray-600">Password: <strong>admin123</strong></div>
              <div className="text-xs text-gray-500 mt-1">
                <i className="fas fa-check-circle text-green-600 mr-1"></i>
                Full akses admin panel
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border-2 border-dashed border-green-300">
              <div className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <i className="fas fa-user-plus text-green-600"></i>
                Buat Akun Baru
              </div>
              <div className="text-gray-700 text-xs mb-2">
                Daftar di halaman register dan pilih jenis akun:
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-white p-2 rounded text-xs">
                  <i className="fas fa-user text-green-600 mr-1"></i>
                  <strong>User</strong>
                  <div className="text-gray-600">Untuk pelanggan</div>
                </div>
                <div className="flex-1 bg-white p-2 rounded text-xs">
                  <i className="fas fa-user-shield text-blue-600 mr-1"></i>
                  <strong>Admin</strong>
                  <div className="text-gray-600">Untuk pengelola</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
}

