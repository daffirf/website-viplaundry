import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <i className="fas fa-tshirt text-blue-500"></i>
              VIP Laundry
            </h3>
            <p className="text-gray-400">
              Layanan laundry profesional dengan harga terjangkau dan kualitas terbaik.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-400 hover:text-white transition-colors">
                  Booking
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="text-gray-400 hover:text-white transition-colors">
                  Tracking
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <i className="fas fa-phone"></i>
                <span>081234567890</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-envelope"></i>
                <span>info@viplaundry.com</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt"></i>
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Jam Operasional</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Senin - Jumat: 08.00 - 20.00</li>
              <li>Sabtu: 08.00 - 18.00</li>
              <li>Minggu: Tutup</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 VIP Laundry. All rights reserved.</p>
          <p className="mt-2">Made with ❤️ by Muhammad Rafli Fajri</p>
        </div>
      </div>
    </footer>
  );
}

