# 🧺 LaundryPro - Sistem Manajemen Laundry

Aplikasi manajemen laundry berbasis website yang modern, responsif, dan mudah digunakan untuk mengelola bisnis laundry Anda.

## ✨ Fitur Utama

### 📊 Dashboard
- **Statistik Real-time**: Melihat jumlah pesanan pending, dalam proses, selesai, dan total pelanggan
- **Pesanan Terbaru**: Daftar 5 pesanan terbaru dengan status
- **Aksi Cepat**: Tombol untuk menambah pesanan, pelanggan, dan generate laporan

### 📋 Manajemen Pesanan
- **Tambah Pesanan Baru**: Form lengkap untuk input pesanan
- **Tracking Status**: Update status pesanan (Pending → Dalam Proses → Siap Diambil → Selesai)
- **Filter & Pencarian**: Filter berdasarkan status dan tanggal
- **Detail Pesanan**: Informasi lengkap setiap pesanan

### 👥 Manajemen Pelanggan
- **Database Pelanggan**: Simpan data lengkap pelanggan
- **Riwayat Pesanan**: Tracking total pesanan setiap pelanggan
- **CRUD Operations**: Tambah, edit, hapus, dan lihat detail pelanggan

### ⚙️ Manajemen Layanan
- **Daftar Layanan**: Cuci reguler, express, premium, setrika
- **Harga Dinamis**: Harga per kg yang dapat dikustomisasi
- **Estimasi Waktu**: Informasi waktu pengerjaan setiap layanan

### 📈 Laporan & Analitik
- **Laporan Periodik**: Harian, mingguan, bulanan, tahunan
- **Filter Tanggal**: Pilih rentang waktu laporan
- **Statistik Bisnis**: Total pendapatan, jumlah pesanan, rata-rata nilai pesanan

### ⚙️ Pengaturan
- **Informasi Toko**: Nama, alamat, telepon, email
- **Penyimpanan Lokal**: Data tersimpan di browser (localStorage)

## 🚀 Cara Menjalankan

### Prerequisites
- Web browser modern (Chrome, Firefox, Safari, Edge)
- Tidak memerlukan server atau database

### Langkah Instalasi
1. **Download/Clone** repository ini
2. **Buka file** `index.html` di browser
3. **Aplikasi siap digunakan!** 🎉

### Struktur File
```
laundry-management/
├── index.html          # File HTML utama
├── styles.css          # Styling dan CSS
├── script.js           # JavaScript dan logika aplikasi
└── README.md           # Dokumentasi ini
```

## 🎨 Interface & Design

### Design System
- **Modern UI/UX**: Menggunakan gradient colors dan shadow effects
- **Responsive Design**: Bekerja optimal di desktop, tablet, dan mobile
- **Color Scheme**: 
  - Primary: Blue-Purple gradient (#667eea → #764ba2)
  - Success: Green (#28a745)
  - Warning: Orange (#ff6b6b)
  - Info: Blue (#4ecdc4)

### Komponen UI
- **Sidebar Navigation**: Menu navigasi dengan ikon dan hover effects
- **Card Components**: Statistik cards dengan animasi hover
- **Data Tables**: Tabel responsif dengan sorting dan filtering
- **Modal Forms**: Form input yang user-friendly
- **Status Badges**: Indikator status dengan warna yang berbeda

## 💻 Teknologi yang Digunakan

### Frontend
- **HTML5**: Struktur semantik dan modern
- **CSS3**: 
  - Flexbox & Grid Layout
  - CSS Variables
  - Animations & Transitions
  - Media Queries untuk responsive design
- **Vanilla JavaScript**: 
  - ES6+ features
  - DOM manipulation
  - Event handling
  - Local storage

### Libraries & Icons
- **Font Awesome**: Ikon-ikon yang indah dan konsisten
- **Google Fonts**: Typography yang modern dan readable

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 1024px (Full layout dengan sidebar)
- **Tablet**: 768px - 1024px (Sidebar compact)
- **Mobile**: < 768px (Sidebar hidden, mobile-first approach)

### Mobile Features
- **Touch-friendly**: Button sizes optimal untuk touch
- **Swipe gestures**: Navigasi yang mudah di mobile
- **Optimized tables**: Horizontal scroll untuk tabel di mobile

## 🔧 Fitur Teknis

### Data Management
- **In-Memory Storage**: Data disimpan di JavaScript arrays
- **Local Storage**: Pengaturan toko tersimpan di browser
- **Data Persistence**: Data tetap ada selama session browser

### Performance
- **Lazy Loading**: Data dimuat sesuai halaman yang aktif
- **Efficient DOM**: Minimal DOM manipulation
- **Optimized Rendering**: Update hanya elemen yang berubah

### Browser Compatibility
- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **ES6 Support**: Menggunakan modern JavaScript features
- **CSS Grid/Flexbox**: Layout modern yang responsif

## 📊 Struktur Data

### Customer Object
```javascript
{
    id: Number,
    name: String,
    email: String,
    phone: String,
    address: String,
    totalOrders: Number,
    status: String
}
```

### Service Object
```javascript
{
    id: Number,
    name: String,
    price: Number,
    description: String,
    duration: Number
}
```

### Order Object
```javascript
{
    id: Number,
    customerId: Number,
    customerName: String,
    serviceId: Number,
    serviceName: String,
    weight: Number,
    totalPrice: Number,
    status: String,
    orderDate: String,
    estimatedFinish: String,
    notes: String
}
```

## 🚀 Roadmap & Fitur Mendatang

### Phase 2 (Next Release)
- [ ] **Database Integration**: MySQL/PostgreSQL backend
- [ ] **User Authentication**: Login system dengan roles
- [ ] **Print Receipts**: Generate dan print struk pesanan
- [ ] **SMS Notifications**: Notifikasi status via SMS
- [ ] **Payment Integration**: Integrasi payment gateway

### Phase 3 (Future)
- [ ] **Mobile App**: React Native mobile application
- [ ] **API Development**: RESTful API untuk third-party integration
- [ ] **Advanced Analytics**: Charts dan grafik interaktif
- [ ] **Inventory Management**: Manajemen stok detergen dan perlengkapan
- [ ] **Customer Portal**: Portal pelanggan untuk tracking pesanan

## 🐛 Troubleshooting

### Common Issues
1. **Data tidak tersimpan**: Pastikan browser support localStorage
2. **Layout rusak**: Refresh halaman atau clear browser cache
3. **Fitur tidak berfungsi**: Pastikan JavaScript enabled di browser

### Browser Support
- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ❌ Internet Explorer (Not supported)

## 🤝 Contributing

### Cara Berkontribusi
1. **Fork** repository ini
2. **Create branch** untuk fitur baru (`git checkout -b feature/AmazingFeature`)
3. **Commit** perubahan (`git commit -m 'Add some AmazingFeature'`)
4. **Push** ke branch (`git push origin feature/AmazingFeature`)
5. **Open Pull Request**

### Development Guidelines
- Gunakan **ES6+** syntax
- Ikuti **conventional commits** format
- Test di **multiple browsers**
- Maintain **responsive design**

## 📄 License

Project ini dilisensikan di bawah **MIT License** - lihat file [LICENSE](LICENSE) untuk detail.

## 📞 Support & Contact

### Getting Help
- **Issues**: Buat issue di GitHub repository
- **Discussions**: Gunakan GitHub Discussions untuk pertanyaan
- **Email**: [your-email@domain.com]

### Community
- **GitHub**: [Repository URL]
- **Documentation**: [Wiki/Website]
- **Demo**: [Live Demo URL]

---

## 🎯 Quick Start Guide

### Untuk Pemula
1. **Buka aplikasi** di browser
2. **Dashboard** akan menampilkan statistik
3. **Klik menu** di sidebar untuk navigasi
4. **Tambah data** menggunakan tombol "+" di setiap halaman
5. **Explore fitur** satu per satu

### Tips Penggunaan
- **Gunakan search bar** untuk mencari data cepat
- **Filter data** untuk melihat informasi spesifik
- **Update status** pesanan secara berkala
- **Generate laporan** untuk analisis bisnis

---

**Dibuat dengan ❤️ untuk bisnis laundry Indonesia**

*LaundryPro - Solusi manajemen laundry yang modern dan efisien*
