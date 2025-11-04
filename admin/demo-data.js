// Demo Data untuk LaundryPro Management System
// File ini berisi data contoh untuk testing dan demo aplikasi

// Data Pelanggan Contoh
const demoCustomers = [
    {
        id: 1,
        name: "Ahmad Rizki",
        email: "ahmad@email.com",
        phone: "08123456789",
        address: "Jl. Sudirman No. 123, Jakarta Selatan",
        totalOrders: 15,
        status: "active",
        joinDate: "2023-01-15"
    },
    {
        id: 2,
        name: "Siti Nurhaliza",
        email: "siti@email.com",
        phone: "08198765432",
        address: "Jl. Thamrin No. 456, Jakarta Pusat",
        totalOrders: 8,
        status: "active",
        joinDate: "2023-03-20"
    },
    {
        id: 3,
        name: "Budi Santoso",
        email: "budi@email.com",
        phone: "08111222333",
        address: "Jl. Gatot Subroto No. 789, Jakarta Selatan",
        totalOrders: 22,
        status: "active",
        joinDate: "2022-11-10"
    },
    {
        id: 4,
        name: "Dewi Sartika",
        email: "dewi@email.com",
        phone: "08133444555",
        address: "Jl. Rasuna Said No. 321, Jakarta Selatan",
        totalOrders: 12,
        status: "active",
        joinDate: "2023-05-12"
    },
    {
        id: 5,
        name: "Rudi Hartono",
        email: "rudi@email.com",
        phone: "08155666777",
        address: "Jl. Kuningan No. 654, Jakarta Selatan",
        totalOrders: 6,
        status: "active",
        joinDate: "2023-07-08"
    }
];

// Data Layanan Contoh
const demoServices = [
    {
        id: 1,
        name: "Cuci Reguler",
        price: 8000,
        description: "Cuci biasa dengan estimasi selesai 24 jam. Cocok untuk pakaian sehari-hari.",
        duration: 24,
        category: "washing",
        isActive: true
    },
    {
        id: 2,
        name: "Cuci Express",
        price: 15000,
        description: "Cuci cepat dengan estimasi selesai 6 jam. Untuk kebutuhan mendesak.",
        duration: 6,
        category: "washing",
        isActive: true
    },
    {
        id: 3,
        name: "Cuci Premium",
        price: 25000,
        description: "Cuci premium dengan perlakuan khusus. Untuk pakaian mahal dan sensitif.",
        duration: 48,
        category: "washing",
        isActive: true
    },
    {
        id: 4,
        name: "Setrika",
        price: 5000,
        description: "Setrika pakaian per kg. Membuat pakaian rapi dan tidak kusut.",
        duration: 12,
        category: "ironing",
        isActive: true
    },
    {
        id: 5,
        name: "Dry Clean",
        price: 35000,
        description: "Cuci kering untuk pakaian yang tidak boleh terkena air.",
        duration: 72,
        category: "special",
        isActive: true
    },
    {
        id: 6,
        name: "Cuci + Setrika",
        price: 12000,
        description: "Paket lengkap cuci dan setrika dengan harga hemat.",
        duration: 36,
        category: "package",
        isActive: true
    }
];

// Data Pesanan Contoh
const demoOrders = [
    {
        id: 1,
        customerId: 1,
        customerName: "Ahmad Rizki",
        serviceId: 1,
        serviceName: "Cuci Reguler",
        weight: 3.5,
        totalPrice: 28000,
        status: "completed",
        orderDate: "2024-01-15",
        estimatedFinish: "2024-01-16",
        actualFinish: "2024-01-16",
        notes: "Pakaian kerja, mohon setrika rapi",
        paymentStatus: "paid",
        paymentMethod: "cash"
    },
    {
        id: 2,
        customerId: 2,
        customerName: "Siti Nurhaliza",
        serviceId: 2,
        serviceName: "Cuci Express",
        weight: 2.0,
        totalPrice: 30000,
        status: "processing",
        orderDate: "2024-01-16",
        estimatedFinish: "2024-01-16",
        actualFinish: null,
        notes: "Pakaian formal untuk meeting besok",
        paymentStatus: "paid",
        paymentMethod: "transfer"
    },
    {
        id: 3,
        customerId: 3,
        customerName: "Budi Santoso",
        serviceId: 3,
        serviceName: "Cuci Premium",
        weight: 4.0,
        totalPrice: 100000,
        status: "pending",
        orderDate: "2024-01-16",
        estimatedFinish: "2024-01-18",
        actualFinish: null,
        notes: "Pakaian mahal, mohon hati-hati",
        paymentStatus: "pending",
        paymentMethod: "cash"
    },
    {
        id: 4,
        customerId: 4,
        customerName: "Dewi Sartika",
        serviceId: 4,
        serviceName: "Setrika",
        weight: 1.5,
        totalPrice: 7500,
        status: "ready",
        orderDate: "2024-01-15",
        estimatedFinish: "2024-01-16",
        actualFinish: null,
        notes: "Pakaian sudah dicuci, tinggal setrika",
        paymentStatus: "paid",
        paymentMethod: "cash"
    },
    {
        id: 5,
        customerId: 5,
        customerName: "Rudi Hartono",
        serviceId: 6,
        serviceName: "Cuci + Setrika",
        weight: 2.5,
        totalPrice: 30000,
        status: "completed",
        orderDate: "2024-01-14",
        estimatedFinish: "2024-01-16",
        actualFinish: "2024-01-15",
        notes: "Pakaian casual",
        paymentStatus: "paid",
        paymentMethod: "transfer"
    },
    {
        id: 6,
        customerId: 1,
        customerName: "Ahmad Rizki",
        serviceId: 2,
        serviceName: "Cuci Express",
        weight: 1.0,
        totalPrice: 15000,
        status: "processing",
        orderDate: "2024-01-16",
        estimatedFinish: "2024-01-16",
        actualFinish: null,
        notes: "Kemeja putih untuk presentasi",
        paymentStatus: "paid",
        paymentMethod: "cash"
    },
    {
        id: 7,
        customerId: 2,
        customerName: "Siti Nurhaliza",
        serviceId: 5,
        serviceName: "Dry Clean",
        weight: 1.8,
        totalPrice: 63000,
        status: "pending",
        orderDate: "2024-01-16",
        estimatedFinish: "2024-01-19",
        actualFinish: null,
        notes: "Jas hitam, tidak boleh terkena air",
        paymentStatus: "pending",
        paymentMethod: "transfer"
    }
];

// Data Statistik Contoh
const demoStats = {
    totalCustomers: 5,
    totalOrders: 7,
    totalRevenue: 253500,
    averageOrderValue: 36214,
    ordersByStatus: {
        pending: 2,
        processing: 2,
        ready: 1,
        completed: 2
    },
    topServices: [
        { name: "Cuci Reguler", count: 1, revenue: 28000 },
        { name: "Cuci Express", count: 2, revenue: 45000 },
        { name: "Cuci Premium", count: 1, revenue: 100000 },
        { name: "Setrika", count: 1, revenue: 7500 },
        { name: "Cuci + Setrika", count: 1, revenue: 30000 },
        { name: "Dry Clean", count: 1, revenue: 63000 }
    ],
    monthlyRevenue: {
        "2024-01": 253500,
        "2023-12": 189000,
        "2023-11": 167500,
        "2023-10": 145000
    }
};

// Data Pengaturan Toko Contoh
const demoStoreSettings = {
    storeName: "LaundryPro Jakarta",
    storeAddress: "Jl. Sudirman No. 123, Jakarta Selatan 12190",
    storePhone: "021-1234567",
    storeEmail: "info@laundrypro-jakarta.com",
    storeHours: "Senin - Minggu: 07:00 - 22:00",
    storeDescription: "Laundry premium dengan layanan berkualitas tinggi",
    currency: "IDR",
    taxRate: 0.11, // 11% PPN
    deliveryFee: 10000,
    freeDeliveryThreshold: 100000
};

// Fungsi untuk menginisialisasi demo data
function initializeDemoData() {
    console.log('Initializing demo data...');
    
    // Simpan data ke localStorage jika belum ada
    if (!localStorage.getItem('laundrypro_customers')) {
        localStorage.setItem('laundrypro_customers', JSON.stringify(demoCustomers));
    }
    
    if (!localStorage.getItem('laundrypro_services')) {
        localStorage.setItem('laundrypro_services', JSON.stringify(demoServices));
    }
    
    if (!localStorage.getItem('laundrypro_orders')) {
        localStorage.setItem('laundrypro_orders', JSON.stringify(demoOrders));
    }
    
    if (!localStorage.getItem('laundrypro_stats')) {
        localStorage.setItem('laundrypro_stats', JSON.stringify(demoStats));
    }
    
    if (!localStorage.getItem('laundrypro_store_settings')) {
        localStorage.setItem('laundrypro_store_settings', JSON.stringify(demoStoreSettings));
    }
    
    console.log('Demo data initialized successfully!');
}

// Fungsi untuk reset data ke demo
function resetToDemoData() {
    if (confirm('Apakah Anda yakin ingin mereset semua data ke demo? Data yang ada akan hilang.')) {
        localStorage.setItem('laundrypro_customers', JSON.stringify(demoCustomers));
        localStorage.setItem('laundrypro_services', JSON.stringify(demoServices));
        localStorage.setItem('laundrypro_orders', JSON.stringify(demoOrders));
        localStorage.setItem('laundrypro_stats', JSON.stringify(demoStats));
        localStorage.setItem('laundrypro_store_settings', JSON.stringify(demoStoreSettings));
        
        alert('Data berhasil direset ke demo! Silakan refresh halaman.');
        location.reload();
    }
}

// Fungsi untuk export data
function exportData() {
    const data = {
        customers: JSON.parse(localStorage.getItem('laundrypro_customers') || '[]'),
        services: JSON.parse(localStorage.getItem('laundrypro_services') || '[]'),
        orders: JSON.parse(localStorage.getItem('laundrypro_orders') || '[]'),
        stats: JSON.parse(localStorage.getItem('laundrypro_stats') || '{}'),
        storeSettings: JSON.parse(localStorage.getItem('laundrypro_store_settings') || '{}'),
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laundrypro-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    alert('Data berhasil diexport!');
}

// Fungsi untuk import data
function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    if (data.customers && data.services && data.orders) {
                        localStorage.setItem('laundrypro_customers', JSON.stringify(data.customers));
                        localStorage.setItem('laundrypro_services', JSON.stringify(data.services));
                        localStorage.setItem('laundrypro_orders', JSON.stringify(data.orders));
                        
                        if (data.stats) {
                            localStorage.setItem('laundrypro_stats', JSON.stringify(data.stats));
                        }
                        
                        if (data.storeSettings) {
                            localStorage.setItem('laundrypro_store_settings', JSON.stringify(data.storeSettings));
                        }
                        
                        alert('Data berhasil diimport! Silakan refresh halaman.');
                        location.reload();
                    } else {
                        alert('Format file tidak valid!');
                    }
                } catch (error) {
                    alert('Error membaca file: ' + error.message);
                }
            };
            reader.readAsText(file);
        }
    };
    
    input.click();
}

// Export fungsi untuk digunakan di script utama
window.demoData = {
    initialize: initializeDemoData,
    reset: resetToDemoData,
    export: exportData,
    import: importData,
    customers: demoCustomers,
    services: demoServices,
    orders: demoOrders,
    stats: demoStats,
    storeSettings: demoStoreSettings
};

// Auto-initialize jika file ini di-load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDemoData);
} else {
    initializeDemoData();
}
