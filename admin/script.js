// Laundry Management System - JavaScript

// Data Storage (In a real app, this would be a database)
let customers = [
    {
        id: 1,
        name: "Ahmad Rizki",
        email: "ahmad@email.com",
        phone: "08123456789",
        address: "Jl. Sudirman No. 123, Jakarta",
        totalOrders: 15,
        status: "active"
    },
    {
        id: 2,
        name: "Siti Nurhaliza",
        email: "siti@email.com",
        phone: "08198765432",
        address: "Jl. Thamrin No. 456, Jakarta",
        totalOrders: 8,
        status: "active"
    },
    {
        id: 3,
        name: "Budi Santoso",
        email: "budi@email.com",
        phone: "08111222333",
        address: "Jl. Gatot Subroto No. 789, Jakarta",
        totalOrders: 22,
        status: "active"
    }
];

let services = [
    {
        id: 1,
        name: "Cuci Reguler",
        price: 8000,
        description: "Cuci biasa dengan estimasi selesai 24 jam",
        duration: 24
    },
    {
        id: 2,
        name: "Cuci Express",
        price: 15000,
        description: "Cuci cepat dengan estimasi selesai 6 jam",
        duration: 6
    },
    {
        id: 3,
        name: "Cuci Premium",
        price: 25000,
        description: "Cuci premium dengan perlakuan khusus",
        duration: 48
    },
    {
        id: 4,
        name: "Setrika",
        price: 5000,
        description: "Setrika pakaian per kg",
        duration: 12
    }
];

let orders = [
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
        notes: "Pakaian kerja"
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
        notes: "Pakaian formal"
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
        notes: "Pakaian mahal"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    loadDashboardData();
    loadCustomersTable();
    loadOrdersTable();
    loadServicesGrid();
    setupEventListeners();
    updateStats();
}

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links li');
    const pages = document.querySelectorAll('.page');
    const pageTitle = document.getElementById('page-title');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            
            // Update active navigation
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show target page
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(targetPage).classList.add('active');
            
            // Update page title
            pageTitle.textContent = this.querySelector('span').textContent;
            
            // Load page-specific data
            loadPageData(targetPage);
        });
    });
}

function loadPageData(page) {
    switch(page) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'orders':
            loadOrdersTable();
            break;
        case 'customers':
            loadCustomersTable();
            break;
        case 'services':
            loadServicesGrid();
            break;
        case 'reports':
            loadReportsData();
            break;
    }
}

// Dashboard Functions
function loadDashboardData() {
    loadRecentOrders();
    updateStats();
}

function updateStats() {
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const processingOrders = orders.filter(order => order.status === 'processing').length;
    const completedOrders = orders.filter(order => order.status === 'completed').length;
    
    // Update stat cards
    document.querySelector('.stat-card:nth-child(1) .stat-number').textContent = pendingOrders;
    document.querySelector('.stat-card:nth-child(2) .stat-number').textContent = processingOrders;
    document.querySelector('.stat-card:nth-child(3) .stat-number').textContent = completedOrders;
    document.querySelector('.stat-card:nth-child(4) .stat-number').textContent = customers.length;
}

function loadRecentOrders() {
    const tableBody = document.getElementById('recent-orders-table');
    const recentOrders = orders.slice(0, 5); // Show last 5 orders
    
    tableBody.innerHTML = recentOrders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.customerName}</td>
            <td>${order.serviceName}</td>
            <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
            <td>${formatDate(order.orderDate)}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewOrder(${order.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Orders Functions
function loadOrdersTable() {
    const tableBody = document.getElementById('orders-table');
    
    tableBody.innerHTML = orders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.customerName}</td>
            <td>${order.serviceName}</td>
            <td>${order.weight} kg</td>
            <td>Rp ${order.totalPrice.toLocaleString()}</td>
            <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
            <td>${formatDate(order.orderDate)}</td>
            <td>${formatDate(order.estimatedFinish)}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewOrder(${order.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-success" onclick="updateOrderStatus(${order.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-info" onclick="printReceipt(${order.id})">
                    <i class="fas fa-print"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteOrder(${order.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function filterOrders() {
    const statusFilter = document.getElementById('status-filter').value;
    const dateFilter = document.getElementById('date-filter').value;
    
    let filteredOrders = orders;
    
    if (statusFilter) {
        filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
    }
    
    if (dateFilter) {
        filteredOrders = filteredOrders.filter(order => order.orderDate === dateFilter);
    }
    
    displayFilteredOrders(filteredOrders);
}

function displayFilteredOrders(filteredOrders) {
    const tableBody = document.getElementById('orders-table');
    
    if (filteredOrders.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="9" class="text-center">Tidak ada pesanan yang ditemukan</td></tr>';
        return;
    }
    
    tableBody.innerHTML = filteredOrders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.customerName}</td>
            <td>${order.serviceName}</td>
            <td>${order.weight} kg</td>
            <td>Rp ${order.totalPrice.toLocaleString()}</td>
            <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
            <td>${formatDate(order.orderDate)}</td>
            <td>${formatDate(order.estimatedFinish)}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewOrder(${order.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-success" onclick="updateOrderStatus(${order.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-info" onclick="printReceipt(${order.id})">
                    <i class="fas fa-print"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteOrder(${order.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Customers Functions
function loadCustomersTable() {
    const tableBody = document.getElementById('customers-table');
    
    tableBody.innerHTML = customers.map(customer => `
        <tr>
            <td>#${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.address}</td>
            <td>${customer.totalOrders}</td>
            <td><span class="status-badge status-${customer.status}">${customer.status === 'active' ? 'Aktif' : 'Tidak Aktif'}</span></td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewCustomer(${customer.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-success" onclick="editCustomer(${customer.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteCustomer(${customer.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Services Functions
function loadServicesGrid() {
    const servicesGrid = document.getElementById('services-grid');
    
    servicesGrid.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-header">
                <div class="service-name">${service.name}</div>
                <div class="service-price">Rp ${service.price.toLocaleString()}/kg</div>
            </div>
            <div class="service-description">${service.description}</div>
            <div class="service-meta">
                <span>Estimasi: ${service.duration} jam</span>
                <div>
                    <button class="btn btn-sm btn-success" onclick="editService(${service.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteService(${service.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Modal Functions
function showAddOrderModal() {
    populateCustomerSelect();
    populateServiceSelect();
    document.getElementById('add-order-modal').style.display = 'block';
}

function showAddCustomerModal() {
    document.getElementById('add-customer-modal').style.display = 'block';
}

function showAddServiceModal() {
    document.getElementById('add-service-form').reset();
    document.getElementById('add-service-modal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function populateCustomerSelect() {
    const select = document.getElementById('order-customer');
    select.innerHTML = '<option value="">Pilih Pelanggan</option>';
    
    customers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.id;
        option.textContent = customer.name;
        select.appendChild(option);
    });
}

function populateServiceSelect() {
    const select = document.getElementById('order-service');
    select.innerHTML = '<option value="">Pilih Layanan</option>';
    
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = `${service.name} - Rp ${service.price.toLocaleString()}/kg`;
        select.appendChild(option);
    });
}

// Form Submissions
function setupEventListeners() {
    // Add Order Form
    document.getElementById('add-order-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addNewOrder();
    });
    
    // Add Customer Form
    document.getElementById('add-customer-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addNewCustomer();
    });
    
    // Add Service Form
    document.getElementById('add-service-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addNewService();
    });
    
    // Store Settings Form
    document.getElementById('store-settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveStoreSettings();
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

function addNewOrder() {
    const customerId = parseInt(document.getElementById('order-customer').value);
    const serviceId = parseInt(document.getElementById('order-service').value);
    const weight = parseFloat(document.getElementById('order-weight').value);
    const notes = document.getElementById('order-notes').value;
    
    if (!customerId || !serviceId || !weight) {
        showMessage('Mohon isi semua field yang diperlukan', 'error');
        return;
    }
    
    const customer = customers.find(c => c.id === customerId);
    const service = services.find(s => s.id === serviceId);
    
    if (!customer || !service) {
        showMessage('Data pelanggan atau layanan tidak valid', 'error');
        return;
    }
    
    const newOrder = {
        id: orders.length + 1,
        customerId: customerId,
        customerName: customer.name,
        serviceId: serviceId,
        serviceName: service.name,
        weight: weight,
        totalPrice: weight * service.price,
        status: 'pending',
        orderDate: new Date().toISOString().split('T')[0],
        estimatedFinish: calculateEstimatedFinish(service.duration),
        notes: notes
    };
    
    orders.push(newOrder);
    
    // Update customer total orders
    customer.totalOrders++;
    
    closeModal('add-order-modal');
    document.getElementById('add-order-form').reset();
    
    showMessage('Pesanan berhasil ditambahkan', 'success');
    loadDashboardData();
    loadOrdersTable();
}

function addNewCustomer() {
    const name = document.getElementById('customer-name').value;
    const email = document.getElementById('customer-email').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;
    
    if (!name || !email || !phone || !address) {
        showMessage('Mohon isi semua field yang diperlukan', 'error');
        return;
    }
    
    const newCustomer = {
        id: customers.length + 1,
        name: name,
        email: email,
        phone: phone,
        address: address,
        totalOrders: 0,
        status: 'active'
    };
    
    customers.push(newCustomer);
    
    closeModal('add-customer-modal');
    document.getElementById('add-customer-form').reset();
    
    showMessage('Pelanggan berhasil ditambahkan', 'success');
    loadCustomersTable();
    updateStats();
}

function addNewService() {
    const name = document.getElementById('service-name').value;
    const price = parseInt(document.getElementById('service-price').value);
    const description = document.getElementById('service-description').value;
    const duration = parseInt(document.getElementById('service-duration').value);
    
    if (!name || !price || !duration) {
        showMessage('Mohon isi semua field yang diperlukan', 'error');
        return;
    }
    
    const newService = {
        id: services.length + 1,
        name: name,
        price: price,
        description: description,
        duration: duration
    };
    
    services.push(newService);
    
    closeModal('add-service-modal');
    document.getElementById('add-service-form').reset();
    
    showMessage('Layanan berhasil ditambahkan', 'success');
    loadServicesGrid();
}

function saveStoreSettings() {
    const storeName = document.getElementById('store-name').value;
    const storeAddress = document.getElementById('store-address').value;
    const storePhone = document.getElementById('store-phone').value;
    const storeEmail = document.getElementById('store-email').value;
    
    // In a real app, this would save to localStorage or database
    localStorage.setItem('storeName', storeName);
    localStorage.setItem('storeAddress', storeAddress);
    localStorage.setItem('storePhone', storePhone);
    localStorage.setItem('storeEmail', storeEmail);
    
    showMessage('Pengaturan berhasil disimpan', 'success');
}

// Utility Functions
function getStatusText(status) {
    const statusMap = {
        'pending': 'Pending',
        'processing': 'Dalam Proses',
        'ready': 'Siap Diambil',
        'completed': 'Selesai'
    };
    return statusMap[status] || status;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function calculateEstimatedFinish(durationHours) {
    const now = new Date();
    const estimated = new Date(now.getTime() + (durationHours * 60 * 60 * 1000));
    return estimated.toISOString().split('T')[0];
}

function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at the top of the page content
    const pageContent = document.querySelector('.page-content');
    pageContent.insertBefore(messageDiv, pageContent.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// CRUD Operations
function viewOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        alert(`Detail Pesanan #${order.id}\nPelanggan: ${order.customerName}\nLayanan: ${order.serviceName}\nBerat: ${order.weight} kg\nTotal: Rp ${order.totalPrice.toLocaleString()}\nStatus: ${getStatusText(order.status)}`);
    }
}

function updateOrderStatus(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        const newStatus = prompt('Pilih status baru (pending/processing/ready/completed):', order.status);
        if (newStatus && ['pending', 'processing', 'ready', 'completed'].includes(newStatus)) {
            order.status = newStatus;
            loadOrdersTable();
            loadDashboardData();
            showMessage('Status pesanan berhasil diupdate', 'success');
        }
    }
}

function deleteOrder(orderId) {
    if (confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {
        const orderIndex = orders.findIndex(o => o.id === orderId);
        if (orderIndex > -1) {
            const order = orders[orderIndex];
            const customer = customers.find(c => c.id === order.customerId);
            if (customer) {
                customer.totalOrders--;
            }
            orders.splice(orderIndex, 1);
            loadOrdersTable();
            loadDashboardData();
            showMessage('Pesanan berhasil dihapus', 'success');
        }
    }
}

function printReceipt(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        // Buka receipt template dengan data order
        const orderData = encodeURIComponent(JSON.stringify(order));
        const receiptUrl = `receipt-template.html?orderData=${orderData}`;
        window.open(receiptUrl, '_blank');
    }
}

function viewCustomer(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
        alert(`Detail Pelanggan #${customer.id}\nNama: ${customer.name}\nEmail: ${customer.email}\nTelepon: ${customer.phone}\nAlamat: ${customer.address}\nTotal Pesanan: ${customer.totalOrders}`);
    }
}

function editCustomer(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
        // In a real app, this would open an edit modal
        alert('Fitur edit pelanggan akan segera hadir!');
    }
}

function deleteCustomer(customerId) {
    if (confirm('Apakah Anda yakin ingin menghapus pelanggan ini?')) {
        const customerIndex = customers.findIndex(c => c.id === customerId);
        if (customerIndex > -1) {
            customers.splice(customerIndex, 1);
            loadCustomersTable();
            updateStats();
            showMessage('Pelanggan berhasil dihapus', 'success');
        }
    }
}

function editService(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (service) {
        // In a real app, this would open an edit modal
        alert('Fitur edit layanan akan segera hadir!');
    }
}

function deleteService(serviceId) {
    if (confirm('Apakah Anda yakin ingin menghapus layanan ini?')) {
        const serviceIndex = services.findIndex(s => s.id === serviceId);
        if (serviceIndex > -1) {
            services.splice(serviceIndex, 1);
            loadServicesGrid();
            showMessage('Layanan berhasil dihapus', 'success');
        }
    }
}

// Reports Functions
function loadReportsData() {
    // Set default dates
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    
    document.getElementById('report-start-date').value = lastMonth.toISOString().split('T')[0];
    document.getElementById('report-end-date').value = today.toISOString().split('T')[0];
}

function generateReport() {
    const reportType = document.getElementById('report-type').value;
    const startDate = document.getElementById('report-start-date').value;
    const endDate = document.getElementById('report-end-date').value;
    
    if (!startDate || !endDate) {
        showMessage('Mohon pilih rentang tanggal', 'error');
        return;
    }
    
    // Filter orders by date range
    const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.orderDate);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return orderDate >= start && orderDate <= end;
    });
    
    // Calculate statistics
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0);
    const totalOrders = filteredOrders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Display report
    const reportContent = `
        <h3>Laporan ${getReportTypeText(reportType)}</h3>
        <p><strong>Periode:</strong> ${formatDate(startDate)} - ${formatDate(endDate)}</p>
        <p><strong>Total Pesanan:</strong> ${totalOrders}</p>
        <p><strong>Total Pendapatan:</strong> Rp ${totalRevenue.toLocaleString()}</p>
        <p><strong>Rata-rata Nilai Pesanan:</strong> Rp ${avgOrderValue.toLocaleString()}</p>
    `;
    
    alert(reportContent);
    showMessage('Laporan berhasil di-generate', 'success');
}

function getReportTypeText(type) {
    const typeMap = {
        'daily': 'Harian',
        'weekly': 'Mingguan',
        'monthly': 'Bulanan',
        'yearly': 'Tahunan'
    };
    return typeMap[type] || type;
}

// Search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm.length < 2) return;
        
        // Search in orders
        const matchingOrders = orders.filter(order => 
            order.customerName.toLowerCase().includes(searchTerm) ||
            order.serviceName.toLowerCase().includes(searchTerm) ||
            order.id.toString().includes(searchTerm)
        );
        
        // Search in customers
        const matchingCustomers = customers.filter(customer =>
            customer.name.toLowerCase().includes(searchTerm) ||
            customer.email.toLowerCase().includes(searchTerm) ||
            customer.phone.includes(searchTerm)
        );
        
        // Display search results
        if (matchingOrders.length > 0 || matchingCustomers.length > 0) {
            displaySearchResults(matchingOrders, matchingCustomers);
        }
    });
}

function displaySearchResults(orders, customers) {
    // In a real app, this would show search results in a dropdown or modal
    console.log('Search results:', { orders, customers });
}

// Initialize search
setupSearch();
