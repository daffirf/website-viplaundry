# 🧺 VIP Laundry - Next.js Version

Website manajemen laundry profesional menggunakan **Next.js 15**, **TypeScript**, **Tailwind CSS**, dan **Zustand** untuk state management.

## ✨ Fitur Utama

### 🔐 Authentication System (NEW!)
- ✅ **Login & Register** - Sistem authentication lengkap
- ✅ **Role-Based Access** - Membedakan admin dan user
- ✅ **Protected Routes** - Admin panel hanya untuk admin
- ✅ **Persistent Session** - Tetap login setelah refresh
- ✅ **User Profile** - Info user di Navbar

### 🛍️ User Website
- ✅ **Home Page** - Landing page yang menarik dengan informasi layanan
- ✅ **Booking Page** - Form pemesanan lengkap dengan validasi
- ✅ **Tracking Page** - Lacak pesanan dengan timeline status real-time
- ✅ **Responsive Design** - Mobile-first dan sempurna di semua device

### 👨‍💼 Admin Panel
- ✅ **Dashboard** - Statistik lengkap (pending, processing, ready, completed)
- ✅ **Orders Management** - Kelola pesanan & update status
- ✅ **Customers Management** - Lihat data pelanggan
- ✅ **Auto-refresh** - Update otomatis setiap 5 detik
- ✅ **Protected Access** - Hanya admin yang bisa akses

### 🎯 Core Features
- ✅ **State Management** - Zustand dengan localStorage persistence
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Modern UI** - Tailwind CSS dengan gradient & animations
- ✅ **Form Validation** - Validasi lengkap untuk semua input
- ✅ **Phone Validation** - Format nomor telepon Indonesia
- ✅ **Real-time Sync** - Data shared antara user & admin
- ✅ **Authentication** - Login/register dengan role management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

```bash
# Clone atau masuk ke folder
cd website-viplaundry-nextjs

# Install dependencies
npm install

# Run development server
npm run dev
```

Buka browser dan akses:
- **User Website**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register
- **Booking**: http://localhost:3000/booking
- **Tracking**: http://localhost:3000/tracking
- **Admin Panel**: http://localhost:3000/admin (requires admin login)

### Build for Production

```bash
# Build production
npm run build

# Start production server
npm run start
```

## 🔐 Authentication

Sistem authentication lengkap dengan role-based access control.

### Default Admin Account
```
Email: admin@viplaundry.com
Password: admin123
Role: admin
```

### User Roles
- **Admin**: Full access ke admin panel, manage orders & customers
- **User**: Booking, tracking, view own orders

### ⭐ NEW: Role Selection at Register
Sekarang user bisa **memilih jenis akun** saat register:
- **User (Pelanggan)** - Untuk booking & tracking
- **Admin (Pengelola)** - Full akses admin panel

### Quick Test
1. **Login as Admin**: http://localhost:3000/login → admin@viplaundry.com / admin123
2. **Register as User**: http://localhost:3000/register → Pilih "User (Pelanggan)"
3. **Register as Admin**: http://localhost:3000/register → Pilih "Admin (Pengelola)"
4. **Protected Route**: Coba akses /admin tanpa login → redirect ke login

⚠️ **Security Note**: Untuk production, tambahkan admin approval atau registration code untuk mencegah registrasi admin sembarangan.

📖 **Full Documentation**: [AUTHENTICATION.md](AUTHENTICATION.md)

## 📁 Structure Project

```
website-viplaundry-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles
│   │   ├── login/              # ⭐ NEW
│   │   │   └── page.tsx        # Login page
│   │   ├── register/           # ⭐ NEW
│   │   │   └── page.tsx        # Register page
│   │   ├── booking/
│   │   │   └── page.tsx        # Booking page
│   │   ├── tracking/
│   │   │   └── page.tsx        # Tracking page
│   │   └── admin/
│   │       └── page.tsx        # Admin panel (protected)
│   ├── components/             # Reusable components
│   │   ├── Navbar.tsx          # Auth-aware navigation
│   │   └── Footer.tsx          # Footer component
│   └── lib/                    # Utilities & store
│       ├── store.ts            # Laundry data store
│       ├── auth-store.ts       # ⭐ NEW - Auth store
│       └── utils.ts            # Helper functions
├── public/                     # Static files
├── AUTHENTICATION.md           # ⭐ NEW - Auth docs
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 💻 Tech Stack

### Core
- **Next.js** 15.1.3 (App Router)
- **React** 19.0.0
- **TypeScript** ^5

### State Management
- **Zustand** 4.5.0 (with localStorage persistence)

### Styling
- **Tailwind CSS** 3.4.0
- **PostCSS** ^8
- **Autoprefixer** ^10

### Icons & Fonts
- **Font Awesome** 6.0.0 (via CDN)
- **Google Fonts** - Poppins

## 🎨 Features Detail

### 1. Booking System

**Form Fields**:
- Nama Lengkap (required)
- Nomor Telepon (required, validated)
- Email (optional)
- Alamat (required)
- Berat cucian (required, min 1kg)
- Pilih layanan (required)
- Catatan tambahan (optional)

**Service Options**:
- Cuci Reguler (Rp 5.000/kg, 3 hari)
- Cuci Express (Rp 8.000/kg, 1 hari)
- Cuci Premium (Rp 12.000/kg, 2 hari)
- Setrika Saja (Rp 3.000/kg, 1 hari)

**Features**:
- Kalkulasi harga otomatis
- Estimasi tanggal selesai
- Validasi form lengkap
- Submit & redirect ke tracking

### 2. Tracking System

**Features**:
- Search by nomor telepon
- List semua pesanan customer
- Timeline status dengan icon
- Detail pesanan lengkap
- Auto-update dari admin

**Status Timeline**:
1. 🟡 **Pending** - Pesanan diterima
2. 🔵 **Processing** - Sedang dicuci
3. 🟢 **Ready** - Siap diambil
4. ✅ **Completed** - Selesai

### 3. Admin Panel

**Dashboard**:
- Statistik cards (Pending, Processing, Ready, Completed)
- Total pesanan
- Total pelanggan
- Total pendapatan

**Orders Management**:
- List semua pesanan
- Filter by status
- Update status dengan 1 klik
- View detail pesanan
- Modal untuk detail lengkap

**Customers Management**:
- Tabel data pelanggan
- Total pesanan per customer
- Contact information

**Auto-refresh**:
- Update setiap 5 detik
- Sinkronisasi otomatis dengan localStorage

## 🔧 Configuration

### Tailwind Config

Customize colors di `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#2563eb',
    dark: '#1d4ed8',
    light: '#3b82f6',
  },
  secondary: {
    DEFAULT: '#10b981',
    dark: '#059669',
    light: '#34d399',
  },
}
```

### Store Configuration

State management di `src/lib/store.ts`:
- Orders data
- Customers data
- Services data
- LocalStorage persistence

## 📱 Responsive Design

**Breakpoints**:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Mobile Features**:
- Hamburger menu
- Touch-friendly buttons
- Optimized forms
- Responsive grid layouts

## 🧪 Testing Flow

### User Flow
1. Buka `/booking`
2. Isi form dengan data test
3. Pilih layanan
4. Submit pesanan
5. Redirect ke tracking
6. Lihat status pesanan

### Admin Flow
1. Buka `/admin`
2. Lihat dashboard statistics
3. Klik tab "Pesanan"
4. Lihat list pesanan baru dari user
5. Klik tombol status untuk update
6. Pesanan otomatis ter-update

### Testing Data Sync
1. Buka `/admin` di tab 1
2. Buka `/booking` di tab 2
3. Buat pesanan di tab 2
4. Lihat tab 1 (max 5 detik)
5. Pesanan baru muncul otomatis

## 🔐 Data Storage

**LocalStorage Keys**:
```
viplaundry-storage = {
  state: {
    orders: [],
    customers: [],
    services: []
  }
}
```

**Persistence**:
- Data tersimpan di browser
- Tetap ada setelah refresh
- Shared antara tabs
- Auto-sync

## 🎯 API Reference

### Store Actions

```typescript
// Orders
const { orders, addOrder, updateOrder, deleteOrder, getOrderById, getOrdersByCustomer } = useLaundryStore();

// Customers
const { customers, addCustomer, getCustomerByPhone } = useLaundryStore();

// Services
const { services, getServices } = useLaundryStore();
```

### Utility Functions

```typescript
import { 
  formatDate, 
  formatDateSimple,
  formatRupiah,
  validatePhone,
  getStatusText,
  getStatusClass,
  calculateEstimatedFinish 
} from '@/lib/utils';
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Deploy via Vercel Dashboard
# atau gunakan Vercel CLI
vercel
```

### Netlify

```bash
# Build command: npm run build
# Publish directory: .next

netlify deploy
```

### Self-hosted

```bash
npm run build
npm run start
```

## 🔄 Future Enhancements

### Phase 2
- [ ] Backend API (Node.js + Express)
- [ ] Database (PostgreSQL)
- [ ] Authentication (NextAuth.js)
- [ ] File upload untuk bukti transfer
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Payment gateway

### Phase 3
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] QR code scanning
- [ ] GPS tracking untuk delivery
- [ ] Multi-branch support
- [ ] Loyalty program
- [ ] Advanced analytics

## 📄 Scripts

```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🐛 Troubleshooting

### Port already in use

```bash
# Kill process di port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Build errors

```bash
# Clean install
rm -rf node_modules .next
npm install
npm run build
```

### Data tidak muncul

```bash
# Clear localStorage via browser DevTools
# Application > Local Storage > Clear All
```

## 📞 Support

Jika ada pertanyaan atau issues:
- Check dokumentasi ini
- Lihat code comments
- Check browser console untuk errors

## 📜 License

MIT License - Muhammad Rafli Fajri 2025

## 🎉 Credits

- **Developer**: Muhammad Rafli Fajri
- **Framework**: Next.js by Vercel
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins)

---

**Dibuat dengan ❤️ untuk VIP Laundry**

**Ready to use!** 🚀 Langsung `npm install` dan `npm run dev`!

