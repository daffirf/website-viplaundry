'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLaundryStore, Order } from '@/lib/store';
import { useAuthStore } from '@/lib/auth-store';
import { formatDate, getStatusText, getStatusClass, formatRupiah } from '@/lib/utils';

export default function AdminPage() {
  const router = useRouter();
  const { orders, customers, updateOrder } = useLaundryStore();
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'customers'>('dashboard');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, []);

  // Auto refresh setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      // Force re-render to show new data
      useLaundryStore.persist.rehydrate();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    if (confirm('Yakin ingin logout?')) {
      logout();
      router.push('/login');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Statistics
  const stats = {
    totalOrders: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    completed: orders.filter(o => o.status === 'completed').length,
    totalCustomers: customers.length,
    totalRevenue: orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + o.totalPrice, 0)
  };

  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    if (confirm(`Ubah status pesanan menjadi "${getStatusText(newStatus)}"?`)) {
      updateOrder(orderId, { status: newStatus });
      alert('Status berhasil diupdate!');
      setSelectedOrder(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="text-3xl">
                <i className="fas fa-tshirt"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold">VIP Laundry Admin</h1>
                <p className="text-blue-100 text-sm">Sistem Manajemen Laundry</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right mr-3">
                <div className="font-semibold">{user?.name}</div>
                <div className="text-blue-100 text-sm">{user?.email}</div>
              </div>
              <Link href="/" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50">
                <i className="fas fa-home mr-2"></i>
                Website
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-6 font-semibold border-b-2 transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-blue-600'
              }`}
            >
              <i className="fas fa-tachometer-alt mr-2"></i>
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-6 font-semibold border-b-2 transition-colors ${
                activeTab === 'orders'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-blue-600'
              }`}
            >
              <i className="fas fa-list mr-2"></i>
              Pesanan ({stats.totalOrders})
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`py-4 px-6 font-semibold border-b-2 transition-colors ${
                activeTab === 'customers'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-blue-600'
              }`}
            >
              <i className="fas fa-users mr-2"></i>
              Pelanggan ({stats.totalCustomers})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
            
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
                <div className="text-3xl mb-2"><i className="fas fa-clock"></i></div>
                <div className="text-3xl font-bold mb-1">{stats.pending}</div>
                <div className="text-yellow-100">Pending</div>
              </div>
              <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <div className="text-3xl mb-2"><i className="fas fa-spinner"></i></div>
                <div className="text-3xl font-bold mb-1">{stats.processing}</div>
                <div className="text-blue-100">Diproses</div>
              </div>
              <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                <div className="text-3xl mb-2"><i className="fas fa-check-circle"></i></div>
                <div className="text-3xl font-bold mb-1">{stats.ready}</div>
                <div className="text-green-100">Siap Diambil</div>
              </div>
              <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <div className="text-3xl mb-2"><i className="fas fa-flag-checkered"></i></div>
                <div className="text-3xl font-bold mb-1">{stats.completed}</div>
                <div className="text-purple-100">Selesai</div>
              </div>
            </div>

            {/* More Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card">
                <div className="text-gray-500 mb-2">Total Pesanan</div>
                <div className="text-3xl font-bold text-gray-900">{stats.totalOrders}</div>
              </div>
              <div className="card">
                <div className="text-gray-500 mb-2">Total Pelanggan</div>
                <div className="text-3xl font-bold text-gray-900">{stats.totalCustomers}</div>
              </div>
              <div className="card">
                <div className="text-gray-500 mb-2">Total Pendapatan</div>
                <div className="text-3xl font-bold text-blue-600">{formatRupiah(stats.totalRevenue)}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pesanan</h2>
            
            {orders.length === 0 ? (
              <div className="card text-center py-12">
                <div className="text-6xl text-gray-300 mb-4">
                  <i className="fas fa-inbox"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Pesanan</h3>
                <p className="text-gray-600">Pesanan dari pelanggan akan muncul di sini</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="card">
                    <div className="flex flex-wrap justify-between items-start mb-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Order #{order.id}</div>
                        <div className="font-bold text-gray-900 mb-1">{order.customerName}</div>
                        <div className="text-sm text-gray-600">{order.customerPhone}</div>
                      </div>
                      <div className={getStatusClass(order.status)}>
                        {getStatusText(order.status)}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <div className="text-gray-500">Layanan</div>
                        <div className="font-semibold">{order.serviceName}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Berat</div>
                        <div className="font-semibold">{order.weight} kg</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Total</div>
                        <div className="font-semibold text-blue-600">{formatRupiah(order.totalPrice)}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Tanggal</div>
                        <div className="font-semibold">{formatDate(order.orderDate)}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'processing')}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold"
                        >
                          Proses
                        </button>
                      )}
                      {order.status === 'processing' && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'ready')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-semibold"
                        >
                          Tandai Siap
                        </button>
                      )}
                      {order.status === 'ready' && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'completed')}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-semibold"
                        >
                          Selesai
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-semibold"
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'customers' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pelanggan</h2>
            
            {customers.length === 0 ? (
              <div className="card text-center py-12">
                <div className="text-6xl text-gray-300 mb-4">
                  <i className="fas fa-users"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Pelanggan</h3>
                <p className="text-gray-600">Data pelanggan akan muncul di sini</p>
              </div>
            ) : (
              <div className="card overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Telepon</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Pesanan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{customer.name}</td>
                        <td className="py-3 px-4">{customer.phone}</td>
                        <td className="py-3 px-4 text-gray-600">{customer.email || '-'}</td>
                        <td className="py-3 px-4">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {customer.totalOrders} pesanan
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Detail Pesanan</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Nomor Pesanan</div>
                  <div className="text-lg font-bold text-blue-600">{selectedOrder.id}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Status</div>
                  <div className={getStatusClass(selectedOrder.status) + ' inline-block'}>
                    {getStatusText(selectedOrder.status)}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Pelanggan</div>
                    <div className="font-semibold">{selectedOrder.customerName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Telepon</div>
                    <div className="font-semibold">{selectedOrder.customerPhone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Email</div>
                    <div className="font-semibold">{selectedOrder.customerEmail || '-'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Layanan</div>
                    <div className="font-semibold">{selectedOrder.serviceName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Berat</div>
                    <div className="font-semibold">{selectedOrder.weight} kg</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Total Harga</div>
                    <div className="font-semibold text-blue-600">{formatRupiah(selectedOrder.totalPrice)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Tanggal Pesanan</div>
                    <div className="font-semibold">{formatDate(selectedOrder.orderDate)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Estimasi Selesai</div>
                    <div className="font-semibold">{formatDate(selectedOrder.estimatedFinish)}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Alamat</div>
                  <div className="font-semibold">{selectedOrder.customerAddress}</div>
                </div>
                {selectedOrder.notes && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Catatan</div>
                    <div className="font-semibold">{selectedOrder.notes}</div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-2">
                {selectedOrder.status !== 'completed' && (
                  <>
                    {selectedOrder.status === 'pending' && (
                      <button
                        onClick={() => handleStatusUpdate(selectedOrder.id, 'processing')}
                        className="btn btn-primary flex-1"
                      >
                        Mulai Proses
                      </button>
                    )}
                    {selectedOrder.status === 'processing' && (
                      <button
                        onClick={() => handleStatusUpdate(selectedOrder.id, 'ready')}
                        className="btn btn-secondary flex-1"
                      >
                        Tandai Siap
                      </button>
                    )}
                    {selectedOrder.status === 'ready' && (
                      <button
                        onClick={() => handleStatusUpdate(selectedOrder.id, 'completed')}
                        className="btn bg-purple-600 text-white hover:bg-purple-700 flex-1"
                      >
                        Selesaikan
                      </button>
                    )}
                  </>
                )}
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="btn bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

