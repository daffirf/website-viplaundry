'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLaundryStore, Order } from '@/lib/store';
import { formatDate, getStatusText, getStatusClass, formatRupiah } from '@/lib/utils';

function TrackingContent() {
  const searchParams = useSearchParams();
  const { getOrdersByCustomer } = useLaundryStore();
  
  const [phone, setPhone] = useState(searchParams?.get('phone') || '');
  const [orders, setOrders] = useState<Order[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    // Auto search if phone is in URL
    if (phone) {
      handleSearch();
    }
  }, []);

  const handleSearch = () => {
    if (!phone.trim()) {
      alert('Masukkan nomor telepon terlebih dahulu!');
      return;
    }

    const foundOrders = getOrdersByCustomer(phone);
    setOrders(foundOrders.sort((a, b) => 
      new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    ));
    setHasSearched(true);
  };

  const getTimelineSteps = (status: string) => {
    const steps = [
      { 
        id: 'pending', 
        icon: 'fa-clock', 
        title: 'Pesanan Diterima', 
        desc: 'Pesanan Anda sedang diproses' 
      },
      { 
        id: 'processing', 
        icon: 'fa-spinner', 
        title: 'Sedang Dicuci', 
        desc: 'Laundry Anda sedang dikerjakan' 
      },
      { 
        id: 'ready', 
        icon: 'fa-check-circle', 
        title: 'Siap Diambil', 
        desc: 'Laundry sudah selesai dan siap diambil' 
      },
      { 
        id: 'completed', 
        icon: 'fa-flag-checkered', 
        title: 'Selesai', 
        desc: 'Pesanan telah selesai' 
      }
    ];

    const statusOrder = ['pending', 'processing', 'ready', 'completed'];
    const currentIndex = statusOrder.indexOf(status);

    return steps.map((step, index) => {
      let className = 'bg-gray-200 text-gray-400'; // inactive
      if (index < currentIndex) {
        className = 'bg-green-600 text-white'; // completed
      } else if (index === currentIndex) {
        className = 'bg-blue-600 text-white'; // active
      }

      return { ...step, className };
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-32">
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Kembali ke Home
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Search Card */}
          <div className="card mb-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                <i className="fas fa-search text-blue-600 mr-3"></i>
                Lacak Pesanan
              </h1>
              <p className="text-gray-600">Masukkan nomor telepon untuk melihat pesanan Anda</p>
            </div>

            <div className="flex gap-4">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Masukkan nomor telepon (08xxxxxxxxxx)"
                className="flex-1"
              />
              <button
                onClick={handleSearch}
                className="btn btn-primary whitespace-nowrap"
              >
                <i className="fas fa-search mr-2"></i>
                Cari
              </button>
            </div>
          </div>

          {/* Results */}
          {hasSearched && (
            <>
              {orders.length === 0 ? (
                <div className="card text-center py-12">
                  <div className="text-6xl text-gray-300 mb-4">
                    <i className="fas fa-inbox"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak Ada Pesanan</h3>
                  <p className="text-gray-600 mb-6">
                    Tidak ada pesanan ditemukan dengan nomor telepon ini.
                  </p>
                  <Link href="/booking" className="btn btn-primary">
                    <i className="fas fa-plus mr-2"></i>
                    Buat Pesanan Baru
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="mb-4 text-gray-600">
                    Ditemukan {orders.length} pesanan
                  </div>

                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="card">
                        {/* Order Header */}
                        <div className="flex flex-wrap justify-between items-start mb-4 pb-4 border-b-2 border-gray-100">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Nomor Pesanan</div>
                            <div className="text-xl font-bold text-blue-600">{order.id}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              {formatDate(order.orderDate)}
                            </div>
                          </div>
                          <div className={getStatusClass(order.status)}>
                            {getStatusText(order.status)}
                          </div>
                        </div>

                        {/* Order Details */}
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Layanan</div>
                            <div className="font-semibold text-gray-900">{order.serviceName}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Berat</div>
                            <div className="font-semibold text-gray-900">{order.weight} kg</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Total Harga</div>
                            <div className="font-semibold text-blue-600">
                              {formatRupiah(order.totalPrice)}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Estimasi Selesai</div>
                            <div className="font-semibold text-gray-900">
                              {formatDate(order.estimatedFinish)}
                            </div>
                          </div>
                          {order.notes && (
                            <div className="md:col-span-2">
                              <div className="text-sm text-gray-500 mb-1">Catatan</div>
                              <div className="text-gray-700">{order.notes}</div>
                            </div>
                          )}
                        </div>

                        {/* Timeline */}
                        <div className="border-t-2 border-gray-100 pt-6">
                          <div className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <i className="fas fa-list-check text-blue-600"></i>
                            Status Pesanan
                          </div>
                          <div className="space-y-4">
                            {getTimelineSteps(order.status).map((step, index) => (
                              <div key={step.id} className="flex gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${step.className}`}>
                                  <i className={`fas ${step.icon} text-xl`}></i>
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900">{step.title}</h4>
                                  <p className="text-sm text-gray-600">{step.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <TrackingContent />
    </Suspense>
  );
}

