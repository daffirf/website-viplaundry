import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                Professional Laundry Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Layanan laundry profesional dengan harga terjangkau. Cucian bersih, wangi, dan rapi dalam waktu singkat.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/booking" className="btn btn-primary">
                  <i className="fas fa-calendar-check mr-2"></i>
                  Booking Sekarang
                </Link>
                <Link href="/tracking" className="btn bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                  <i className="fas fa-search mr-2"></i>
                  Lacak Pesanan
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="card bg-gradient-to-br from-blue-600 to-blue-500 text-white p-8">
                <div className="text-6xl mb-4">
                  <i className="fas fa-tshirt"></i>
                </div>
                <h3 className="text-2xl font-bold mb-2">Cepat & Terpercaya</h3>
                <p>Layanan same-day tersedia!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Layanan Kami</h2>
            <p className="text-xl text-gray-600">Pilih layanan yang sesuai dengan kebutuhan Anda</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="card hover:shadow-2xl">
              <div className="text-4xl text-blue-600 mb-4">
                <i className="fas fa-water"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Cuci Reguler</h3>
              <p className="text-gray-600 mb-4">Layanan cuci standar dengan kualitas terbaik</p>
              <p className="text-2xl font-bold text-blue-600">Rp 5.000/kg</p>
              <p className="text-sm text-gray-500">2-3 hari</p>
            </div>

            <div className="card hover:shadow-2xl">
              <div className="text-4xl text-blue-600 mb-4">
                <i className="fas fa-bolt"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Cuci Express</h3>
              <p className="text-gray-600 mb-4">Cucian selesai dalam 1 hari</p>
              <p className="text-2xl font-bold text-blue-600">Rp 8.000/kg</p>
              <p className="text-sm text-gray-500">1 hari</p>
            </div>

            <div className="card hover:shadow-2xl">
              <div className="text-4xl text-blue-600 mb-4">
                <i className="fas fa-star"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Cuci Premium</h3>
              <p className="text-gray-600 mb-4">Detergen khusus dan pewangi premium</p>
              <p className="text-2xl font-bold text-blue-600">Rp 12.000/kg</p>
              <p className="text-sm text-gray-500">2 hari</p>
            </div>

            <div className="card hover:shadow-2xl">
              <div className="text-4xl text-blue-600 mb-4">
                <i className="fas fa-iron"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Setrika Saja</h3>
              <p className="text-gray-600 mb-4">Layanan setrika dan lipat rapi</p>
              <p className="text-2xl font-bold text-blue-600">Rp 3.000/kg</p>
              <p className="text-sm text-gray-500">1 hari</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Mengapa Pilih Kami?</h2>
            <p className="text-xl text-gray-600">Keunggulan VIP Laundry</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl text-blue-600 mb-4">
                <i className="fas fa-clock"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Cepat & Tepat Waktu</h3>
              <p className="text-gray-600">
                Pesanan Anda selesai tepat waktu sesuai estimasi
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl text-green-600 mb-4">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Kualitas Terjamin</h3>
              <p className="text-gray-600">
                Menggunakan detergen berkualitas dan teknologi modern
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl text-blue-600 mb-4">
                <i className="fas fa-truck"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Antar Jemput</h3>
              <p className="text-gray-600">
                Layanan pickup dan delivery untuk kenyamanan Anda
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Siap Mencoba Layanan Kami?</h2>
          <p className="text-xl mb-8">Buat pesanan sekarang dan rasakan perbedaannya!</p>
          <Link
            href="/booking"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <i className="fas fa-calendar-check mr-2"></i>
            Booking Sekarang
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

