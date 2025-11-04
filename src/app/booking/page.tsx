'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLaundryStore } from '@/lib/store';
import { validatePhone, formatDateSimple, calculateEstimatedFinish, formatRupiah } from '@/lib/utils';

export default function BookingPage() {
  const router = useRouter();
  const { services, addOrder } = useLaundryStore();
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: '',
    weight: '',
    notes: ''
  });

  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize store on mount
  useEffect(() => {
    useLaundryStore.getState().initializeDefaultData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleServiceSelect = (service: typeof services[0]) => {
    setSelectedService(service);
    if (errors.service) {
      setErrors(prev => ({ ...prev, service: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Nama lengkap wajib diisi';
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Nomor telepon wajib diisi';
    } else if (!validatePhone(formData.customerPhone)) {
      newErrors.customerPhone = 'Format nomor telepon tidak valid';
    }

    if (!formData.customerAddress.trim()) {
      newErrors.customerAddress = 'Alamat lengkap wajib diisi';
    }

    if (!formData.weight || parseFloat(formData.weight) < 1) {
      newErrors.weight = 'Berat minimal 1 kg';
    }

    if (!selectedService) {
      newErrors.service = 'Silakan pilih layanan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const weight = parseFloat(formData.weight);
      const totalPrice = weight * (selectedService?.price || 0);
      const estimatedFinish = calculateEstimatedFinish(selectedService?.duration || 3);

      const newOrder = addOrder({
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail,
        customerAddress: formData.customerAddress,
        serviceId: selectedService!.id,
        serviceName: selectedService!.name,
        weight,
        totalPrice,
        estimatedFinish: estimatedFinish.toISOString(),
        notes: formData.notes
      });

      // Show success and redirect
      alert(`Pesanan berhasil dibuat!\n\nNomor Pesanan: ${newOrder.id}\n\nSilakan simpan nomor pesanan untuk tracking.`);
      
      // Redirect to tracking page
      router.push(`/tracking?phone=${formData.customerPhone}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotal = () => {
    if (!selectedService || !formData.weight) return 0;
    return parseFloat(formData.weight) * selectedService.price;
  };

  const getEstimatedFinish = () => {
    if (!selectedService) return '-';
    const date = calculateEstimatedFinish(selectedService.duration);
    return formatDateSimple(date);
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
          <div className="card">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                <i className="fas fa-calendar-check text-blue-600 mr-3"></i>
                Booking Laundry
              </h1>
              <p className="text-gray-600">Isi form di bawah ini untuk membuat pesanan</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama lengkap"
                    className={errors.customerName ? 'border-red-500' : ''}
                  />
                  {errors.customerName && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Nomor Telepon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    placeholder="08xxxxxxxxxx"
                    className={errors.customerPhone ? 'border-red-500' : ''}
                  />
                  {errors.customerPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Berat (kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="1"
                    step="0.5"
                    className={errors.weight ? 'border-red-500' : ''}
                  />
                  {errors.weight && (
                    <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Alamat Lengkap <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="customerAddress"
                  value={formData.customerAddress}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Masukkan alamat lengkap untuk pickup"
                  className={errors.customerAddress ? 'border-red-500' : ''}
                />
                {errors.customerAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerAddress}</p>
                )}
              </div>

              {/* Services */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">
                  Pilih Layanan <span className="text-red-500">*</span>
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedService?.id === service.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900">{service.name}</h4>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600">
                            {formatRupiah(service.price)}
                          </div>
                          <div className="text-sm text-gray-500">{service.duration} hari</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  ))}
                </div>
                {errors.service && (
                  <p className="text-red-500 text-sm mt-2">{errors.service}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Catatan Tambahan
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Misalnya: Jemput jam 10 pagi, ada noda membandel, dll"
                />
              </div>

              {/* Price Calculation */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Layanan:</span>
                    <span className="font-medium">{selectedService?.name || '-'}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Harga per kg:</span>
                    <span className="font-medium">
                      {selectedService ? formatRupiah(selectedService.price) : 'Rp 0'}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Berat:</span>
                    <span className="font-medium">{formData.weight || '0'} kg</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimasi Selesai:</span>
                    <span className="font-medium">{getEstimatedFinish()}</span>
                  </div>
                  <div className="border-t-2 border-gray-300 pt-3 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total:</span>
                    <span className="text-blue-600">{formatRupiah(calculateTotal())}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Memproses...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check-circle mr-2"></i>
                    Buat Pesanan
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

