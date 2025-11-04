# 🧺 VIP Laundry - Complete Laundry Management System

Sistem manajemen laundry lengkap yang terdiri dari panel admin untuk pengelolaan bisnis dan website landing page untuk pelanggan. Dibangun dengan teknologi web modern menggunakan HTML5, CSS3, dan Vanilla JavaScript.

## 📦 Struktur Project

```
website-viplaundry/
├── admin/              # Panel Admin - Sistem Manajemen Laundry
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── dark-mode.js
│   ├── demo-data.js
│   ├── keyboard-shortcuts.js
│   ├── notifications.js
│   ├── receipt-template.html
│   ├── package.json
│   └── README.md
├── user/               # Website Pelanggan - Landing Page
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── README.md
├── LICENSE
└── README.md           # File ini
```

## ✨ Fitur Utama

### 🔧 Admin Panel (LaundryPro Management System)

**Dashboard & Monitoring**:
- 📊 Statistik real-time (pesanan pending, proses, selesai, total pelanggan)
- 📈 Laporan periodik (harian, mingguan, bulanan, tahunan)
- 🎯 Aksi cepat untuk operasi bisnis
- 🔔 Sistem notifikasi

**Manajemen Pesanan**:
- ➕ Tambah pesanan baru dengan form lengkap
- 🔄 Tracking status pesanan (Pending → Proses → Siap → Selesai)
- 🔍 Filter & pencarian berdasarkan status dan tanggal
- 📄 Detail pesanan lengkap
- 🧾 Template receipt/struk

**Manajemen Pelanggan**:
- 👥 Database pelanggan dengan CRUD operations
- 📊 Riwayat pesanan per pelanggan
- 📱 Informasi kontak lengkap
- 📈 Total pesanan per pelanggan

**Manajemen Layanan**:
- 🧺 Daftar layanan (Cuci Reguler, Express, Premium, Setrika)
- 💰 Harga per kg yang dapat dikustomisasi
- ⏱️ Estimasi waktu pengerjaan
- 📝 Deskripsi layanan

**Pengaturan**:
- 🏪 Informasi toko (nama, alamat, telepon, email)
- 🌙 Dark mode support
- ⌨️ Keyboard shortcuts
- 💾 Penyimpanan lokal (localStorage)

### 🌐 User Website (FreshClean Laundry)

**Landing Page Features**:
- 🎨 Modern & professional design
- 📱 Fully responsive (mobile-first)
- ✨ Smooth animations & transitions
- 🎯 Clear call-to-action buttons

**Sections**:
- 🏠 Hero Section - Landing area yang menarik
- 🧺 Services - 4 layanan utama dengan deskripsi
- 💳 Pricing - 3 paket harga (Basic, Premium, Ultimate)
- ℹ️ About - Informasi perusahaan
- 📞 Contact - Form kontak & informasi bisnis
- 🔗 Footer - Links & social media

**Interactive Elements**:
- 📱 Mobile navigation dengan hamburger menu
- 📜 Smooth scrolling navigation
- ✅ Form validation
- 🎨 Hover effects pada cards
- 📊 Scroll progress bar
- ⬆️ Back to top button
- 📬 Notification system

## 🚀 Cara Menjalankan

### Quick Start

**Admin Panel**:
```bash
cd admin
# Buka index.html di browser
# Atau jalankan dengan simple server:
python -m http.server 8000
# Akses: http://localhost:8000
```

**User Website**:
```bash
cd user
# Buka index.html di browser
# Atau gunakan browser langsung
```

### Prerequisites

- ✅ Web browser modern (Chrome, Firefox, Safari, Edge)
- ✅ Tidak memerlukan instalasi dependencies
- ✅ Tidak memerlukan database atau server
- ✅ Langsung jalan di browser

### Instalasi

1. **Clone atau Download** repository
```bash
git clone [repository-url]
cd website-viplaundry
```

2. **Buka Admin Panel**
```bash
cd admin
# Buka index.html di browser
```

3. **Buka User Website**
```bash
cd user
# Buka index.html di browser
```

4. **Selesai!** Aplikasi siap digunakan 🎉

## 💻 Teknologi yang Digunakan

### Frontend
- **HTML5**: Semantic markup & modern structure
- **CSS3**: 
  - Flexbox & Grid layouts
  - CSS Variables
  - Animations & Transitions
  - Media Queries (responsive)
  - Gradient backgrounds
- **Vanilla JavaScript**:
  - ES6+ features
  - DOM manipulation
  - Event handling
  - LocalStorage API
  - Form validation

### Libraries & Resources
- **Font Awesome**: Icon library
- **Google Fonts**: Poppins typography
- **Intersection Observer API**: Scroll animations

## 🎨 Design System

### Admin Panel
- **Color Scheme**: Blue-Purple gradient (#667eea → #764ba2)
- **Layout**: Sidebar navigation dengan content area
- **Components**: Cards, tables, modals, forms
- **Theme**: Light mode (default) + Dark mode

### User Website
- **Color Scheme**: Blue-based (#2563eb, #3b82f6, #10b981)
- **Layout**: Single-page with sections
- **Design**: Modern, clean, professional
- **Typography**: Poppins font family

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 1024px (full layout)
- **Tablet**: 768px - 1024px (adjusted layout)
- **Mobile**: < 768px (single column)

### Mobile Features
- Touch-friendly button sizes
- Hamburger menu navigation
- Optimized forms & tables
- Swipe gestures support

## 📊 Struktur Data

### Admin - Customer Object
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

### Admin - Service Object
```javascript
{
    id: Number,
    name: String,
    price: Number,
    description: String,
    duration: Number
}
```

### Admin - Order Object
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

## 🎯 Fitur Unggulan

### Admin Panel
✅ Real-time dashboard statistics  
✅ Complete order management (CRUD)  
✅ Customer database management  
✅ Service & pricing management  
✅ Periodic reports & analytics  
✅ Dark mode support  
✅ Keyboard shortcuts  
✅ Receipt template  
✅ Local data persistence  
✅ Notification system  

### User Website
✅ Modern landing page design  
✅ Service showcase  
✅ Pricing packages  
✅ Contact form with validation  
✅ Smooth scroll navigation  
✅ Responsive on all devices  
✅ Interactive animations  
✅ Progress indicators  
✅ Social media integration  

## 🔧 Kustomisasi

### Mengubah Warna

**Admin Panel** (`admin/styles.css`):
```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --success-color: #28a745;
    --warning-color: #ff6b6b;
    --info-color: #4ecdc4;
}
```

**User Website** (`user/styles.css`):
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #3b82f6;
    --accent-color: #10b981;
}
```

### Mengubah Konten

1. Edit `index.html` di folder `admin/` atau `user/`
2. Update informasi bisnis (nama, alamat, telepon)
3. Ubah layanan dan harga
4. Ganti logo dan gambar

### Menambah Fitur

1. Tambah JavaScript di `script.js`
2. Tambah styling di `styles.css`
3. Update HTML structure sesuai kebutuhan

## 🚀 Deployment

### Local Development
Buka `index.html` langsung di browser atau gunakan simple HTTP server.

### Web Hosting
1. Upload semua files ke hosting provider
2. Pastikan struktur folder tetap sama
3. Akses via domain name

### GitHub Pages
1. Push ke GitHub repository
2. Enable GitHub Pages di settings
3. Pilih branch source (main/master)
4. Website otomatis tersedia di `username.github.io/repo-name`

### Vercel/Netlify
1. Connect repository ke Vercel/Netlify
2. Deploy dengan one-click
3. Auto-deployment pada setiap push

## 🔮 Roadmap & Future Development

### Phase 2 - Backend Integration
- [ ] Database integration (MySQL/PostgreSQL)
- [ ] User authentication system
- [ ] RESTful API development
- [ ] Real-time order updates
- [ ] Payment gateway integration

### Phase 3 - Advanced Features
- [ ] Mobile app (React Native/Flutter)
- [ ] SMS/WhatsApp notifications
- [ ] Online booking system
- [ ] Customer portal untuk tracking
- [ ] Advanced analytics & charts
- [ ] Inventory management
- [ ] Multi-branch support
- [ ] API for third-party integration

### Phase 4 - Enhancement
- [ ] Progressive Web App (PWA)
- [ ] Multi-language support
- [ ] QR code for order tracking
- [ ] Loyalty program
- [ ] Email automation
- [ ] AI-powered pricing suggestions

## 🐛 Troubleshooting

### Common Issues

**Data tidak tersimpan**:
- Pastikan browser support localStorage
- Check browser settings
- Clear cache dan refresh

**Layout rusak**:
- Hard refresh (Ctrl + F5)
- Clear browser cache
- Check console untuk errors

**JavaScript tidak berfungsi**:
- Pastikan JavaScript enabled
- Check browser compatibility
- Open DevTools console untuk error messages

### Browser Support
- ✅ Chrome 80+ (Recommended)
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ❌ Internet Explorer (Not supported)

## 📚 Dokumentasi Lengkap

Untuk dokumentasi lebih detail, lihat:
- **Admin Panel**: [admin/README.md](admin/README.md)
- **User Website**: [user/README.md](user/README.md)

## 🤝 Contributing

Kontribusi sangat diterima! Untuk berkontribusi:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Development Guidelines
- Gunakan ES6+ syntax
- Follow conventional commits
- Test di multiple browsers
- Maintain responsive design
- Add comments untuk code yang kompleks

## 📄 License

Project ini dilisensikan di bawah **MIT License** - lihat file [LICENSE](LICENSE) untuk detail lengkap.

## 📞 Support & Contact

### Getting Help
- **Issues**: Buat issue di GitHub repository untuk bug reports
- **Discussions**: Gunakan GitHub Discussions untuk pertanyaan
- **Documentation**: Lihat README di masing-masing folder

### Developer
**Muhammad Rafli Fajri**
- GitHub: [@daffirf](https://github.com/daffirf)
- Email: [your-email@domain.com]

## 🙏 Acknowledgments

- **Font Awesome** - Beautiful icons
- **Google Fonts** - Poppins typography
- **CSS Grid & Flexbox** - Modern layouts
- **Intersection Observer API** - Scroll animations
- **LocalStorage API** - Data persistence

## 🎯 Quick Start Guide

### Untuk Pemula

**Admin Panel**:
1. Buka `admin/index.html` di browser
2. Dashboard otomatis tampil dengan demo data
3. Navigasi menggunakan sidebar menu
4. Tambah pesanan, pelanggan, atau layanan
5. Generate laporan untuk analisis bisnis

**User Website**:
1. Buka `user/index.html` di browser
2. Scroll untuk melihat semua sections
3. Klik navigation menu untuk jump ke section
4. Isi contact form untuk inquiry
5. Responsive - coba di mobile/tablet

### Tips Penggunaan

- **Admin**: Gunakan keyboard shortcuts untuk navigasi cepat
- **Admin**: Toggle dark mode untuk kenyamanan mata
- **Admin**: Export laporan untuk backup data
- **User**: Isi form kontak untuk komunikasi dengan bisnis
- **User**: Lihat pricing untuk memilih paket yang sesuai

---

## 🌟 Highlights

✨ **Modern UI/UX** - Interface yang indah dan intuitif  
🚀 **Fast Performance** - Optimized untuk kecepatan  
📱 **Fully Responsive** - Perfect di semua devices  
🔧 **Easy to Customize** - Mudah disesuaikan  
💾 **No Backend Required** - Langsung jalan tanpa setup  
🎨 **Professional Design** - Design berkualitas tinggi  
📊 **Complete Management** - Fitur lengkap untuk bisnis laundry  
🌙 **Dark Mode** - Nyaman untuk mata (admin panel)  

---

**Dibuat dengan ❤️ untuk bisnis laundry Indonesia**

**VIP Laundry** - Solusi manajemen laundry yang modern, efisien, dan profesional! 🧺✨

